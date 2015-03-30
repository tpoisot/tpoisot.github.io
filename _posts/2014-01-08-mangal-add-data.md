---
title: Uploading data into mangal
type: note
layout: post
author: Tim
tags:
- open science
- R
- mangal
- ecological networks
- rOpenSci
---

In the first part, I introduced `mangal`, the database and associated `R` package to interact with ecological networks. In the second part, I'll give an overview of how to upload and curate your data. In the last part, we used functions starting with `get` and `list`. This time, we will use the `add` and `patch` functions, as they allow to change resouces on the server. There are a few important informations to have before we start.

First, working on the server is *for real*, so please be careful. But take the opportunity of the testing phase to try to break the database in new, innovative ways! Second, the licence under which the data are released is the *CC-0* waiver. In short, when data are uploaded in the database, they are frelly available, for all to see and use. Almost all data sharing services use this license for data. Finally, the database is *add-only*, which means that you can't remove data (but I can, in case things go exceptionally wrong).

In this post, we'll see (i) how to create an account on the database, (ii)
how to create and populate a dataset, and (iii) how to modify the interactions
after sending them. You are of coure invited to try similar things. Note
that the database won't accept objects with duplicated names, so if you try
to re-upload some of the taxa in this example, it most likely won't work.

# Setting things up

As always, we'll start by getting the latest release of `rmangal`. And we'll also get the latest release of `taxize`, because there is a really neat trick I want to show you (in short: automated curation).


~~~r
options(stringsAsFactors = FALSE)
if (getOption("unzip") == "") options(unzip = "unzip")
library(devtools)
install_github("rmangal", "mangal-wg")
library(rmangal)
install_github("taxize", "ropensci")
library(taxize)
~~~


# Signing-up

Uploading and curating data require that you are logged in. The reason is simple: each object in the database has an `owner` property, and this owner becomes you every time you modify an object. Signing up can be done directly from `R`: 


~~~r
api <- mangalapi()
me <- signUp(api, "my_user_name", "my_password")
# This line will log you with your newly acquired identifiers!
api <- mangalapi(usr = me$username, pwd = me$password)
me
~~~

~~~
## $email
## [1] ""
## 
## $first_name
## [1] ""
## 
## $id
## [1] 3
## 
## $last_name
## [1] ""
## 
## $password
## [1] "my_password"
## 
## $username
## [1] "my_user_name"
~~~


Before we start, let's add some personal informations to your profile:


~~~r
me$first_name <- "Fake"
me$last_name <- "People"
me$email <- "me@fake.people"
~~~


Now we just need to update this information on the server:


~~~r
me <- patchUser(api, me)
me
~~~

~~~
## $email
## [1] "me@fake.people"
## 
## $first_name
## [1] "Fake"
## 
## $id
## [1] 3
## 
## $last_name
## [1] "People"
## 
## $password
## [1] "my_password"
## 
## $username
## [1] "my_user_name"
~~~


Next time you want to work on data, you'll just need to start your session by


~~~r
api <- mangalapi(URL, usr = "my_username", pwd = "my_password")
~~~


# Putting data on the database

In the previous part, I may have mentionned that the usual way to get a network is to start at the `dataset` level, then go all the way down to the `taxa`. When uploading data, you need to follow the opposite direction. Let's say that we want to send data about what (probably) happens in the *Isle Royale National Park*: wolves eat mooses, mooses eat balsam fir.

As for `get` and `list`, the functions to modify data follow a single naming convention: either `patch` or `add`, and the name of the resource with its first letter capitalized.

## Creating taxa

The first thing we need to do is create a few `taxa` objects. In case you don't remember how a `taxa` is formatted, you can call


~~~r
whatIs(api, "taxa")
~~~

~~~
##         field                                        help    type  null
## 1        bold             The BOLD identifier of the taxa integer  TRUE
## 2 description             A short description of the taxa  string  TRUE
## 3        gbif             The GBIF identifier of the taxa integer  TRUE
## 5        itis             The ITIS identifier of the taxa integer  TRUE
## 6        name             The scientific name of the taxa  string FALSE
## 7        ncbi    The NCBI Taxonomy identifier of the taxa integer  TRUE
## 9  vernacular The vernacular name of the taxa, in English  string FALSE
##   unique values
## 1   TRUE       
## 2  FALSE       
## 3   TRUE       
## 5   TRUE       
## 6   TRUE       
## 7   TRUE       
## 9  FALSE
~~~


So we'll want to create three taxa:


~~~r
moose <- list(name = "Alces americanus", vernacular = "American moose")
wolf <- list(name = "Canis lupus", vernacular = "Gray wolf")
balsam <- list(name = "Abies balsamea", vernacular = "Balsam fir")
~~~


Now, let's put them in the database:


~~~r
wolf <- addTaxa(api, wolf)
moose <- addTaxa(api, moose)
balsam <- addTaxa(api, balsam)
~~~


We can check that our taxa are indeed in the database with


~~~r
getTaxa(api, wolf$id)
~~~

~~~
## $bold
## NULL
## 
## $description
## NULL
## 
## $gbif
## NULL
## 
## $id
## [1] "20"
## 
## $itis
## NULL
## 
## $name
## [1] "Canis lupus"
## 
## $ncbi
## NULL
## 
## $owner
## [1] "my_user_name"
## 
## $vernacular
## [1] "Gray wolf"
~~~


## Creating interactions

We will now create interactions between these taxa. Once more, have a look at `whatIs(api, 'interaction')`, and in particular pay attention to the `values` column of the `ecotype` field. It tells you that `ecotype` (the type of ecological interaction betwee two organisms), can only be one of:


~~~r
strsplit(subset(whatIs(api, "interaction"), field == "ecotype")$values, ", ")[[1]]
~~~

~~~
##  [1] "predation"                 "ectoparasitism"           
##  [3] "endoparasitism"            "intra-cellular parasitism"
##  [5] "parasitoidism"             "mycoheterotrophy"         
##  [7] "antixenosis"               "teletoxy"                 
##  [9] "amensalism"                "antibiosis"               
## [11] "allelopathy"               "competition"              
## [13] "facilitation"              "refuge creation"          
## [15] "inquilinism"               "phoresis"                 
## [17] "epibiosis"                 "pollination"              
## [19] "mutualistic symbiosis"     "zoochory"                 
## [21] "mutual protection"
~~~


Note that this list of terms will probably increase in the future. In any case, we have enough informations to start writing our interactions:


~~~r
w_e_m <- list(taxa_from = wolf, taxa_to = moose, ecotype = "predation")
m_e_b <- list(taxa_from = moose, taxa_to = balsam, ecotype = "herbivory")
w_e_m <- addInteraction(api, w_e_m)
m_e_b <- addInteraction(api, m_e_b)
~~~


Congratulations! Note that within the `R` package, it's perfectly acceptable to pass the whole `taxa` object (but if you want to interact with the API, you need to pass only the URI, and if you want to interact directly with the API, chances are you knew that already...).

## Wrapping things up

At this point, we're almost done. We simply need to wrap our interactions in a `network` object:


~~~r
isle_royale <- addNetwork(api, list(name = "Isle Royale National Park", description = "Or at least a simplified version of it", 
    interactions = list(w_e_m, m_e_b), metaweb = TRUE))
~~~


The `metaweb` attribute comes from our [paper on network beta-diversity][elepaper]. If you are reporting regionally observed or infered interactions, then it is `TRUE`. if you have been sitting in the field looking at stuff, then it's `FALSE`.

And finally, even if we only have one network, we will publish it as a dataset:


~~~r
ir_dataset <- addDataset(api, list(name = "North-American Terrestrial food webs", 
    networks = list(isle_royale)))
~~~


And we're done!

# Modifying data

In this part, we will go through the different ways to alter data already in the database.

## Adding some attributes

Now, let's add some informations to our data. First, we have told almost nothing about where our network is in space. We'll pull it from the database, and add the `latitude` and `longitude` attribute:


~~~r
isle_royale <- getNetwork(api, isle_royale$id)
isle_royale$latitude <- 48.015
isle_royale$longitude <- -88.831
isle_royale <- patchNetwork(api, isle_royale)
isle_royale
~~~

~~~
## $date
## NULL
## 
## $description
## [1] "Or at least a simplified version of it"
## 
## $environment
## list()
## 
## $id
## [1] "3"
## 
## $interactions
## [1] "18" "19"
## 
## $latitude
## [1] "48.015"
## 
## $longitude
## [1] "-88.831"
## 
## $metaweb
## [1] TRUE
## 
## $name
## [1] "Isle Royale National Park"
## 
## $owner
## [1] "my_user_name"
~~~


Because the `ir_dataset` dataset contains a *reference* to the object we just modified, there is no need to alter it in any way.

At this point, you can have a look at `http://mangal.uqar.ca/data/`, and on the map, there should be a little dot somewhere between Ontario and Wisconsin, representing the network.

## Adding new relations

Let's say that we want to provide a short bibliography along with the data. An important paper on this system is *The Rise and Fall of Isle Royale Wolves*, by Peterson & Page. We know the DOI of this article (`10.2307/1381751`), so we'll just add a reference to the dataset. Datasets have `papers` and `data` fields, that point to `reference` objects. First, we will create a reference (again, look at `whatIs(api, 'reference')` to see the possible field (and beware, there is a typo, the `jstorid` field is called `jsonid`, I will fix that really soon). 


~~~r
peterson_n_page <- addReference(api, list(doi = "10.2307/1381751"))
~~~


Now, we need to add the reference to the `papers` field of the `dataset` object:


~~~r
ir_dataset$papers <- list(peterson_n_page)
ir_dataset <- patchDataset(api, ir_dataset)
ir_dataset
~~~

~~~
## $data
## list()
## 
## $description
## NULL
## 
## $id
## [1] "2"
## 
## $name
## [1] "North-American Terrestrial food webs"
## 
## $networks
## [1] "3"
## 
## $owner
## [1] "my_user_name"
## 
## $papers
## [1] "1"
~~~


And if you go to `http://mangal.uqar.ca/data/dataset/<id>/` (where `<id>` is whatever number is in the `id` field of the dataset), you will see a list of the references.

## Using the power of open science for good

When describing the taxa, we only gave the latin and vernacular names. It's good, but if we want to really take advantage of all the great tools we have, we will need a little more. One solution is to do a bit of googling, and just copy/paste the taxonomic identifiers and patch the taxa this way. Another solution is to use `taxize`. `taxize` has a function to get the NCBI identifiers from the latin name, which is perfect for our case:


~~~r
for (tax in list(wolf, moose, balsam)) {
    if (is.null(tax$ncbi)) {
        identifier <- get_uid(tax$name, ask = FALSE)
        if (!is.na(identifier)) {
            tax$ncbi <- identifier[1]
            patchTaxa(api, tax)
        }
    }
}
~~~

~~~
## 
## Retrieving data for taxon 'Canis lupus'
## 
## 
## Retrieving data for taxon 'Alces americanus'
## 
## 
## Retrieving data for taxon 'Abies balsamea'
~~~


Let's get the whole network and see that the NCBI identifiers have been added:


~~~r
g <- network_as_graph(api, isle_royale$id)
unlist(V(g)$ncbi)
~~~

~~~
## [1] 999462  90345   9612
~~~


There is probably more and more we can do using combination of packages, I'll try to show some possibilities in use-cases.

# What now?

As before, keep in mind that the test database will be periodically wiped
clean, so don't use it to do some actual data deposition (yet). But it would
be really cool for you to try writing scripts to upload/modify your datasets,
and tell me if anything goes wrong. Meanwhile, I'm working on preparing
use cases (including one to automatically upload your data on *figshare*
and returning the DOI), which I'll publish (hopefully) later this week,
or early next week. As always, use the [GitHub page][ghis] to report issues.

[elepaper]: http://www.ncbi.nlm.nih.gov/pubmed/22994257
[ghis]: https://github.com/mangal-wg/rmangal/issues?state=open
