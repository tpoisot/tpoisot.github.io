---
title: Understanding the variation of species interactions
author: Tim
type: paper
layout: post
tags:
- species interactions
- beta-diversity
---

I spent most of the last two years thinking about *why* species interaction
vary over time and space. The trouble is that, even though we have some
methodological tools, and some interesting observations, we lack a solid
framework to make sense of it all. So we (I, [Daniel Stouffer][danb] and
[Dominique Gravel][dom]) started thinking about the mechanisms involved
in the variation of species interactions. The paper is now available [as
a preprint][preprint] on *bioRxiV* (the upload process is really smooth,
by the way), and will be submitted shortly.

Interestingly, understanding why species interactions vary require that we focus
on *populations*, rather than *species*. Most of our argument is that
interactions vary because (i) local abundances change, and (ii) there is local
variation in traits distributions. And so inferences at the level of the species
(such as we made [using body size in food webs][bs]) will give you an idea of
what *can* happen (regionally), but the observed interactions (locally) will
likely be different. The important point is that, assuming we want to predict
ecosystem properties from network structure, it's not really wise to *assume*
that interactions happen, because whether they will happen or not depends,
again, on local conditions.

[bs]: http://dx.doi.org/10.1111/2041-210X.12103

So whereas the "current" view of interaction networks is *a matrix of 0s
and 1s telling whether two species interact*, it would make sense that we
think about these networks in terms of probability that the interaction
will happen. The interesting thing is that once everything is put together,
we are left with something that is close to a predictive framework:

$$P(i \rightarrow j) \propto \mathcal{T}(i,j) \times \mathcal{N}(i, j) + \epsilon$$

, or in other words, the probability that *i* and *j* interact depends
on their traits (*T*) and local abundances (*N*). With a good assumption
about the shape of the *T* and *N* functions, which can be informed by some
observations in the field, then it should be possible to extrapolate the
probability than any pair of species will interact.

As we discuss at length in the paper, this has some nice implications for
a very active line of research in biogeography, which seeks to integrate
species interactions into predictive models of species distribution. So if
you want to read more, here is the abstract, and the [full text][preprint]
is available online:

> Community ecology is tasked with the considerable challenge of predicting the
structure, and properties, of emerging ecosystems. It requires the ability to
understand how and why species interact, as this will allow the development
of mechanism-based predictive models, and as such to better characterize
how ecological mechanisms act locally on the existence of inter-specific
interactions. Here we argue that the current conceptualization of species
interaction networks is ill-suited for this task. Instead, we propose that
future research must start to account for the intrinsic variability of
interaction networks. This can be accomplished simply by recognizing that
there exists intra-specific variability, in traits or properties related
to the establishment of species interactions. By shifting the scale towards
population-based processes, we show that this new approach will improve our
predictive ability and mechanistic understanding of how species interact
over biogeographical scales.


[danb]: http://www.stoufferlab.org/people/stouffer/
[dom]: http://chaire-eec.uqar.ca/
[preprint]: http://biorxiv.org/content/early/2014/01/03/001677
