---
author: Tim
layout: post
title: An alternative to stacked bar charts
type: note
tags:
- data visualization
---

I hate stacked bar charts. I see them in so many papers, using the awful Excel default options, and I hate them. I feel them visually unappealing, confusing, and extremely inefficient at displaying information. It's almost impossible to compare the size of two bars without measuring them, which means that they carry less information than a good old table. So I was looking for alternatives to them. Here is the code I ended up with.

First let's load a few packages, and generate some random abundance data. Let's imagine that we have 10 sites, and we sample 20 species.

{% highlight splus %}
library(RColorBrewer)

Abund = round(matrix(runif(200,0,1),nc=10),2)
Abund = Abund/max(Abund)

rownames(Abund) = LETTERS[c(1:nrow(Abund))]
colnames(Abund) = letters[c(1:ncol(Abund))]

pal = colorRampPalette(brewer.pal(9,'Paired'))(nrow(Abund))
{% endhighlight %}

This will give us a site/abundance matrix. The next step is to create a plot with nothing in it:

{% highlight splus %}
par(las=2)
X = c(1:nrow(Abund))
Y = c(1:ncol(Abund))
image(X,Y,Abund,col='white',axes=FALSE,bty='n')
{% endhighlight %}

<span class='margin'>It's easy to make it so that the width of each sub-plot is proportional to the relative abundance of each species.</span>Then, for each row/line (and I'm aware this is not optimized at all), we will draw a vertical bar. Each taxon (*i.e.* each column in our graph) will have its own sub-plot. The size can be fixed, or equal. But this allows comparison of species abundances across dates.

{% highlight splus %}
for(ro in 1:nrow(Abund)){
	for(co in 1:ncol(Abund)){
		rect(ro-0.5, co-0.4, ro-0.5+Abund[ro,co]*0.9, co+0.4,border=NA,col=pal[ro])
	}
}
{% endhighlight %}

Finally, let's add reference lines for each species, and the site/species names on axes:

{% highlight splus %}
abline(v=X-0.5,col='darkgrey',lwd=2)
axis(2,at=c(1:ncol(Abund)),labels=colnames(Abund),col=NA)
axis(1,at=c(1:nrow(Abund)),labels=rownames(Abund),col=NA)
{% endhighlight %}

This gives the final result:

![Figure1 - grouped bar chart]({{ site.url }}/images/stackedbar.png)

I find it much easier to eyeball the variation of species abundance across sites. And if instead of sites you have dates, then by reading each column, you can get and idea of the population dynamics (which is usually impossible to do for stacked bar charts, except for the bottom series). This is far from perfect, but that will do the job for exploratory work.
