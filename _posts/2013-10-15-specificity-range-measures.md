---
author: Tim
layout: post
title: An additive partition of species-level specificity
type: note
tags:
- specificity
- methodology
- metrics
- open lab book
---

A while ago, we published a paper in *Methods in Ecology & Evolution*,
[comparing different ways to estimate ecological
specificity](http://timotheepoisot.fr/2012/01/19/measuring-ecological-specificity/)
on binary (presence/absence) and quantitative data. All the measures we
review, and the one we introduce, work in the same way: for an organism,
species, population, you have an array **P** of its performances across *R*
different environments, which is (1) sorted decreasingly, and (2) ranged so
that **P**[1] = 1. In this paper, we recommend to use either *RR* (which is
a modification of Schoener's generality), and *PDI* (which is first
formally introduced in this paper), which measures how fast
performance decreases when you move away from the optimal environment
(the faster it decays, the more specialized you are).

The main advantage of *PDI* is that it relates extremely well to the
*definition* of what specificity is: a rapid decay of performance on resources
which are not your own optimum (regardless of the *absolute* performance on
this optimal resource, which is why we set **P**[1] = 1). *PDI* is
nothing more that the sum of performance lost by not being on the optimal
resource, divided by the number of non-optimal resources. Somewhere in the end
of the paper, we write that when the data are binary, *RR* and *PDI* are
equivalent. For some reason that still eludes me, the demonstration did not
make its way in the final version of the paper. So let's start with it. First,
for an organism of which the performances are measured in *R*
environments, of which it has a performance higher than 0 in *r*, we
define *RR* as

$$RR = \frac{R-r}{R-1}$$

and *PDI* as

$$PDI = \frac{\sum_{i=2}(\mathbf{P}_1-\mathbf{P}_i)}{R-1}$$

It's easy to prove that if all values of **P** are either 0 or 1, then *PDI*
= *RR*. In this situation, the species in question has *r* times 1 in **P**,
and *R-r* times 0 in **P**. In other words, for the first *r* elements of
**P**, **P**[1]-**P**[i] = 0, and for the remaining (*R-r*) elements,
**P**[1]-**P**[i] = 1. The numerator of *PDI* is thus *R-r*, so the
expression of *PDI* is the same as the expression of *RR*.

Previously, we and others discussed the fact that specificity ought to be
separated in its "interactions" and "impacts" components, *i.e.* (i) how many
resources do I exploit, and (ii) how are my performances distributed. With *RR*
and *PDI*, it might seem that we have the adequate tool to measure both sides
of the specificity. There's more to do with these measures, though. Because
*RR* is included in *PDI* (it's easy to show that *PDI* &geq; *RR*), *PDI*
also measures an "association" component of specificity. But then again, the
specificity of impact makes sense if you first consider the specificity of
associations before. So we can start thinking of this problem as an additive
partition of specificity:

Specificity = associations + impacts

Luckily, we know that *RR* measures the specificity of associations, and the
impacts are accounted for by *PDI*, so in measurable terms, the above becomes

*PDI* = *RR* + *I*

This additive partition makes sense, because if you go back to the
demonstration of *PDI = RR*, it's straightforward that whenever performances
are different across resources, the first *r* elements of **P**[1]-**P**[i]
will be *greater* than 0, so the numerator will be *greater* than *R-r*, so
*PDI* will be superior or equal to *RR*. How much greater it will be is the
importance of different performances on specificity. Or in other words, when
you do not have informations to measure specificity of impacts, all of the
specificity is because of associations.

Now what? Well, we can start measuring how much of the total specificity
(*PDI*) is due to specificity of associations only (*RR*/*PDI*), and how much
is due to specificity of impacts only (*I*/*PDI*). As far as I can tell,
the couple *PDI*-*RR* is the only pair of measures that allow to do that
(though there are other approaches) in a context where you can show that one
measure is a component of the other.  Here is a `R` function to do it using the
`ESM` package ([from R-Forge](https://r-forge.r-project.org/R/?group_id=593)).

``` r
library(ESM)

sap = function(P)
{
   Spe = pdi(P)
   Ass = rr(P)
   Imp = Spe - Ass
   return(list(
      specificity  = Spe,
      associations = Ass,
      impacts      = Imp,
      assoc_rel    = Ass / Spe,
      impac_rel    = Imp / Spe
      ))
}
```

Let's do some simple examples, and contrast to species with the same number of
resources, but a very high performance on resource 2, or a very low performance
on resource 3:


```
> unlist(sap(c(1,0.999,0)))
  specificity associations      impacts    assoc_rel    impac_rel
  0.500500000  0.500000000  0.000500000  0.999000999  0.000999001
> unlist(sap(c(1,0.001,0)))
  specificity associations      impacts    assoc_rel    impac_rel
  0.9995000    0.5000000    0.4995000    0.5002501    0.4997499
```

In the second example, because the performance on the second resource is much
almost zero, the *RR* and *I* components are almost as important to understand
specificity (whereas it's not the case in the first example, wherein you can
assume that **P**[2] = 1 without changing the big picture.
