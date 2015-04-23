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

In the last issue of *Trends Ecol. Evol.*, [Poole and colleagues](http://www.sciencedirect.com/science/article/pii/S0169534712000730) talk about *Ecosystomics*, or the use of molecular data in ecology. If the subject is interesting to you, I recommend the reading of [a recent paper by Nico Mouquet and colleagues](http://www.ncbi.nlm.nih.gov/pubmed/22432924) about *Ecophylogenetics*. But I'm not going to discuss the science in these papers. Rather, I would like to share some methodological / technical insights related to these questions.

At times, one would like to re-analyze old data and add the phylogeny. If you don't see why you would want to do this, go read the excellent paper in *Ecol. Lett.* by [Scott Chamberlain and colleagues](http://onlinelibrary.wiley.com/doi/10.1111/j.1461-0248.2012.01776.x/abstract), right now, I'll wait. Done? Great. The problem with old (meaning, coming from other people, from a previous study) data is that they may not have been taken in association with sequencing. Or they may date from a time were sequencing was not even a thing — which is perhaps a difficult concept to grasp for the young crowd, but I remember a time when publishing one new genome was actually an exciting event concretizing years of hard work. I disgress. The fact is that sometimes, you don't have these precious sequences on which to build a phylogeny, no access to the organisms, and no possibility to do the sequencing yourself.

All hope is not lost, though, because you may be lucky enough to reconstruct a phylogeny. How? By getting every possible sequence for your organisms from [*GenBank*](http://www.ncbi.nlm.nih.gov/genbank/). I'm assuming everyone is familiar with GenBank, but in a nutshell, it's a huge databse in which virtually everything ever sequenced is stored, tagged, and freely available. In their own words:

> GenBank ® is the NIH genetic sequence database, an annotated collection of all publicly available DNA sequences ( Nucleic Acids Research , 2011 Jan;39(Database issue):D32-7 ). There are approximately 126,551,501,141 bases in 135,440,924 sequence records in the traditional GenBank divisions and 191,401,393,188 bases in 62,715,288 sequence records in the WGS division as of April 2011.

Theoretically, you can get a few sequences for each of your species, and reconstruct the phylogeny. In most cases, though (especially if you happen to work with organisms which were not extensively sequenced, or with a high taxonomical diversity), you will need to integrate informations coming from several genes. This is (relatively) easy to do using [supertrees or supermatrices](http://www.ncbi.nlm.nih.gov/pubmed/15205059). The idea is that you will combine a lot of different trees together, in one global tree. [*Clann*](http://bioinf.nuim.ie/clann/) + [*PAUP*](http://paup.csit.fsu.edu/) are a good combination here.

Of course, dealing with multiple trees mean that you will need to manage a complex dataset (different genes, *i.e.* different alignments, different models, and a bunch of trees). Of course it can all be done with folders full of [`fasta`](http://en.wikipedia.org/wiki/FASTA_format) files, but it is really, really annoying for large datasets. Think about the time spent if you need to remove one sequence in a lot of different text files... I personally use [*Geneious*](http://www.geneious.com/) for its ability to search GenBank in an easy way, from a GUI. It's not a freeware, it's expensive, but the free version is good enough for sequence management. The whole process can probably be done in R, with some of the *ROpenSci* [packages](http://ropensci.org/tutorials/r-taxize-tutorial/), and a good mixture of *ape*, *ade4*, and *phangorn*. I'd like to test that when I have time.

And finally, there is a more general problem related to training. I know some people who think that getting a phylogeny is as easy as doing an [NJ](http://en.wikipedia.org/wiki/Neighbor_joining) tree on the pairwise distances between sequences. You push a button, and here comes your tree. It is not, and nothing annoys me quite as that. I'm not asking for Bayesian analysis everytime you want to produce a phylogeny, but at the very least, just go with the most complete model (GTR+I+G), let *PhyML* estimate all its parameters, and work from there. You'll probaby use a few parameters you didn't need, AIC or hLRT-wise, but at least you won't under-calibrate your model. The problem of getting trees is similar to one encountered in statistics: with properly formated data, every test will give you a statistic and a p-value, which may very well mean nothing if this is not the right test. To some extent, the problem us even worse when supertrees/matrices are involved, because it's usually not covered in intro phylogenetics courses. It's really good that a lot of ecologists are getting interested in phylogenetic studies, but it would be too bad if we end up applying extremely good methods of comparative analysis or ACE to badly infered phylogenies.

For a crash course in phylogenetics methods and concepts, you can read this [amazingly good review in *Nat. Rev. Gen.*](http://www.nature.com/doifinder/10.1038/nrg3186), but nothing beats reading a good handbook on the subject ([Felsenstein's](http://www.sinauer.com/detail.php?id=1775) comes to mind) — or finding someone trained in these, who will be more than happy to help you.