---
title: Introducing mangal, a database for ecological networks
type: note
layout: post
author: Tim
tags:
- open science
- R
- mangal
- ecological networks
---

Working with data on ecological networks is usually a huge mess. Most of the
time, what you have is a series of matrices with `0` and `1`, and in the best
cases, another file with some associated metadata. The other issue is that,
simply put, data on ecological networks are hard to get. The [*Interaction Web
Database*][iwdb] has some, but it's not as actively maintained as it should,
and the data are not standardized in any way. When you need to pull a lot
of networks to compare them, it means that you need to go through a long,
tedious, and error-prone process of cleaning and preparing the data. It
should not be that way, and that is the particular problem I've been trying
to solve since this spring.

About a year ago, I discussed why [we should have a common language][specpost]
to represent interaction networks. So with this idea in mind, and with
great feedback from colleagues, I assembled a series of `JSON` schemes to
represent networks, in a way that will allow programmatic interaction with the
data. And I'm now super glad to announce that I am looking for beta-testers,
before I release the tool in a formal way. This post is the first part of a
series of two or three posts, which will give informations about the project,
how to interact with the database, and how to contribute data. I'll probably
try to write a few use-cases, but if reading these posts inspire you, feel
free to suggest some!

# So what is that about?

`mangal` (another word for a mangrove, and a type of barbecue) is a way to
represent and interact with networks in a way that is (i) relatively easy and
(ii) allows for powerful analyses. It's built around a data format, *i.e.*
a common language to represent ecological networks. You can have an overview
of the data format [on the website][mg]. The data format was conceived with
two ideas in mind. First, it must makes sense from an ecological point of
view. Second, it must be easy to use to exchange data, send them to database,
and get them through APIs. Going on a website to download a text file (or
an Excel one) should be a thing of the past, and the data format is built
around the idea that everything should be done in a programmatic way.

Very importantly, the data specification explains how data should be formatted
when they are *exchanged*, not when they are used. The `R` package, notably,
uses `igraph` to manipulate networks. It means that anyone with a database
of ecological networks can write an API to expose these data in the `mangal`
format, and in turn, anyone can access the data with the URL of the API as
the only information.

Because everyone uses `R`, as I've mentionned above, we are also releasing
a `R` package (unimaginatively titled `rmangal`). You can [get it from
*GitHub*][rmangal], and we'll see in a minute how to install it until it
is released on CRAN. Most of these posts will deal with how to use the `R`
package, and what can be done with it. Ideally, you won't need to go on the
website *at all* to interact with the data (but just to make sure you do, the
website has some nice eye-candy, with clickable maps and animated networks).

# Things to know before getting started

As I've mentionned above, I'm looking for people to give the database
and package a test before I move on with the release. A **very important
point** is that, because this is a testing period, the database will be
emptied quiet frequently. So do not share what you put on the database at
the moment. Basically, until the first version of the `rmangal` package hits
CRAN, consider that all data may be wiped at any moment.

## The necessary R packages

The `rmangal` package requires a few others things to work with (but if you
are using any of the [rOpenSci][ropensci] packages, chances are you already
have most of them. In any case, the installation will take care of getting
any required dependencies, so install `devtools` if you don't have it, and run:


~~~r
options(stringsAsFactors = FALSE)
if (getOption("unzip") == "") options(unzip = "unzip")
library(devtools)
install_github("rmangal", "mangal-wg")
library(rmangal)
~~~


This will pull the most recent version from the *GitHub* repository of the
package, so it's a good idea to run that at the beginning of each session.

## How to report problems and suggest improvements

The best place to report problems is the [Issues page][issues] of the `rmangal`
repository. Suggestions of improvements are particularly welcome. The code
for the API is not open-sourced at the moment, because I have a fair amount
of work to do to make it easy to install.

## How to get more informations?

In the [repository of the package][vign], there is a series of (in progress)
vignettes. They give a little bit more background on what is going on.

# Getting data from R

OK, let's get started!

The *first* thing you have to do is create a `R` object with
the URL of the API you want to connect to. By default, this is
`http://mangal.uqar.ca/api/v1/`. Note that there are arguments for username
and password, but we'll get to those in the second post.


~~~r
api <- mangalapi()
names(api)
~~~

~~~
##  [1] "base"        "trail"       "dataset"     "environment" "interaction"
##  [6] "item"        "network"     "population"  "reference"   "taxa"       
## [11] "trait"       "user"
~~~


The `names` options is a list of all of the properties of the API. Aside from `base` and `trail` (and if you are logged-in, `me` and `auth`), they all resources you can interact with. For example


~~~r
api$taxa
~~~

~~~
## $url
## [1] "http://mangal.uqar.ca/api/v1/taxa/"
## 
## $verbs
## [1] "get"   "post"  "patch"
~~~


This gives you two informations. First, the URL to do anything related with taxa (`api$taxa$url`), and the versb you can use. Verbs are a way to represent actions when talking to a server. I'm not going to go into much details at this point, but here is the gist: `get` will retrieve information, `post` will add it, and `patch` will modify it. Butyou don't have to know any of that to use the package.

The functions to interact with the data in `rmangal` are all following a naming convention: first the action, then the type of object. The actions are `list` and `get` (and `add` and `patch`, which we'll see in the next post), and the type of objects are what was returned by `names(api)`, with the first letter capitalized.

## First step - a list of all taxa

So, if you want to have a list of all the taxa in the database, it's as simple as doing the following (a bit of `plyr` magic to have a nice `data.frame`):


~~~r
all_taxa <- listTaxa(api)
head(data.frame(laply(all_taxa, function(x) x)), 3)
~~~

~~~
##   bold description gbif id itis                    name ncbi   owner
## 1 NULL        NULL NULL  9 NULL Lamellodiscus ignoratus NULL tpoisot
## 2 NULL        NULL NULL 10 NULL   Lamellodiscus elegans NULL tpoisot
## 3 NULL        NULL NULL 11 NULL   Lamellodiscus ergensi NULL tpoisot
##                vernacular
## 1 Lamellodiscus ignoratus
## 2   Lamellodiscus elegans
## 3   Lamellodiscus ergensi
~~~


And let's look at the first element of `all_taxa`:


~~~r
all_taxa[[1]]
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
## [1] "9"
## 
## $itis
## NULL
## 
## $name
## [1] "Lamellodiscus ignoratus"
## 
## $ncbi
## NULL
## 
## $owner
## [1] "tpoisot"
## 
## $vernacular
## [1] "Lamellodiscus ignoratus"
~~~


So what are all these fields? There is a `whatIs` function in `rmangal`, whose purpose is to tell you everything you need to know about a type of object. Let's do that with `taxa`:


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


The first column is the name of the field, the second is a description of the data, and the `type` column is the format of the field content. The `null` column will tell you whether the field can be `NULL` or not. The `unique` column will tell you whether two different objects can share a value for this field (in the example of `taxa`, we see that no two taxa can have the same indetifiers or latin name). Finally, the `values` column is set *only* when a field accepts a particular set of values.

Another way to get the first `taxa` if we know its `id` is


~~~r
getTaxa(api, all_taxa[[1]]$id)
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
## [1] "9"
## 
## $itis
## NULL
## 
## $name
## [1] "Lamellodiscus ignoratus"
## 
## $ncbi
## NULL
## 
## $owner
## [1] "tpoisot"
## 
## $vernacular
## [1] "Lamellodiscus ignoratus"
~~~


## Getting real data

The most frequent use will be to look at `dataset`s, and get the data within. After looking at the data specification, you'll reach the conclusion that a `dataset` is mostly a list of `network`s, which are themselves lists of `interactions`, which point to `taxa` objects (among other things - it's explained in the vignettes).

First thing first, let's have a look at the datasets:


~~~r
(all_ds <- ldply(listDataset(api), function(x) unlist(x)))
~~~

~~~
##   description id                                              name
## 1              1 Host-parasite interactions in marine environments
##   networks    owner
## 1        2 poisti01
~~~


Note that you can also [browse the data][data] from the website, where there are animated maps, and cool dynamical representations of the networks. But meanwhile, let's get the first dataset:


~~~r
(ds <- getDataset(api, all_ds$id[1]))
~~~

~~~
## $data
## list()
## 
## $description
## [1] ""
## 
## $id
## [1] "1"
## 
## $name
## [1] "Host-parasite interactions in marine environments"
## 
## $networks
## [1] "2"
## 
## $owner
## [1] "poisti01"
## 
## $papers
## list()
~~~


This dataset has a single network (of `id` 2), which looks like:


~~~r
getNetwork(api, ds$networks[1])
~~~

~~~
## $date
## [1] "2007/04/05"
## 
## $description
## [1] ""
## 
## $environment
## list()
## 
## $id
## [1] "2"
## 
## $interactions
##  [1] "3"  "4"  "5"  "6"  "7"  "8"  "9"  "10" "11" "12" "13" "14" "15" "16"
## [15] "17"
## 
## $latitude
## [1] "42.482"
## 
## $longitude
## [1] "3.137"
## 
## $metaweb
## [1] TRUE
## 
## $name
## [1] "Lamellodiscus of sparids in the Banyuls Bay Area"
## 
## $owner
## [1] "poisti01"
~~~


So the process of getting an entire network is calling `getInteraction` on each interaction, see which `taxa` it involves, then call `getTaxa` on each of those, and so forth. But as this is extremely boring, there is a `network_as_graph` function, which is doing exactly that:


~~~r
g <- network_as_graph(api, ds$networks[1])
~~~


Because this function will have to go through (possibly) a lot of resources to find the whole network, and because getting each resource requires an interaction with the server, it can be long. The good strategy is, rather obviously, to decide which objects to store, and interact with them locally, rather than querying the database everytime you want to see what's in a network. The `g` object created this way is an `igraph` graph, meaning that we can plot it:


~~~r
plot(g, edge.arrow.size = 0.5, vertex.size = 30, vertex.color = "white", vertex.frame.color = NA, 
    vertex.label.family = "sans", vertex.label.color = "black", layout = layout.circle)
~~~

![plot of chunk rmangal_first_network](/rfig/rmangal_first_network.png) 


Note also that because `g` in an `igraph` object, both the nodes and interactions have retained their attributes. So if you want to see what type of interactions (`whatIs` will tell you that this is the `ecotype` field of an `interaction`) are in this network, this is as simple as:


~~~r
E(g)$ecotype
~~~

~~~
##  [1] "ectoparasitism" "ectoparasitism" "ectoparasitism" "ectoparasitism"
##  [5] "ectoparasitism" "ectoparasitism" "ectoparasitism" "ectoparasitism"
##  [9] "ectoparasitism" "ectoparasitism" "ectoparasitism" "ectoparasitism"
## [13] "ectoparasitism" "ectoparasitism" "ectoparasitism"
~~~


This is an important idea behind the data specification. The *right* way to store data and the *right* way to work with these data are most likely different. Although some people will want to manipulate the data directly using the `get` and `list` functions, it's always nice to have functions to speed up the process. And if you use `network_as_graph`, and want to get a list of the NCBI identifiers of all the species, you don't need to use `getTaxa`; writing `V(g)$ncbi` will do the trick.

# So now what?

This is the end of the first part of this series of posts on `mangal`. Later this week, I will publish the next part, about how to *upload* your data in the database. This is where I'll be looking for people to actually test how things work. Meanwhile, if you want to play with the package and report weird things, that's cool!

[iwdb]: http://www.nceas.ucsb.edu/interactionweb/
[specpost]: http://timotheepoisot.fr/2012/11/23/how-to-represent-networks/
[mg]: http://mangal.uqar.ca/doc/spec/
[rmangal]: https://github.com/mangal-wg/rmangal
[ropensci]: http://ropensci.org/
[issues]: https://github.com/mangal-wg/rmangal/issues
[vign]: https://github.com/mangal-wg/rmangal/tree/master/vignettes
[data]: http://mangal.uqar.ca/data/
