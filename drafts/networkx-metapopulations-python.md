---
layout: post
title: Using networkx to simulate metapopulations in Python
summary: blog
chapo: Simulation of spatially explicit metapopulations in Python
author: Tim
type: note
tags:
- python
- networkx
- metapopulation
---

Python progressively replaced R for most of my simulations. There are a lot of great packages for scientists, and since I started working on 

We had a lab meeting last week, during which we discuss

# Setting things up

Before we start, we'll need a few things. Some modules are required: obviously `networkx` to deal with the graph objects, `numpy` to generate random numbers.

{% highlight python %}
import networkx as nx
import numpy as np
{% endhighlight %}

Then we'll set a few parameters

{% highlight python %}
Patches = 100   # Number of patches
P_ext = 0.01    # Probability of extinction (e)
P_col = 0.014   # Probability of colonization (c)
P_init = 0.02   # Probability that a patch will be occupied at the beginning
Distance = 1.4  # An arbitrary parameter to determine which patches are connected
{% endhighlight %}

# Create a node class

The first thing to do is to create a class for the patches, which will be the nodes of our spatial graph. This is relatively easy to do, and we call this new class `patch`. Before writing up, let's think about what to put in. We need a simple parameter which we call `status`, whose value can be either `0` (the patch is empty) or `1` (the patch is occupied).

We'll also create a tuple called `pos`, to store the position of the node in a two-dimensional space. The resulting class is:

{% highlight python %}
class patch:
    def __init__(self,status=0,pos=(0,0)):
        self.status = status
        self.pos = pos
    def __str__(self):
        return(str(self.status))
{% endhighlight %}

I won't go into the detail of this notation, but you can read more **HERE** or **HERE** if you want. In any case, we now have a way to specify patches, with a spatial position and an occupancy. With this in hand, the next step is to create a network of patches, which will be the spatial landscape over which we simulate our metapopulation.

# Create a spatially explicit graph

There are a lot of ways to create spatial graphs, but for the sake of simplicity, let us assume that we will use simples rules. Nodes (patches) have a position (*x,y*), and two nodes are connected by an edge if the euclidean distance between them is inferior or equal to a fixed value. In other words, we can decide how close two patches should be to allow migration to occur.

In `networkx`, creating a graph is easy, and is done by

{% highlight python %}
G = nx.Graph()
{% endhighlight %}

We will now generate as many (`Patches`) patches as needed, and put them on the landscape at random.

{% highlight python %}
for i in xrange(NPatch):
    Stat = 1 if np.random.uniform() < PSp else 0
    Pos  = (np.random.uniform()*10-5,np.random.uniform()*10-5)
    G.add_node(patch(Stat,Pos))
{% endhighlight %}

This require at least Python 2.6, but you can easily rewrite the problematic first line as an `if/else` block.

# Simulation

step 4 