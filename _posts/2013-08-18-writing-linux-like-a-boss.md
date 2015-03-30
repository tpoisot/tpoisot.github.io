---
title: Writing manuscripts in Linux (like a boss)
author: Tim
type: note
layout: post
tags:
- free software
- pandoc
- linux
- writing
- productivity
- scholarly markdown
---

Hey, it's been a year since I [switched to Linux][linux]. I've tried a few
different distros, and finally settled on [Arch Linux][arch] with
[OpenBox][ob]. It's ligthweight, uncluttered, and I love. But that's not what
I'm going to talk about.

I may have mentionned in the past that I used *Sublime Text 2*. During my quest
for ever-increasing minimalism, I've made the switch to `vim`. And I now have
a *cool* writing setup. Most of what I do is writing markdown files, and using
makefiles to use pandoc to convert them to PDF (read more about it
[here][make]). The only thing that missed was a lightweight PDF reader,
able to auto-refresh things. I have now found [*zathura*][zathura]. I am supper happy.

*zathura* is command-line based, and uses keyboard for interaction. So whenever
I am working on a document in a terminal (`rxvt-unicode`, in case you wonder,
with the *excellent* font [Envy Code R][envy]), I just need to do a quick
`zathura my-doc.pdf`, and I can see the output. Because *zathura*
auto-refreshes things, whenever I `make pdf`, the output is up to date. Just
like that.

And the point is: the productivity boost is amazing. I do everything from within the terminal (or rather, terminals, I have a few of them open at any time). And it's fast, ligthweight, and *responsive*. 

**And just in case you are curious**, a list of the *vim* plugins I use: 

- [pathogen](https://github.com/tpope/vim-pathogen) to easily install plugins
- [vim-gitgutter](https://github.com/airblade/vim-gitgutter) to see how my local file differs from the git version
- [vim-pandoc](https://github.com/vim-pandoc/vim-pandoc) for a lot of pandoc-related stuff, including *bibtex reference auto-completion*

[linux]: http://timotheepoisot.fr/2012/08/03/new-linux-setup/
[arch]: https://www.archlinux.org/
[ob]: http://openbox.org/
[make]: http://timotheepoisot.fr/2013/05/18/make-pandoc/
[zathura]: http://pwmt.org/projects/zathura/
[envy]: http://damieng.com/blog/2008/05/26/envy-code-r-preview-7-coding-font-released
