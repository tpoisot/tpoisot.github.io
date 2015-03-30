---
title: The pros and cons of using R packages for teaching
author: Tim
type: note
layout: post
tags:
- R
- Teaching
---

R packages are one of the best tools we have. It's a library of 1000s
of functions ready to be used, all wrapped in a single common language,
and it's free. I wrote some, and used even more. When I review a paper,
upon seeing "we used function `x` in the version 2.3 of package `y`",
I know a lot about what the authors have been doing (and I can check the
help of this function for references and additional details). And obviously,
training students about which packages are widely used in a particular field
is an important task, because it will ensure that they will speak the same
language as other scientists in the field.

Because packages (often) represent the *state of the art* in a particular
field, or because they offer a unified interface to a lot of different methods
(`simecol` is a good example of that), it's important that students know how
to use them (and most importantly, which packages to use). To some extent,
packages are just another tool, like PCR or statistics. Knowing how to use
them (properly) saves time, and opens new possibilities for analyses. And
let's just be realistic, everyone uses packages. All the time. So yes, of
course, the students should be familiar with the most important in their field.

An important point is that we also start to see the development of *package
ecosystems*. The [*rOpenSci*] project is an example of that. They propose a
lot of different packages whose common purpose is to interact with databases
and API for science, but the real power is offered by the ability to integrate
several of these packages [in a single analysis]. Want to get the list of
species in a country, and check which are invasive, then plot that onto
their phylogenetic tree? It can be done. Another well known example is the
`plyr`/`reshape2`/`ggplot2` combo, which is (seriously) the only reason I
still have to start `R` at least once a day.

So on one hand, packages are really good, because they save time and
allow to do an analysis which (hopefully) conforms with the current set of
"best practices" in the field. On the other hand, when you start working
*only* with what the packages have to offer, you can severely limit your
creativity. There are questions that will require new code to be written,
and you'll most likely hit obstacles along the ways. That, too, should be
something the students encounter during their training.

And this is when the limits of `R` start to show. As John Cook said ([source]),
"I find it more helpful to think of R as having a programming language than
being a programming language". I would never have put that so eloquently,
and it is entirely ture. Over the last two months, I gave a graduate training
class on *Algorithms and programming for environmental sciences*, in which
I tried to discuss how to make "good" (robust, user-friendly, stupid-proof)
programs. Regardless of what the students learned, I definitely realized
that `R` is a *huge mess* when you try to work outside of packages, or
do something else than statistics. Interestingly, even Hadley Whickam's
forthcoming [*Advanced R development*][ard] starts by saying that it will
show how *what seems horrible is merely "not that bad"* (go read the book,
by the way, it's great). And so understanding *what* to do often comes second
to understanding *how to do it*.

The (many, many) quirks of `R` nonwithstanding, working with a package
and doing something new are two different approaches. The former involves
looking at the examples, and reading the documentatin to see what each
function does. The later requires a working knowledge of the language, and
some notions of algorithmic. Yet, judging from my observations, these two
different exercices are often (and let's not forget statistics) presented
together, under the general denomination of `R`. And when, afterwards, students
complain of "not getting `R`", it's hard to tell whether what they don't
get is what exactly a `while` loop does (which is not a `R`-specific issue),
or why a `data.frame` is also a `list` and a `matrix` (which is a reasonable
question, and quite specific to `R`); you may know how to do statistics with
`R`, or use `vegan` or `picante`, but not know `R` (or the other way around).

The point I'm slowly getting at is that you'll most likely end up in a
situation which is not covered by *any* package available. Or, as a student,
you'll have to modify a code for a group project, which means re-writing
some functions, or changing the data structure. Part of the training should
prepare students to do this kind of things. Rather than using a pre-made
function to calculate a Shannon's index, or even find the maximal value in
an array, let's walk students through the writing of this function.

So, to conclude, while it's clear that I have a love/hate relationship
with `R`, I think it's still an invaluable tool for teaching, especially in
undergraduate courses. `python` might be as easy and more coherent, but less
people use it (for now...), and `R` is still the *lingua franca*. And a part
of the success of `R` is the diversity of available packages. But relying
only on packages creates this weird black box situation, in which students
will know what the function does, but not necessarily *how* it does it; and
knowing how stuff works is key when you have to create your own stuff. So
**pros**, packages are awesome because 90% of what you want to do is already
programmed. **Cons**, the remaining 10% will be extremely hard for you to
get if you don't get your hands dirty once in a while, and write things
from scratch.

[*rOpenSci*]: http://ropensci.org/packages/index.html
[in a single analysis]: http://ropensci.org/usecases/index.html
[source]: http://readwrite.com/2013/11/25/python-displacing-r-as-the-programming-language-for-data-science
[ard]: http://adv-r.had.co.nz/
