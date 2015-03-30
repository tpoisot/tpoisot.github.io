---
title: Software papers and open source licenses
type: essay
layout: post
author: Tim
tags: 
- open source
- open science
- peer-review
---

I have been reviewing a lot more software / methodological papers these
days, which led me to think about open *vs.* closed software (even more
than usual). By *closed*, I mean any software that would require me to pay
to be able to reproduce the method, either directly, or through a licence
costing money to the university. Think *Mathematica*, *matlab*, or any other
commercial tools. Despite what [some][qf] would have you believe, the way
analyses are done in a "traditional" research paper (<q>Here is my experiment,
here are the analyses I have been doing, and here are my conclusions</q>)
is an entirely different piece of work. When I review such papers, I care
very little about the software used to obtain the results. And of course,
it's difficult to reproduce a field survey or a large lab experiment, and
no amount of free software will change that.

But software papers, *i.e.* either papers presenting a new software,
or relying heavily on computer code (*i.e.* most simulation studies),
are defined largely by their computability. So let's jump straight to the
conclusion: would I reject such a paper because the code relies on closed
software? **No**, for two reasons. The first reason is highly personal:
I would not accept to review it in the first place. My condition to review
a software paper is to be able to understand and evaluate the code, so if
I can't run the software or understand what it does, I won't review the
paper. The second reason is that, ultimately, the important thing in a
software paper is the method described, and so as long as I can reproduce
what the authors propose, and it is a useful addition to the methodological
toolkit, there is no reason to reject the paper. An additional reason is that
I am a co-author on at least two (*in prep.*) papers using closed software,
and I won't hold others to a higher standard than the one I hold myself to...

That being said, there are extremely strong arguments to be made in favor
of using Free and Open-Source Software (FOSS) whenever possible. For one
thing, and although it's easy to forget that coming from a *rich* university,
not everyone can afford to pay a software license. Tools that are relevant
for conservation may be unavailalbe to NGOs if they need to pay to use
them. Even in the academic world, researchers from developing countries,
may have a hard time justifying spending thousands of dollars on software
when there are free alternatives available. My (highly personal) point of
view is that using FOSS software is part of the collective responsibility
to lower the access fee to science.

Now that we know that [open data][opendata] is associated with an increased
citation rate, I wonder whether the same is true of FOSS-using papers. I
can think a couple reasons for why it should be the case. Describing a new
method is much like explaining a recipe. But I'm much less likely to cook
true *crêpes* from Britanny, which require a bulky and expensive *billlig*,
than I am to cook the regular version that I can do at home with my frying
pan. Wow, that is a bad metaphor, it almost reads like FOSS is the cheap
knock-off version of science. Never mind... In any case, offering users
a way to apply an analysis at no cost is a good incentive to using your
method. And now that almost anyone knows and uses R (especially students),
you can reach ~100% of your field this way.

But what should we do when no FOSS software can do the particular analysis
one wants to do? This is a valid and difficult question. It's obvious
that what matters most is to have the most solid result one can get using
the currently available tools. But on the other hand, contributing new
software is an activity in itself, that is starting to be recognized as
such. Porting a good method into FOSS is probably going to get you some
recognition withing your community. *ImpactStory* let you track the impact
of software releases through *e.g.* *GitHub*. For example, the *ImpactStory*
page [for the `digitize` package][digit] I wrote in one afternoon because I
wanted to know whether it (it: extracting data from published scatterplots)
could be done, show that people found this package useful. While it's true that
writing useful code is not as appreciated as writing papers that get cited, the
development of new metrics will probably make it increasingly rewarding. And
the less people have to pay, the more likely they are to use your code.

At the very least, if your code requires proprietary software to run,
pick a [FOSS license][cal]. There are tools (like *Choose a license*,
linked just before) that will allow you to select licenses according to your
needs. Even if people can't *run* the software, they can see how it works,
and translate it in another language it they need it. Starting in January,
all [BES journals][bes] will require that *data* are available, free of
charge and in a repository, when the paper is accepted - and the goal is
clear: allow reprodubilityand re-use. Perhaps the same type of initiatives
should be progressively introduced for code. And this is the part where, as
referees, we can start making a small difference: by suggesting appropriate
FOSS licenses if the authors have not done so. It will help software spread,
and the most methods we have at our disposal, the most likely we have to
find the right one to solve a problem.

[qf]: http://www.quantumforest.com/2013/12/should-i-reject-a-manuscript-because-the-analyses-werent-done-using-open-source-software/
[digit]: http://impactstory.org/timpoisot/product/puktfnm5rj97v383zwo6smlp
[cal]: http://choosealicense.com/
[opendata]: https://peerj.com/articles/175/
[bes]: http://www.britishecologicalsociety.org/publications/
