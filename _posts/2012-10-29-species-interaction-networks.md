---
layout: post
title: Should we care about species interaction networks?
author: Tim
type: essay
tags:
- ecological networks
- species interactions
- ecological theory
- scale of organization
- open lab book
---

In June, I was invited to give a talk at the [*Web of Life* meeting in Montpellier](http://www.weblife.univ-montp2.fr/). It was a really exciting event, where we discussed recent results on species interaction networks, and how we can use these networks to address the impact of global changes on communities and ecosystems. I presented some (still unpublished) results about how co-evolution and meta-community processes can lead to networks having a really complex structure. In parallel, I was working on [our recent paper about the &beta;-diversity of interaction networks](http://timotheepoisot.fr/2012/09/20/beta-diversity-networks/), where we show that species and their interactions are locally sorted through different mechanisms.

<div class="alert alert-info">
<h4>Warning!</h4>
This post is inspired by the introduction of an opinion/forum paper I'm currently writing. Your impressions and comments are thus very welcome. The post is also quite probably boring if you're not into ecological networks.
</div>

I've been discussing these results with a few people, and one of the questions that kept coming back is «but did you expect species and interactions to be sorted by the same mechanisms?». I did not. But perhaps we often imply this when working with species interaction networks, and perhaps this assumption leads us to study some processes at the wrong scale. A network (*e.g.* food web) gives you, for a list of species, their interactions. To put this another way, it tells you that species *B*, but not species *C* is within the potential niche of species *A*. In short, and especially if you infer the structure of this network from traits, or expert knowledge, you will describe interactions among species, which are *potential* interactions. When you go in the field, and record interactions between populations of these species, you will sample the *realized* interactions.

Not making a difference between *species*-level and *populations*-level is what you can call an [epistemological obstacle](http://en.wikipedia.org/wiki/Gaston_Bachelard). My opinion is that it's important to separate the two levels of organization, as they give us different informations. Let's start with the obvious: I'll quote straight from the introduction of [*Ecological networks: linking structure to dynamics in food webs*](http://www.oup.com/us/catalog/general/subject/LifeSciences/EvolutionaryBiology/?view=usa&sf=toc&ci=9780195188165):

> The interactions between species on different trophic (feeding) levels underlie the flow of energy and biomass in ecosystems [...] (p. 3)

It's hard to argue with this, and it should be noted that it's the basic idea behind papers linking food web structure to ecosystem functioning. And with a few minor alterations, this assertion also holds for other types of interactions. Let's put it another way: interactions between species affect their growth and persistance. I could have found something more precise, but you get the idea. And so, what is the problem? If you know that species *A* consumes species *B*, and you go in the field at site *1*, observe populations *A1* and *B1*, what can you tell? Well, not much. What affects the *local* flow of biomass, or growth, or whatever, is the *realized* interaction between two *populations*. The *potential* interaction between two *species* only tells you that this interaction can happen. See the epistemological obstacle right here? Because we know two species *can* interact, do not mean they *will*.

The point is, if we use networks to assess the robustness, stability, etc, of ecosystems, which information is required? Is it the potential network, or is the realized one? In the terms of our previous paper, do we care about the *metaweb* or its *realizations*? I have no answer to this question, but let's move on. In a perfect world, we would not care, because everything which is potential will become realized. In short, there will be no need to make a difference between species and population level networks, because interactions would be highly consistent. How perfect is the world? If you look at the data we presented in our &beta;-link paper, not a lot. It was really rare to find a realization in which all potential interactions were found (the one for which it occured were of really small size). This really strongly implies that species and their interactions respond to different environmental filters.

But is that a problem? Yes &ndash; or rather, the fact that we don't know if it is a problem, is a problem in itself. Most of the data available (in terms of spatially replicated interaction networks) do not allow us to answer this question. Look at the Adirondack metaweb compiled by [Karl Havens](http://www.sciencemag.org/content/257/5073/1107), for example. In this dataset, you have the potential interactions across all species, and a list of species for 50 lakes. In short, it describes a regional web, and we can extract the potential local webs. Not the realized ones, which would require much more sampling and direct observations, rather than litterature surveys. Can this affect the conclusions? Let's look at the final sentence of the abstract:

>  In contrast, the number of links per species increased fourfold over the range of species number, suggesting that the link-species scaling law, defined on the basis of aggregated webs, does not reflect a real ecological trend.

Well... What if not all potential links are realized? What if there is a cap on the number of partners, *i.e.* a maximum number of species you can interact with *locally*? What if the number of effective prey items is inferior to the number of potential preys found localy? If each predator has a maximal number of prey items, at each site, then the result that the link-species scaling law is not a real trend may not hold. And for this reason, studies of networks looking only at the presence/absence of species, and infering links from previous knowledge, rather than sampling at each studied site, risk to be severaly misleading.

[TL;DR](http://en.wikipedia.org/wiki/Wikipedia:Too_long;_didn%27t_read): I'm starting to develop the opinion that looking at *species* interaction networks is risky when your interest is to explain local properties of the community. Switching from species to population level will require much more sampling effort, and will probably slow down the accumulation of data a bit, but on the other hand, it comes with several advantages. First, it will improve our ability to better understand network variation from place to place (or from time to time). Second, it will help making *explicit* links between (local) interaction structure and (local) ecosystem properties. And last but not least, it's probably the only path to a biogeography of species interactions anyway...
