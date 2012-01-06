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
iTree = PhyloTree('ancestor')
print iTree
{% endhighlight %}

The output of this command should be `(root, ancestor)`. The `root` is created by default to ensure that the most basal node is a branching. The interesting thing is that it's now relatively easy to add and remove species. The `PhyloTree` class has the `speciate` method, who takes two arguments: the name of the ancestor, and the name of the daughter species. Calling it will go through the tree, and replace the ancestor by the (ancestor, daughter species) branching. Let's try with:

{% highlight python %}
iTree = PhyloTree('0')
iTree.speciate('0','0_0')
print iTree
{% endhighlight %}

which results in the following tree: `(root,(0,0_0))`. And I know this is not the way speciation works, so there is also a `split` method, which will replace one ancestral species by two new species:

{% highlight python %}
iTree = PhyloTree('0')
iTree.split('0','1','2')
print iTree
{% endhighlight %}

will result in `(root,(2,1))`. This is all made possible by the `extinct` method, by the way, which will remove from the tree the species whose name is given in argument:

{% highlight python %}
iTree = PhyloTree('0')
iTree.split('0','1','2')
iTree.extinct('2')
print iTree
{% endhighlight %}

will result in `(root,1)`.

Although these classes are really basic at the moment, they allow me to easily keep track of who is related to who in my simulations. I'll most likely add a way to keep track of branch lenghts at some point in the near future.