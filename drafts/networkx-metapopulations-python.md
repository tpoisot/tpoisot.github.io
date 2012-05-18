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

We had a lab meeting this afternoon about ...

# Setting things up

Before we start, we'll need a few things. Some modules are required: obviously `networkx` to deal with the graph objects, `numpy` to generate random numbers.

{% highlight python %}
import networkx as nx
import numpy as np
{% endhighlight %}

# Create a node class

The first thing to do is to create a class for the patches, which will be the nodes of our spatial graph.

# Create a spatially explicit graph

The next step is to create a graph. In `networkx`, this consist simply 

# Simulation

step 4 