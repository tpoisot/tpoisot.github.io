---
author: Tim
layout: post
title: Estimating edges contribution to network properties
type: note
tags:
- ecological networks
- modularity
- open lab book
- python
- networkx
- D3.js
---

I had so much fun writing the previous post about how it is possible to measure [nodes contribution to network properties]({{ BASE_PATH }}{{ site.JB.home_path }}2013/02/12/species-contribution-modularity/) that I wanted to see what happens when you remove edges. Also, I spent two hours this afternoon playing with [`D3.js`](http://d3js.org/), and I wanted to put what I've learnt in practice.

What I want to do is remove each *edge*, and see how it affects modularity. This is, once again, really easy to do in `networkx`. We'll just write a function similar to `removeNode`, and add the possibility to keep the nodes with no links, or to remove them. By default, I'll consider that any node with no remaining edge is removed.

{% highlight python %}
def removeEdge(web,edge,nozero=True):
	tempWeb = nx.DiGraph()
	tempWeb.add_nodes_from(web.nodes())
	tempWeb.add_edges_from(web.edges())
	tempWeb.remove_edges_from([edge])
	if nozero:
		Isolated = [n for n in tempWeb if tempWeb.degree(n) == 0]
		tempWeb.remove_nodes_from(Isolated)
	return tempWeb
{% endhighlight %}

To get the contribution of each edge to modularity, it's simple to just adapt the one-liner from the previous post into:

{% highlight python %}
delta_mod = [orig_mod-getModularity(removeEdge(G,e)) for e in G.edges()]
{% endhighlight %}

<span class='margin'>The ranking method I use (`rankdata` in `scipy`) averages the rank of tied elements. So that explains why the points are not evely spaced.</span>OK, so let's see what it looks like:

<div class='edgecontrib scatterplot d3'></div>
<!-- edgecontrib-rank.tsv -->
<script type="text/javascript" src="{{ site.url }}/data/edgecontrib-scatter.js"></script>

The values of &Delta; are low, but the message is simple: most edges, when removed, make modularity *decrease*. For the next step, it can be cool to visualize *where* in the networks these nodes are. `D3.js` is able to read `JSON` files to plot them as networks. So we just need to write a quick and dirty converter from , `networkx` to `JSON`, and tweak [this example](http://bl.ocks.org/4062045).

<span class='margin'>And it's [a good idea]({{ BASE_PATH }}{{ site.JB.home_path }}2012/11/23/how-to-represent-networks/) to use `JSON` to represent networks...</span>This is so quick and dirty that I won't reproduce it here, but I ended up with a `JSON` file containing the edges, and the nodes. For each node, the module it belongs to is known. For each edge, its contribution to modularity is known. What remains to do is to plot everything, thanks to the power of `D3.js`.

<div class='edgecolor network d3'></div>
<!-- edgecontrib-rank.tsv -->
<script type="text/javascript" src="{{ site.url }}/data/edgecontrib-network.js"></script>

In this plot (move the nodes around!), the red links decrease modularity when removed, and the blue links increase it. The color of the nodes reflect which module they belong to. A quick eyeballing of the graph shows that blue links are established between nodes sharing different modules. Which makes sense, as if you disconnect modules, you further increase modularity. It may look good, but it's not rocket science!

In any case, I'm quite happy about the whole thing. First, it's super straightforward to remove edges/nodes with `networkx`, and to measure how it affects network structure. Second, it's fast enough even on networks of a respectable size. And finally, this is perhaps the biggest revelation of the day: it's *easy* to use `D3.js`. It may not seem like much, but the two figures in this blog post are generated *from the original data*. So if I want to re-generate the data, the figures will change as well. There is even more potential when creating webpages for projects, so I'll look more into that.