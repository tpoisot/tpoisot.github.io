---
title: These aren't the networks you're looking for
author: Tim
type: note
layout: post
tags:
- R
- mangal
---

The development of the `rmangal` package is making good progress. I just
finised implementing a way to filter results, which will be extremely useful
when the number of taxa and networks will start growing. Before we get into
how filtering is done, I'd like to take the opportunity to bore everyone
with technical details. `mangal` (the API) relies on `tastypie`, which is a
`django` plugin to use the data models as API resources (bored yet?). The
`tastypie` developers had the good taste to allow `django`'s ORM filter as
URL parameters to filter results. Or in short, there is a filtering solution
working out of the box.

The filtering is realtively easy to do, as it follows the common pattern:

~~~
?field__relation=target
~~~

For example, to look for taxa whose name starts with *Lamellodiscus*, we
just need to append:

~~~
?name__startswith=Lamellodiscus
~~~

# The basics of filtering

So how does it works in the `R` package? There is a `mangalSearch` function,
which takes as arguments the `api`, the type of resource to look for (the
list of resources can be now be viewed with `api$resources`), and a list of
filters. The filters are themselves `list` objects, with three properties:
`field`, `relation` (I give an overview of these below), and `target`. Let
me illustrate:


~~~r
library(rmangal)
~~~

~~~
## Loading required package: rjson
## Loading required package: httr
## Loading required package: igraph
## Loading required package: stringr
## Loading required package: cheddar
~~~

~~~r
api <- mangalapi("http://localhost:8000/")
Amphiprion <- mangalSearch(api, "taxa", list(list(field = "name", relation = "startswith", 
    target = "Amphiprion")))
laply(Amphiprion, function(x) x$name)
~~~

~~~
## [1] "Amphiprion clarkii"      "Amphiprion perideraion" 
## [3] "Amphiprion ocellaris"    "Amphiprion sandaracinos"
## [5] "Amphiprion melanopus"    "Amphiprion polymnus"
~~~


It may look like a convoluted way to do a simple thing, *but* the interest
is that you can combine filters to have more precise requests. Let's say we
are really interested in a small portion of the pacific ocean, and want to
know if there are any networks inside. We will define two different filters:
one for latitude, and one for longitude.


~~~r
filter_lat = list(field = "latitude", relation = "range", target = c(1.756, 
    1.813))
filter_lon = list(field = "longitude", relation = "range", target = c(124.76, 
    124.808))
Networks <- mangalSearch(api, "network", list(filter_lat, filter_lon))
laply(Networks, function(x) x$name)
~~~

~~~
## [1] "Batu Kapal"  "Jalan Masuk"
~~~


# Types of relations

There are ten different values for the `relation` type. `starswith` and
`endswith` will match the beginnign and end of the value. `exact` will match
the entirety of the field. `contains` will look for `target` somewhere in
the field. `in` will return objects that have `target` in the values of a
multi-valued field (example of use: with the identifier of an interactio,
find the network it belongs to). `range` will return all objects that have
values in the `target` range. And finally, `gte`, `gt`, `lte` and `lt`,
handle superior/inferior (or equal) relationships.

# More advanced usage

If you look at the code of `mangalSearch`, you'll see that it passes
an addition argument (`filtering`) to `mangalList`. This allows you
to handle more complicated filtering schemes. In the filtering pattern
`field__relation=target`, `field` can actually be a *path* across multiple
objects. Let's illustrate with an example.

We want to retrieve all interactions involving `taxa` whose name starts with
`Amphiprion`. The *path* from `interaction` to `taxa` goes through the field `taxa_to`/`taxa_from` in interaction. So what we want to do is:

~~~
?taxa_from__name__startswith=Amphiprion
~~~

We can add that as the `filtering` argument of `mangalList`:


~~~r
Interactions <- rmangal:::mangalList(api, "interaction", filtering = "taxa_from__name__startswith=Amphiprion")
laply(Interactions, function(x) x$id)
~~~

~~~
##  [1] "93"  "92"  "87"  "86"  "85"  "82"  "81"  "76"  "75"  "69"  "68" 
## [12] "67"  "59"  "58"  "53"  "52"  "51"  "50"  "45"  "44"  "23"  "24" 
## [23] "25"  "26"  "27"  "28"  "29"  "30"  "31"  "32"  "33"  "34"  "35" 
## [34] "36"  "37"  "38"  "39"  "41"  "42"  "43"  "44"  "45"  "46"  "47" 
## [45] "48"  "49"  "50"  "51"  "52"  "53"  "54"  "56"  "58"  "59"  "60" 
## [56] "61"  "62"  "64"  "65"  "66"  "67"  "68"  "69"  "71"  "72"  "73" 
## [67] "75"  "76"  "77"  "78"  "79"  "81"  "82"  "83"  "84"  "85"  "86" 
## [78] "87"  "88"  "89"  "90"  "91"  "92"  "93"  "95"  "96"  "97"  "98" 
## [89] "99"  "100" "101" "102" "103" "104" "105" "106"
~~~


Because `mangalList` is not exported, you have to use the `:::` operator
to explicitely call it. Note that these functions may not work (quite yet)
with the public database, because we will update the API later this week.
