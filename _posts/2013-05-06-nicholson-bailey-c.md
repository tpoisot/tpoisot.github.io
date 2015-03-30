---
author: Tim
layout: post
title: A C version of the Nicholson-Bailey model
type: note
tags:
- open lab book
- C
- parasites
- models
- species interactions
---

The Nicholson-Bailey model is a [well known](http://en.wikipedia.org/wiki/Nicholson%E2%80%93Bailey_model) model of host and parasitoid population dynamics.  It assumes that parasitoids will search a fraction of their habitat for hosts, and then kill them. Yes, it's brutal like that. There are a few fun things with this model. It's light in parameters (the single-patch version requires only three parameters), it's in discrete time (so it's easy to program), and it's classical put on a lattice (so it's a good way to program these kind of things).

I wanted to test a few things, so I had to re-implement this model in space. My [first version](https://gist.github.com/tpoisot/5528745) uses python, but it's remarkably slow. So I decided to write the [model in C](). Either the model is really easy to program, or I'm getting good (I vote for the other solution, because I'm sure my code is full of horrible things), but it was relatively easy to do. [Go get it](https://gist.github.com/tpoisot/5528759) and play around. The `GSL` is required. To get it to run, you'll need to:

{% highlight bash %}
mkdir grids
mkdir png
clang nb.c -o nb -lgsl -lgslcblas -O3 -DHAVE_INLINE
chmod +x nb
./nb
{% endhighlight %}

The parameter names are relatively easy to understand. `Lh` and `Lp` are the rate of increase of the host and parasite, `a` is the proportion of space searched, and `dh` and `dp` are the dispersal rates. <span class='margin'>I've never quite understood the relevance of reflective boundaries for lattices of small sizes, unless you model what happens in your garden...</span>Note, by the way, that the world is spherical, so if you reach the edge of the lattice, you emerge on the other side. Other than that, dispersal is strictly local: you disperse to your 8 neighboring cells, and you receive migrants from them as well, with equal probability for each neighboring cell. There is no long-range dispersal either.

The `png` folder is used by another script, reproduced below, whose job it is to (i) read the output files, and (ii) do a plot using `matplotlib`.

{% highlight python %}
import numpy as np
import scipy as sp
import matplotlib.pyplot as plt
import os
from progressbar import *

def uniq(seq):
	keys = {}
	for e in seq:
		keys[e] = 1
	return keys.keys()

def rml(st):
	return st[2:-4]

# Read all text file in grids/
# Output them all in png/

grid_path = './grids/'
png_path = './png/'
dirList = os.listdir(grid_path)
dirList = np.sort(uniq(map(rml, dirList)))

out = np.zeros([len(dirList),4])

pbar = ProgressBar(maxval=len(dirList)).start()
i = 0
for sim in dirList:
	# Update of the progressbar
	i += 1
	pbar.update(i)
	# Timestep
	SimTime = int(sim)
	# Get the filenames
	h_name = grid_path+'h_'+sim+'.txt'
	p_name = grid_path+'p_'+sim+'.txt'
	# Read the grids
	h_grid = np.loadtxt(h_name)
	p_grid = np.loadtxt(p_name)
	prev_grid = (p_grid+1) / (h_grid+1)
	# Output it as a png (host)
	plt.imshow(np.log10(h_grid+1),cmap=plt.cm.Greys, interpolation='nearest')
	plt.axis('off')
	plt.savefig(png_path+'h_'+sim+'.png', bbox_inches='tight')
	# Output it as a png (parasite)
	plt.imshow(np.log10(h_grid+1),cmap=plt.cm.Greys, interpolation='nearest')
	plt.axis('off')
	plt.savefig(png_path+'p_'+sim+'.png', bbox_inches='tight')
	# Output it as a png (prevalence)
	plt.imshow(prev_grid,cmap=plt.cm.Greys, interpolation='nearest')
	plt.axis('off')
	plt.savefig(png_path+'prev_'+sim+'.png', bbox_inches='tight')
	# Save the aggregated infos
	out[SimTime] = [SimTime, np.sum(h_grid), np.sum(p_grid), np.mean(prev_grid)]
pbar.finish()

np.savetxt('dynamics.txt', out)
{% endhighlight %}

An example result would look something like this:

![Figure1]({{ site.url }}/images/nb-static.png)


But the fun part is that, with a few extra steps, you can have cool looking videos. I used `ffmpeg` to do it. It's as simple as getting all of the files in the `png` folder, and putting them together to have an animated, step-by-step output of the model:

{% highlight bash %}
#!/bin/bash
ffmpeg -qscale 5 -r 20 -b 9600 -i png/h_%05d.png host.mp4
ffmpeg -qscale 5 -r 20 -b 9600 -i png/p_%05d.png para.mp4
ffmpeg -qscale 5 -r 20 -b 9600 -i png/prev_%05d.png prev.mp4
{% endhighlight %}

The C program is quite fast (500 steps with a 100x100 lattice can be done in just a few seconds), but the script to convert the text files in images is really slow. I'm talking tens of minutes slow, so go make yourself a coffee. It's also extremely hungry in terms of memory, and as with all things Python, will eat up a whole CPU. But it's worth it! I've uploaded an [example video](http://www.youtube.com/embed/wE3x5QABBug) if you want to see.

And now... Back to doing whatever I had in mind with this model!
