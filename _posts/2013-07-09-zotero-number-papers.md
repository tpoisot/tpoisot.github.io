---
layout: post
type: note
author: Tim
title: What do I read (according to Zotero)? 
tags:
- zotero
- bibliometry
---

I've been playing around a bit with [Zotero][zotero] these last few days.
Zotero stores the data about your library in a `sqlite3` database, called
`zotero.sqlite`, and stored in your Zotero folder (`~/Zotero/` in my case, but
most likely something else in yours). The internal structure of the
database is very weird, and it took my a bit of poking around in `sqliteman` to
figure it out. But in the end, I was able to come up with a solution to count
the number of papers in each journal, stored in my library.

The `python` script is [available as a gist][zotstat]. When you run it
(assuming you've made a copy of the `zotero.sqlite` in the folder where the
script is, you will end up with a `journals.tsv` file, in which the two
columns are, respectively, the number of papers, and the journal title.

Because despite the feature being *in progress* for a few years now there is
still no bacth edit of journal titles (that I know of), it took me a bit of
cleaning-up in open office to check for duplicates, especially since my
current database is following me since the first year of my masters (so 2006).
So, what do I read? Here is the top 15:

| Journal                   | Count |
|:--------------------------|:------|
| Ecology Letters           | 202   |
| Ecology                   | 198   |
| PLoS One                  | 196   |
| American Naturalist       | 181   |
| PNAS                      | 156   |
| Oikos                     | 135   |
| Trends Ecol Evol          | 132   |
| Procs R Soc B             | 123   |
| Evolution                 | 120   |
| Nature                    | 119   |
| Science                   | 108   |
| J Evol Biol               | 101   |
| J Anim Ecol               | 71    |
| J Biogeogr                | 46    |
| Phil Trans B              | 45    |

So, what to make of this information? Note that by the time we reach number 12
or so in that list, the paper count decreases extremely sharply. Also, the top
five is not reallu surprising. I was expecting to see *Nature* and *Science*
rank higher on the list. There is still some inertia, as well, with *J Evol
Biol* and *Evolution* occupying high positions because I've read these some
much during my PhD and Masters. So I guess that (i) I'm definitely an ecologist
(also, *J Theor Biol* and *Theor Pop Biol* are lurking not far below), and (ii)
despite this having a very very long tail, I mostly read things coming up in
a few journals.

Now, the really pressing issue... How does it relates to their *Impact Factor*?
A quick survey of the table above shows that some high scoring journals are
quite low on the list, and some not-so-high scoring ones are nearing the top.
A quick googling got me the most recent IF for the first 30 or so journals of my
list. The results are plotted below (put your mouse over a dot to see the journal name).

<div class='scatterplot d3'></div>
<script type="text/javascript" src="{{ site.url }}/data/zotero-if.js"></script>

It doesn't look like there is much effect of the IF on wether or not I'll save
the paper in my library. And we can also see a small group of three journals
I read much more than their IF would "predict" (*Ecology*, *PLoS One*, and *The
American Naturalist*). So that turned out to be a fun little lunch coding
project. Don't hesitate to look at the code, I'm sure there is plenty of things
to make better.

[zotero]: http://zotero.org/
[zotstat]: https://gist.github.com/tpoisot/5958933
