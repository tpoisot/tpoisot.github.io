---
title: Using Vim as a writing environment
author: Tim
layout: post
type: note
tags:
- vim
- productivity
- writing
---

Happy new year, everyone! And to make sure it starts in a good way, let me
bring you the gift of productivity! Or specifically, how to set-up `Vim`
in a way that will transform it into an impressively efficient writing
environment. `Vim` is a really good code editor, there is no questioning
that. But writing code and writing prose are entirely different exercises,
and some tools you need to efficiently write code are only getting in the
way when you write prose. But `Vim` can handle that, and I'm going to share
my configuration with you.

## The font

I care *way too much* about fonts and typography. And as I spend several
hours each days looking at a terminal, picking a good font for writing is
important. What makes a font good will vary from person to person, but there
are a few common elements. I want glyphs that are easy to differentiate (`0`
*vs.* `O`, `l ` *vs.* `1`, for example), and a font with a good negative
space, so that reading long paragraphs of texts is not eye-straining. When
spending a few hours working on a paper, it can make all the difference in
the world to have a good, easily legible font. I use the [Cousine] family,
which can be freely downloaded. It works well as all sizes, and has a good
inventory of glyphs.

## The color scheme

No surprise, I use [Solarized] (light). It has a good contrast, and because
of the beige background, you don't feel like you are staring at a light
bulb. And the `solarized-vim` version comes with quite a very exhaustive
syntax set, so everything (i) works and (ii) looks great out of the box.

## The plugins

Although you can get my entire [`.vimrc` file][vimrc] from *GitHub*, I
will just walk you through the most important plugins. I manage them using
[vundle], and the ones I *absolutely need* to do some serious writing are:

{% highlight vim %}
Bundle 'tpope/vim-markdown'
Bundle 'mikewest/vimroom'
Bundle 'vim-pandoc/vim-pandoc'
Bundle 'altercation/vim-colors-solarized'
{% endhighlight %}

First, `vim-markdown` and `vim-pandoc` are extremely powerful extensions for
(you guessed it), `markdown` and `pandoc`. As I used these for *everything*
these days, having good plugins is a requirement. They introduce things like
autocompletion of citations from a `bibtex` file, and things like *replacing
LaTeX greek letters by the actual greek letter*, which means that when you
are looking at a paragraph, it shows no markup, but the formatting. It's
really, really amazing when you want to *read*.

The most recent addition to this collection is `vimroom`. This plugins
attempts to replicate the look and feel of *WriteRoom*, one of the many, many
"distraction-free" writing softwares. When editing a document, `<leader>V`
will center the text on the screen, with ample white-space on each sides,
and remove every piece of clutter from the "interface". It means that, if
you have a large screen, you don't need to turn your head all the way to
the left to read what you are working on.

---

So that's it! It's not much work, and it makes for a really pleasant writing
experience in `Vim`. And it's effortless to switch from "code" to "prose"
mode, making `Vim` a very versatile and productive tool.

[Cousine]: http://www.google.com/fonts/specimen/Cousine
[Solarized]: http://ethanschoonover.com/solarized 
[vimrc]: https://github.com/tpoisot/dotfiles/blob/master/vimrc
[vundle]: https://github.com/gmarik/vundle
