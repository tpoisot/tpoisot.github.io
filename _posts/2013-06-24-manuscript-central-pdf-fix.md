---
layout: post
author: Tim
type: note
title: Fixes for the ManuscriptCentral PDF conversion problem
tags:
- LaTeX
- PDF
---

While submitting a MS to *Methods in Ecology and Evolution*, I ran into a PDF
conversion problem. It was not the first time it happenned, and always on
journals using *manuscriptcentral* as an upload system, and always with
`LaTeX`-generated PDF. My previous fix for this, in the proud quick-and-dirty
tradition of the academic world, was to (1) import the PDF in google documents,
(2) print it as a PDF, (3) upload the PDF and (4) drink the shame
away.

Only this time, I wanted to understand what was happening, and to fix it as
much as I could. Well, as it turns out, the *manuscriptcentral* system only
accepts PDF up to version 1.5 of the standard. Reasonably recent `LaTeX`
distributions will generate 1.7 or 1.8, so it's obviously not going to work
(but on the up-side, it will give you one of the most depressing and amusing
error message ever: your PDF file cannot be converted in the correct PDF
format). So to fix it, there are a number of workarounds.

First, you can add

~~~ latex
\pdfminorversion=4
~~~

to your `LaTeX` preamble, if compiling with `pdflatex`, as explained
[here][minorversion]. That's one additional command, which is not needed in
most other situations, but that's one way to fix it.

There is a second workaround, which is to compile with `latex` instead of
`pdflatex` (haven't tested this one, but it should work), then upload the whole
dependencies when you submit. Note that your figures needs be `eps` for this to
work, and you'll probably be limited by the packages installed on the remote
server, the list of which is not known. The *Methods in Ecology and Evolution*
staff was extremely quick in pointing that out after I raised the issue on
Twitter, so a big thank you to them.

The solution I found this morning is the following:

~~~ sh
pdftops ms.pdf ms.ps
ps2pdf13 ms.ps ps.pdf
rm ms.ps
~~~

Very simply put, that will convert your pdf into a postscript file, then convert
it into a PDF 1.3 file, that can be uploaded with no problems. You can just add
that to a `makefile`, by the way:

~~~ make
mc: ms.pdf
	pdftops ms.pdf ms.ps
	ps2pdf13 ms.ps ms_mc.pdf
	rm ms.ps
~~~

Once your paper is ready, a simple `make mc` will create a `ms_mc.pdf` file,
which is suitable for upload. So here you go, happy upload to all of you,
and may the editorial decisions ever be in your favor.

[minorversion]: http://www.jakubkonka.com/2012/11/07/latex-manuscript-central.html
