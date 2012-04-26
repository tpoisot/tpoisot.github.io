---
layout: post
title: Biblatex styles for ecology
summary: blog
chapo: A project to write biblatex styles for ecological journals
author: Tim
tags:
- latex
- biblatex
- open source
---

A few months ago - when finishing to write my thesis, as I grew increasingly disatisfied by the clumsiness of ```natbib``` -, I started looking into [```biblatex```](https://github.com/plk/biblatex). ```biblatex``` is essentially a re-implementation of LaTeX packages like ```cite```, ```natbib```, and others. And the more I used it, the more I realized two things. First, ```biblatex``` is awesome; it's to ```natbib``` what [```knitr```](http://yihui.name/knitr/) is to ```Sweave```. Including the fact that switching from one system to the other is virtually transparent, but you would miss a lot by not using the ```biblatex``` specific commands. Second, it's a pain to find citation styles for it, because it's recent, and good old ```tex makebst``` is not working. It would not be a problem if the default choices made any sense, but I feel like writing *In :* before the journal name, or adding the month to the year in the bibliography is not really common use - at least in hard sciences.

The really good thing, now, is that ```biblatex``` relies only on LaTeX macros, and not on the really weird ```bibtex``` language (the macro- and filed-based logic makes it closer, IMHO, to the [*Citation Style Language*](http://citationstyles.org/) used by Mendeley and Zotero). Which means that it is possible, with relatively little effort, to put together different citation styles. It's actually relatively close to what you would do in a CSS. The following commands will put the volume number in bold, and leave the page numbers alone (```biblatex``` annoyingly puts "pp." in front of everything) for the entries with a type ```article```:

{% highlight latex %}
\DeclareFieldFormat[article]{pages}{#1}
\DeclareFieldFormat[article]{volume}{\textbf{#1}}
{% endhighlight %}

In a few hours, and after looking at the base styles, browsing some forums, and looking at some more code, I was able to put together the files to obtain the *Ecology Letters* format (huge success, as I was never able to pull it of in LaTeX only). I thought it would be great to have a central repository for ecological journals, so I created a *GitHub* repository for this. You can [fork the project here](https://github.com/tpoisot/ecobiblatex), or download the styles files (a grand total of two as of today, one of which is not complete yet!).

Most ecological journals have fairly close citation formats, so it will be easy to make the collection grow by duplicating some folders and copying-pasting a few macros across files (which will be made even easier by me taking some time to comment the damn code...). Anybody interested in helping is, of course, welcome (as I feel like I'll only work on journals to which I plan to submit papers in the near future).