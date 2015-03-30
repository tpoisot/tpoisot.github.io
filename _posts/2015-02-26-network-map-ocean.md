---
title: Plotting spatially explicit networks (in the oceans)
author: Tim
tags: R, ecological interactions
layout: post
byline: In which I come up with a so-dumb-it-might-work solution to a visualization problem.
---

One of the projects I am working on at the moment involves interactions between
marine species. We know the geographic position for each species, and their
interactions. What we wanted to come up with, is a way of showing interactions
on the map, to look at the biogeographic structure of this network. But the
thing is, because we are talking about sea-living species, it makes no sense for
the interactions to go over land. Fishes from the Pacific don't walk all the way
through South America to eat fishes from the Atlantic. Perhaps Axolotls do, and
that would be the best migration ever, but fishes don't.

So I started looking for a ready-made solution in `R`, and found none. Which
meant that I have to write my own! Let's start.

The core of the problem is that I need to draw a spline between two points, but
that spline isn't allowed to go over any land. Which is an information I can get
in `R`: with a representation of any map, I can access its polygons, then check
whether any point in *inside* the polygon. My spline isn't allowed to go through
any of these points.

First thing first, let's get a map of the world:

``` R
library(maps)
library(maptools)
library(plyr)
library(spatgraphs)
library(spatstat)

data(wrld_simpl)
```

That's a lot of packages, but I will use them all in the end. The next step is
to make a regular grid, with points *everywhere*:

``` R
# Make a grid - more points = better paths
interpoint_distance = 2
X = seq(from=-180, to=180, by=interpoint_distance)
Y = seq(from=-90, to=90, by=interpoint_distance)
G = expand.grid(x=X, y=Y)
```

Now, we can start taking each of these points, and see whether they are within a
polygon. Preliminary analyses of running time revealed that it takes
approximately forever.

``` R
library(doMC)
registerDoMC(2) # But I'm running it on my laptop
for(pol in wrld_simpl@polygons) {
  cat("Is it done yet?\n")
  for(p in pol@Polygons) {
    cat("Nope.\n")
    co = p@coords
    G = G[aaply(as.matrix(G), 1, function(x) point.in.polygon(x[1], x[2], co[,1], co[,2]) == 0, .parallel=T), ]
    cat(paste("G:", nrow(G), "\n"))
  }
}
```

Once this is done, the `G` object actually has a list of all coordinates in our
grid that are *not* within a polygon. For example, after a few polygons, this is
what it looks like:

![Map with (some) points filtered out](/images/wmap_grid.png)

The white areas are now empty of points. You can get to this plot with:

``` R
plot(wrld_simpl)
points(G, pch=3, cex=0.3, col='darkgrey')
```

And now, graph theory (don't act all surprised, you knew it was going to involve
graph theory at some point). First, we will convert the spatial coordinates into
a point pattern object. Then, we will create a spatially explicit graph, where
each point of the grid is connected to other points within a fixed distance *d*
(here being slightly larger than the diagonal of grid cells).

``` R
spp = ppp(G$x, G$y, range(G$x), range(G$y))
spg = spatgraph(spp, type="geometric", par=interpoint_distance*sqrt(2)+0.01)
```

Problem solved! To get the path of an interaction between two points, what is
needed is the shortest path between these two points on the spatially explicit
graph. This, too, takes a while, because the algorithm used is not known for its
spectacular speed on large-ish graphs.

``` R
# Any pair of points
i = 2000
j = 7600
stp = shortestPath(i, j, spg, spp)
path_coord = G[stp$path,]

plot(wrld_simpl)
points(G, pch=3, cex=0.3, col='darkgrey')
lines(smooth.spline(path_coord, df=10), lty=1, col=rgb(0, 1, 0.6, 0.5), lwd=2)
```

And here is the result:

![Map with (some) points filtered out and one interaction](/images/wmap_grid_oneint.png)

Now, there are a few tweaks and improvements to be made. Notably, the graph
construction should warp from the east border to the west one. But this serves
as a proof of concept. Now, let me find a few hundreds CPUs, and we'll see what
it looks like!
