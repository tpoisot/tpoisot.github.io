---
layout: post
title: How to represent networks
author: Tim
type: note
tags:
- ecological networks
- species interactions
- data management
- open lab book
---

One big problem to people working with ecological networks is that most of the time, the data are not easy to get. Collections of food webs or mutualistic networks are passed from researcher to researcher, and it can be difficult to get your hands on a large database. Even if you have the data, you still have to put them in a "good" format, and it's not always an easy task. It implies looping through text files, putting the webs in good shape, looking for species names, and so forth.

<div class="alert alert-info">
<h4>Warning!</h4>
This is a long entry, with code, and geeky considerations about data format. It's mostly for my personnal reference, so you may want to find <a href='http://www.theuselessweb.com/'>a better way to waste your time</a>.
</div>

# The problem

As an example, look at what is available on the [InteractionWeb Database](http://www.nceas.ucsb.edu/interactionweb/). For our [*Methods in Ecology & Evolution* paper](http://onlinelibrary.wiley.com/doi/10.1111/j.2041-210X.2011.00174.x/abstract) on estimators of species specificity, I had to fetch all of the networks, then look on the main page the number of top and bottom level species, then check that they were always in the same configuration. To make a long story short: they were not. It did not took me this long to get it right, but it was frustrating. I had to open an Excel file, with the network "code", the text file path, the number of top and bottom level species, and finally the type of interaction. Difficult? No. Boring? Yes.

Keep in mind that *IWDB* is the only resource for people wanting to download networks to, *e.g.* test algorithms, or check the distribution of some properties. And it involved a lot of groundwork before you even get to do the basic stuff. This is frustrating, and this should not be. Which brings me to a question that has been floating in my mind for a few months now: how should interaction networks be coded, from a data management point of view? This is an important question, because our ability to develop networks as a predictive tool will be as good as our ability to do data-mining on these networks. And in 2012, looking through text files is not the solution (it should not even be considered *a* solution). And yes, I'm ashamed to be part of the problem, because when I recently released data about [bacteria-phage interactions](http://figshare.com/articles/Bacteria-phage_adjacency_matrix_along_an_environmental_gradient/97583), I put three text files in a zip archive, and called it a day. Then, while I was thinking about why [populations matter more than species](http://timotheepoisot.fr/2012/10/29/species-interaction-networks/) in the context of networks, I started to develop a feeling about a data structure.

It starts with a simple question: *what's in a network*? One way networks are usually represented is as a matrix (the *IWDB* will give informations this way):

{% highlight bash %}
0 1 1 0
0 0 0 1
0 0 0 1
0 0 0 0
{% endhighlight %}

Alternatively, we can write them as an edge list:

{% highlight bash %}
a b
a c
c d
b d
{% endhighlight %}

Both notation represent the same "diamond" food web, and can also convey some information about link strength, species biomass, *etc*. But do they convey a lot of *ecological meaning*? I'm not really sure. So instead of having all the network at one big entity, let's break it down in several smaller chunks. A network is a collection of interactions, so let's start by representing an interaction.

# A solution?

In the most basic sense, an interaction is the union of two populations. This should be the building bloc of our network database:

{% highlight json %}
{
	"ID": "MyDB_I_00001",
	"from": "MyDB_P_00001",
	"to": "MyDB_P_00002",
	"info": {
		"binary": true,
		"directional": false,
		"strength": 1,
		},
	"type": "predation",
	"notes": "none"
}
{% endhighlight %}

This is a simple [JSON](http://en.wikipedia.org/wiki/JSON) object, with three central informations: a unique indentifer (`ID`), two species (`from` and `to`), and a series of informations (`info`). Within `info`, you have two booleans; `binary` tells you if this is a presence/absence or quantitative measure, `directional` tells you if the interactions is, well, directional (in which case `from` and `to` are important), and `strength` is the interaction strength. Finally, the `type` property can tell which kind of interaction this is. Not rocket science so far.

Note that the identifier for species and interactions I used have some structure to them: name of the database, type of object, object identifier. This ensure that every group can maintain its own database (*e.g.* my test one on the university servers can use the prefix `uqar_`), and if you choose to clone databases from other people, then you still know where the information come from. The second part is `I` if the object is an interaction, and `P` if it is a population. The last part is a unique identifier. All of this can be automatically filed when interactions are deposited into the database.

Poincarré said that you make a science with facts as you make a house with bricks, but a pile of facts is not a science anymore than a pile of bricks is a house. Just like a collection of interactions is not a network. The first thing we need to do is to define another object, for networks. It's not really complicated. The edge list I've mentionned above is interesting because it sortes informations quite efficiently (there are much more non-interactions than they are interactions, so a matrix is a waste of space). Let's have our network be a list of interactions:

{% highlight json %}
{
	"ID": "MyDB_N_0001",
	"links": ['MyDB_I_00001', 'MyDB_I_00002', 'MyDB_I_00003'],
	"date": "2012_14_11",
	"GPS": ["48_28_14_n","68_31_17_o"],
	"env_type": "microcosm",
	"notes": "none"
}
{% endhighlight %}

This should be relatively straigthforward. There is, again, an `ID`. The `links` component is a list of interactions, *i.e.* the list of `ID` of interactions. The other fields are a minimum set of informations, namely the time, place, and type of environment.

This may seem like a lot of brackets for basically the same result as the edge list. But the interesting point is that, by having an object for populations, we can start adding *a lot* of ecological context to these data. As an example:

{% highlight json %}
{
	"ID": "MyDB_P_00001",
	"tax": "MyBD_S_00001",
	"pop": {
		"units": "individuals",
		"n": 42
	},
	"traits": [
		{
			"name": "body_size",
			"measure": "mean",
			"value": 12.1,
			"units": "cm"
		},
		{
			"name": "body_mass",
			"measure": "mean",
			"value": 362.7,
			"units": "g"
		}
	],
	"notes": "none"
}
{% endhighlight %}

This is probably where most of the action will happen. The interesting property here is `tax`, which can be linked to another type of objects in the databse. Without going into more details, the `tax` field will tell you which species or group of organism this population belongs to. For example, you can use a [NCBI Taxonomy ID](http://bioportal.bioontology.org/ontologies/45846?p=terms&conceptid=EDAM%3A0001179). This, in turn, will allow you to go dig into [TreeBase](http://treebase.org/treebase-web/home.html), using one of the [ROpenSci packages](http://ropensci.org/) designed to do so.

# What next?

I'm really interested in putting together a database to see how feasible this is. Having a robust data format, and access to all these data in a programmatic way, will greatly increase our ability to understand and compare networks. I don't think there is any chance that we'll be able to make important breakthrough, especially as far as biogeography is concerned, without a centralized database.

I'm still thinking about some other informations we need (bibliographic context, for example). I have a set of data from an almost-succesfull experiment, which I'll probably release as a data paper. It will be the occasion to go the extra mile, and put together something useful. And in case anybody has suggestions, I'm happy to hear them.
