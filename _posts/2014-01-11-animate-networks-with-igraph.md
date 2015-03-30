---
title: Animate networks with igraph
author: Tim
type: note
layout: post
tags:
- R
- igraph
- networks
---

The `igraph` package in `R` is a good solution to manipulate networks. A
few days ago, I had to produce an animated figure for a paper, and I really
wanted to use `igraph` to do it. As it turns out, it's not overly complicated
(you need to have `imagemagick` installed, though.

So as to provide a quick visualisation, let's start with a simple dynamical
model of a diamond food web (one primary producer, two consumers, one top
predator, classic stuff). The "usual" way to represent the dynamics of biomass
is to have four time series. The "captivating" way (good for talks!) is to
animate the network, with each node size being proportional to its biomass
at any time.


~~~r
library(igraph)
library(simecol)

# A simple LV diamond food web model
glv <- function(time, init, parms) {
    N <- init
    with(as.list(parms), {
        d1 = N[1] * (rp - (a1p * N[2] + a2p * N[3]))
        d2 = N[2] * (rc + a1p * N[1] - ap1 * N[4])
        d3 = N[3] * (rc + a2p * N[1] - ap2 * N[4])
        d4 = N[4] * (rt + ap1 * N[3] + ap1 * N[2])
        return(list(c(d1, d2, d3, d4)))
    })
}

# Some default parameters
params <- c(rp = 1.1, rc = -0.2, rt = -0.6, a1p = 0.8, a2p = 0.4, ap1 = 0.21, 
    ap2 = 0.12)
init <- c(10, 4, 3, 5)
times <- seq(from = 0, to = 50, length = 300)

# And the simulations...
output <- ode(init, times, func = glv, parms = params)
~~~


Nevermind that the parameters aren't realistic at all, it's not what matters
for this example. At this point, we have a simulation running for 50 timesteps,
with a total of 300 points. Now, let's build a graph:


~~~r
adjacency <- matrix(c(0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0), 4, 4)
diamond <- graph.adjacency(adjacency)
layout <- layout.fruchterman.reingold(diamond)
~~~


We can start building a loop to create all networks for each time. The trick is
that `igraph` accepts vectors for allmost all edges and vertex attributes. It
can be used to change the color, size, label, etc. An important point is that,
by default, the layout of each plot is scaled and center. But in our case,
it's important that it's fixed for all plots, so we'll just need to add
`rescale = FALSE`, and give explicit `xlim` and `ylim`; this way, the center
of each vertex is always at the same position.



~~~r
# We'll make sure that the maximal biomass is not too big
MaxBio <- max(output[, -1])
png(file = "biomass_%04d.png", width = 300, height = 300)

for (i in c(1:nrow(output))) {
    Biomass <- output[i, -1]
    plot(diamond, layout = layout, vertex.size = 10 * Biomass, rescale = FALSE, 
        xlim = range(layout[, 1]), ylim = range(layout[, 2]))
}
dev.off()

# The we use ImageMagick to convert all images to a gif file
system("convert -delay 5 biomass_*.png animation_biomass.gif")
# And remove the images
file.remove(list.files(pattern = "biomass_"))
~~~


And here is the result:

![Animation](/rfig/animation_biomass.gif)

Clearly it's not extremely good looking, but it can help show the dynamics
of networks. An interesting thing is that you can also *hide* some edges or
vertices, so it's possible to show temporal dynamics.
