---
title: So you're not a programmer. Are you sure?
byline: Most of us write code at some point, after all. We ought to make sure it is properly tested.
author: Tim
layout: post
tags: scientific software, unit testing, computational science
---

In a recent lab meeting, we had a discussion about some good practices in
programming -- unit testing, defensive programming, coverage analysis, all
that. For most of my undergrad, a substantial part of my master, and some of
my PhD, I have been running experiments, either in lab classes or for actual
research. My undergrad in particular was in cell biology and genetics. The
experiments in this field are only as good as the *controls*: a smaller
experiment, or additional condition, that you run alongside the main one
to (i) show that everything that is supposed to works actually works, and
(ii) what is supposed *not* to work actually does not. This is why you run
PCR with a sample you know works, and a tube of with (supposedly) no DNA in
it. If any of these two gives something other than the expectation (namely,
one amplification, one lack of amplification), you throw away the gel and
start again.

These are not cosmetic things. These are not things you do just to make
sure. These controls are a pre-requisite for any result to be taken
seriously. Developing the best set of controls, those that capture all
possible events and allow them to discriminate between them and give you an
idea of what went wrong, is something of an art form (and a frequent exam
question). No experimental biologists can pretend to show anything if there
are no controls. I spent my first years as an apprentice scientist being told
about, and thinking about, controls most of the day. This is because biology is
tricky, and many things can go wrong in an experiment. Controls are required.

I am now a computational scientist of some sort. Most of what I do is taking
data, running simulations, formatting results, and using the output to
tell a story. This is *in practice* extremely different from taking cells
or tissues, and running DNA extractions and PCR and cutting the gels to
send that to sequencing. But this is the same *process*: transforming raw
material (data/cells) into results, through a process that I think is the
best (analysis/experiments). Writing scripts and pipetting have even some
[similarities][pip]!

Back to the lab meeting. One argument against spending too much time learning
all of the methodology associated with testing (and the even longer time
required to build the self-discipline needed to apply it) was that despite
being computational biologists, we were not *programmers*. I tend to disagree
with that (in that I spend most of my time programming things, and the rest
of the time writing papers to discuss the output of said programs). And I
can conceive that all of this methodology is heavy to handle.

But testing your code is not about being a programmer. It's about making
sure that things work. And you can't eyeball the results. The number of PCR
I ran is in the triple-digits. I have extracted DNA from probably more than
a thousand samples. I've spent enough time at the bench that I can do most
things without pausing to think about the next step. It would never occur to
me to do it, even for a single sample, without running some controls too. I
never do an experiment with bacteria without leaving an empty plate or an
empty microcosm to test for contamination. I don't trust raw material, and
I certainly don't trust myself. Making good use of testing and all of these
tools is not about being a programmer. It's about upholding the same values
as experimental scientists, and recognizing that all it takes is one step
to go wrong for the whole thing to fall apart. We can't *not* make mistakes,
all we can do is make sure that we catch them.

Yet, I'm far from blameless when it comes to writing code. Most of the
packages I release are tested in some way (the latests are as close to 100%
coverage as I can get). Because writing good test suites is hard. Because
defensive programming means that two lines to perform the actual calculation
are buried into ten lines of checks and error handling. I still have to
force myself to write tests. I usually do. I have to keep asking myself
"Are you sure you're not a programmer?".

[pip]: http://bytesizebio.net/2014/11/10/why-scripting-is-not-as-simple-as-scripting/
