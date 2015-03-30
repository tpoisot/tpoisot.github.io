---
type: essay
author: Tim
layout: post
title: Why should Ecology be open?
tags:
- open science
---

There are a lot of extremely good arguments to defend the fact that [*Science*
(as a whole) should be more open][BU]. To summarize them very roughly: it's the
ethical thing to do as it allows everyone to access information, it's easier
for scientists to access information, it's faster than the traditional
peer-review system when you need to get your work noticed, and it's *much less
expensive* than closed-source science. I could also elaborate on transparency,
accountability, and the refusal to put a wall around knowledge for a while
as well. In short, I'm yet to find an argument that would convince me that
open science is a bad thing.

What we call *open science* obviously varies from people to people, but the
common thread is that it is a *set of practices aiming a lowering the
technological, financial, and legal barrier to the accessibility of scientific
materials, methods, processes, and outputs*. This includes a diversity of
practices such as open manuscript writing, the use of preprints, data sharing,
in addition to open access publishing and the use of free/open source
software. Most of these practices can be applied to nearly all fields
of science, as proven by the [*OpenWetWare* wiki][OWW], that caters
specifically to experimental biology and biochemistry.

An interesting question that keeps popping up whenever I discuss *Open
ecology*, or *Open biodiversity*, is "Why should it be different in ecology?".
Or expressed in another way, why should ecology pose particular challenges as
far as open science is concerned? It is a very valid question, and in
preparation for the *Open biodiversity* panel that will take place at the QCBS
meeting in a month and a half, I thought it was time to bring some elements to
answer it.

Let's start by recognizing that there are (broadly) two types of ecologists.
The "empirical" ecologists (including the microcosm people) rely on empirical
observations, and extensive field surveys, to address their questions. The
"theoretical" ecologists, on the other hand, integrate different data sources,
or build models, to understand "general" questions. There are obviously
people working all along this continuum (I don't consider myself a "pure"
theoretician, for example), and empiricists contributing some of the
most important ecological *theories*, but we can all agree that leaning
towards one end of the continuum implies having a different set of
practices. And to make things worse, the communication between the two
groups is not as good as it should. While it's easy (I would like to say
*natural*) for theoreticians to have an entirely open workflow (put
your code on *GitHub*, use it to write your manuscripts, push your
data on *figshare* using the API, and *voilà!*), it's slightly more
complicated for empiricists. While it's true that anyone can make data
public, you can't reasonably release your field site under a *Creative
Commons* licence (because it doesn't make any sense...).

There are two points at which both worlds meet, however: data and algorithms.
Even for the most local and system-centered question, there is a large quantity
of required data. And because data are essentially multivariate, sometimes
incomplete, collected with unbalanced designs, and generally subject to the
contingencies of the [Harvard Law of Biology][HLB], these is often a need for
elegant (read: complicated) numerical methods to make sense of them (but this
is easy to solve, code should always be made open source, in
non-proprietary languages). This is probably the unique challenge of
*open ecology*: we produce a lot of data, we need a lot of data, but there are
so many peculiarities attached to datasets that sharing them is by nature
a difficult task. Molecular biologists do not have this problem. The `fasta`
format is simple because the biological reality of what it represents
(sequences) is simple too (or at least, it is easy to represent the building
blocks). And so it seems almost natural than sequences databases are so
prominent: there is no obstacle to data sharing because anyone can use
a `fasta` file after two minutes of explanation of the format. I cannot remember
a single case when I managed to become entirely comfortable with the structure
of an Excel file in less than an afternoon.

Open ecology will probably be much like all other forms of open science, but
the data heterogeneity challenge is especially problematic. There are certain
ways to solve it, though.

First, we need **strict data specifications**. If several groups work on the
same questions in similar systems, it would make sense that the data are
formatted in a common way. A good opportunity to draft these specifications is
large working groups, in which people sharing a common interest would think
about the "core" and "satellite" properties of a dataset. This will also
speed-up the development of data repositories with APIs. My personal favorite
for the development of data specifications is `JSON` schemes, but really any
kind will do. Data are highly structured information, and it makes sense that
they are used and shared in a highly structured way. It is quite obvious that
there will not a be a single *ecological ontology*, but if we managed to get it
right for a few dozens of high quality ones, it will be a strong enhancement
over the current data format of "However I felt that day" (I'm guilty of this
one, of course).

Second, we need **stricter data review**. Once the data specification has been
published, it is important that its use is enforced by referees and editors, so
as to make sure that data will be re-usable. This is different from evaluating
the quality of data (data quality is only measurable in the light of the
specific question they are used for). What I have in mind is more along
the lines of a checklist with a few points: is the data conforming to the
specification (this step can be automated with a `jsonlint`-like tool), is the
data easy to access, and are enough data released to make the dataset re-usable?

Third, and finally, we need to **un-install Excel and similar software**. What
we need instead, is a `pandoc` for data. `pandoc` is a tool to convert text
formats into other text formats. It's awesome. And with strict data
specifications, we should be able to write one for ecology. This will allow use
to store data in their correct format (*i.e.*, conforming to the data
specification), but use them in another format when we need them in
another format.

All of this will require a fair amount of community coordination, and changes
in the training and teaching of ecologists, but it's all for the greater good.
Some outstanding ecological problems will only be solved when a critical mass
of data is reached, and it would be extremely disappointing to realize that
these data were existing, but not available due to poor practices. So in short,
this is the challenge specific to open ecology: **making sense of highly
heterogeneous and local data, and mobilizing them to address global and
general questions**.

[BU]: http://www.technology.org/2013/10/04/science-even-open/
[OWW]: http://openwetware.org/wiki/Main_Page
[HLB]: http://dna-protein.blogspot.com/2012/03/harvard-law-of-biology.html
