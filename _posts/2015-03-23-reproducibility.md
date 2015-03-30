---
title: Reproducibility - do you have what it takes?
author: Tim
tags: computational ecology
layout: post
byline: In which I discuss the issue of reproducibility of studies relying on high-throughput computing
---

Reproducibility is supposed to be a cornerstone of modern science, in that
everything we do (writing methods, almost releasing data, the whole peer-review
system) is supposed to ensure that, given only your paper, some hypothetical
person can reproduce your results without having to look for additional
information. It's the way I've first been told about scientific literature. It's
also a blatant lie, and it's only getting worse.

First, and although I'm yet to try it for myself (this would be a fun project
for a summer student), good luck publishing a replication in a journal where
people will be able to read it. Go grab yourself some [mites and oranges][huff],
get a grant to reproduce Huffaker's work, and then submit your result in any
mainstream ecological journal. If it works, wonderful, the system works. But I
am ready to bet money on the fact that you won't get past an editor. You would
have better luck writing a paper detailing the whole process and explaining how
this shows that the system is broken; wait, make that a [special issue][nat].

It's kind of sad, but this [reply] on the Academia StackExchange is, I sometimes
feel, close to the consensus:

> In publishing there is a phenomena called "me too" publications (see for
example Day & Gastel: How to write and Publish A Scientific Paper) where one
takes existing methods and apply them to a new area, data set, whatever context
is applicable. Although not wrong, these types of studies usually do not
contribute much new knowledge except resulting in the understanding that the
method(s) work in (yet) another circumstance.

And if taking the *exact same method* to apply it to *different* data is already
below what a publishing system driven by novelty is ready to compromise with,
then imagine how taking the *exact same method* to *the same* data (or system,
as the case may be) would fare.

Second, it's getting worse (in my very little corner of science). I'm a
computational scientist. Instead of spending 3 months in the field/lab, I spend
3 months writing and debugging and running code. And good luck reproducing what
I do. Not because my code is poorly written (it is), or is not available under
permissive licenses (it is). But because a lot of what I do requires computing
power which is probably in the 99% percentile of what people *can actually
access*.

One of the grad students doing research in my group started her project in
mid-January. She already logged over 2.6 core-years of use. What it means is, to
reproduce her results *so far* on a single-core machine, you would need two and
a half years of uninterrupted calculations. For a single project last year, I
used 11.5 core-years and a few terabytes withing 3 months. On a desktop machine,
to have finished now, on March 2015, you would have needed to start when G.W.
Bush was still the U.S. president. You would have needed to start *before
facebook existed*.

And it's good that we can do things that are computationally intensive like
that, but it's a big issue for reproducibility. Because doing this eats through
a sizeable chunk of my computing budget. And if I barely have enough to
*produce* my research, I sure won't dedicate some of this to *re*-producing any.
And if someone wants to check what I've done, unless they have access to
high-performance computing resources, and are ready to use this resource for
something else than producing research of their own, they can't.

In a system where code is almost never reviewed, and where it can be unfeasible
to reproduce the studies, do you realize how *easy* it is for me to (i) make
mistakes or (ii) make things up? The only things we have to make reasonably sure
that neither happens are good [work habits][nap] and work ethics. So yes,
everything is, *in theory*, reproducible. But in practice, the only thing you
can rely on when looking at a piece of research, especially of the intensively
computational kind, is blind faith in the work of your fellow scientists.


[huff]: http://en.wikipedia.org/wiki/Huffaker's_mite_experiment
[nat]: http://www.nature.com/nature/focus/reproducibility/
[reply]: http://academia.stackexchange.com/a/11214
[nap]: http://timotheepoisot.fr/2014/11/21/not-a-programmer/
