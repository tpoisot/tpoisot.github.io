---
title: Systematic gender bias in editorial boards in ecology
author: Tim
tags: gender bias, academia
layout: post
byline: Women are under-represented in the editorial boards of ecological journals, even more than their proportion in the population of publishing scientists suggests
---

There is an increasing body of evidence showing that women are at a
disadvantage in science. They [publish less][lariv], and are discriminated
against [in hiring][hir] (by male and female faculty equally). They are also
under-represented on [editorial boards][eb], and it has been so for a long
time. This last study, in particular, motivated me to do a few additional
analyses.

Journals are where the scientific debate happen. Editors act as the gatekeeper
of this debate; especially so since they can render a decision which is not
the one referees wanted. I have had a few papers saved by associate editors
(two, if I remember correctly), and more sacked despite glowing reviews (about
five). It is crucially important that editorial boards represent the population
of publishing scientists in the field. This is what I set out to test.

I decided to focus on twelve journals, that are well established in ecology,
are broad audience, and are well cited. These are the journals that will be
common (not all, but a subset of all), to most professional ecologists. Most
are also society operated. Here is the list: *Methods in Ecology and Evolution*
(where I am a software editor), *Journal of Animal Ecology*, *Functional
Ecology*, *Journal of Ecology*, *Ecology & Evolution*, *Ecology Letters*,
*Oikos*, *Ecography*, *Journal of Applied Ecology*, *The American Naturalist*,
*Ecology*, and *Trends in Ecology & Evolution*.

All of these journals list their editorial board online, so I collected the
name of all editors, divided in three categories: `senior`, `special`, and
`associate`. The `senior` editors are editor in chiefs, deputy editor in
chief, and so on (they sign the rejection letter). The `special` editors are
in charge of a particular section (*Forums*, *Book reviews*, *Software*) of
the journal -- meaning that they evaluate only a specific type of papers. The
`associate` editors are all of the other editors (also called *subject*
editors in some journals).

For each editor, I then painstakingly researched the gender (some people I
knew, some people I could guess, and for a hundred or so people I had to
look at the photo or webpage). I ended up with a fully resolved list of
names: 664 men, 205 women. Some of these names were overlapping, but on
the 889 total editorial board positions in my sample, 74% are filled by
men. I will expressed most statistics at the number of men for one woman:
this is 3.23 for 1. Values greater than 1 means that there are less than
one woman for every man. Values smaller than 1 never happened in my sample,
but you would have guessed that already.

This is bad, but we know that there is not an exact parity between men
and women in science. This is because of many things that happen during
the undergraduate and graduate studies, and the end result is a sex ratio
biased towards more men than women. What does it mean? If being invited in
an editorial board, and accepting, is a random process, then the proportion
of women in editorial boards should be the same as the proportion of women
in the pool of publishing ecologists. The baseline expectation is not 1:1,
it is more likely something slightly larger than 1:1.

So for each of these journals, I queried *Web of Science* for the last 500
papers published (one journal is young enough to only have 492 papers, but
this doesn't really make a difference). I first took all unique people that
published as first authors, and used the [`gender` package][gender] in `R`
to identify their most likely gender. This fails on some non-occidental first
names (full disclosure: I don't think it matters). I ended up with a list
of 4051 unique names: these are the *professional ecologists*, as identified
under the criteria of "having published at least one paper as first author in
the last 500 papers published by these journals". Using different journals,
some of which are general and some of which are more focused, is a way to have
a sampling that is representative enough. And merging all these publications
and looking at unique names is a way to have a baseline estimate of the bias
towards men that is as unbiased as possible.

How many men for one woman in this sample? 1.73

The population of publishing ecologists is biased towards more men, about
twice as much. But note that the population of *editors* is even more biased
than that. I decided to have another look at the publication data. For each
journal, I counted the proportion of first authors of either gender. This
gives a journal-level measure of bias.

At this point, I decided to be generous, and say that the baseline estimate
of 1.73 men for 1 woman is *only* because of pre-publishing career factors
(I suspect it's not). So any journal that has 1.73 men for each woman in the
editorial board is not overcompensating for the under-representation of woman,
but is sampling in an unbiased way from the population. The way to account for
that is to use a z-score: the *bias* for each journal (in terms of publication
or being on the editorial board) is the *true* number of men for one woman,
minus 1.73 (the baseline), divided by the standard error of all ratios. A
score greater than 0 means excess men, a score lower than 0 means excess women.

Here are the score for each journal:

| Journal                        | Ed. board | First authors |
|:-------------------------------|:----------|:--------------|
| Functional Ecology             | 0.07      | -0.25         |
| Journal of Ecology             | 0.36      | -0.23         |
| Ecology & Evolution            | 0.57      | -0.93         |
| Ecography                      | 0.67      | 0.99          |
| Methods in Ecology & Evolution | 0.81      | 2.13          |
| Journal of Applied Ecology     | 1.10      | -0.33         |
| Ecology                        | 1.23      | -0.09         |
| Ecology Letters                | 1.31      | 0.82          |
| Journal of Animal Ecology      | 1.38      | 0.04          |
| The American Naturalist        | 2.13      | 0.53          |
| Oikos                          | 2.20      | 0.02          |
| Trends in Ecology & Evolution  | 3.72      | 2.34          |

The *least* biased editorial board is *Functional Ecology* (1.55 men for
each woman). The *most* biased is *Trends in Ecology & Evolution* (7.25 mean
for each woman); *TREE* is also the most male-biased for publication: 3.41
men for each woman in first authors. The *least* biased journal in terms
of publications is *Ecology and Evolution* (1.06 men for each woman first
author), although the editorial board does not reflect that. There is also
no really meaningful correlation between the score of first authorship, and
the score for editorial boards, meaning that the editorial board composition
do not reflect the pool of authors publishing in each journal either.

Note that *all* journals had a positive score for the composition of the
editorial board: they have more men than expected knowing the proportion
of men in the population of publishing authors. The average score for the
composition of editorial boards is 1.30 (strong bias towards men), and the
score for the proportion of first authors is 0.41 (moderate bias towards men).

These are important results: even correcting for the proportion of women
publishing papers in ecology, there is marked bias in favor or men in both
first authorship, and representation in editorial board.

Here is what this bias looks like -- keep in mind that a score of 0 do not
mean equal rate between men and women: it means equal rate as predicted by
the 1.73:1 ratio.

![Publishing bias](/images/pub_bias.png){:.full}

One pressing question is to have an idea of the random expectation. This
is quite easy to simulate: I have done so by drawing random samples of
80 persons editorial boards, and 500 first authors, to simulate unbiased
first-authorship. Since there is no significant correlation in the data, I
took the decision to do independent samplings (1000 in total), and independent
analysis too.

![Publishing bias](/images/pub_bias_hist.png){:.full}

Good news -- the bias in first authorship is not unexpected given the
demographic bias. Though there are a few outliers on the right side (these are
*Trends in Ecology and Evolution*, and *Methods in Ecology and Evolution*,
in which men outnumber women as first authors more than 3 to 1). That's not
really a good news, but it suggest that at least the women than manage to
publish do it at a rate no lesser than their proportion would suggest. It
is worth re-stating that the only journal that is close to gender equality
in first authorship is *Ecology & Evolution*.

Bad news -- seriously, look at editorial boards. This is as clear an evidence
as gender bias as we will be able to get. I'm not going to inflict a measure
of distance between the distributions on you; there is a clear bias towards
more men in editorial boards that would be expected at random. Even when
accounting for the smaller sample size of editorial boards. The outliers in
this situation are *Trends in Ecology and Evolution* (which falls outside
of both CI), and *Oikos*.

**Conclusion** -- this post has gone on long enough. Here is a summary for
your next coffee break: I have used data on the composition of editorial
board in twelve major publications in ecology. I used a database of 6000
articles to identify the gender of first authors. There are 1.73 men for each
woman in my pool of publishing ecologists. Men and women publish a volume of
papers that matches what you would expect knowing their relative numbers. Yet
editorial boards show a strong, systematic bias towards more men: 3.23 for
each woman. This is a serious problem for the representation of women at
all steps of the publishing process. Not to point the finger, but *Trends
in Ecology and Evolution* is a complete sausage fest. Tell me if you want
the raw data, I am working on a draft to turn that into a proper publication.

[lariv]: http://www.nature.com/news/bibliometrics-global-gender-disparities-in-science-1.14321
[hir]: http://www.pnas.org/content/109/41/16474.full
[eb]: https://peerj.com/articles/542/
[gender]: https://github.com/ropensci/gender
