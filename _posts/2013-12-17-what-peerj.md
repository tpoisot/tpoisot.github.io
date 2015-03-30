---
layout: post
title: What's hot on PeerJ?
type: note
author: Tim
tags:
- bibliometrics
- open access
- preprints
---

Lat week, I mentionned that ecology is the leading discipline on [*PeerJ*
preprints][pjp], as attested by the number of submissions. Which led me to
wondering which topics were actually *hot* on the preprint server. *PeerJ* do
not have an API, but there URL scheme is not too complicated, and most of the
relevant informations are in the webpage body. So I wrote a very short python
script to get the first 158 preprints, download them, and get the abstract.

The code goes like this:

{% highlight python %}
import requests
from bs4 import BeautifulSoup

BaseURL = "https://peerj.com/preprints/"
StopAt = 158
StartAt = 1

Corpus = []
Fulltext = ""

for preprint_id in xrange(StartAt, StopAt):
   preprint_page = requests.get(BaseURL + str(preprint_id) + "/")
   if preprint_page.status_code == 200:
      preprint_text = preprint_page.text
      preprint_soup = BeautifulSoup(preprint_text)
      abstract = preprint_soup.find("meta", {"name":"description"})['content']
      Fulltext += " " + abstract
      Corpus.append(abstract)

print Fulltext.encode('utf-8')
{% endhighlight %}

There is actually a one-liner version of this code, that exsist solely to
show that you can do horrible twisted things with python. I'm not showing
it. But the point is: this code will return a list of all abstracts, pasted
together in a single sentence. Which I copied, and used in [wordle] to get
the following graphic:

![With abstracts]({{ site.url }}/images/w-peerj-abs.png)

So apparently, `data` are big, followed by `sharks` and `whales` (actually
whale sharks), but suriprisingly, there are no big ecological keywords
that are very prominent - which goes well with the idea that *PeerJ*
is multi-disciplinary. By changing the `BaseURL` variable in my code,
it was easy to get the same picture but for the *articles*, *i.e.* the
contributions that went through peer-review. According to the front page,
Ecology and Biodiversity are still the leading disciplines there.

![With papers]({{ site.url }}/images/w-peerj-pap.png)

It seems to be the case, with `species` being the most important word, followed
(still) by `data`. Interestingly, clinical and molecular keywords are more
prominent in the published papers than in the preprints. But in any case,
*PeerJ* is definitely ecology-friendly, which hopefully will mean that more
and more people will submit there.

[pjp]: https://peerj.com/preprints/
[wordle]: http://www.wordle.net
