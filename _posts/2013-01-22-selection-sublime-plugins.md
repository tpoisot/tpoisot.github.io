---
author: Tim
layout: post
title: A selection of Sublime Text 2 packages
type: note
tags:
- software
---

[*Sublime Text 2*](http://www.sublimetext.com/2) is an awesome multi-purpose text editor, working on all major platforms, and generally being `vim` with a nice GUI, and some `emacs` thrown in for good measure. Over the last year, it has become my daily weapon of choice. As it offers a complete API, many people developed *Python* packages for it, and I use a few of them almost daily. Following some discussions we've had on twitter, I figured I'd share them with everyone. The first one to install is [*Sublime Package Control*](http://wbond.net/sublime_packages/package_control). It allows you to open the command palette, and manage your packages. Notably, you can use the `Install packages` command to get a drop-down list of *all* possible packages available. They are also listed [here](http://wbond.net/sublime_packages/community).

So which packages do I use? I made a list of those I find the more useful, ranked by use frequency.

The first one is **LaTeX Tools**. It's plain awesome. You work on a LaTeX document, hit `Ctrl-B`, and it uses `latexmk` to take care of *all* the necessary compilation steps for you. And it implements `synctex` as well, so you can use `Ctrl-L J` to jump to the PDF, and right click on the PDF to jump to the text. Add a few other [great shortcuts](https://github.com/SublimeText/LaTeXTools) (transform a word in an environment with `Ctrl-L E`, or in a command with `Ctrl-L C`, for example), a very extensive auto-completion, and you have one of the best LaTeX editors available. Also, when using this package, do not forget that pressing `alt-q` anywhere in a line will hard wrap the paragraph. It's almost impossible to live without this function when you use git.

A really good companion to the above package is **WordCount**. It does what the name says: add a word and character count in the status bar. It updates the word count in real time, and when you mostly write using *Markdown* or plain text, it's extremely useful. To write in *Markdown*, which includes this blog, and most of the drafts of my papers, all the replies to referees, my meeting notes, and general note taking, I rely on **MarkdownBuild**, which allows to [quickly visualize](https://github.com/erinata/SublimeMarkdownBuild) the content of the file. A simple `Ctrl-B` brings up a browser windows with a HTML/CSS rendition of my file. When the documents are ready, I use `pandoc` to compile them. There are two packages for this, **Pandoc**, which provides a lot of output formats, and **Pandoc Academic**, which provides less formats, but is reachable in less keystrokes. Both also have some complementary snippets, so I keep both.

There are some plugins for `git`, but I don't use them, as I do my commits from the command line. Speaking of command line, though, the **Sublime REPL** package is difficult to avoid. It allows you to [run a variety of shells from within a tab in Sublime Text 2](https://github.com/wuub/SublimeREPL). Among the included languages are Python (including iPython), R, and a few others. You can also run a system shell, which I use to do my commits.

I also like **Align Tab** a lot. If you write in LaTeX, or use `csv` data, you know what this one is doing. Select a block of text, open the command palette and choose `Align tabular`, give the separator string, and *bam!*, a perfectly aligned table.

Going from this

{% highlight text %}
a b c d
1 2 21 3
abc dd e 456
{% endhighlight %}

to this

{% highlight text %}
a    b   c   d 
1    2   21  3  
abc  dd  e   456
{% endhighlight %}

means a whole lot in terms of readability. 

And while we're at readability, let's talk about color schemes. The defaults are good, but not impressive. My favorites are by far from [the **base16** project](https://github.com/chriskempson/base16). I'm fond of `Tomorrow Light` and `Railscasts Dark`, but many, many others are impressive as well.

When coding, I use **AndyPython** and **SublimeCodeIntel**. They provide some good auto-completion, and code intelligence. So it means that I don't need to remember the methods I put in my classes! And any technology allowing me to get progressively lazier is good (probably, I'd check it, but it would involve some efforts). All jokes aside, when working with large python libraries (`networkx` or `scipy` come to mind), it's almost impossible to do without these packages.

So be sure to check *Sublime Text 2* out. It's not free (but not too expensive either), and even if you don't pay, you can use the full feature set (and it is really, really impressive). Think of it as a *Photoshop* of text editing. After a year of using it, I realize I am probably exploiting less than 10% of its potential. It's one of the best pieces of software I've came across! And if you want to know more, [Karthik Ram](http://nature.berkeley.edu/~kram/) has a list of [bookmarks](http://pinboard.in/u:karthik/t:sublimetext) about it, which I encourage you to browse.