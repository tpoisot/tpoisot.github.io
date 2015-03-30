---
layout: post
title: The friends of my friends (are on twitter)
author: Tim
type: note
tags:
- social networks
- ecological networks
- python
- networkx
- igraph
---

Twitter is cool for science, because it can [help you spread your ideas](http://timotheepoisot.fr/2011/11/19/get-your-lab-on-twitter/). And when you work with networks, Twitter is cool because it means a huge amount of data. With virtually no sampling effort. What has been said on the dynamics of, *e.g.*, the Arab Spring, using social networks, was amazing, and I started developping a curiosity about what can be said about them with an ecological eye.

I'm running pilots for a cool side project involving this kind of things, so I spent some time playing around with various metrics. One I liked a lot come from a paper by [Olesen and colleagues](http://www.pubmedcentral.nih.gov/articlerender.fcgi?artid=2148393&tool=pmcentrez&rendertype=abstract) about the modularity of mutualistics interactions. In a few words, you can measure, for each species, its contribution to its own module (*z*), and to other modules (*c*). The relative values of *c* and *z*  allows then to classify a node as "peripherals" (just hanging around), "connectors" (not really involved locally, but really involved in other groups), "module hubs" (highly involved locally, but not really involved globally), and "network hubs" (connected both within their group, and globally). Doing so requires to have cutoffs, the rationale for which is still not clear to me (but I'll go read the original paper). Nonetheless, high values of *c* indicate that a node is strongly connected outside its community, and high values of *z* indicates that it his highly connected within its community.

This is an ecological tool that I can understand, and it makes sense in a social perspective, so I decided to see what these values look like in a twitter network. The data I'm working on are all of my followers, and all of my friends, and all of the interactions between them. Getting these data, with a bunch of [python programming](https://github.com/bear/python-twitter), is quite easy (although terribly long, because the number of requests per hour is limited). I ended up with 18505 edges, and 505 nodes. Not that high, but hey, still [larger than most food webs we know](http://www.nceas.ucsb.edu/interactionweb/resources.html)!

![Figure1 - twitter zoom]({{ site.url }}/images/twittzoom.png)

The first (striking) thing is that my network is less modular than I would have expected. You see a few cliques, the more remote (purple) one being my french contacts, and the green and red nodes are other people related to science and the environment in various ways. What about the *c* and *z* values? I'm coming to it. The question I decided to play with is the following. On twitter, you can follow, and be followed. Assuming that information travels from the follower to the followee, this is a benefit for the later, who receives new informations. A mutualistic relationship is then defined as a bi-directional interaction (i.e. reciprocal following). So, who are the people with the most mutualistic behavior?

To start, let's define a metric of cooperativeness, which would tell us how many of the people who follow me I follow back. Let's call *Di* the number of incoming links, and *Do* the number of outgoing links. Then we'll call *S* the number of outgoing links to someone with an incoming link to me. Let's finally call *U* the number of people who follow me, but who I don't follow. We want an expression of all these terms, which is close to 1 when *U* is close to 0, and close to 0 when *S* becomes smaller than *U*. It's not too difficult to find an expression, such as

$$R = \frac{S}{S+U}$$

As we can express *U = Di - S*, I fixed the "reciprocity coefficient" as:

$$R = \frac{S}{D_i}$$

And assumed that the higher it is, the more mutualistic people are. The two biggest correlates of *R* are the number of people you follow (*Do*, r = 0.49), and your contribution to your own module (*z*, r = 0.47). Surprizingly, there was no correlation between your ability to connect different modules (*c*) and your likelihood of friending people who friend you. At this point, note that, given that the network is directional, all the algorithms used account for this. A node with incoming links from all modules (*i.e.* getting information from all), but no outcoming link (*i.e.* giving information to none) has a low value of *c*.

So there it is. People active in their community are more likely to return your friendship, and people active across all communities are less likely to do so. There are now a few things I would like to do with this network (more details about the modules, and things related to null models). One of the most exciting potential is to go through the second degree of separation, *i.e.* the friends of my friends, and all of their interactions. Last time I checked, it resulted in several *millions* nodes, and a lot more interactions. Scalability issues become key, and the only solution is to have a brutally huge amount of RAM to run things on (because network algorithms get dirty really fast). I do have that -- though what I don't have is that time to implement new code.

Network ecologists should probably pay attention to what happens in social network analysis. It's becoming a science dealing with large amounts of data. This means that they are developping efficient data structures (you [know where I stand on this point](http://timotheepoisot.fr/2012/11/23/how-to-represent-networks/)), and efficient algorithms to deal with them. As we can safely expect that we'll have access to both more networks, and more species and interactions in these networks, we should not pass the opportunity to develop tools, and train ourelves to their use, on the data already out there. Complementarily, there are some questions which could definitely benefit from some ecological tools. Playing with this network, I understood what Newman mentionned in *Networks*: the problem of network analysis is that so many people use the tools for so many different things, that the methodology and the litterature are bound to form isolated clusters.

**P.S.:** For those interested, I used [gephi](https://gephi.org/) and [networkx](http://networkx.lanl.gov/) for all the analyses. *Gephi* is wonderful for plotting, and *networkx* is just wonderful. I've also tried the R and Python version of the *igraph* library, but I prefer the syntax in *networkx*.
