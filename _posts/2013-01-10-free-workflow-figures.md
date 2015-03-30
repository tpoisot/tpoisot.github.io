---
layout: post
title: A quick way to get good figures for your web pages
author: Tim
type: note
tags:
- LaTeX
- pgfplots
- free software
- data visualization
---

I'm a huge fan of the `pgfplots` package for LaTeX, as it offers the possibility to include the source code of the figures directly within the document. It changed the way I organize my paper writing, as I now tipically have three sub-folders: `notes`, `MS`, and `code`. The results of what happens in `code` (usually a huge mess of R, C and Python) go directly into `MS` as tab-delimited files, and the `.tex` document has all the commands needed to transform this in figures. I've notably used this workflow for the `beamer` slides of my lectures in population biology, and it was really easy to re-use and re-contextualized material across lessons. 

I'm *really* happy with this setup, and `pgfplots` is a wonderful tool. It does look really *LaTeX-y* (`s/LaTeX-/ugl/`) by default, but you can get good results with minor tweakings. Given that I am familiar around this system, I was thinking about how I can use it to produce good graphics to put in blog posts, when needed. As it turned out, it's remarkably easy, and it requires almost no user input.

Doing so requires almost nothing, except an install of [`imagemagick`](http://www.imagemagick.org/script/index.php) should it not ship with your operating system. Of course you need LaTeX, and (relatively) up-to-date versions of the `tikz` and `pgfplots` packages installed. By the end of this walkthrough, you'll be able to generate figures like the one just below, with almost no effort.

![Figure1]({{ site.url }}/images/ex-pgf-blog.png)

# Getting the figures from LaTeX

To start, we need a `.tex` document, who will act as a template for all the figures we want to produce. A minimal preamble will be more than enough:

{% highlight latex %}
\documentclass{minimal}

\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}

\usepackage[default,scale=0.95]{opensans}
\usepackage{mathastext}

\usepackage{pgfplots}
\usepgfplotslibrary{external}
\tikzexternalize 

\begin{document}
\end{document}
{% endhighlight %}

The important line is `\tikzexternalize`. This command tells the `tikz` library to generate a separate file for each figure, compile it in a PDF, then include this PDF file in the document. The consequence of it is that, in your working folder, you know have a list of files:

{% highlight text %}
-rw-r--r-- 1 tpoisot tpoisot      0 jan 10 15:21 pgf-figure3.dpth
-rw-r--r-- 1 tpoisot tpoisot  31494 jan 10 15:21 pgf-figure3.log
-rw-r--r-- 1 tpoisot tpoisot  22409 jan 10 15:21 pgf-figure3.pdf
{% endhighlight %}

There is only one drawback with the use of the `\tikzexternalize` command: as long as the corresponding PDF files are found in your working directory, `tikz` will not recompile them. This is essentially because drawing a `tikz` figure can be a relatively time-consuming process, especially if your graph has a lot of points. And so unless you are satisfy with your figure, comment the `%\tikzexternalize` command.

Once you are happy with your figure, and have re-activated the `\tikzexternalize` command, the last step is to convert these PDF files in a format that you can put in a webpage, like PDF. This is where `imagemagick`, and specifically the `convert` utility, comes into play. I have this simple bash script in my working directory, to automate the process. You can read [here](http://robfelty.com/2008/03/11/convert-pdf-to-png-with-imagemagick) about the options used.

{% highlight bash %}
for file in *figure*.pdf; do \
echo $file;\
convert -density 600x600 -resize 1204x986 -quality 90 $file `echo $file|cut -f1 -d'.'`.png;\
done
{% endhighlight %}

The `-resize 1204x986` flag esnure that the output is approximately of the size I want, to have a good resolution. Now, if you want to use these images in a website, it's better to ensure that the images will not overflow your layout, so just specificy a maximal width in your CSS file. For example, mine looks like:

{% highlight css %}
.pbody img{
	background-color: rgb(255, 255, 255);
	border: 9px solid rgb(255, 255, 255);
	box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
	padding: 1px;
	max-width: 742px;
	display: block;
	margin: 0px auto;
	margin-bottom: 1em;
}
{% endhighlight %}

# OK, let's do it!

In your LaTeX file, between the `\begin{document}` and `\end{document}` commands, just put the code for your figure (see the [`pgfplots`](http://pgfplots.sourceforge.net/) website for details on the syntax, the *Gallery* page has a lot of examples).

{% highlight latex %}
\begin{tikzpicture}
	\begin{axis}[xlabel=Time (weeks),ylabel=Individuals,
			width=12cm,height=6cm
			]
		\addplot coordinates {(1,8) (2,9) (4,7) (5,13)
		(6,12) (8,18) (9,17) (10,22) (11,41) (12,32)
		(13,24) (14,21) (16,21.5) (21,19.4) (25,21.02)};
		\node[coordinate,pin={below:{Control}}] at (axis cs:16,21.5) {};
		\addplot coordinates {(1,4) (2,3) (4,5) (5,7)
		(6,9) (7,8) (8,12) (9,23) (10,38) (11,34)
		(12,35) (13,33.2) (14,27) (16,25) (21,24.4) (25,24.9)};
		\node[coordinate,pin={above:{Treatment}}] at (axis cs:21,24.4) {};
	\end{axis}
\end{tikzpicture}
{% endhighlight %}

In a terminal, make executable, and run the `convert.sh` script:

{% highlight bash %}
tpoisot@tp002 ~/Bureau/PGFclean $ chmod +x convert.sh
tpoisot@tp002 ~/Bureau/PGFclean $ ./convert.sh
pgf-figure0.pdf
{% endhighlight %}

You will now have a PNG file, which looks like this:

![Figure2]({{ site.url }}/images/ex-pgf-default.png)

It's cool, but I strongly encourage you to play around with the various opitons. Defining two colors in the preamble of your LaTeX file,

{% highlight latex %}
\definecolor{GR}{RGB}{60,170,70}
\definecolor{C1}{RGB}{170,70,60}
{% endhighlight %}

, and using them (along with other options) to make your figure less LaTeX-y, can make a substantial difference. For example, the first figure in this entry was produced with the following code:

{% highlight latex %}
\begin{tikzpicture}
	\begin{axis}[xlabel=Time (weeks),ylabel=Individuals,
			width=12cm,height=6cm, ymin = 0, ymax = 50,
			xmin = -0.05, xmax=26.05,
			ymajorgrids, ytick={10,20,30,40},
			axis y line*=left, axis x line*=bottom,
			tick align=outside,
			axis background/.style={shade,top color=GR!5!white,bottom color=white},
			y axis line style={white, line width = 0.0001pt},
			x axis line style={black!60!white}
			]
		\addplot[color=GR,mark=none,ultra thick] coordinates {(1,8) (2,9) (4,7) (5,13)
		(6,12) (8,18) (9,17) (10,22) (11,41)
		(12,32) (13,24) (14,21) (16,21.5) (21,19.4) (25,21.02)};
		\node[coordinate,pin={[pin edge={GR,thick,densely dotted}]
			below:{\color{GR}Control}}]
			at (axis cs:16,21.5) {};
		\node[coordinate,pin={[pin edge={black,thick,densely dotted}]
			45:{\textbf{bloom}}}]
			at (axis cs:11,41) {};
		\addplot[color=C1,mark=none,ultra thick] coordinates {(1,4) (2,3) (4,5) (5,7) (6,9)
		(7,8) (8,12) (9,23) (10,38)
		(11,34) (12,35) (13,33.2) (14,27) (16,25) (21,24.4) (25,24.9)};
		\node[coordinate,pin={[pin edge={C1,thick,densely dotted}]
			above:{\color{C1}Treatment}}]
			at (axis cs:21,24.4) {};
	\end{axis}
\end{tikzpicture}
{% endhighlight %}

# In conclusion

It's remarkably easy, with this setup, to produce really good quality graphics to put on web pages, I originally wanted to learm something like `D3`, but realized I have no time to invest in this at the moment. Plus, the advantage of using a LaTeX-based system is that (in addition to the geek cred) you will be able to easily re-use material from different sources. For example, I can now easily tweak a figure I made for a paper, and put it online, just by changing the `axis` parameters. And given that everything is command-line based, you can really automate the whole process (just write a shell script taking care of LaTeX compilation, `imagemagick` conversion, and copying the figure at the appropriate place in your website folder).

The inconveninent is that this system is not dynamics, *i.e.* if you want to re-draw a figure because the data changed, you have to do it by hand, where `D3` will automatically take care of it. But for now, I'm happy enough with this system.
