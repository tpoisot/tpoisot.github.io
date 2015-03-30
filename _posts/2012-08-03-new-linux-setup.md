---
layout: post
title: My new linux setup
author: Tim
type: note
tags:
- linux
- free software
---

I have a terrible confession to make. Two weeks ago, I installed [Windows 7](http://xkcd.com/528/). Nobody was holding me at gunpoint. No member of my family was taken hostage by the IT people which were fed-up by our Mac rebellion. I took the rational, informed decision to install Windows 7 on a brand new machine. Why, oh why, do you ask?

I made the switch from Mac to Linux, that's why. I needed to install Windows on my new machine before wiping it up and replacing it by Ubuntu (needless to say, I derived a great amount of pleasure in the process). I'm really happy with it. The reason of the switch is quite simple. Over the last months, I've been trying to use software that is as simple as possible, but not simpler. No more saying «Cool, I've been working with Word for two hours, and it only crashed once!». I've progressively moved all my text-editing duties to [LaTeX](http://www.latex-project.org/), including using [beamer](https://bitbucket.org/rivanvx/beamer/wiki/Home) for slides and [biblatex](http://ctan.org/pkg/biblatex)/[Mendeley](http://www.mendeley.com/) for bibliography.

I've also discovered [pgfplots](http://sourceforge.net/projects/pgfplots/), which is _incredibly_ powerful, and is perfectly integrated to LaTeX. Throw in some [PGF and Tikz](http://www.texample.net/tikz/examples/) for other graphics, and you have yourself a full-featured monster to produce any kind of science you want. While I still use R a lot, I'm progressively moving to [Python](http://www.python.org/), because of the amazing [networkx](http://networkx.lanl.gov/) package, which I've already mentionned [a few times](http://timotheepoisot.fr/2012/05/18/networkx-metapopulations-python/).

And of course, all of this is kept [updated using git](http://timotheepoisot.fr/2012/01/06/science-age-social-coding/), which I'm lucky to be able to use, thanks to my colleagues being huge nerds. By the way, the people at [GitHub](https://github.com/) are really nice, and if you send them an email saying you work in the academia, they'll give you free private repositories. You can set up a lab account, and be the happiest scientist ever.

The common thread to all of these software is that they're free. So, I decided that overall, I was better of with a free operating syste, and thus without Mac OS X, which I felt was becoming more of a glorified iPad than a real computing device. In parallel, I used my laptop less and less for simulations, because we have a warbeast of a cluster in the lab, chokefull of CPUs and GPUs, and it was just getting ridiculous waiting two days for simulations that I could run in 5 minutes. So really, I realized that I needed a good machine to write text and produce papers on, with a processor decent enough to do some testing and data-crunching.

And guess what? For half the price of a MacBook air (partly due to my impressive bargaining skills, but still), I found a laptop with everything I needed, _including_ a nvidia GPU which can run [CUDA](http://en.wikipedia.org/wiki/Compute_Unified_Device_Architecture). It does everything I want, and working with [Meld](http://meldmerge.org/) and [gedit](http://projects.gnome.org/gedit/) is just great.

But here is an appeal to my fellow geeks. I still miss two things. The first is a PDf annotator. I tried working with [Xournal](http://xournal.sourceforge.net/), which is fun to use, and will probably be even funnier as soon as I will use it with my Wacom tablet, but other people have had issues with reading the annotations. The second thing I miss is Mathematica. I'll be looking into [simpy](http://simpy.sourceforge.net/) in the near future, but it seems to be kind of a hassle. So if you know a good PDF annotator, and a decent platform for symbolic computing (and sadly in my case, a pen and paper is not an option here...), I'd be glad to hear about it.

I've been thinking about making the switch for the last few months (which was somehow facilitated by the fact that I've been using Linux sporadically since I discovered [Knoppix](http://knoppix.net/) in 2006). Now that it's done, I couldn't be happier. Ubuntu is lean, responsive, and uncluttered - in the risk of offedning a lot of people at once, I'd say that the interface is so OS X-like that I immediately felt at home. If you are tempted, you sould defintely try it!
