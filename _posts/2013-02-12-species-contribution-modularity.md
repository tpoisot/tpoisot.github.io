---
author: Tim
layout: post
title: Estimating node contribution to network properties
type: note
tags:
- ecological networks
- modularity
- open lab book
- python
- networkx
---

I'm currently exploring a large network dataset for a project, and one of the things I want to do is estimate the contribution of each node to emerging networks properties. For example, if your network has an important modularity, which nodes are the most responsible for it? I'll just detail how it possible to get this information quickly using `networkx`.

<div class="alert alert-info">
<h4>Warning!</h4>
I'm just using this post to take notes on code I'm currently working on.
</div>

[Saavedra and colleagues][saav] proposed a method which is based on the randomization of the interactions of each species in the network. In a nutshell, to measure the contribution of a node to a network metric, you need to shuffle its interactions, and measure the difference between the original and shuffled network. This makes a whole lot of sense, and has the advantage of keeping size and connectance constant. But in my particular case, I'm more interested in measuring what happens when a node is lost, and how it affects the structure of the network. I'll show how to do that in `python`.

[saav]: http://dx.doi.org/10.1038/nature10433

Let's set up our environment. We need `networkx` and `numpy`, but let's also
load `matplotlib` for the visualization.

``` python
import networkx as nx
import scipy as sp
import numpy as np
import matplotlib.pyplot as plt
```

I'll use modularity as an example metric. For large graphs, the [*Louvain*
method](https://sites.google.com/site/findcommunities/) works well, and by
chance there is [a `networkx` implementation of
it](http://perso.crans.org/aynaud/communities/). So let's download it and place
it in the folder with the rest of the files, then load it with

``` python
import community
```

The next step is to create a function which will remove each node in sequence,
from the network, and return a copy of it. There is a `remove_nodes_from` method
of graph objects, but it modifies the original copy. Fortunately we don't need
to be very elegant here, and so the basic function is:

``` python
def removeNode(web,node):
	tempWeb = nx.DiGraph()
	tempWeb.add_nodes_from(web.nodes())
	tempWeb.add_edges_from(web.edges())
	tempWeb.remove_nodes_from([node])
	return tempWeb
```

The hardest work is done! Now, we need to go through the following steps.
1. Get the original value of modularity
2. Loop through each node, and calculate the delta of modularity

So let's write a function returning only the modularity value. The `community`
package does more than that, of course, but for the purposes of this simple
example, this will be enough.

``` python
def getModularity(web):
	D = web.to_undirected()
	dendo = community.generate_dendogram(D, None)
	partition = community.partition_at_level(dendo,len(dendo)-1)
	return community.modularity(partition, D)

```

With that in hands, we can start the analysis. Assuming that we have an edgelist
representation of our network, it's easy to load it and get its modularity:

``` python
G = nx.read_edgelist('network.txt')
orig_mod = getModularity(G)
```

The final step is to compare every possible network with one species removed to the original one. And this is why I love `python`, because as `networkx` objects are [iterable](http://networkx.github.com/documentation/latest/reference/classes.digraph.html), this is a one-liner:

``` python
delta_mod = [orig_mod-getModularity(removeNode(G,n)) for n in G]
```

<span class='margin'>It's just as easy to iterate on the *edges* rather than the *nodes*. Which actually makes more sense for modularity...</span>In clear, for each node called `n` in the network `G`, we substract the modularity of the network `G` with `n` removed from the original modularity. So what does it looks like?

``` python
plt.plot(np.sort(delta_mod),'ok')
plt.show()
```

This will generate the following output:

![Figure1]({{ site.url }}/images/nodcontr-s1.png)

Nodes with a value of &Delta; lower than 0 *increase* modularity when remove. As you can see, in this particular example, all but 3 nodes *decrease* modularity when removed. As a final twist, let's plot the network with the nodes color-coded according to the impact on modularity:

{%highlight python%}
plt.axis('off')
pos = nx.spring_layout(G,iterations=100)
nx.draw_networkx_edges(G,pos,alpha=0.07)
nodes = nx.draw_networkx_nodes(G,pos,node_size=20,node_color=delta_mod,
	cmap=plt.cm.Spectral,linewidths=0.0,weight=None)
plt.sci(nodes)
plt.colorbar()
plt.show()
{%endhighlight%}

This provides a nice visualization:

![Figure2]({{ site.url }}/images/nodimpact-gr.png)

<span class='margin'>The whole code is available as a [Gist](https://gist.github.com/tpoisot/4942162)</span>The redmost nodes are actually well connected to all modules, and it makes sense that removing them will reinforce modularity. In short, it's easy to run this analysis with `networkx`, because the graph objects are iterable. And the other good news is that it's fast (at least on reasonably sized networks), and in all cases faster than the permutation method I mentioned in the first paragraphs. Now to see how the two correlates (or not)...
