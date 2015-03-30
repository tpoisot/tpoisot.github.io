---
layout: post
title: The beta-diversity of species interaction networks
author: Tim
type: paper
tags:
- beta-diversity
- biogeography
- ecological networks
---

Have you ever sampled interaction networks, and wished there were a good method to measure how dissimilar they are? Or have you ever thought about &beta;-diversity of species interactions? Do you just love good science? If you answered yes to any of these questions, then [you should read our *Ecology Letters* paper, now online](http://onlinelibrary.wiley.com/doi/10.1111/ele.12002/abstract). We propose a way to measure the &beta;-diversity of networks (any kind of network, unipartite, bipartite, quantitative, ...), and propose some ideas about what we can learn from thinking about these networks in a biogeographical perspective.

When you think about networks over space, it is important to make a distinction between what occurs at the regional and the local level. In short, what happens at the regional level is potential, and the local observation is realized. Species sorting is hardly a groundbreaking idea in ecology, but perhaps we should think more about interactions sorting. Not because two species that can interact co-occur at one site mean that they will interact at this site. In our paper, we propose that the regional pool of species and their interactions be called a *metaweb*, and what is effectively realized locally be called a *realization*. These are two key levels of interpretation to understand the &beta;-diversity of networks.

![Figure1 - the metaweb]({{ site.url }}/images/metaweb.png)

What we propose in our paper is two-fold. First, we lay out a methodological framework to measure how realizations differ between them. Second, we think about what we can learn from these methods, in terms of networks biogeography. I'll go shortly over these two aspects in turn. There is an extensive litterature on &beta;-diversity of species composition, which was begging to be adapted to networks. Formally, any set of interactions is a group of two objects, the nodes (species) and the edges (their interactions). Measuring species &beta;-diversity is easy. Measuring &beta;-diversity of interactions is not. The problem is that in order to have an interaction, you have to have two species present. So the &beta;-diversity of interactions is really contingented by the species &beta;-diversity.

Let's be naïve for a moment. We can simply treat each interaction as an item, which can be shared, or unique, across two sites (we propose a multi-site extension in the paper, but more on that later). This will give us a *whole-network dissimilarity*, &beta;<sub>WN</sub>. This, obviously is positively correlated with the *species dissimilarity*, &beta;<sub>S</sub>. But because interactions for which not all species co-occur cannot be compared, we can extract the "common denominator" for both networks, *i.e.* only the interactions between species present at both sites. We call this the *overlapping species dissimilarity*, &beta;<sub>OS</sub>. If you want to measure this on your own data, go download the [`betalink`](https://github.com/tpoisot/betalink) package for R (see the wiki for a quickstart, and use the Issues page for help). But this paper is not a methods paper, so I'll put another post online this week to explain how to do the analyses.

The interesting point is that &beta;<sub>S</sub> and &beta;<sub>OS</sub> show no correlation. We can go into some details about what it means, but to be short: species and their interactions are locally sorted by different mechanisms. I will repeat the last slide of my [Evolution2012](http://www.confersense.ca/Evolution2012/) presentation: because we can measure a &beta;-diversity of interactions means that we *can* develop a biogeographic theory for their occurence; because the &beta;-diversity of interactions is not the same that the &beta;-diversity of species mean that we *should* develop this theory. So how much closer does this paper leaves us from this theory?

![Figure2 - interactions and species sorting]({{ site.url }}/images/IntSpSorting.png)

Quoting from the last paragraph:

> [F]urther understanding of the processes acting on network structure through space is contingent upon our ability to gather sufficient high-quality data. While it is now easy, and tempting, to build on recent theoretical studies to speculate about what a biogeographical theory of species interaction would look like, it is our opinion that this reasoning would be better grounded in data. [G]athering enough networks to adequately describe the metaweb is a difficult task, and assuming that species co-occurence is enough for an interaction to happen is not a sufficient sampling strategy. For this reason, we think it is time for the community of ecologists interested in interaction networks to engage in a discussion about the best way to gather data from the field, as this will pave the way to a biogeographical theory of species interactions.

In short, and this was (kind of) the conclusion of my Ottawa talk, we need more data. At this point, it's easy to do models, and to further speculate on which mechanisms will act. But there are only few datasets on which we can *test* this speculation, making it a little bit vain. More importantly, we need *better* (more suited) data. Replication of the same metaweb in space, or time; rich information about the environmental conditions; actual measurement of wether populations locally interact or not; just to name a few. The excellent theoretical work that was done in the last few years is far from useless, but until we go back to the field (or design clever experiments in microcosms...), my impression is that it will not be as beneficial as it should be.
