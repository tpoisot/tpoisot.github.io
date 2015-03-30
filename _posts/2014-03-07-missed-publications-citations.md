---
layout: post
type: note
author: Tim
title: Is a citation a missed publication?
tags:
- open data
---

I had a very interesting discussion/argument on twitter this afternoon, about
(basically) why data sharing is evil. Or to put it in a more balanced way,
why sharing data is a net loss of potential papers for people. Because 140
characters are not enough to make a coherent argument, I will summarize my
position here. The key disagreement with coercive data sharing policies is that
journals are requiring people to give away their data, and that any one can use
these datasets to publish papers without putting in the effort of collecting
data, so that is a loss of potential publications for the data creators. It's
probably one of my most despicable qualities, but I don't mind having heated
arguments over *ideas*. Which most definely happened this afternoon...

The point is, creating data *is* hard work. I know that because, well, I
generated some on my own, through either field (my left buttock still bears
the scar of the time I sat on a sea urchin), and lab work. I know how many
hours go into making a dataset. All of these datasets are publicly available.

These last years, I've been moving towards (mostly) numerical/computational
research. One important output of my research (other than results and papers)
is software. I know how many hours go into making good software. Coming up
with the [measure of ecological networks beta-diversity][betalink] was a
solid year worth of my time. Reviewing measures of ecological specificity,
and coming up with one that [behave the way we felt it had to][spe] was
approximately the same amount of time.

That's by no mean an optimal comparison, but it will serve: it takes an
equivalent effort to put together a dataset and a software package. Keep also
in mind that, just as some datasets keep on growing from year to year, most
high-profile pieces of ecological software are permanently being developped
and expanded. Terry McGlynn rightly pointed out that spending a summer in
the field carries a personnal cost (as in, not seeing your family), and that
doesn't happen in software developments (though it's often best to avoid
being in the general vincinity of anyone *debugging* a program).

Now, I won't re-state my view on open data. You can read about it [here][iee]
(in open access), but in science as in other domains, I'm leaning towards
the *From each according to its capacities, to each according to its needs*
end of the spectrum (which does not mean that credit should not be given,
and I will discuss this later on).

So, back to the argument. When people re-use your data, it represents a net
loss of one paper for your lab. By the same logic, everytime someone uses a
software, the developers are loosing a paper. I'm a lucky one, since so far
I've only "missed" a few dozen papers (and counting, since I've reviewed a
few other papers using some of these packages). Developpers of the big-name
R packages in ecology and evolution, or bioinformatics packages, really have
it bad, because they "missed" a few thousands of papers. But I don't think
any software developer will see a citation to its package as a missed paper,
because it is assumed that the number of citations is the measure of impact
we need.

On the other hand, many people would assume that contributing a dataset is a
reason to require authorship. I've had two projects fall flat last year because
using the datasets would have required adding another five co-authors. These
datasets have been last used over five years ago, and it's unlikely the people
creating them would have done whatever we are were thinking of doing (luckily,
it all ends well, since we've since found open data...). And you don't have
to look far to find people that were in the same position. And it's always
the same argument: by publishing with my data, you're robbing me of one paper.

And this points to a very big, fundamental issue: if we all operate on the
assumption that a citation is OK to credit methodological work, but authorship
is the only appropriate credit for data collection, it reflects the fact
that methodological development is *less real* than empirical work. That
it's easier, that it's less desserving of being recognized. That it's less
*hard to do*. In other words, that data are scarce, but methods are plenty. I
don't think that's true.

This is the interesting point in the discussion. Many of the people I talked
to would likely find preposterous the ideas of granting co-authorship to
developers of the software they use, yet would ask to be included in papers
using the data they produced. Hence my complaints about a double standard:
methods developers should be satisfied by citations, data creators can
expect authorship.

---

The problem of *getting credit*, nonetheless, is a valid one. The underlying
issue is the perception that authorship is the *only* type of credit you can
receive. Citations of datasets is going a long way to fix this, but it is
true that data creation is not always recognized as a research output. This
is one of the points [we discuss in our open data paper][iee]. Yet there
are interesting opportunities to exploit. Manon (a former student) and I
[share authorship of the paper on natural bacteria-phage networks][ecolproc],
because even though we were in charge of different sides of putting the
paper together, we had an equal contribution to it overall. Yet Manon is
lead author of the [dataset][figep], because she was in charge of sampling
and isolation. So should someone publish something using this dataset (which
is going to happen soon if I'm not mistaken), it's normal that she get the
credit for this part of the work.

But the point is, we're not going to publish anything else with this
dataset. Not that it has told everything there it can, but we've moved on to
other things. And so any new paper using it, is *not* a missed opportunity. It
carries no cost for me, because chances are, I would never have written
this new paper in the first place. And the important question is, what are
the chances that someone will write the same paper you would have, with your
data? My point of view (and I understand that not everyone will share it) is:
low enough that I can share some data I intend to go back to at some point,
because they can still be used to generate interesting research *even though
I'm not the one responsible*. That, and I'm working on the assumption that
a very small subset of people are interested/like-minded in writing the type
of papers I write; and most of them are good collaborators already; and you
don't scoop your close colleagues. And I think it's true for a lot of people.

---

So a citation to your dataset, in my mind, is not a missed publication. Rather,
it's the opposite. Data which are not shared are a net loss of potential
impact. They could be generating citations. They could be used by people to
get interested in what you do. One of the most important piece of advice
that was ever given to me, and which is why I'm so into open science now,
is *Anything that people can't see, doesn't count*. I'd much rather see
whatever few datasets I was involved in creating be used, rather than
collecting dust somewhere.

Are there situations in which people will use your data, and you won't be on
the paper? Definitely. But there are also situations in which putting your
work out there will result in invitations to contribute to a paper? Yes. And
it goes both ways. I've been invited to contribute to papers relying on my
methods, I've been inviting people to contribute to papers because their data
are central in what I'm trying to do. This is one of the key assumptions I
make: most people are nice and good natured, no one is out there to steal
your papers or your work, don't be afraid.

---

To summarize my key points: expecting citations in exchange for software and
authorship in exchange for data sends a really negative message to use code
monkeys (erm, researchers interested in methodological developments). It's
worth considering whether someone can write the same paper as you, and if
the answer is "Unlikely", then it's probably safe to release your data. And
finally, try to see the world through rose-tinted glasses; despite pressure
to publish, and well, pressure in general, people are nice, love nothing
more than working together to create beautiful interesting science, and the
total is more than the sum of its individualistic parts - or so I believe.


[betalink]: http://onlinelibrary.wiley.com/doi/10.1111/ele.12002/abstract
[spe]: http://onlinelibrary.wiley.com/doi/10.1111/j.2041-210X.2011.00174.x/abstract
[iee]: http://library.queensu.ca/ojs/index.php/IEE/article/view/4632
[ecolproc]: http://www.ecologicalprocesses.com/content/2/1/13
[figep]: http://figshare.com/articles/Phage_bacteria_networks_isolated_in_soil/696102
