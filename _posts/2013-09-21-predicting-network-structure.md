---
type: paper
layout: post
author: Tim
title: Inferring the structure of food webs
tags:
- ecological networks
- species interactions
- statistics
---

We've just published a paper in *Methods in Ecology and Evolution*, about the
[inference of food web structure based on species trait data][abs]. That's
a seriously cool result (we think). There is a serious challenge when you work
with food webs: you need to know which species are interacting, and to do so,
you need to observed interactions in the fields. It's challenging, because
it must be done extensively, so as not to miss interactions.

But on the other hand, there are well described relationships between traits of
interacting species. In the particular case of food webs, notably, there is
a log-log relationship between the body size of a predator and the body size of
its prey. The existence of this relationship can be used to, given
a distribution of body sizes, predict the interactions within a species
assemblage.

So what we have been doing, is designing a statistical method to, given a list
of species and body size, callibrate a model of food web structure, to predict
the interactions. As we discuss in the paper, the more traits you put in your
prediction, the better it will get. Using a dataset of fishes, we generated
a convicing network using only body size and bathymetry.

We think this result is cool, because by opposition to the "observational"
method of constructing food webs, you only need to know (well) a small number
of interactions. As we show in the paper, whenever you have a high R² of the
trait-trait-interaction relationship, the infered network is close to the
observed one. These methods can therefore allow to generate rough estimates of network structure.

Interestingly, they will also help in the generation of predictions. As we
illustrate in the paper, we can tweak the body size distribution, and see how
much the network structure changes. For example, this can help simulate the
effect of body size decrease through over-fishing, or the extinction of the
larger species. There is still a bit of work to do to be able to predict the
structure of other types of networks, but it was definitely comforting to see
that, even with straightforward statistics, we were able to achieve it.

[abs]: http://onlinelibrary.wiley.com/doi/10.1111/2041-210X.12103/abstract
