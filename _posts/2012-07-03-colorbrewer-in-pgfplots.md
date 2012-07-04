---
layout: post
title: Using Color Brewer schemes in LaTeX pgfplots
summary: blog
chapo: How to implement the Color Brewer schemes in pgfplots
author: Tim
type: note
tags:
- LaTeX
- pgfplots
- data visualization
---

[*Color Brewer*](http://colorbrewer2.org/) is an awesome project in which you can select color scales according to three kind of data you want to represent (diverging, sequential, qualitative). I use it in R all the time with the ```RColorBrewer``` package.

Last week, I started using [```pgfplots```](http://pgfplots.sourceforge.net/), a [```tikz```](http://www.texample.net/) extension for data visualization, to prepare slides for the upcoming [Evolution20120](http://www.confersense.ca/Evolution2012/) meeting in Ottawa. I thought it would be pretty cool to be able to use the *Color Brewer* scales in my talk.

Using ```pgfplots``` , it's really easy to define color cycles (for different series of points), and color maps (for surface plots). Given that the [*Color Brewer*](http://colorbrewer2.org/) website tells you the RGB values of each color when you select a scheme, it's really easy to re-implement the color schemes.

For example, you can do a nice color map with the *spectral* scheme:

{% highlight latex %}
\pgfplotsset{
    colormap={spectral}{
		rgb255(0cm)=(158,1,66); 
		rgb255(1cm)=(213,62,79);
		rgb255(2cm)=(244,109,67);
		rgb255(3cm)=(253,174,97);
		rgb255(4cm)=(254,224,139);
		rgb255(5cm)=(255,255,191);
		rgb255(6cm)=(230,245,152);
		rgb255(7cm)=(171,221,164);
		rgb255(8cm)=(102,194,165);
		rgb255(9cm)=(50,136,189);
		rgb255(10cm)=(94,79,162);}
	}
{% endhighlight %}

Or you can do a color cycle with the *Set1* scheme:

{% highlight latex %}
\definecolor{s1}{RGB}{228, 26, 28}
\definecolor{s2}{RGB}{55, 126, 184}
\definecolor{s3}{RGB}{77, 175, 74}
\definecolor{s4}{RGB}{152, 78, 163}
\definecolor{s5}{RGB}{255, 127, 0}
\pgfplotscreateplotcyclelist{set1}{%
  s1,every mark/.append style={fill=s1},mark=*\\%
	s2,every mark/.append style={fill=s2},mark=*\\%
	s3,every mark/.append style={fill=s3},mark=*\\%
	s4,every mark/.append style={fill=s4},mark=*\\%
	s5,every mark/.append style={fill=s5},mark=*\\%
}
{% endhighlight %}

Now that I think of it, it would be really easy to provide all of the brewer schemes into color map and color cycle form as an additional package. This is a project best left to someone with time on their hands.