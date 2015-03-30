---
layout: post
author: Tim
title: Spatially explicit metapopulation model in R
type: note
tags:
- R
- igraph
---

One of my favorite tools to work with networks is [the `networkx` python
package] (if only because lists comprehensions make so much sense when you
work with graphs). But for teaching purposes (especially in ecology), having
purely `R`-based tools is better. The students know the language (at least
enough to get around most problems in a few hours, and so they can focus on
the theory rather than the tedious details of implementation. So I started
looking for good graph analysis tools in R.

I've read good thing (well, [good-looking code][amn], actually) about the
`igraph` package, so I decided to try it (good surprise: there are both `R`,
`python` and `C` implementations. My first two projects when I'm doing graph
things are (i) how fast can I implement Williams & Martinez *niche model*, and
(ii) how fast can I implement a spatially explicit metapopulation model. I have
folders in my computers with various versions of both in various languages.

So I decided to work on the later project. The idea is to use `igraph` to
generate a random geometric graph, and use that as the landscape over which the
metapopulation is simulated. The code is [available as a gist][code]. Coming
from `networkx`, it took some time getting used to the different approach. But
overall, `igraph` convinced me, and I'll most definitely use it when teaching
about networks in the future.

![Metapopulation mode]({{ site.url }}/images/rmetapop.png)

As a side note, the code allows to generate 3D spatial graphs. It's entirely
useless, but it's kinda cool!

[the `networkx` python package]: http://networkx.github.io/
[amn]: http://assemblingnetwork.wordpress.com/tutorials/network-basics/
[code]: https://gist.github.com/tpoisot/7547954
