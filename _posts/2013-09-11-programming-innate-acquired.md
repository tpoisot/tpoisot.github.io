---
title: Is programming an acquired taste?
author: Tim
type: note
layout: post
tags:
- quantitative skills
- programming
- teaching
---

Two weeks ago, the whole lab headed up to a remote place in the Rimouski
countryside for a summers school on *Ecological Modeling*. It was a whole lot
of fun, and a really good way to get back to some things I've always wanted to
study more in depth. So far, so good. Most of the days were courses in the
morning, and programming in the afternoon. There were also some pen-and-paper
model solving, but I won't talk much about these.

While the students were sweating on the programming problems, we discussed the
fact that programming is maybe an innate skill. Not in the sense that some
people are unable to learn how to code functional things, but in the sense that
some people find it intuitive to express things in terms of `for`, `while`,
`if`, and so forth (so forth is *not* a valid algorithmic structure). That
may be true, that some people will find it easier to split up a large
problem in a series of short instructions. If you can do that intuitively,
then you'll probably have no problem structuring your code.

But this particular skill can be trained, I think. One of the things I asked of
the students was to code something implementing Williams & Martinez *niche
model* of food webs. The title of the assignment may be "Write a program
implementing the NM in R". I took the opportunity of turning that into an
exercise about how to organize code. The whole problem can be easily
sub-divided into a series of smaller problems. In this case, we first need to
generate species, then to find out the interactions between them. The first
step, of generating species, itself involves several sub-steps, that can each
go into a function, or can be handled by logical tests.

Perhaps there will be a *happy few* that will take this series of steps by
themselves. Looking back on the first programs I wrote (I am unlucky enough to
have kept some of my spaghetti code from my first year of Masters, ...),
I'm definitely not one of these people. As in most things, the key to
developing a feeling of how to organize things will come with practice, and
thinking about what you felt comfortable with. Which is why I always
encourage people to [write code when they want to learn][code]. I seriously
don't think there is a better way to increase your skills.

So, is programming an acquired taste? Probably. It may seems frustrating at
first to need to specify things clearly at a very small scale. Some people may
call it intuitive, and be comfortable with the `if`s and the `while`s really
quickly, but I don't think these are majority. And that might explain why it's
not uncommon to hear students say that they aren't able to code well (aside
from the fact that, well, monkeys and typewriters...). Learning how to
code is like learning a language with a different grammatical structure. On
your first day, Python and [brainfuck](http://en.wikipedia.org/wiki/Brainfuck)
look awfully similar. Things you conceptualize easily will not translate well
in your editor because you need to use a different structure of thought to
express them. The more you practice, the more natural it will seem. For this
reason, I don't really believe in programming classes (for biologists, I don't
know how it goes in other majors) in which you only need to write-down
some code, press enter, and see that it does what your instructor says it does.
Letting students experiment, and fail, and sort out their experiences of what
worked, what did not, and what they felt comfortable with, could probably do
a lot to improve coding literacy.

[code]: http://timotheepoisot.fr/2013/04/12/learn-code-ecology/
