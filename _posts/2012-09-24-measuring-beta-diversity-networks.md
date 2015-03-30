---
layout: post
title: Measuring the beta-diversity of species interaction networks
author: Tim
type: note
tags:
- beta-diversity
- R
- ecological networks
- open source
---

To reproduce the analyses presented in [our latest paper](http://timotheepoisot.fr/2012/09/20/beta-diversity-networks/), we wrote the [`betalink`](https://github.com/tpoisot/betalink) R package. This post is a walkthrough for most of the analyses. The help is not fully completed yet, and in any case, seeing examples is more informative than reading the manual. First thing first, go to the previous link, and download the package. Unzip it, open a terminal, and type

{% highlight bash %}
R CMD INSTALL betalink
{% endhighlight %}

If you open `R`, you can now load the package with  

{% highlight splus %}
library(betalink)
{% endhighlight %}

Past this point, I'm assuming you are familiar with our terminology, but if not, you can go [**read the previous post**](http://timotheepoisot.fr/2012/09/20/beta-diversity-networks/) (or even better, the paper). The package will think about collection of networks, most of the time. So you absolutely need to have a `list` of `matrix` objects. It's obviously important that species are named, *i.e.* set the `colnames` and `rownames` properties. The package do not care if you feed it unipartite or bipartite networks. This means that you can have the same names in rows ans columns (like you would in a food web), or you can have two distinct sets of names (like you would in a bipartite network).

Let's start with a simple example: two hosts, two parasites, two realizations:

{% highlight splus %}
w1 = matrix(c(1, 0, 0, 1), ncol=2)
w2 = matrix(c(1, 1, 0, 1), ncol=2)
colnames(w1) = c('p1', 'p2')
rownames(w1) = c('h1', 'h2')
colnames(w2) = colnames(w1)
rownames(w2) = rownames(w1)
{% endhighlight %}

The first step is to put these networks into a list:

{% highlight splus %}
realizations = list(w1, w2)
{% endhighlight %}

Now, we cant ask about the metaweb. The package proposes the `aggregate.metaweb` function:

{% highlight splus %}
metaweb = aggregate.metaweb(realizations)
{% endhighlight %}

The object returned is a list with three elements, `meta`, `template`, and `cooc`. All three objects are matrices, which correspond to different informations about the metaweb. `meta` is the one you are most likely to use, as it is the adjacency matrix of the metaweb. `template` is a matrix giving the frequency at which two species interacted (*i.e.* the total number of realizations in which they interacted, over the total number of realizations in which they co-occured). Finally, `cooc` gives the number of times two species co-occured, across all realizations. Note that most of the time, the `aggregate.metaweb` function will be called internally, so except when you want to have a look at the metaweb itself, there are few reasons to call it.

The next step is to measure the dissimilarity between your two networks. Once again, the process is mostly automated. Your need to pick a &beta;-diversity measure, to start. We implemented the 23 listed by Koleff and colleagues in their 2003 paper. They are coded `B01` to `B23`. In all functions, the default is to use `B01`. Note that if you want to use quantitative measures, the *framework* allows it, but this is not currently implemented in the *package* &mdash; but this is really simple to do if you need.

For any set of two networks, you can just call

{% highlight splus %}
betalink(w1, w2, bf=B01)
{% endhighlight %}

However, if you have a lot more networks, then the process can be automated, and you will get a pairwise distance matrix, through

{% highlight splus %}
betalink.dist(realizations, bf=B01)
{% endhighlight %}

If you look at the code for the `betalink.dist` function, you will see that the last argument is actually the catch-all, `...`. This means that if you want to modify the `betalink` function, which `betalink.dist` calls, you will be able to keep using `betalink.dist`. The only difference between `betalink.dist` and `betalink` is that the later returns the species &beta;-diversity for each side of the matrix separately (*i.e.* for the upper and lower levels in bipartite networks). Other than that, you get all of the components of the network &beta;-diversity, either as a list, or as a list of distance objects. Note that if your realizations are named, then the rows and columns of these distance matrices will be named as well.

At this point, you might want to *see* how things look, rather than just look at numbers. This option is nowhere in the paper, but I actually developed a way to plot network dissimilarity. You can use it through the `betalink.plot` function, which takes two realizations as arguments. It will plot a matrix, when interactions are color-coded: interactions which are found in both networks and do not experience turnover are in grey; interactions between species unique to realization one or two are, respectively, in green and blue; finally, interactions which are established betwen shared species, but experience turnover, are in orange. The good thing with this visualisation, an example of which is given below, is that, by looking at the relative area of each color, you can guesstimate the values of the different components of &beta;-diversity. A large grey/orange area means that most species are shared. More orange than grey means the turnover of interactions between shared species is high. And so on. The example below uses random networks, but you see the general idea.

![Figure1 - the betaplot]({{ site.url }}/images/betaplot.png)

   &nbsp;    

The last thing you may want to do is to measure the distance of each realization to the relevant portion of the metaweb (see Appendix 1 for the many reasons to do it). To do so, just use the `beta.os_prime` function, whose argument are a list of webs, and a &beta;-diversity measure.

You're now good to go, feel free to fork the package if you have any improvements to do, and email me in case of problems, I'll be glad to help you!
