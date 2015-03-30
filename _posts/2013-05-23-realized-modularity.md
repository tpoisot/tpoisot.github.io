---
author: Tim
layout: post
title: Measuring realized network modularity
type: preprint
tags:
- ecological networks
---

A paper describing how to measure [realized network modularity](http://f1000research.com/articles/2-130/v1) just appeared online at *F1000 Research*. It's currently waiting for reviewers. This is a short methodological note, to "solve" a problem I had when presenting the ouput of modularity analyses. Most of the time,  the values you get are between 0 and 1, but they are fairly difficult to make sense of. They're not probabilities that the network is different. They're statistics to some extent, but it's not clear what a critical value should be.

I simply propose to count the number of links established by species from the same module, and by species from different modules. This give a very simple measure to understand: a network with a *realized* modularity of 1 has no links between species from different modules. The other interesting thing is that you can use this measure as an *a posteriori* criteria to decide which community partition to use, which can be useful when deciding on which module detection method you should pick.
