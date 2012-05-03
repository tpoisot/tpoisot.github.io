---
layout: post
title: Phylogeny without a sequencer
summary: blog
chapo: Some ideas about the reconstruction of phylogenies with no sequencing involved
author: Tim
type: note
tags:
- phylogeny
---

In the last issue of tree, [Poole and colleagues](http://www.sciencedirect.com/science/article/pii/S0169534712000730) talk about *Ecosystomics*, or the use of molecular data in ecology. If the subject is interesting to you, I recommend the reading of [a recent paper by Nico Mouquet and colleagues](http://www.ncbi.nlm.nih.gov/pubmed/22432924) about *Ecophylogenetics*. But I'm not going to discuss the science in these papers. Rather, I would like to share some methodological / technical insights related to these questions.

At times, one would like to re-analyze old data and add the phylogeny. If you don't see why you would want to do this, go read the excellent paper in *Ecol. Lett.* by [Scott Chamberlain and colleagues](http://onlinelibrary.wiley.com/doi/10.1111/j.1461-0248.2012.01776.x/abstract), right now, I'll wait. Done? Great. The problem with old (meaning, coming from other people) data is that they may not have been taken in association with sequencing. Or they may date from a time were sequencing was not even a thing — which is perhaps a difficult concept to grasp for the young crowd, but I remember a time when publishing one new genome was actually an exciting event concretizing years of hard work. I disgress. The fact is that sometimes, you don't have these precious sequences on which to build a phylogeny.

All hope is not lost, though, because you may be lucky enough to reconstruct a phylogeny.

GENBANK

DATA CURATION

I personally use [*Geneious*](http://www.geneious.com/) for its ability to search GenBank in an easy way (I'm a huge geek, but managing hundreds of sequences in text files is too much for me).

PROBLEMS WITH TAXONOMY

SUPER TREES

And finally, there is a more general problem related to training. I know some people who think that getting a phylogeny is as easy as doing an [NJ](http://en.wikipedia.org/wiki/Neighbor_joining) tree on the pairwise distances between sequences. You push a button, and here comes your tree. It is not, and nothing annoys me quite as that. The problem is similar to one encountered in statistics: with properly formated data, every test will give you a statistic and a p-value. Which may very well mean nothing if this is the right test. For a crash course, you can read this [really good review in *Nat Rev Gen*](http://www.nature.com/doifinder/10.1038/nrg3186), but nothing beats reading a good handbook on the subject — or finding someone trained in this, who will be more than happy to help you.