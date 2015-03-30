---
title: Tracking changes in markdown
tags:
- scholarly markdown
- academic life hacking
author: Tim
layout: post
---

Using `markdown` to write papers is an insanely great experience, because
it is a concise yet powerful markup language, that `pandoc` can export to
almost anything you like (and Word). Some journals, though, require that you
upload a document with all changes highlighted in addition to the revised
manuscript. As a reviewer, I find this helpful, but as an author, I'm always
trying to find a way *not* to do it because it is not really straightforward.

Well, as it turns out, this is not true. I decided that it was time to stop
being lazy, and I found a very simple way to get a good-looking marked copy
with all changes.

Here is my originally submitted manuscript, in a file called `orig.md`:

``` markdown
# My cool project

This is a really cool paper written in `markdown`. It has equations like
$(1-x)^\rho$ and, also some references to *really* cool papers [@fra92].

I hope it will be accepted!
```

I can compile that using `pandoc`, and get the PDF file that I send for
review. The referees, being referees, required some changes, so I made the
revisions in a file called `revised.md`.

``` markdown
# My cool revised project

This is a really cool paper written in `markdown`. It has equations like
$(1-x)^\alpha$ because $\rho$ was not a good parameter name. Also there are
some references to *really* cool papers [@fra92; and references therein].

I hope it will be accepted *now*!

# References
```

Producing the marked-up copy is relatively easy. The first step is to convert
both documents to `latex`, then use `latexdiff`. This is best done with a
simple `makefile`, which I reproduce here:

``` makefile
OPTS= --bibliography=/home/tp/.pandoc/default.json --csl=/home/tp/vrac/styles/ecology.csl --template=template.tex

all: orig.pdf revised.pdf diff.pdf

orig.pdf: orig.md
	pandoc $< -o $@ $(OPTS)

revised.pdf: revised.md
	pandoc $< -o $@ $(OPTS)

diff.pdf: orig.md revised.md
	pandoc orig.md -o orig.tex $(OPTS)
	pandoc revised.md -o revised.tex $(OPTS)
	latexdiff orig.tex revised.tex > diff.tex
	pdflatex diff
	rm {revised,orig,diff}.tex
```

The `OPTS` variable can be changed to whatever you like (and the whole file
should be made nicer, but hey...), and once this is done, you just need to do
`make diff.pdf` in the directory where your two files (`orig.md` and `revised.md`)
are. The resulting PDF file will look like this:

![](/images/md-diff.png)

This is what I *really* like with `markdown` and `pandoc` -- you can have a
whole `make`-based production workflow. Which means that automating tasks
is easy, and once you spend 10 minutes figuring out a solution once, it
will take you *seconds* to apply it every time the situation arises. If we
compiled all of the dirty little hacks like this one in a single `makefile`
specifically to make editing with `markdown` easier, we could have a really
good do-it-yourself manuscript preparation system. Just sayin'...!
