---
author: Tim
layout: post
title: The aggregate function in Python
summary: blog
chapo: Using Python to aggregate data along a given factor.
tags:
- python
- R
- scipy
---

One thing I love the most about R is the [aggregate](http://stat.ethz.ch/R-manual/R-devel/library/stats/html/aggregate.html) function, which (in a nutshell) summarizes a data frame according to one or more columns, and perform some operations on the aggregated values. If, for example, you have a data frame with a treatment and a response, and want to calculate the mean and standard deviation of the response by level of treatment, then aggregate is usually the way to go.

I wanted to do a quick [plot with errorbars using PyX](http://pyx.sourceforge.net/examples/graphstyles/errorbar.html), and I though that having a python version of aggregate would be really nice. Here is the complete code to do so

{% highlight python %}
import numpy as np
import scipy as sp  

def MSD(vec):
	return [np.mean(vec),np.std(vec)]  
def aggregate(df,by=0,to=1,func=np.sum):
	Dat = []
    ColBy = df.T[by]
    ColTo = df.T[to]
    UniqueBy = np.sort(np.unique(ColBy))
    for ub in UniqueBy:
    	uTo = ColTo[ColBy==ub]
    	Out = func(uTo)
    	Dat.append(np.concatenate(([ub],Out)))
    return Dat  
    
test_df = np.loadtxt('tes1-output.dat')  
Agr = aggregate(test_df,15,18,MSD)
sp.savetxt("aggr.dat", Agr)  
from pyx import *  
g = graph.graphxy(width=8)
g.plot(graph.data.file("aggr.dat", x=1, y=2, dy=3),
	[graph.style.symbol(), graph.style.errorbar()])
g.writePDFfile("errorbar")
{% endhighlight %}

As you can see, it is really straightforward. The aggregate function needs four arguments: the data frame (in this case, a numpy array with two dimensions), the column for the group to aggregate, and the column for the response. The last argument is obviously the function which will be applied, in this case a simple mean ± standard deviation. In 30 lines of code, you can easily aggregate your data using python. Of course there is room for improvement, but this is already working quite well.