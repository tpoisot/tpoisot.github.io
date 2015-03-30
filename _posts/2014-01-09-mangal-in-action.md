---
title: Examples of mangal in action
type: note
layout: post
author: Tim
tags:
- open science
- R
- mangal
- ecological networks
---

In the two previous posts (see [Part 1][p1] and [Part 2][p2]), I've presented
the basics of using `mangal` and the `rmangal` package to access, deposit, and
edit data about ecological networks. The final post in the series is going to be
slightly more fun: I'll illustrate some use cases of things you can potentially
do with the database. We will start from the representation of a network in
space, then move on to measuring beta-diversity in the dataset, and end with
some more classical species-links relationships.

# Setting things up

We'll need to pull the latest version of `rmangal`, as usual. In addition, we'll
need a few other packages.


~~~ r
options(stringsAsFactors = FALSE)
if (getOption("unzip") == "") options(unzip = "unzip")
library(devtools)
install_github("rmangal", "mangal-wg")
install_github("betalink", "tpoisot")
library(rmangal)
# Let's connect to the database
URL <- "http://localhost:8000"
api <- rmangal::mangalapi(URL)
library(betalink)
# Tools for spatial analyses
library(sp)
library(RgoogleMaps)
library(RColorBrewer)
~~~


I will do everything using a dataset released by [Ricciardi and
colleagues][ric]. The [original data][od] are on the *Interaction Web DataBase*.
This dataset describes 16 anemonefish/fishes mutualistic networks in Indonesia.
It's an extremely cool dataset, because (i) there are a lot of sites in a small
space, (ii) a lot of species are in common across sites, and (iii)
anemonefishes. So I've uploaded these data in my local copy of the database, and
I'm going to illustrate a few uses-cases. The only "manual" operation was
determining the spatial coordinates in each networks, based on the map presented
in the original paper.

[ric]: http://dx.doi.org/10.1007/s10641-010-9606-0

# Use-case 1: spatialized network

There is a really cool figure in one of [Jordi Bascompte's papers][bas], in
which a network is plotted in space, and the position of each species is the
center of mass of its area. This is an interesting way to plot networks when
spatial information is available, so let's do just that.

[bas]: http://dx.doi.org/10.1126/science.1170749

We start by getting the dataset:


~~~ r
Dataset <- getDataset(api, 8)
Dataset$networks
~~~

~~~
##  [1] "32" "33" "18" "19" "20" "21" "22" "23" "24" "25" "26" "27" "28" "29"
## [15] "30" "31"
~~~


Now, this dataset has a lot of networks. So we'll do to things. First, we will get a list of all network objects, because they have the metadata we need:


~~~r
Networks <- alply(Dataset$networks, 1, function(x) getNetwork(api, x))
Networks[[1]]$latitude
~~~

~~~
## [1] 1.651
~~~


Next, we will call the `network_as_graph` function to get all the interactions, and associated informations on the taxa. We will also convert these graphs into matrices, because that will be easier for some of the next steps.


~~~r
Graphs <- llply(Networks, function(x) network_as_graph(api, x$id))
names(Graphs) <- laply(Networks, function(x) x$name)
Matrices <- llply(Graphs, get.adjacency, sparse = FALSE)
~~~


Let's now get a table with the sites spatial coordinates:


~~~r
Coord <- ldply(Networks, function(x) c(name = x$name, lon = x$longitude, lat = x$latitude))
rownames(Coord) <- Coord$name
Coord <- Coord[, c("lat", "lon")]
Coord$lat <- as.numeric(Coord$lat)
Coord$lon <- as.numeric(Coord$lon)
head(Coord)
~~~

~~~
##                 lat   lon
## Tanjung Kopi  1.651 124.7
## Tanjung Pisok 1.578 124.8
## bahowo        1.585 124.8
## Kampung Bajo  1.608 124.9
## Batu Kapal    1.788 124.8
## Bualo         1.616 124.7
~~~


Good!

Almost final steps, let's (i) get the list of species in each site, (ii) make a community matrix from this, and (iii) calculate the center of mass of each species based on its occurence in each of the 16 locations.


~~~r
# Get the list of species
sp_by_site <- llply(Graphs, function(x) unlist(V(x)$name))
sp_list <- unique(unlist(sp_by_site))

# Species-by-site matrix
M <- matrix(0, ncol = length(sp_list), nrow = length(sp_by_site))
colnames(M) <- sp_list
rownames(M) <- names(sp_by_site)
for (site in c(1:length(sp_by_site))) M[names(sp_by_site)[site], sp_by_site[[site]]] = 1

# Get the center of mass for each species
sp_center <- adply(M, 2, function(x) colMeans(Coord[names(x)[x > 0], ]))
rownames(sp_center) <- sp_center[, 1]
sp_center <- sp_center[, -1]
head(sp_center)
~~~

~~~
##                           lat   lon
## Entacmaea quadricolor   1.599 124.8
## Heteractis aurora       1.677 124.8
## Heteractis crispa       1.614 124.8
## Stichodactyla mertensii 1.625 124.8
## Heteractis magnifica    1.601 124.8
## Amphiprion melanopus    1.620 124.7
~~~


Finally, we use the `metaweb` function from `betalink` to get the regional network, as an `igraph` graph:


~~~r
Mw <- graph.adjacency(metaweb(Matrices)$web)
~~~


And now, we'll use the `RgoogleMaps` package to plot a map, and overlay the spatialized network on top:


~~~r
# But first we need this function to convert spatial coordinates
ll_to_gm <- function(Map, ll) {
    # Lat. conversion
    lat <- ll$lat
    lat <- lat - Map$lat.center
    lat <- lat/(Map$BBOX$ur[, "lat"] - Map$BBOX$ll[, "lat"])
    lat <- lat * 640
    # Lat. conversion
    lon <- ll$lon
    lon <- lon - Map$lon.center
    lon <- lon/(Map$BBOX$ur[, "lon"] - Map$BBOX$ll[, "lon"])
    lon <- lon * 640
    ## Return matrix
    return(cbind(lon, lat))
}
# Plot a map
center_point <- colMeans(sp_center)
Map <- GetMap(center = center_point, zoom = 11, SCALE = 1)
par(pty = "s")
colors <- c(brewer.pal(9, "Set1"), brewer.pal(8, "Set2"))
PlotOnStaticMap(Map)
plot(Mw, layout = jitter(ll_to_gm(Map, sp_center), amount = 10), rescale = FALSE,
    add = TRUE, vertex.size = 600, vertex.label = NA, vertex.color = colors,
    edge.arrow.size = 0.25, edge.color = 1)
legend("bottomleft", fill = colors, legend = V(Mw)$name, inset = 0.02, cex = 0.7,
    bty = "n")
~~~

![plot of chunk mangal_make_map_network](/rfig/mangal_make_map_network.png)


And here we are! It might not be the best-looking graph ever, but I was fairly surprised that it was so easy to produce.

# Use-case 2: network &beta;-diversity

For use-case number two, I will use the functions in `betalink` to do a quick illustration of how network &beta;-diversity depends on the distance between two networks. In the first use case, we have created a `Matrices` objects, which is a list of matrices. So we can simply do:


~~~r
bdiv <- betalink.dist(Matrices)
~~~


We'll add the spatial distance between sites, using a function from the `sp`:


~~~r
GeoDist <- spDists(as.matrix(Coord), longlat = TRUE)
colnames(GeoDist) <- rownames(GeoDist) <- rownames(Coord)
bdiv$Space <- as.dist(GeoDist)
~~~


And now, some plots:


~~~r
par(mfcol = c(1, 2))
with(bdiv, {
    plot(Space, WN, pch = 19, xlab = "Distance (in km.)", ylab = "Network dissim. (all species)")
    plot(Space, OS, pch = 19, xlab = "Distance (in km.)", ylab = "Network dissim. (common species)")
})
~~~

![plot of chunk betadiv_rmangal_plots](/rfig/betadiv_rmangal_plots.png)


And here is a cool new mini-result: the dissimilarity of networks increases with distance overal, but not when you only account for the species which are shared between two locations.

# Use-case 3: link-species relationships

Let's end with a more classical example: in this system, what is the relationship between number of species (S), and number of interactions (L)? This information is super easy to get with a little bit of `plyr` magic:


~~~r
LS <- ldply(Graphs, function(x) c(S = length(V(x)), L = length(E(x))))
head(LS)
~~~

~~~
##             .id  S  L
## 1  Tanjung Kopi 10  8
## 2 Tanjung Pisok  9  7
## 3        bahowo 11 10
## 4  Kampung Bajo  6  4
## 5    Batu Kapal  5  4
## 6         Bualo  9  8
~~~


The only thing left is to plot this table:


~~~r
plot(LS[, c(2, 3)], log = "xy", xlab = "Species", ylab = "Links", pch = 19)
~~~

![plot of chunk mangal_demo_ls.png](/rfig/mangal_demo_ls_png.png)


We find the expect positive, log/log relationship. And it only required three lines of code!

# To conclude

These three use cases are (I think) good examples of what can be done with the `rmangal` package. I'll refine them a little bit to add in the paper. If you have nay any suggestions, that would be greatly appreciated as well!

[p1]: http://timotheepoisot.fr/2014/01/07/mangal-database-networks/
[p2]: http://timotheepoisot.fr/2014/01/08/mangal-add-data/
[taxphyl]: http://ropensci.org/usecases/taxize_makephylo.html
[od]: http://www.nceas.ucsb.edu/interactionweb/html/ricciardi-et-al-2010.html
