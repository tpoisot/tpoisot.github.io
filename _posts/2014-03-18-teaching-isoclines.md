---
title: Teaching isoclines in the two-species competitive logistic model
author: Tim
tags:
- teaching
- theoretical ecology
- ecological models
type: note
layout: post
---

I've had a great discussion by email with [Crystal Ernst][ce], about the
best way to teach isoclines and phase portraits to undergraduates. I had
this discussion countless times over the last two years, and I struggled
when I had to teach that myself. I ended up finding a little twist on the
classical diagrams, and so I decided that it was time to share it.

Isoclines are usually first introduced when discussing the logistic model with competition between two species, or

$$
\dot N_1 = N_1 r_1 \left(1 - \frac{\alpha_{11}N_1+\alpha_{12}N_2}{K_1} \right)
$$

$$
\dot N_2 = N_2 r_2 \left(1 - \frac{\alpha_{22}N_2+\alpha_{21}N_1}{K_2} \right)
$$

It's an important model, as we can use it as a gateway to talk about
coexistence, local stability, and ecosystem functioning. It is also a perfect
transition between the empirical side of ecology with Gauses's experiments, and
the more theoretical side of it. I *love* this model, especially for teaching.

There are a number of intersting things to explain to students when introducing
this model. First, each species $n$ perceives its environment
as a "box" with $K_n$ compartments. Left to their own devices,
each "individual" (or units of biomass) will "fill" $\alpha_{nn}$
compartments, which usually equates unity for a single species model. The
growth of the population is therefore a quest for free compartments to fill,
and when most of the box is filled, the effective growth rate decreases. When
all compartments are filled ($N_n = K_n$), then the growth rate is
0, and the population is at equilibrium. Cue a discussion on the mechanisms
that would allow us to represent the environment as a box with compartments
(space requirements, having enough to eat, foraging area, and whatever else
you can think of).

The point with introducing a second species is that there are now
two types of organisms to share the same "box". And individuals from
species $p$ are *perceived* by those of species $n$
as taking up $\alpha_{np}$ compartments. The opposite is true,
and we can define values for the intensity of *intra* and *inter* specific
competition. The question is, then, what are the combinations of values of
$\mathbf{\alpha}$ that allows coexistence, competitive exclusion,
or make the system sensitive to initial conditions?

It's at this point that I usually introduce the notion of *equilibrium*,
*i.e.* a state of the system in which the two populations *stop growing*. The
calculus-based solution is to find values of the population densities that
make the two derivatives null at the same time. When you are a facing
a class of undergrads that are not especially enamored with mathematics
([potentially a large part of the population][peerj]), this approach is not
likely to get them excited. Which is partly why we usually use *isoclines*
and *phase portraits* to explain how different combinations of intra/inter
specific competition strenghts affect the potential for coexistence.

The problem is, **explaining how isoclines work is awful**. I know many
people that are able to predict a *lot* of things just by drawing a bunch of
lines on a whiteboard. Did I say many? Well if the discussions I had with
people are to be believe, these are actually the happy few. The rest of us
are left scratching our head in front a cryptic diagram that makes absolutly
no sense. I blame the difficulty to read isoclines as the single reason for
which adaptive dynamics is frwoned upon by many people (that, and the fact
that any method involving third order derivatives is rapidly messy).

So here is my solution: **use vector fields**. With a vector field, it's
virtually impossible to screw up the explanation, because all you have to do
is (i) put your finger somewhere on the diagram and (ii) follow the arows
until the equilibrium that the system would eventually reach. Want to know
how a perturbation affects this equilibrium? Just jiggle your finger a bit,
and go back to step (i). Did you ended up at the same point? Congratulations,
that's local stability.

OK, so what's a vector field? The phase portrait of the system is defined by
two axes, one for the density of species *1*, the other for the density of
species *2*. The isoclines are the lines going trough the two equilibria for
species *1* ($N_1 = (0; N^\star_1)$), and trough the two equilibria for
species *2* ($N_2 = (0; N^\star_2)$). When you are *above* (axis-wise)
your isocline, you converge back to it, and where you are *below* your
isocline, well, the same thing happens but in the other direction. At the
intersection of the two isoclines is the *two-species equilibrium*, whose
stability and accessibility tells whether coexistence is possible or not.

The important thing to keep in mind is that both species will push the system
in (possibly) different directions at the same time. So there can be some funky
behavior happening, and species can cross their isoclines (this happens in the
predator-prey Lotka-Volterra model, among many others). So what matters is the
*combined* changed in the system, which we can model through the addition of
two vectors in the $N_1,N_2$ plane. The first vector (which describes
the amount of change in the *vertical* direction is $\vec{N_2}$. The
norm of this vector is simply $\frac{d}{dt}N_2$. The second vector, in
the *horizontal* direction, is similarly $\vec{N_1}$. The resulting
vector describing the overall change in the system is

$$
\vec{S} = \vec{N_1} + \vec{N_2}
$$

Because $\vec{N_1}$ and $\vec{N_2}$ are orthogonal (and
because of a couple of other assumptions, such as the space defined by the
population densities being Euclidean), it's easy to measure the Euclidean
norm of $\vec{S}$, which is to say the total amount of change in
the system, as being

$$
\lVert \vec{S} \rVert = \sqrt{\lVert \vec{N_1} \rVert ^2 + \lVert \vec{N_2} \rVert ^2 }
$$

At any given coordinate $(N_1, N_2)$, the system will move towards
$(N_1 + \dot{N_1}, N_2 + \dot{N_2})$. With both infos in hand, we
can do two things. First, we can plot the instantaneous #ate of change of the
system (the absolute value of the norm of $\vec{S}$) over space,
to see in which combinations of populations densities are trigerring rapid
changes. Second, we can plot the direction of change using arrows *over*
the previous graph, to see in which direction the system is moving. The
really good thing with this method is that we only have to tell students
that we describe the cumulative change of populations on the two axes,
and leave aside all of the maths (as straightforward as they may be).

So now, we can produce a graph like the one below:

![Is1](/images/isoclines.png)
{: .left}

When the color is close to red, the system is moving extremely fast. When the
color is close to yellow, the system is slowing down. Each arrow gives the
direction in which the system is changing, so we can see that the outcome
of competition in this case will depend on the initial conditions. It's
also easy to start from anywhere on the plan, and follow the direction of
the arrows. You can also zoom in, to see how the system behaves when near
the equilibrium, and investigate the effects of a small disturbance. In
this case, it's clear that the system will move away from the equilibrium,
which is a good way to introduce the notion of local stability (after that,
it's eigenvalues all the way down!).

![Is2](/images/isoclines_stable.png)
{: .right}

The same visualization with a stable coexistence is also extremely clear. You
can easily see that all of the arrows converge towards the two-species
equilibrium, which in that case is stable. I'm not going to show the systematic
exclusion scenario, but it's working in the same way.

The good thing with this method is that (i) it's easy to explain what isoclines
are and how to use them to see how the system will change over time, and (ii)
as it's extremely visual, it does not rely on the students understanding the
maths *before* they understand their ecological meaning. I have no data to
back this up, but I think it's easier to understand the maths once you can
see the output in a visual way.

The code I used is available as a [gist][gcode]. It's not optimized *at all*
but it runs fast enough that optimization is not really an issue. You can
modify the `params` array to fix values of *r*, *K*, and the *per capita*
competition rates, and the code will do the rest.

---

Here we are. This is the way I currently explain isoclines, and the outcome of
competition in the two-species logistic growth model (and a bunch of others,
actually). It helps *me* by making it virtually impossible to fail at the
explanation, because I can just follow the arrows. And I think it helps *the
students* because (i) it gives a visual explanation of the phenomenon that
requires no mathematical understanding, and (ii) it's an intuitive way to
start thinking about all the conclusions we can draw using this model.

Now, if any of you have an alternative method to teach that, I'm very
interested. I think that the behavior of this model can be tricky to
explain. Yet it touches upon so many core principles in community ecology
that it's super important that we get it right.

[ce]: http://www.crystalernst.com/
[peerj]: https://peerj.com/articles/285/
[gcode]: https://gist.github.com/tpoisot/9632093
