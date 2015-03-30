---
layout: post
title: Should code be reviewed?
author: Tim
type: essay
tags:
- open source
- open science
- peer review
- software
- next-gen science
---

Joppa and colleagues published a [policy forum](http://www.sciencemag.org/content/340/6134/814) in *Science*, dealing with problems in the use of adoption of scientific software. Their paper quite nicely summarizes that the intrinsic quality of a software is not a deciding factor in its use, and that the community of scientists will be more influenced by who the early adopters are, and how well they are connected. In short, using a particular software quickly becomes a tradition, with few considerations for its merit, and worse, few consideration for the merit of following software (it happened to me once, that two referees asked me to do an outdated analysis because "everyone else is doing this analysis" - way to go).

As Joppa and colleagues say quite early in the paper, "the software code used to
do the science has not been formally reviewed". This is, indeed, one of the main
recommandations that Joppa and colleagues make: code should be reviewed, just as
the paper it is attached to. And it is obvious, but just saying that referees
will read the code, and all the problems will go away, is wishful thinking.
Should code be reviewed? Yes. Can it? Not quite yet, I think.

I've talked to five different people this morning about computer stuff. We
mentionned approximately ten different languages. Of these, I knew four well
(enough to write functional code in a reasonable amount of time), two
approximately (I can guess what a code does by reading it, most of the time),
and the others not at all. Sure, `R` has become a *lingua franca*
for ecologists and many other fields, but there are still other
languages out there. Think you can review my `python` code?
I wouldn't even do it myself! What about very verbose languages
(`C`), or things that should have gone extinct a long time ago but
for some reason are still around (`delphi`)? We are collectively
using a multitude of languages. Now think about it in a review
perspective. How likely is it that you'll be able to (i)
understand, (ii) evalute, and (iii) assess the quality of a random
piece of code? If you're not in the top 90% programers in your field, then you're not likely to review the code properly.

Joppa and colleagues also call for more widespread unit tests. Some languages have really easy way to write them (`python`, for example). I'm guilty of not using them, just as a lot of other people. And the reason is simple: ain't nobody got time for that! [Nick Barnes](http://www.nature.com/news/2010/101013/full/467753a.html) encouraged us to publish our computer code because it was "good enough", and most of the time, our code is just that. Good *enough* for the project we are currently working on. When I write a model of whatever ecological process to look at how it affects the relationship between two variables, I mostly don't think that people can use it to do something else. I write it as well as I can, and stupid-test it (does it behave the way my calculations tell me it should in some important yet simple cases?). Then I'm done with it. But I don't write unit tests, and I don't adhere to any good practices of code quality. This is bad, we are (to a vast majority), bad people.

It's true that most of what Joppa and colleagues discuss are big projects. The
`vegan` and `bipartite`, for example. And writing these big projects is the
*exception*, not the rule. We are not trained to work on them, we don't know how
to behave, and it's not what we do most of the time! And for he very same
reason, we probably wouldn't know how to review it, either. So what is the solution?

First, more open science. As I've mentionned [before](http://timotheepoisot.fr/2012/01/06/science-age-social-coding/), I'm quite convinced that the ability to have other people read our code will increase the probability that we received feedback. Second, (still) more open science. Hearing that your program is flawed when you submit the paper is a terrible waste of time. [Put your papers on line when you write them](http://timotheepoisot.fr/2013/05/16/steal-my-paper/), with the code you use, and ask people for input. It's better to hear that something is wrong soon, when you can still change it withouth going through a full rewrite, rather than at the end of the process. And finally, (one again) more open science. Make reviews (of code, but why stop there) public. If you detect a mistake in the code, explain where, how, whay, and what it does to the results. Help the *users* of the software, not only the developpers. Also, when you spot a mistake, explain it so that other people will avoid it in the future.

Now, enabling all of this requires massive training efforts. No more sending
code by email in `zip` files. No more developping using closed systems that the
reviewers will not have access to. No mor `.exe` files in supplementary
materials. Does it sound like a high standard? Good, because we should set high
standards for the science we create.So start putting in place training sessions
of computer litteracy, evangelize open source and social coding, and help
everyone move from "perhaps code should be reviewed" to "we have the tools to do
this, let's go!".
