---
layout: post
title: The use of Twitter at ESA and IMCC
byline: Some notes on the online social dynamics of scientific meetings
author: Tim
---

August is conference season. But for the last few years, not being able
to attend does not mean that you can't partake in the global discussion,
as more and more scientific meetings have been using twitter hashtags to
keep the discussion going online. Being both a fervent twitter user, and
interested in all things networks, I decided to explore the assembly of the
graph of interactions among scientists over time. A bunch of us are doing a
more formal analysis of the *Ecological Society of America* 2014 meeting,
but here I will present a brief comparison of `#ESA2014` with `#IMCC3`,
the *International Marine Conservation Congress*.

Both meetings took place almost at the same time, were massively using their
respective hashtag, and are within the same broad field of environmental
sciences.  I won't go into the details, but here is what I've been doing. I
used the Twitter API to pull all tweets containing either `#ESA2014` or
`#IMCC3`. For all of these tweets, I looked at who wrote it, and who was
mentioned in it. If a tweet written by `@bob` mentionned `@alice`, I recorded
one interaction from `@bob` to `@alice`, along with the time, and the meeting
in which it occured. Because the use of twitter was *massive*, this resulted
in a little more than 3500 people, mentionning each other over 20000 times.

I was mostly interested in how using Twitter can help bring people together
over time, which in a network perspective is akin to measuring modularity,
and how it decreases.


```r
load('../data/twitter_meetings.Rdata')
opts_knit$set(base.dir = '..')
library(plyr)
library(igraph)
```

OK, so first (keeping in mind that `#IMCC3` is still going), what does
the dynamics of number of tweets looks like? I divided the dataset in bins
of approximately 10 hours, and looked at the number of tweets, and number
of users.

```r
plot(xseq, laply(t_all, vcount), lwd=2, type='l', lty=3, xlab='Date', ylab='Participants')
lines(xseq, laply(t_esa, vcount), col="darkgreen")
lines(xseq, laply(t_imcc, vcount), col="darkblue")
legend('topleft', legend=c('All', '#ESA2014', '#IMCC3'), lty=c(2, 1, 1),
       col=c('black', 'darkgreen', 'darkblue'), lwd=c(2,1,1), bty='n')
```

![Looking at the number of people using twitter in bins of ten hours gives an idea of when, during the meeting, the people are more active.](/figure/tweet_vcount.png) 


```r
plot(xseq, laply(t_all, ecount), lwd=2, type='l', lty=3, xlab='Date', ylab='Tweets')
lines(xseq, laply(t_esa, ecount), col="darkgreen")
lines(xseq, laply(t_imcc, ecount), col="darkblue")
```

![The same goes for the number of unique tweets. At `#esa2014`, most of the action was during the second and third days.](/figure/tweet_ecount.png) 

Interestingly, the use of hashtags allows the conversation to start *before*
the actual meeting does. And, oh yeah, shame on us ecologists, the IMCC
crowd is way better at twitter than we are! With roughly the same number
of people involved, they manage to talk twice as much as we do. Actually,
let's look at the cumulative number of tweets exchanged:


```r
plot(xseq, laply(a_all, ecount), lwd=2, type='l', lty=3, xlab='Date', ylab='Cumulative tweets')
lines(xseq, laply(a_esa, ecount), col="darkgreen")
lines(xseq, laply(a_imcc, ecount), col="darkblue")
legend('topleft', legend=c('All', '#ESA2014', '#IMCC3'), lty=c(2, 1, 1),
       col=c('black', 'darkgreen', 'darkblue'), lwd=c(2,1,1), bty='n')
```

![Cumulative number of participants in both meetings. `#IMCC3` is taking off extremely fast, compared to the more modest growth of `#esa2014`.](/figure/tweet_vcount_cum.png) 

Whereas the number of `#ESA2014` tweets ends-up stagnating, the `#IMCC3`
conversation keeps on going. If I had to propose an explanation, I think
it would be that marine sciences and conservation are really to get people
interested in (especially since it was *Shark Week* recently). Ecology *should*
be the same, but we have a long way to go.

So what about modularity? I used the walktrap method, which is based on
short (of size 3) random walks, to determine the membership of people to
communities, and then I measured the overall modularity. This goes from 0
(everyone is connected to everyone else) to 1 (groups of well connected
people are not connected to one another).


```r
mod <- function(x) modularity(walktrap.community(x))
plot(xseq, laply(a_all, mod), lwd=2, type='l', lty=3, xlab='Date', ylab='Modularity', ylim=c(0,1))
lines(xseq, laply(a_esa, mod), col="darkgreen")
lines(xseq, laply(a_imcc, mod), col="darkblue")
```

![In both meetings, modularity decreases over time. Note that the `#imcc3` meeting ws *less* modular even at the beginning of the analysis.](/figure/tweet_modularity.png) 

I like this figure! The `#ESA2014` meeting is not that modular by the end
(a modularity around 0.4 indicates that some clusters exists, but they
are overall well-connected). On the other hand, `#IMCC3` is really well
connected. Keeping in mind that the number of contributors is similar, this
means that the `#IMCC3` community is much more uniform than the `#ESA2014`
community is. This can be because the span of `#IMCC3` is more narrow (whereas
`#ESA2014` is about *all* ecology), or this can be that the sense of belonging
to a community is more developed in marine conservation people.

Let's now look at the diameter (the maximum distance between two nodes)
in the two graphs:


```r
plot(xseq, laply(a_all, diameter), lwd=2, type='l', lty=3, xlab='Date', ylab='Diameter', ylim=c(0,20))
lines(xseq, laply(a_esa, diameter), col="darkgreen")
lines(xseq, laply(a_imcc, diameter), col="darkblue")
```

![Diameter (maximal distance between two contributors) in both conferences. Keeping in mind that `#IMCC3` has more contributors, the fact that it has a lower diameter means that the interactions between them are indeed closer.](/figure/tweet_diameter.png) 

This tells the same story: with a diameter of 10, against 7 for `#IMCC3`,
`#ESA2014` is a more disjointed community. As a final note, I will release
both datasets when `#IMCC3` tweets stop accumulating.
