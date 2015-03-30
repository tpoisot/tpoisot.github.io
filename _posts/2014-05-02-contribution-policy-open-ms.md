---
title: A contribution policy for open manuscripts
tags:
- open science
- research ethics
author: Tim
layout: post
type: note
---

A few months ago, lab-mate and PhD candidate extraordinaire Philippe
Desjardins-Proulx proposed [scriptoria], a system to track manuscripts that are
being developed on *GitHub* (and other version control systems). It's a cool
project, because it will allow everyone to access in progress manuscripts,
and allow people to give feedback *before* the papers reach the referees. In
the true spirit of open source software collaborative development, it will
also allow anyone to find projects (manuscripts) in which one can make a
valid contribution, fork them, and contribute.

The thing is, not anyone is OK with people proposing changes to their
manuscript. And because `scriptoria` will rely on a set of meta-data, it
is time to start thinking about how we can encode our willingness to see
others contribute to our work. If you find an in-progress manuscript you
might be able to contribute to, before you put any substantial effort in it,
this will tell you the chance that the authors will accept your contribution.

This scale will serve as a primitive social contract between the authors
and other potential contributors. It will tell whether modifications are
accepted, and how the authors will react if modifications are submitted
and accepted. Note that in all cases, authors are entirely free to reject
contributions they don't like. Which brings me to the most central point
about how to contribute to an open manuscript: **do not fork it to write
a slightly different paper**. Seriously, that's just bad form. And seeing
that we are dealing with text, it's straight up plagiarism. Be a good sport,
and if your contribution is rejected, raise the issue (eventually) in a
post-publication forum.

Anyways. What I envision is a linear scale, ranging from `0` to `3`, with
higher values indicating a less and less open attitude. Here is a brief
summary of the different levels.

The first degree (which I think should *not* be the default) is `0`. All
contributions are welcome, and any substantial *addition* to the paper (text,
analysis, figure) which is accepted will result in co-authorship. This is my
personal default, but I appreciate that not everyone is comfortable working
this way.

The second degree (`1`) is what I think should be the default. Contributions
are welcome *after consultation with the authors*. This can take the form
of opening an issue. State the change you would like to make, how you
plan to make it, and if you have in principle approval, go ahead with your
contribution (fork the repository, then make a pull request). With this mode
of contributions, authors retain a lot of control on their paper.

The next degree (`2`) is where authors only welcome *minor*
contributions. Typically, you will not claim co-authorship, because the authors
will only accept small changes (typos, suggestions of better references,
ways to make a paragraph clearer). Most of that can be done in Issues,
rather than by forking the project. If you are writing a "Forum" or similar
type of paper, or if you know excatly what you want to do with your results
and are not open to changes, then this level of openness is good. You will
still encourage users to help on the manuscript, just not in any major way.

The final degree (`3`) is *Keep Off!*. The authors want their manuscript to be
online for a variety of reasons (transparency, accountability, early exposure),
but they are not welcome to contributions. This is a valid position. Consider
that any manuscript with this level of openness is *read-only*.

There you have it. I don't know whether these suggestions will be in the
released version of `scriptoria`, but I think these are issues we should
be adressing now. The "tradition" for open-source projects is to have a
file called `CONTRIBUTING` at the root of the project, in which the ways
of suggesting changes and the "culture" of contribution for a particular
project are outlined. Manuscripts are (hopefully) going to be shorter lived
than most open source software (once the paper is accepted, the repository
is only useful as an archive), so we can go for a simpler system. But being
upfront about whether contributions are welcome is important, and so a
standardized way of saying it would only help.

[scriptoria]: http://phdp.github.io/posts/2013-07-22-scriptopia.html
