---
title: Collaborating with markdown and bibtex
type: note
layout: post
author: Tim
tags:
- bibtex
- scholarly markdown
- python
---

The single most annoying issue when using `pandoc` to work collaboratively on
papers is that it might be difficult for other people to compile the paper if
they do not use your bibtex file. And if there is ony thing I avoid like the
plague, it's having several bibtex files all over the place. And I'm can't
be bothered to keep "Collections" or separate folders in Zotero. So clearly,
I had to code my way out of this one.

> Sept. 24, 2014 - I have updated the code to reflect changes in the
`bibtexparser` module

The good thing of using `pandoc` is that the citation syntax is remarkably
simple: `@key`. It means that using a simple `grep` command

~~~ bash
grep @[-:_a-zA-Z0-9]* ms.md -oh --color=never | sort  | uniq -u | sed 's/@//g' > bib.keys
~~~

, I can generate `bib.keys`, a list with all the keys encountered in
`ms.md`. The keys will be present only once, and sorted. The first few lines
of one such file are

~~~
allesina_competitive_2011
angilletta_temperature_2004
araujo_using_2011
baiser_geographic_2012
baskerville_spatial_2011
bluthgen_what_2008
~~~

Now, I need to take each of these keys, read my big `library.bib` file, and
extract only the entries that are cited in the document. So I installed a
[bibtex parser for python], and started doing exactly that. The amazing
thing is, this only takes four (interesting) lines:

~~~ python
#! /usr/bin/python2

import sys
import codecs
import bibtexparser

def di2bib(di):
    b = "@"+di['type'].upper()+"{"+di['id']+","
    for (k, v) in di.iteritems():
        if k not in ['type', 'id', 'abstract', 'doi', 'keywords']:
            b += k+' = {'+v+'},\n'
    b += '}\n'
    return b

if __name__ == "__main__":
    ## Check the number of arguments
    if len(sys.argv) != 4:
        raise ValueError("Wrong number of arguments")
    else :
        key_list = sys.argv[1]
        bib_file = sys.argv[2]
        out_file = sys.argv[3]
    ## The three arguments should be strings
    if not isinstance(key_list, str):
        raise TypeError("The path to the list of keys should be a string")
    if not isinstance(bib_file, str):
        raise TypeError("The path to the bibtex library should be a string")
    if not isinstance(out_file, str):
        raise TypeError("The path to the output bibtex file should be a string")
    open(out_file, 'w').close()
    keys = [kl.rstrip(":\n") for kl in open(key_list, 'r')]
    with open(bib_file, 'r') as bfile:
        refs = bibtexparser.load(bfile)
    used_entries = dict()
    with codecs.open(out_file, encoding='utf-8', mode='a') as ofile:
        for e in refs.entries:
            if e['id'] in keys:
                ofile.write(di2bib(e))
~~~

This code will print a list of all the keys in the `bib.keys` that have
*not* been matched to an entry in the main library file. If all went well,
this list should be empty.

And of course, you can nicely wrap things up in a `makefile`:

~~~ makefile
python = python2
refs = refs.bib
text = ms.md
library = /path/to/main/bibtex/file.bib

$(refs): bib.keys
   $(python) extractbib.py bib.keys $(library) $(refs)

bib.keys: 
   grep @[-:_a-zA-Z0-9]* $(text) -oh --color=never | sort  | uniq -u | sed 's/@//g' > bib.keys
~~~

I'm glad that I finally have a solution to this problem. Of course, a
multi-author version is not difficult to do (just have each author write
its own bibtex file, and put them all together before running `pandoc`). It
also means that my `pandoc`-using papers are going to finally be entirely
reproducible, as I'll distribute the references list in the *github*
repository.

[bibtex parser for python]: https://github.com/sciunto/python-bibtexparser
