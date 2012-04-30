---
layout: post
title: 'New paper: measuring ecological specificity'
summary: blog
chapo: A new paper about different measures of ecological specificity, with a R package to perform them.
author: Tim
tags:
- specificity
- new paper
- open source
---

Our paper about measurements of ecological specialization is now available online at the [Methods in Ecology & Evolution](http://onlinelibrary.wiley.com/doi/10.1111/j.2041-210X.2011.00174.x/abstract) website. You can also download the associated R package from [R-Forge](https://r-forge.r-project.org/projects/esm/). As a side note, it is during the conception and redaction of this paper that I started thinking more and more about networks, something which is now occupying a significant part of my time, so I have my co-authors to thank for that.

Early during my thesis, in between watching episodes of *The Big Bang Theory*, I was wondering how we can best measure ecological specialization of parasites, knowing that we would work with very different data sources (field samples, lab systems, and models). After a quick survey of the literature, (i) it was clear that many people developed their own measure of specificity, and (ii) it was not clear what the assumptions of some of these measures were. This appeared to us as the potential for a methodological paper.

So we went back to basics, and thought about what specificity is.  In [a previous paper](http://www.ncbi.nlm.nih.gov/pubmed/21699641), we defined it as «displaying differential adaptation to a subset of suitable environments. Whereas specialisation refers to the process or tendency of change, specificity is the state of adaptation to environments at any given time or place». Ideally, a good measure of specificity would match this definition, as for example the [NODF](http://onlinelibrary.wiley.com/doi/10.1111/j.0030-1299.2008.16644.x/full) measure does for nestedness. This is with this definition in mind that we conceived the *Paired Differences Index*; the reasoning behind it is really simple, it measures how fast performance decreases when an organism is moved away from its optimal resource.

What we've done, is that we examined how different measures of specificity behave with regard to two important informations: (i) the thoroughness of sampling, and (ii) the distribution of links between species that exploit, and resources that are exploited (which is related to the structure of the interaction network). In a nutshell, we found that *d'* and *PDI* were highly robust, but only the later is highly informative. So, problem solved? Not really. *PDI* is super good at situating species along a continuum of specificity, with the interesting property of returning a value of 0.5 (neither specialist nor generalist) when the performances decrease linearly. But as shown in the figure 1 (reproduced below), it tends to saturate with really high degree of specialization. Other measures, such as *CoV*, are less affected by this.

![Figure1][fig1]
[fig1]: {{ site.url }}/images/pdi_fig1.png  "Figure 1"

We conclude by providing the following recommendations:

> In conclusion, based on our evaluations, we encourage researchers to make use of RR to estimate the specificity of associations (i.e. Schoener’s generality) and PDI to estimate the specificity of impacts (i.e. the skewness of the link strength distribution), with the possibility to use other measures to detect fine-scale variation in specificity among highly specialized species. Previous literature has established that quantitative information on link strength is not necessary for some problems, and in these cases, PDI and RR are equivalent.

The measures described in this paper can be done using the `ESM` package mentioned above. Given an object `web` with focal species as rows, you can calculate the specificity using *PDI* and *RR* with the following commands:

{% highlight splus %}
library(ESM)

spe_pdi = getspe(web,pdi)
spe_rr = getspe(web,rr)

plot(spe_pdi,spe_rr)
{% endhighlight %}

The code is also being ported to Python and MatLab, but more on that later...

For the record, the code for this paper was developed entirely in R. The simulation of incomplete sampling took forever (a couple of days), because I was too lazy to write a parallel version of it (that, and it's basically a mess of nested for statements). The network generation routine is based on the same logic that something published by [Scott Chamberlain](http://schamberlain.github.com/2011/01/ecological-networks-from-abundance/), if you have any interest in doing such things.