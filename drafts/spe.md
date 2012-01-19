---
layout: post
title: Measuring ecological specificity
summary: A new paper about different measures of ecological specificity, with a companion R package.
author: Tim
tags:
- specificity
- new paper
- open source
---

Our paper about measurements of ecological specialization is now available online at the [Methods in Ecology & Evolution]() website. You can also download the associated R package from R-Forge. This paper is mostly methodological, so I'll go into some technical stuff below. But before, some background.

Early during my thesis, we wondered how we can best measure ecological specialization of parasites, knowing that we would work with very different data sources (field and lab systems, and models). After a quick survey of the literature, (i) it was clear that many people developed their own measure of specificity, and (ii) it was not clear what the assumptions of some of these measures were. This appeared to us as the potential for a methodological paper.

What we've done, is that we examined how different measures of specificity behave with regard to two important informations: (i) the thoroughness of sampling, and (ii) the distribution of links between species that exploit, and resources that are exploited (which is related to the structure of the interaction network). As a side note, it is during the conception and redaction of this paper that I started thinking more and more about networks, so I have my co-authors to thank for that.

In a nutshell, we found out that

One advantage of the PDI is that we conceived it with a precise definition of specificity in mind, so that it matches an ecological reality.

If you want to do the

For the record, the code for this paper was developed entirely in R. The simulation of incomplete sampling took forever (a couple of days), because I was too lazy to write a parallel version of it (that, and it's basically a mess of nested for statements). The network generation routine is based on the same logic that something published by [Scott Chamberlain](http://r-ecology.blogspot.com/2011/01/ecological-networks-from-abundance.html), if you have any interest in doing such things.