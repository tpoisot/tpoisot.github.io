---
layout: post
type: note
author: Tim
title: Why JSON is my go-to data format
tags:
- JSON
- data format
---

Since this summer, I work with models that generate massive amounts
of output. This weekend batch of simulations resulted in 20+ Gig of raw
data. This particular model outputs very variable data. The number of
lines/columns (were I working in a tabular format) would be unpredictable,
vary across simulations, and generally be a little bit too massive to work
with (simply) in `R`. But I've been using `JSON` for a while now, and it
makes working with these types of data (not the "several Gig" types, the
"highly heterogeneous" type) easy.

I love `JSON` because it can be validated. Running a command like `jsonlint
file.json` will either return me the pretty-printed version of the file,
or an error telling me where the file is not conforming to the `JSON`
specification. Or in other words, when I read something in memory, I'm
confident it is indeed a correctly formated file.

But wait, there's more! In `JSON`, you can define *schemes*, or a `JSON`
file telling you (or a validator) what other `JSON` files should look
like. Which means that it's possible to check that a particular file is
correctly formatted *with regard to a previously described data format*. I
use the `jsonschema` python module to do that:

~~~ python
import json
from jsonschema import validate
# Read the JSON scheme file
with open('scheme.json') as f:
   sc = json.load(f)
# Read the JSON output file
with open('output.json') as f:
   op = json.load(f)
# Validate
try :
   validate(op, sc)
except :
   print "Not valid"
else :
   print "Valid"
~~~

And because a`JSON` scheme has [field for description of each element][jss],
your output is essentially self-described. Someone with no prior knowledge
of how you organized your data can take your results, check that they conform
to the specification, and see what each element of the output file represents.

Although I haven't bothered to write a scheme (yet), you can see how `JSON`
can contain a lot of heterogeneous informations in an easy to read format
[on the `manna` index page][manna]: the output files give informations about
the species, and for each time steps, the number of individuals, and each
individual interaction.

While it's true this information is not extremely complicated, it's still
simpler to have it in this form, rather than as a text file. But `JSON`
truly shines when *reading* the data. In the above example, if the `op`
object contains a list of species, each having a body size called `bs`,
then we can get the mean body size with

~~~ python
m_bs = np.mean([sp['bs'] for sp in op])
~~~

`R` can also read `JSON` well with the `rjson` package. This returns a `list`
representation of the `JSON` file, so it's easy to manipulate `JSON` objects
with `l*ply` functions in `plyr`. So now, most of my models work in the same
way. I write one `JSON` file for each simulation (or variations thereof)
into an `output` folder. Then I read through each file with `python` and/or
`R`, and I have a great time doing it!

The main drawback of `JSON` ([as pointed out here][db] are that it must be
read in memory entirely before it's used (and it gets parsed at this time
too). Or in other words, it can be slow. But it's a good thing! I found out
that it forces me to (i) aim for the most concise representation possible,
and (ii) split the output in chunks when needed. These chunks can be read
in parallel later, and re-assembled, so I don't try to load files of a few
hundreds Mb at times.

So now, go try `JSON` for yourself. In the `manna` program linked above, there
are examples with (admittedly badly written) `R` files to read and manipulate
`JSON` outputs. And keep in mind that when you'll be coming back to your
output files in six months, you'll be glad to have a verbose format and a
scheme describing it to understand what is going on...!

[jss]: http://json-schema.org/
[manna]: https://github.com/tpoisot/manna
[db]: http://www.alcides-mp.com/?p=1
