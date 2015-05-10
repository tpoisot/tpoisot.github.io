---
title: How hungry are caterpillars anyway?
author: Tim
layout: post
tags:
  - open science
  - data analysis
  - species interactions
byline: Are caterpillars "very hungry"? With open data and the right R package, this is something we can find out!
---

Proving once and for all that great minds think alike, Christie Bahlai and I
share some concerns about the Carle book, a.k.a. *The Very Hungry Caterpillar*:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">This is a terrible dataset about caterpillar diet. How did it got published? <a href="http://t.co/XkAq51HxEP">pic.twitter.com/XkAq51HxEP</a></p>&mdash; Timothée Poisot (@tpoi) <a href="https://twitter.com/tpoi/status/591041490618552320">April 23, 2015</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Hmm, I don&#39;t know about this caterpillar rearing manual. I thought P.rapae had an obligate association w/ Brassica. <a href="http://t.co/M10dqbOYlN">pic.twitter.com/M10dqbOYlN</a></p>&mdash; Christie Bahlai (@cbahlai) <a href="https://twitter.com/cbahlai/status/597462491166150656">May 10, 2015</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

So how hungry are caterpillars anyway? It's surprisingly easy to find out, and
it's a good illustration of what we can do with open data. In this post, I'll
use data from the GLOBI database @poel14, to see which of the species from the
genus *Pieris* is the very-hungriest. Because, clearly, the appropriate response
to people cracking jokes at children's books is to design a data-analysis plan.

The GLOBI database (it stands for *Global Biotic Interactions*) lists data from
the literature, and we can access it from `R` using `rglobi`. So before you
start:

``` R
install.packages("rglobi")
library(rglobi)
```

Once this is done, we can look for all interactions that have *Pieris* eating
something:

``` R
pieris_interactions <- get_interactions("Pieris", interaction.type="eats")
```

This gives (as of the writing of this post), 232 interactions. Looking good!
Now, we can build an incidence table of what *Pieris* species is eating what
food source. The output of `get_interactions` has columns for the source and
target taxa, so this is fairly easy:

``` R
A <- table(pieris_interactions$source_taxon_name, pieris_interactions$target_taxon_name)
```

This table has 14 rows (for 14 *Pieris* species), and 137 food items. To know
which is very-hungriest of all, we can simply sum the rows:

``` R
generality <- rowSums(A)
sort(rowSums(A))
```

Here is the result:

| *Pieris* species | Number of known items in diet |
|:-----------------|:------------------------------|
| *rapae*          | 91                            |
| *brassicae*      | 55                            |
| *napi*           | 51                            |
| *canidia*        | 10                            |
| *virginiensis*   | 6                             |
| *marginalis*     | 4                             |
| *krueperi*       | 3                             |
| *brassicoides*   | 3                             |
| *naganum*        | 2                             |
| *manii*          | 2                             |
| *ergane*         | 2                             |
| *melete*         | 1                             |
| *deota*          | 1                             |
| *cheiranthi*     | 1                             |

OK, so that settles it. *Pieris rapae* IS a very hungry caterpillar.

But more seriously, isn't that amazing? That the integration of open data and
open software means that we can now go and test hypotheses with very few effort?
I can't help but feel that we are extremely lucky to have all of these resources
available. And I'm working on a paper that will showcase a more ambitious
example. Open data are good. Use them.
