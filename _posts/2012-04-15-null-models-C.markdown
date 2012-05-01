---
layout: post
title: Null models of bipartite networks in C
summary: blog
type: note
chapo: A fast way to generate random networks in C
author: Tim
tags:
- food web
- bipartite networks
- open source
---

I am currently revising a paper, and I need to run a lot of networks through two null models. And I need to do it a lot of time. I have a Python solution, for a dataset of this size (175 networks, some of them up to 100 x 100 in size), and with the need to have 1000 replicates each time... Python is not the right tool. I'm currently re-learning C, and I thought it would be a cool exercise to generate these random networks in C.

The code is on [GitHub](https://github.com/tpoisot/CNullModels) if you are interested. It's super fast. You need to have the [GSL](http://www.gnu.org/software/gsl/) installed to make it run. On a mac, to install it, after dezipping the archive, just

{% highlight bash %}
chmod +x configure
./configure
make
sudo make install
{% endhighlight %}

Once this is done, compile the null model generator using ```gcc nulls.c -o nm -lgsl -lgslcblas -O3 -DHAVE_INLINE```, and run in using ```./nm test.txt 3 7 1000 2000```. The arguments are, in order of appearance, a binary file containing the adjacency matrix (0/1) of the network, the number of columns, the number of sums, the number of random networks to do, and finally, the number of iterations after which to stop, no matter how many webs were succesfully created.

This last argument is especially important because I put restictions on what is a suitable network: it needs ot have at least one link by species present. In some cases, this will mean that the number of possible random networks given connectance and size is extremely small, and even a large number of trials can give no successful results.

The programm will generate one output file for each usable network, with the suffix ```_n1``` for Type I (connectance based) network, and the suffix ```_n2``` for Type II (degree based) networks.

My Python code took two days to run through the 175 webs, giving up after 1000 iterations at most. The C code was able to do the same, with 50000 iterations at most, in less than 30 minutes. C is awesome, and I feel dumb for not learing it sooner.