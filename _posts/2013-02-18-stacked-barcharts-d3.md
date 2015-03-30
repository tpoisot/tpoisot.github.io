---
author: Tim
layout: post
title: A d3.js alternative to stacked bar charts
type: note
tags:
- data visualization
- D3.js
---

Following yesterday's post on [an alternative to barcharts](http://timotheepoisot.fr/2013/02/17/stacked-barcharts/), I decided to write an implementation of this graph in `D3.js`. The more I play around with it, the more I like it. As it turned out, it was fairly easy, so I'll [share the code as a gist](https://gist.github.com/anonymous/4982438).

For this particular example, I assume that the data are in a matrix, in `csv` format, with sites as the first row, and species abundances in columns. I also assume that the abudances were normalized between 0 and 1. The file I used to generate the example below is:

{% highlight text %}
site , spa  , spb  , spc  , spd , spe 
a    , 1    , 0.4  , 0.2  , 1.0 , 0.2 
b    , 0.9  , 0.7  , 0.1  , 0.4 , 0.1 
c    , 0.2  , 0.8  , 0.05 , 0.7 , 0.05
d    , 0.1  , 0.81 , 0.07 , 0.1 , 0.12
e    , 0.01 , 0.82 , 0.09 , 0.6 , 0.15
f    , 0.01 , 0.75 , 0.23 , 0.3 , 0.25
{% endhighlight %}

The end result is as follows:

<div class='stackbardemo barplot d3'></div>
<!-- stackbardemo.csv -->
<script type="text/javascript" src="{{ site.url }}/data/stackbardemo.js"></script>

Generating the small axes on the left was the most tricky part, and I used a probably sub-optimal way to do it:

{% highlight javascript %}
data.forEach(function(d, i) {
    if(i == 1){
       var y0 = 0;
      d.temp = color.domain().map(function(name, k) {
        var temp_y = d3.scale.linear()
          .rangeRound([(k+1)*(height/YMax), (k)*(height/YMax)+(height/YMax)*(1-OffSet)])
          .domain([0, 1]);
        var temp_yAxis = d3.svg.axis()
          .scale(temp_y)
          .orient("left")
          .ticks(3)
          .tickFormat(d3.format(".1s"));
        svg.append("g")
          .attr("class", "y axis")
          .call(temp_yAxis);
        return 0; 
      });
    };
  });
{% endhighlight %}

So if any one here is more knowledgeable in `javascript` than I am, I'd be really interested in finding a way to do without the `forEach` part.