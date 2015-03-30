---
author: Tim
title: Mapping ecological concepts using twitter
type: note
layout: post
tags:
- twitter
- social networks
---

I've been setting up a Twitter account for the [French Ecological
Society][sfetwit], and while we currently use it as a tool to relay the various
informations we want to share, it's also a great way to engage with people. So
the question that immediately came to mind is: what kind of topics are
associated with ecology on twitter? My own twitter list is a poor indicator of
the "general public" as far as ecology is concerned, so I had to look for
another solution.

Twitter offers a series of *Streaming API*, which allows to "listen" to the
conversation, by tracking some keywords, or users, or geographic location. So
I downloaded the excellent [`TwitterAPI` ][twpyth] module for `python`, and
tracked a series of keywords. After some trial and error, I settled on
`biodiversity`, `biological diversity`, `ecology`, `species richness`,
`ecosystem services`, `ecosystem functioning`, and `ecological`. I left out
`conservation` and `ecosystem`, because they had a really high rate of false
positives (in engineering and software, respectively).

The streaming API, in a nutshell, will return a new line everytime a tweet that
matches the search parameters is posted. Not all tweets are sampled, but it's
approximately a random sampling, so more than good enough for a side-project.
I left the script running for a few hours at a time, which gave me a database
of over 1000 tweets, about 600 of which were retained. I've removed all tweets
using a alphabet that is not latin, and there were quite a bit of these.

Once this was done, I just read each line in `python` (the Twitter API have the
good taste of returning everything as `json` strings), selected the text,
and cleaned it. I simple (i) converted everything to lower case, (ii)
removed every non-ascii characters, (iii) removed punctuations, and (iv)
removed the hasthag (`#`) symbol. Then I extracted all of the unique words
in each tweet, and let the fun begin!

One of the things I know how to do is network analysis. So I settled on the
following procedure to find connections between words. All of the unique words
are nodes in a network, and two nodes are connected whenever they appear in the
same tweet. That makes for a *lot* of connections, but it's not a problem
because I will eliminate a lot of them later. At this stage, I have a network
with 2600 nodes, and over 30000 undirected edges. Obviously (i) words appearing
only once in the dataset have little interest, and (ii) words like `the` and
`in` have a much higher chance of being in the same tweet than `amazonia` and
`tits` (I checked the original tweet, and it was not about ornithology).

Before I go into how I accounted for that, some additional cleaning steps: all
usernames (`@`), urls (`htt`), and twitter-specific idioms (`RT`, `MT`, `ff`)
were excluded. I also deleted all of the small connex components (*i.e.*
small groups of words that were not connected with the rest of the
dataset). Then, the most arbitrary part of the work began. I removed
*all* the nodes with a betweenness centrality of 0. The betweenness
centrality is the frequency at which a node appears in the shortest paths of
the graph, so I assumed that words that were not part of the shortest
connexions were not really important. Most of the words were excluded using
this proccess, and the network felt to a much more manageable 149 nodes and
2509 edges.

Part of these were still words like `the`, `at`, and so forth. I'll eventually
use TF-IDF to select relevant words from each tweet, but remember, this is
a quick-and-dirty analysis. So I simply looked at mylist of nodes, and removed
every words that were not relevant (this is rather arbitrary too, but in doubt
I decided to be inclusive). The final network had 58 nodes, and 250 edges.

Here are the top most important ones, based on their eigenvector centrality:

| Word          | Centrality |
|:--------------|:----------:|
| ecology       | 1          |
| biodiversity  | 0.94       |
| ecological    | 0.70       |
| human         | 0.45       |
| environment   | 0.43       |
| loss          | 0.40       |
| wetland       | 0.36       |
| environmental | 0.35       |
| forest        | 0.34       |
| wildlife      | 0.33       |

If you want to see the other words, you can [get the `graphml` file from
*figshare*][fshare]. So here is the recipe. If you want to engage with the
public, these are the topics of interest. And they paint a quite clear picture:
what is the role of human in biodiversity loss at the global scale? As I assume
that the volume of non-ecologists is orders of magnitude larger than the volume
of ecologists, these keywords are most likely what is discussed.

Here is finally a visualization of the network. There is a clearly
non-significant modular structure, but I've nonetheless colored the nodes to
better illustrate the relationships:

![The network]({{ site.url }}/images/tw-ecol-concepts.png)

Interestingly (the layout method groups nodes that are close to each other),
there seems to be the "sustainability/ecosystem services" topics
on one side (bottom-left), and the "conservation" topics on the
other side (top-right).

I'll keep on running this model from time to time, but I think there is a good
opportunity to design informed strategies for communication with the public.
There is not much effort in collecting these data, and we (scientists) can help
by communicating in issues in which their is a broad interest. And I may end up
doing a best-of of the undergrads complaining on Twitter about how *Ecology
101* is hard, that is fun too.

[fshare]: http://dx.doi.org/10.6084/m9.figshare.827286
[sfetwit]: http://twitter.com/sfecologie/
[twpyth]: https://github.com/geduldig/TwitterAPI
