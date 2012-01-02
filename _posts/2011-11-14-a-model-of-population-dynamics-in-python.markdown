---
author: tpoisot
layout: post
title: A model of population dynamics in Python
summary: Using python (and scipy) for ecological simulations. It's easy!
tags:
- python
- R
- scipy
- simecol
- simulations
---

I've been using [Python](http://python.org/) more and more to do various things. When compared to [R](http://cran.cict.fr/) (which I use a lot), Python is not more difficult to write, and a whole lot faster. I've started exploring tools to use Python for ecological simulations, and specifically the [scipy](http://www.scipy.org/) library. In R, my usual tool is the [simecol](http://simecol.r-forge.r-project.org/) package, which implements a lot of numerical integrators, and most notably [`LSODA`](http://www.oecd-nea.org/tools/abstract/detail/uscd1227) (which is awesome for many many reasons, including but not limited to its ability to switch between stiff and non-stiff problem at each step).

In simecol, modeling a population dynamics requires to write a function taking as an input a vector of population sizes, some parameters, and the time. The purpose of the package is to provide a wrapper around such functions. After using this package more or less non stop for 3 years, I've become accustomed to this way of writing things, and I was afraid that I may have to change my habits. I was really happy to discover that [scipy.integrate.odeint](http://docs.scipy.org/doc/scipy/reference/generated/scipy.integrate.odeint.html) in scipy, was both an implementation of the LSODA, and worked in the exact same way that simecol did.

To write a simulation of population dynamics (I'll use logistic growth as an example), we first import the relevant parts of the scipy library.

{% highlight python %}    
import scipy as sp
import scipy.integrate as sp_int
{% endhighlight %}

  
Next, we write the function modeling the population growth, as a function of
two parameters, *r* and *K*.

    
{% highlight python %}    
def logistic(y,t0,r,K):
	dY = y[0] * (r - y[0] / float(K))
    return [dY]
{% endhighlight %}

  
The syntax is relatively easy. Note that `t0` is not used by the function at any time, but is required by `odeint` to do its internal calculations. Note also that y is an array. These two parameters are required, and the other are optional. Next, we fix the values of _r_ and _K_. The required format is a tuple, so you need to be very careful when passing the parameters: they must be in the same order than in the function declaration. Additionally, we'll declare a starting population size.

    
{% highlight python %}
params = (0.3,10)
y = [0.01]
{% endhighlight %}
    
Now we will do the actual numerical integration. This is fairly simple.

{% highlight python %}    
log_growth = sp_int.odeint(func=logistic,y0=y,t=range(0,600),args=params)
{% endhighlight %}
  
Note that we define an array called `t`, in which the times at which integration needs to be performed are stored. The object `log_growth` will have all the information required to analyze the simulation results, with the time in the first column, and the population sizes after. This kind of object is fairly easy to plot using, e.g. [PyX](http://pyx.sourceforge.net/).

Although this was a simple example, it illustrates how easy it can be to program a simple simulation using python. I must admit that I was nicely surprised to see the rapidity of the process, and the gain in execution time when compared to R is definitely not something to neglect.