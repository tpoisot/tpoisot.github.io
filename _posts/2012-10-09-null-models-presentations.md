---
layout: post
title: Presenting the results of networks null models
author: Tim
type: note
tags:
- data visualization
- ecological networks
- null models
---

I'm in the process of preparing a paper for submission, and I have been looking for a way to intuitively display the results of an analysis in which we compare deviation from expected nestedness and modularity of bipartite networks. In a recent paper, [Cesar Flores and colleagues](http://www.ncbi.nlm.nih.gov/pubmed/21709225) show rank-nestedness and rank-modularity curves, which is an interesting idea. But a point I really wanted to make is that a single network can deviate on both properties, and in both directions (which is to say, you can be more nested and less modular than expected, or less modular and equally nested, etc.).

All in all, there are only nine possible states for a network, if you test nestedness and modularity. It's a simple combination of the network being possibly less, equally, or more nested/modular, so 3 times 3 states. The visualization I settled with is halfway between a table and a figure:

![Figure1 - heatmap]({{ site.url }}/images/nullmodels.png)

The number within each quadrant represent how many networks have this property (*e.g.* for the leftmost dataset, 72 networks are both more nested and more modular than expected), and the shading is a measure of the proportion of networks falling within each quadrant. I quite like this method, because as illustrated above, you can easily compare different datasets at a glance, even when the number of networks differ. And you also get a sense of some interesting phenomenon: in the middle dataset, networks are clearly more nested, but equally less or more modular than expected.

The figures were made in `tikz`, and the code is really nothing complicated. If some of you are interested, it looks like this:

{% highlight latex %}
\tikzstyle{val} = [minimum size=1cm, inner sep = 0pt, draw=black, thick]
\begin{tikzpicture}
	\node[val, fill=black!9] (mpnn) at (0, 0) {12};
	\node[val, fill=black!2, right of=mpnn] (mpne) {8};
	\node[val, fill=black!57, right of=mpne] (mpnp) {72};
	
	\node[val, fill=black!2, below of=mpnn] (menn) {3};
	\node[val, fill=black!4, below of=mpne] (mene) {6};
	\node[val, fill=black!9, below of=mpnp] (menp) {12};

	\node[val, fill=black!1, below of=menn] (mnnn) {2};
	\node[val, fill=black!0, below of=mene] (mnne) {1};
	\node[val, fill=black!7, below of=menp] (mnnp) {9};

	\node[draw=none, fill=none, left of=menn] (mQ) {$Q_{bip}$};
	\node[draw=none, fill=none, left of=mpnn] (mQp) {\textbf{+}};
	\node[draw=none, fill=none, left of=mnnn] (mQn) {\textbf{-}};
	\node[draw=none, fill=none, below of=mnne] (nodf) {$N$};
	\node[draw=none, fill=none, below of=mnnp] (nodfp) {\textbf{+}};
	\node[draw=none, fill=none, below of=mnnn] (nodfn) {\textbf{-}};
	\node[draw=none, fill=none, above of=mpne] (lab) {\textbf{Panel title}};
\end{tikzpicture}
{% endhighlight %}
