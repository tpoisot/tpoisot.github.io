---
layout: post
author: Tim
tags:
- julia
- R
- high performance computing
- numerical ecology
title: Don't enforce R as a standard
byline: Any code is better than no code at all, no matter the language in which it is written.
---

Yesterday, I received the reviews for a paper of mine. It was rejected with an
invitation to resubmit, so far, so good. In this paper, we present a lot of new
measures to work on probabilistic networks, and it's all in the
[preprint][prepr] if you really want to read more about that. To do the paper,
as in, to produce the figures and do the analysis, I wrote a [package][pkg] in
`Julia`. I'm proud of this package. It's fast, defensively programmed, well
tested, already parallelized if you use several CPUs, and all that. It's also
released under the MIT "Expat" license, so you are free to do with it as you
please.

[prepr]: http://biorxiv.org/content/early/2015/03/13/016485
[pkg]: https://github.com/PoisotLab/ProbabilisticNetwork.jl

It's important to specify that this paper is *not* a software paper. It's the
description of methods, and it so happens that we decided to release the package
alongside it. This is where things got complicated.

Reviewer 1 wants more practical details about the software (despite it not being
the purpose of the paper), and that we have to justify that it is indeed usable.
Some of this point is fair (I will write a short introduction, and the code used
for the figures will be published alongside the paper). Reviewer 3 states that
since `Julia` is not frequently used by ecologists, and therefore it's dubious
that the methods are usable, or even useful, and a `R` package would be better.

The three reviews were helpful and constructive, but these two comments
infuriated me. Let me start with a bit of background. I'm not anti-`R`. I gave
department-wide `R` training for graduate students and faculty. I wrote `R`
packages to go with papers, and released them on *GitHub*, and I keep on fixing
bugs and maintaining them. I use `R` on a daily basis. I contributed code to
other people's `R` packages. One of my lab machines runs RStudio server for
colleagues that lack computational power. But it's a tool. It's neither a
religion, nor a standard, nor a pre-requisite for getting your paper accepted in
an ecological journal.

Let me put things in perspective.

First, a package written in *anything* is better than no package at all. And as
far as I'm concerned, this should be the end of the argument. And *especially*
if this is not a software paper (but even then), the language a software is
written on has nothing to do with the scientific merit of the paper. Unless the
choice of language means bad performance or a significant risk of errors, or the
impossibility to run the code, it can be written in lisp or cobold for all I
care. I cannot emphasize this point enough: any code organized in a software
library and released under a FOSS License is better than no code at all.

Second, what to write a piece of software in, as the guy in charge of actually
writing the code, is a conscious decision. And knowing the type of data, and use
cases (because I've since used this package in a few projects), and the
algorithm used, and all that, I decided that `R` was not the best choice I can
make. Could I write a `R` version of it? Yes. But I won't, because I don't have
that much time, it won't be as efficient, and I'm not interested in doing it.

Third, there is this thing in the open-source crowd, where you [don't get to be
entitled][entitl] about a piece of software that is available for free. This is
extremely important. That something is released does not imply that the
maintainers will do free work for you. Especially when the message is "I don't
like this because this is not the way I do it, so can you start again?". The
whole point of FOSS is that if you don't like it, you can fork it. But you don't
get to complain about something that is given away for free. This is just rude
(see also, first point -- it's better than nothing). I don't expect praise for
writing code (except by my continuous integration engine, that sends me
comforting *Build passed* emails). But if I go the extra mile of writing and
organizing and optimizing code, it's grating that people complain because it's
not matching their personal preferences.

[entitl]: http://jeremyckahn.github.io/blog/2014/10/19/open-source-does-not-mean-free-labor/

Fourth, this points back to a larger issue -- `R` is not the only computational
tool we have. Every time these is a pushback about something *on the basis that
this is not `R`*, we are losing opportunities. I've had discussion with people
saying that they won't even try to publish software, because it's not in `R` and
they don't feel like fighting an uphill battle where most of their energy will
go into their language choice. And because of this "`R` or bust" mentality that
*some* people are so vocal about, cool things are not properly released. There
is a cost.

Every time you complain about the language code is written in, Ethan White has
to buy a new computer:

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/ctitusbrown">@ctitusbrown</a> <a href="https://twitter.com/tpoi">@tpoi</a> &#10;&#10;/shuts browser&#10;&#10;/turns off computer&#10;&#10;/throws computer out of window&#10;&#10;/hides under desk</p>&mdash; Ethan White (@ethanwhite) <a href="https://twitter.com/ethanwhite/status/583378831257518082">April 1, 2015</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I know that accessibility is important -- this is what picking FOSS platforms
and languages is about, and this is why FOSS licenses for scientific code
*should* be enforced. But beyond that, what should matter is, *does it works as
advertised?*. Software is not something that happens magically out of thin air.
People write it, people like me, and our choice of how to write takes precedence
over your ideal language in which to run it. Replying to reviewers is an
exercise in picking your battles -- this one I'll fight.
