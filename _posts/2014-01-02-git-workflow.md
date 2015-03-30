---
title: Using git throughout your workflow
author: Tim
type: note
layout: post
tags:
- git
- productivity
- open science
---

There are good chances that I will give an introductory workshop to the many,
many uses of `git` for scientists in the next weeks. What follows is a series
of notes about the things *I* use `git` for, which I will cover. In a way,
this post is a list of all the possible ways to introduce `git` into your
workflow as a (computational) scientist. Some things are specific to `git`
as a protocol, some others to *GitHub* as a platform. I will try to make
the distinction clear.

# Tracking your code

It would be tempting to discard this one if you are not mainly a computational
scientist. Please don't. Even the simplest piece of code you write, the most
basic `R` function is a *central* step in your workflow if it is responsible
for transforming raw data into something you can show around (a figure,
or a table). In the most fundamental way, `git` is a way for you to track
what you changed, and when. And you can *revert* back to the previous state
of your code if you want.

The most important feature of `git` (in my opinion), and one that is shared
with most versioning systems, is the ability to (i) give the reasons of
a particular change, and (ii) see exactly what has been changed. See, for
example, what happens after *adding* a few lines of code:

{% highlight diff %}
@@ -50,6 +50,11 @@
  #' }
  tax_agg <- function(x, rank, db = 'ncbi', ...) 
  {
 +  if(is.matrix(x))
 +  {
 +    if(is.null(colnames(x))) stop("The community data matrix must have named columns")
 +    x <- data.frame(x)
 +  }
    # bring to long format
    x$rownames <- rownames(x)
    df_m <- melt(x, id = 'rownames')
{% endhighlight %}

If a change in your code breaks it, you can track the lines that where
modified, and start looking here for possible bugs.

# Collaborative manuscript writing

[Karthik Ram][kram] went over this point at large in its paper, so I will keep
this point short. If you dread exchanging multiple versions of a paper over
email, and fear the day where you will have to handle conflicting edits, or
Word and OpenOffice will ruin your formatting, then look into `git`. Although
it requires that you use *different* formats to write (`markdown` or `LaTeX`),
the advantages are numerous (and yes, I count *not using Word* as a *huge*
advantage). You will have the same opportunity to track precisely what is
going on with a clear summary of the changes. And because `git` handles
several people working concurrently just fine, you can have a lot happening:

![Figure1][fig1]
[fig1]: {{ site.url }}/images/gitnetwork.png  "Figure 1"

# Make replying to reviewers *easy*

[Carl Boettiger][cb] and [Trevor Bedford][tb] (and I, for some papers) use
*Issues* as a way to handle reviewers comments. Issues are a paradigm taken
straight from software development, where a problem in your code needs to
be addressed. We make a point for the relevance of this metaphor in [Phil's
*in prep* paper][msscrip] on the `scriptoria` project. In short, you can
attribute each point raised by a referee to an Issue. You can then assign
Issues to people working on the manuscript, and track the progression of
the replies. Because most issues tracking systems come with a *Milestones*
ability, you can assign all issues to the *Milestone* "First revision",
and set a deadline at which all the issues have to be fixed.

As *GitHub* allows you to reference *commits* (*i.e.* changes made to your
code/paper), it is really easy to say, in the reply to each point, what you
did to address it, and give a link to the `diff` (*i.e.* the list of all
changes). Instead of replying things like "*We replaced the sentence P.4
L.24-25 by a short statement (now P.6 L.14-21)*", you can say "*We changed
the text in the following way, ..., see commit `e30b8e`*". *GitHub* will take
care of putting a link in place, and the reviewer can then see exactly which
changes were made. As a final note on this point: it's obviously good practice
to *ask* the editor if s/he agrees with the reviews being put on *GitHub*.

# Give support to users

The *Issues* system works, obviously, for code. People using your code can
suggest improvements, or report bug. It is also possible to contribute new
code (through the *fork*/*pull* mechanism).

One of the things I enjoy in the *Issues* system is that it can (when the
people actually use it...) unclutter your mailbox. Instead of sending an email
to report a bug, people can submit an issue. You will have a clear list of
what to do, and then again, the ability to indicate exactly how you solved it.

# Release versions for publications

*GitHub* (and probably other platforms) comes with a *release* mechanism. You
can select one *commit* and label it as something special (for example,
the version of a code you used to do the analysis presented in a paper). In
the context of manuscript writing, I use releases to identify major steps in
the life of a paper: first preprint, update to the preprint, revised version,
final revision, etc etc. You can see [an example here][mscc]. Reading through
a large number of commits can be a bore, but quickly browsing a list of
releases can give you a sense of when the important things happened. The
release mechanism is also, of course, useful for code.

# Get confident in your code

This is one of the features of *GitHub* (and related tools) I hope to use more
and more in the future. I started looking into [TravisCI][travis] a month
or so ago, and I love it. In short, TravisCI is a *continuous integration*
system: each time you commit a change to your code, it will run a pre-specified
series of steps to `build` it, and tell you (and other people) whether it
was a success or not. The list of instructions to build your project can be
whatever you want (compiling the `LaTeX` document, running the test suite,
...). But the central point is that you will know, in real time, if your
changes *still allow your code to run* or not. Another related service is
[coveralls] - it gives you an overview of which proportion of your code is
covered by tests. These two services (TravisCI and coveralls) are automated,
so you have nothing to do to make sure that you code run, and that it is
covered by tests (except that coding well, and writing tests...). Both
services will allow you to display little badges on your project page,
so your *users* can have some confidence in your code.

# A terrible way to showcase your work

One thing for which social coding platforms are *not* so good is showcasing
your work. This is why I now have a [software] page on this website. If you use
*GitHub* to track of lot of things (and I do), what is important can often be
buried beneath a pile of your active-but-not-yet-useful projects. And because
the listing of your repositories is just the project name and a one-line
description, it's not obvious what is important. So my recommendation if
your want to give people a broad overview of what you have been up to,
is to have a webpage with your projects, instead of just giving the URL to
your *GitHub* account.

---

And that's the way I use `git` in my everyday workflow. There is a bit of a
learning curve, but you can learn (most of) `git` [in 15 minutes][trygit]. And
it saves time in the long run, both because it simplifies some tedious tasks,
and because it gives you a single formalism in which you can inscribe your
daily activities.

[kram]: http://www.scfbm.org/content/8/1/7
[cb]: http://carlboettiger.info/2013/06/10/mansucript-reviews-on-github.html
[tb]: https://github.com/trvrb/flux/issues?page=1&state=closed
[msscrip]: https://github.com/PhDP/ms_scriptoria/blob/master/ms.md
[mscc]: https://github.com/tpoisot/ms_connectance_complexity/releases
[travis]: https://travis-ci.org/
[coveralls]: https://coveralls.io/
[trygit]: http://try.github.io/levels/1/challenges/1
[software]: http://timotheepoisot.fr/software/
