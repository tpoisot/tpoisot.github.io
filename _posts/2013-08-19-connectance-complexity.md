---
title: Complexity and connectance of ecological networks
author: Tim
layout: post
type: preprint
tags:
- ecological networks
- ecological complexity
---

So my [blog post on ecological complexity in networks][ecopost] turned into
a manuscript, now online as a preprint at [*PeerJ*][ms]. We'll send it up for
review (at *PeerJ* also) in a while, but feel free to read it and give us
feedback using the [github issues tracker][gh]. We'd like that very much,
actually. And as the github repository is public, feel free to
fork/edit/push modifications if you have something to contribute to
the paper.

In a nutshell; we argue that connectance is still a central property of
networks. For one thing, (i) it constrains how much different networks exists
for a given species number, which was the point of the original post. But more
importantly, (ii), because a given connectance implies a given number of
interactions, connectance imposes structural constraints on networks
properties. Or in other words, all important moments of the degree distribution
vary with connectance. And it works quite well with Erdos-Renyi graphs, and
with the famous "niche" model of food webs.

It's kinda cool, because connectance is *simple* to measure, and even people
that no background in network analysis will get what it means. It also means
that from a purely statistical point of view, any effect of the degree
distribution must be controlled for an effect of connectance. 

*P.S.*: This is a good example of [Codelust][codelust] in practice. The
original script were written over a particularly greasy and disappointing club
sandwich eaten alone in my office, so at least something productive came out of
this particularly bleak view of the academic daily life...

[ms]: https://peerj.com/preprints/50/
[gh]: https://github.com/tpoisot/ms_connectance_complexity/issues
[ecopost]: http://timotheepoisot.fr/2013/06/19/notes-on-network-complexity/
[codelust]: http://timotheepoisot.fr/2013/08/05/codelust/
