---
layout: post
title: Science in the age of social coding
summary: Code sharing has the potential of making our lifes a little bit easier.
author: Tim
tags:
- github
- open source
---

I started using version control a little more than 6 months ago, when working on my dissertation. Not only it allowed me to have a backup of my chapters somewhere else than on my hard drive, but I could also revert back to a previous version of some paragraphs I liked better. Sometime during the summer, I discovered GitHub, and thought that I can give it a try. A few months later, I'm wondering what I would do without it.

The idea of GitHub is simple: [*social coding*](http://radar.oreilly.com/2009/01/github-making-code-more-social.html). As in, everyone can work on your code, and contribute some new things to it. This blog is powered by Jekyll, many features of which originate from the community. In a way, social coding is open source logic pushed to its maximum: everyone can copy (fork) your code, work on it, and give you back the features they added, or the bugs they fixed, or whatever you can think of. Scientists would gain a lot by getting to know these tools.

# It will make us better coders

During the last few weeks, I've been taking a very informal programming course. And I've realized something: most of the code I write is horrible. It does the job, but it's not written the way it should be. It's not really a problem, but 

How did it made better at writing code? It made me bolder. I used to write the basic layout of a program, then fix it by changing one line at a time. Now, I have the assurance that any revision of my code is available. Essentially, version control eliminated the question of "If I break it, will I be able to fix it back?". I can delete lines by the hundred and rewrite them from the ground up, and revert back to the previous version in case things go wrong. And the truth is, I've only very rarely reverted back to previous versions. By taking advantage of the safety net that previous commits represent, it is possible to try new things, make drastic changes, with absolutely zero negative consequences (well, except for the time you will invest doing these changes).

In addition, GitHub has this bizarre effect of exposing me to *a lot* of code. There are a lot of cool projects to explore, and when I see one with a specific feature, I can just check the source, and see how it's done. I can learn by myself (I'm yet to buy a book about Python or R, despite the fact that I use both of them on a daily basis), but I can also learn by looking at how more experienced coders are doing it. This is not something to neglect. And I'm not only thinking about ecology-related projects here. Just looking at the way people deal with different kind of data can give you ideas. GitHub is a great generator of serendipity, and serendipity is awesome because it brings you new ideas.

# It will give us access to more techniques

One of the coolest things that can happen is that more and more scientists will use GitHub (or GoogleCode, or Bitbucket, which I use for stuff that I don't want you to see just yet) to post their code. I'm not saying it *will* happen, though the young crowd is certainly doing it (ref post scott open science) – but I think it *should* happen. We are now sharing an increasing amount (and variety) of data, but there is no global code repository that I know of. This is too bad, for a whole lot of reasons.

First, it's time consuming to re-write an algorithm from the ground up, simply because the original code was not shared. 

Second, by not having access to some pieces of code, we are often unable to do some analyses.

Third, we are subjected to the limitations of existing software. I've been discussing this matter with non computer-minded people working on pyrosequencing. The discussion went something like "Hey, it would be cool if you were able to do \[so and so\] !". To which they replied "Yeah, but we can't, because it's not in \[whatever program we are using\]". Should the code be public, it would be a simple matter of forking(LINK) it, and adding this new functionality. Given the way GitHub works, this modification could one day make it into the main release, which will bring you some kudos among your peers for making everyone's life a little easier.

And finally, there is one additional impact of an increased availability of the code: people will develop more integrated tools. Part of my motivation for writing [bipy](http://tpoisot.github.co/bipy/) was to have an integrated way to work with bipartite ecological networks, to do a bunch of different analysis in a common environment. The folks at [ROpenSci](http://ropensci.org/) are doing an impressive job of stitching together a lot of different databases, and their project is a prime example of what we can do with open source. Similarly, [Weecology](http://weecology.org/resources) is publishing both code and data. (CONT)

# Where to start ?

Publish your code, it's good enough

Gists

SourceTree