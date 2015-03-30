---
title: R, priority effects, and the meta-package
author: Tim
type: note
layout: post
tags:
- R
- methodology
- software
- computational ecology
---

R packages are a superb opportunity to use new methods, and if anything, we
should only rejoice that there are so many of them in ecology. Yet, there is
a point that occurred to me over recent experiences (reviewing code for a few
papers recently, and reading the help page about [one of my own metrics
in the `bipartite` package][bipartite]), and that I think is rarely discussed.

When a R package presenting a series of measures becomes available, it will
become the *gold standard* of future analyzes in this field. This is an
extremely strong effect. French students in ecology use the (French-developed)
`ade4` package, while people in Québec use the `vegan` package (most likely
because of its ties with the *Numerical Ecology* book, as Gavin
Simpson mentioned in the comments). There is a priority effect when
a package is released, and metrics that are not implemented in this package,
because they are more difficult to apply, will be less widely used. This is
a central point for methodological research papers. Describing the method is
a small fraction of the work. People are more likely to apply what is
proposed if there is a tool to do it, and as a consequence, (*I assume
that*) methods are used more if there is an easy and well-known way to
apply them.

This is especially true of large-scale packages, that aim to become your single
interface with the metrics and analyzes in a domain. Ecologists are familiar
with `bipartite`, `vegan`, `picante`, `ape`, for example. These "mega-packages"
implement a lot of measures, and for this reason, some will look through the
manual to see what kind of analyzes they can do. I most likely still do it
myself, especially so for side-projects where I'm not entirely familiar with
the methodological literature yet. So based on my experience, this is
particularly problematic for newcomers to a field, because when you don't know,
you assume that the default values were chosen as defaults by
someone knowing what he was doing. Then I remember the [*Zen of
Python*][zen]: *"In the face of ambiguity, refuse the temptation
to guess."*

And as we all have different sensibilities, it shows in the way we think about
code, and in the way we write it. The default options of a function, for
example, can be a matter of choice, and especially so when this function
becomes as broad as "measure diversity". This partiality is not an issue when
developing tools that you will use for your own research. But when developing
tools intended for a broad audience, then this code becomes a service, and it
is our duty as service providers that the defaults reflect our own biases the
least, and the current consensus the most.

This is why extremely big packages *can* be a problem under some circumstances:
they break Doug McIlroy's *Unix philosophy*:

> This is the Unix philosophy: *Write programs that do one thing* and do it
well. *Write programs to work together*. Write programs to handle text
streams, because that is a universal interface.

When we, as users, rely on a big package to do our work, we assume that every
component of this package is (i) well implemented, (ii) conform to the original
paper, and (iii) up-to-date. Given the frequency of commits in the biggest
ecological packages, I'm sure this is the case, but it's worth keeping in mind.
My personal preference goes to using a lot of packages doing a small number of
things. For my two papers relying on heavily on the development of comparison
of new methods, I started by writing the R package (well I started at the
drawing board, but that part is not relevant), then used the package to
perform the analyzes described in the paper. The idea is that whenever someone
will (hopefully) read the paper, there will be a package doing *only* what is
described in the paper.

And I understand that some people would rather have one big package doing
everything they need. There are arguments for that of course, namely the fact
that with as many users, errors are most likely to be uncovered, and the
quality of the package will increase (and the state of the R packages in
ecology tends to confirm that). But on the other hand, when you increase
the number of pieces, you increase the probability that one of them will behave
in a way you would not have anticipated. With this regard, packages that
require you to do a lot of small steps by hand have a great advantage, you know
what is happening in real time (then again, I like C and doing every thing by
hand, so perhaps I just enjoy hurting myself).

In any case, the "default" behavior of programs is something that should be
held under intense scrutiny by the community, and improved code review will
definitely help. This is also where big packages can somehow escape the system:
even if they are reviewed formally (as opposed to being reviewed informally,
which they are in real time as people use them), this will not happen for
each release, and some new releases may introduce things that can be argued
against. In short, my point is: R packages (or packages in other languages, but
you get the idea) tend to rapidly represent the "canon" of the analyzes
to perform, and for this reason, we should always keep a critical eye on them.
Also, keep on writing open-source code, that will enrich the code base
available to the community.

With that in mind, what would my *ideal* super-big package be? Ideally, it
would only be a wrapper around other packages, each doing a single task, *Unix
philosophy*-style. Proudly following the ecological tradition of sticking
*meta* to every non-meta thing, it would obviously be called a *meta-package*.
It would automate the process of taking data from one format to the other, and
propose pipelines to do automated analysis, but with users checking each step
of the process. As such a package would glue together other programs, there
will be little development required. The role of the maintainers, however,
would be to vet the new releases of the packages, find suitable additions,
and so forth. This would be a good example of the community coming
together to merge disparate tools. Social coding platforms allow to do
this almost effortlessly, and it would have the benefit of showing *how
the sausage is made*, since each individual package would be usable on its
own. This would also shift the balance towards a system in which there is
a strict one paper / one package relationship, which I think would
considerably clarify the type of analyzes included in a package, in
addition to matching these analyzes to the primary literature.

[bipartite]: http://www.inside-r.org/packages/cran/bipartite/docs/PDI
[zen]: http://www.python.org/dev/peps/pep-0020/
