---
layout: post
title: Notes on learning how to use sympy
author: Tim
type: note
tags:
- sympy
- python
---

I'm trying to move to `sympy` for all my symbolic calculations. This post is
just some notes taken during my first attempt, in which I'm playing with a
simple host-parasite model. I was reading the [*First steps with
sympy*](http://docs.sympy.org/0.7.1/tutorial.html#first-steps-with-sympy)
section of the website when I was running my little tests, and it's relatively
helpul.

So let's assume we have a classical host-parasite duo, with intra-specific host
competition, and intrinsic mortality in the parasite. Its instantaneous dynamics
can be written as

$$\frac{dH}{dt} = H \times \left( r - q\times H - \beta \times P \right)$$
$$\frac{dP}{dt} = P \times \left( \alpha \times H - \delta \right)$$

The first step to get this into `sympy` is to load the package (obviously), then
declare parameters and population sizes as *symbols*, and the equations as
*Functions*.

You can do so this way:

``` python
from sympy import *

# Population densities
H, P = symbols('H P')
# Model parameters
r, q, b, a, d = symbols('r q b a d')
# Functions
dH, dP = symbols('dH dP', cls=Function)

```

Once this is done, you can write up the equations

``` python
dH = H * ( r - q*H - b*P )
dP = P * ( a * H - d )
```

And solve with a *Mathematica*-like syntax:

``` python
print solve([dH, dP], [H, P])
```

At this point, you should get a list of tuples as the output:

``` python
[(0, 0), (d/a, -(-a*r + d*q)/(a*b)), (r/q, 0)]
```

The three possible outcomes were identified: either everything crashes, the
parasite goes extinct ($H* = r/q$), or the two populations persist and reach
their equilibrium.

At this point, let's assign these solutions to an object, and focus on the coexistence case:

``` python
equil = solve([dH, dP], [H, P])
coex = equil[1]
print coex
```

I naturally tried do find which sets of parameters allow the system to coexist
*with positive densities*, so I used

``` python
solve(coex[0] > 0)
```

Which gave the following error message:

``` python
NotImplementedError: only univariate inequalities are supported
```

Well, so that does it for today. I'll be exploring *Maxima* in the next weeks,
because if `sympy` is stuck on this common problem, there is no way you can use
it to do some decent analysis. Oh, and in case you wonder: the maths are
rendered with the [*MathJax*](http://www.mathjax.org/) library.
