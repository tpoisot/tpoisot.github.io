---
layout: post
title: Simulated phylogenetic trees and community assembly
summary: A python class to track the phylogenetic relationships in an emerging community.
author: Tim
tags:
- python
- interaction networks
- phylogenetics
---

I'm working on a toy model of community assembly in Python, and I thought it would be cool to have an easy way to keep track of the phylogeny. To do so, I've conceived two classes for the easy handling of phylogenetic structure. They are available on GitHub in the [`PyCoPhy` repository](https://github.com/tpoisot/PyCoPhy) (Python Community Phylogenetics), and check also the [code page]({{ site.url }}/code/).

The general idea behind them is quite easy to understand. A phylogenetic tree is a list of branchings. A branching is the junction of two objects, which I called `left` and `right`. Each of these objects can be an identifier (i.e. a leaf of the tree), or a reference to another branching (i.e. a node). It's as complicated as it gets.

Once `PyCoPhy` is loaded, to create a new tree with a species called `ancestor`, just type:

{% highlight python %}
tree = PhyloTree('ancestor')
print tree
{% endhighlight %}

The output of this command should be `(root, ancestor)`. The `root` is created by default to ensure that the most basal node is a branching.