---
layout: post
author: Tim
type: note
title: A note on network complexity
tags:
- ecological networks
- statistics
- ecological complexity
- open lab book
---

I have seen the word *complexity* used to mean approximately anything in
ecological network litterature, and to be  extremely honest, I'm entirely guilty
of that myself. We can probably find as many uses for *complexity* in the
network litterature as there are uses for *paradigm* in Thomas Kuhn's *The
Structure of Scientific Revolutions* (which is to say, probbaly way too much,
and certainly enough to confuse people). It's getting bad enough that some
of us (and again, I'm probably guilty of that) use *complex network* any time we
should just say *network*. Or *species-rich network* (which we can argue is not
necessarily complex), or *densely connected network* (same thing). 

<div class="alert alert-info">
<h4>Warning!</h4>
This was supposed to be a short post. It's not. Unless you are terribly interested in networks, you can safely skip this one. If you have an eye for statistics, please read through, there are likely mistakes to correct...</div>


Consider this post my humble attempt to clarify things. The thing is, networks
are physically constrained, in that you can't put more edges in them than the
number of nodes will allow. In ecological terms, a predator won't eat a prey
more than once. So for example, one could argue that a very densely connected
network is not complex. The *dynamics of the community* probably will be, but
the network in itself has no exceptional properties to speak of. In the same
line of thinking, a minimally connected network is simple as well. It can have
1000 species in a linear chain, that won't give it any properties worth being
excited about (in terms of topology that is, because a super-long food chain is
pretty exciting by itself).

So let's start this way. What are the lower and upper bounds of the number of
links you can put in a network made of a given number of species? The key issue
is that there should be no species with a degree of 0, which is to say
everything should have at least one partner. To keep things simple, we'll assume
that we work on binary undirected adjacency matrices, with no self-loops.
Finding the lower bound is simple enough. If you want a strongly connected
graph, so that you can reach any node from any other node by travelling along
edges, the minimal number of edges if you have N nodes is simply N-1. If you
don't care about your graph being strongly connected, then the minimal number of
edges is (N+1)/2 if N is odd, and N/2 if N is even.

Whether you care or not about the graph being strongly connected, the maximal
number of edges in a graph with N nodes, *i.e.* a complete graph, is N(N-1)/2.
This is a starting point: for any number of N species, we can predict the
interval in which the number of interactions will fall. Now, keep in mind that
(species indentity nonwithstanding), there is only one way to have a complete
graph, and only one way to have the minimally connected graph. This is a cool
thing right here: most of the action will happen for intermediate number of
edges within the range! And a thing that serves our purpose: the maximal number
of edges is the maximal number of "slots" that we can fill with edges. This
becomes a quite simple combination problem.

So here is an interesting questions: knowing N, and a number of edges L, how
many different graphs can I produce? This is simple enough to solve, we just
need to calculate how many ways there are to put L elements in N(N-1)/2
elements. Let's call M the maximal number of edges, and the solution to this
problem is simply M!/(L!(M-L)!), which we will note C(M,L). For example, with
4 nodes, the maximal number of edges M is 6. How many ways are there to
distribute 5 edges between 4 nodes? Using the formula above, we get 6.

But that's not quite the original problem: among these 6 combinations, how many
of them leave at least one node unconnected? It took me a while to figure out
the rather simple solution. In the simple system with 4 species, and 5 edges, if
we assume that one species has no connection, then we will look for the number
of combinations of 5 edges, in the maximal number of edges allowed by 3 nodes.
With three nodes, there is at most 3 edges, and as it turns out, it's impossible
to make 5 edges fit in only 3 slots. So with this simple exercice, we can say
that there are 6 different networks of 5 edges and 4 nodes that have no
unconnected nodes.

Let's now try a slightly more complicated (noticed how I didn't wrote *complex*?
Good.) situation. Assuming 5 nodes, we will have between 3 and 10 edges.
A very interesting question is: if I have 3 edges to distribute in this network,
how many combinations can I do with no unconnected edges? C(10,3) gives 120 of
them. But, we need to account for the fact that some of these combinations
will result in nodes having no edges. Specifically, there are 20 ways to
distribute 3 edges in a 4 node network. Note that these 20 ways also include
all the possible combinations of 3 edges in a 3 nodes network, so just
counting the number of networks connecting at most N-1 is good. So here is the
routine: removing one node, how many combination can I make with the same
number of edges? The answer is simply the number of times I can distribute
L edges in a network of size N-1. In our example, as stated above, this is 20.
But we need to do that for *each* node in the network, so there are actually
100 (5 times 20) combinations we need to remove. This left us with only 20
"good" networks.

Let's wrap things up. If we call m(N) the mininal number of edges in a network
of N nodes, and M(N) the maximal number of edges in the same network, and C(X,L)
the number of ways to distribute L edges in X possible edges configurations,
then we can calculate the number of networks with N links and L edges for
which no node is unconnected. This is quite simply C(M(N),L)-N*C(M(N-1),L),
and we will call this R(N,L). You may not realize it yet, but this actually
quite cool. What does it means for complexity? Well, that	a network with
a given number of species will be more or less constrained in the diversity of
structure it can adopt, as a function of the number of interactions.

It is actually easy to measure the amount to which a network is constrained.
Simply dividing R(N,L) by C(N,L) will give an idea of how difficult is is to
find a network with no free nodes given N and L. There are important
applications, like predicting the time needed to generate null models of network
structure. But also, we can ask how many *different* networks we will be able to
generate for a given network size.

I ran some simple tests using 10 nodes, and here is what happenned.

First, the size of the "network space" is hump-shaped, which means that for
intermediate number of links, you have much more work to do if you want to
explore the possible configurations that your network can take. Things seems to
be *more* complex (or at least have more potential for complexity) at
intermediate connectance values.

![Figure1]({{ site.url }}/images/netspacedistrib.png)

Note that the number of networks with no free nodes is, all things considered,
quite close to the whole network space, so you'll have to be quite unlucky
not to have all nodes connected. But how strong exactly is the constraint
on network structure? Let's measure 1 minus the ratio of networks having no
free nodes:

![Figure2]({{ site.url }}/images/netspaceconstraint.png)

Quite simply, it shows that when the networks are not strongly connected, you
have a lot of chance to pick at random a network in which nodes are not
connected. This has important consequences for the geenration of null models: it
is *extremely difficult* to generate random networks based on large, sparsely
connected networks. You know what is large and sparsely connected? All
ecological networks. Yeah!

So, it's time to wrap things up. First, networks have more potential for
complexity when the connectance takes on intermediate values. That's a cool
little piece of information with some ecological potential. Second, the space of
extremely connected, and extremely sparse networks, is small, so both are
extremely constrained. Finally, sparse networks are difficult to generate if you
want all species to be connected. In short, if you want 1000 null replicates,
you'll need to run a lot more trials than that.
