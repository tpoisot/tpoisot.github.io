---
author: Tim
layout: post
title: Remove indels from blast output
type: note
tags:
- open lab book
- bioinformatics
- python
- biopython
- pyrosequencing
---

My wife recently mentionned to me that most of the errors introduced during 454 pyrosequencing were [indels rather than point mutations](http://www.retrovirology.com/content/10/1/18/abstract). It may not sound like it, but it's kind of a big deal when measuring similarity between sequences, most likely when you try to do taxonomic identification by comparing to the best match of `blast`. So to get a "reliable" estimate of the dissimilarity, a reliable strategy is most likely to remove the gaps.

As doing it by hand would be, let's say, tedious, I started looking for a `biopython` way to do it. As it turns out, despite the fact that the `biopython` documentation is cryptic and baffling at some points, it turned out to be a great over-lunch coding project.

I've put the code up as a [gist](https://gist.github.com/tpoisot/5613748). It would definitely benefit from being run in parallel (especially with millions of sequences), but if you want to quickly check out a few samples, it's not that slow (a few seconds per sequence, most of which are actually spent blasting).
