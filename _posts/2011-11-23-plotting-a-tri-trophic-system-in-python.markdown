---
author: Tim
layout: post
title: Plotting a tri-trophic system in Python
summary: Using Python and Pyx to plot a tri-trophic network
tags:
- network ecology
- python
- visualization
---

I have been playing with simple communities made of three trophic levels in the last weeks, and I really wanted to have a way to plot them. Using Python and the _[PyX](http://pyx.sourceforge.net/)_ package, it was relatively easy to develop something. Most of the subtlety is to have the arrows representing trophic interactions going just near the circles representing species, but not to the point where they touch them. That's when I remembered that some greek guy going by the name [Thales](http://en.wikipedia.org/wiki/Thales'_theorem) may have the answer.

The function I wrote to shorten a line by a distance _d_ is the following:

{% highlight python %}
def shortenLine(x1,y1,x2,y2,d):
	a = (y2-y1)/(x2-x1)
	b = y1-a*x2
	od = np.sqrt(np.power((x2-x1),2)+np.power((y2-y1),2))
	R = (od-d)/float(od)
	x1b = R*(x2-x1)+x1
	x2b = R*(x1-x2)+x2
	y1b = R*(y2-y1)+y1
	y2b = R*(y1-y2)+y2
	return [x1b,y1b,x2b,y2b]
{% enghighlight %}

It's really simple, and it is probably the most complicated piece of code.

![](http://www.timotheepoisot.fr/wp-content/uploads/2011/11/tritrophic.png)

Once this is done, it was just a matter of (i) sorting species by their number of interactions, (ii) plotting them on their respective trophic levels, centered around 0, and (iii) adding the links. This was all very straightforward, [and the code is available here if you want to download it](https://gist.github.com/1389916). As the code use PyX, you will need a LaTeX install on your system. The code comes with an example, and the function `null_bernoulli`, whose job is to generate adjacency networks of a give size and connectance, with all species having at least one interaction.