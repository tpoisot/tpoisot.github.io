---
layout: post
type: essay
author: Tim
title: Learning how to code (in ecology)
tags:
 - programing
 - software
---

A few days ago, I received an email asking about pointers on how to program in
ecology. I'm not sure I'm the best person to ask, but writing the answer, I
realized that there might be potential to share tips with other people. Now, a
little bit of foreword. I come from a very empirical background. My undergrad
studies are in genetics and immunology, and up until the end of my Masters, I
have been spending time either in the field or in the lab. So learning how to
program came rather late in my studies. It all started when my PhD advisor gave
me a PDF of a paper by [Weitz and colleagues](http://www.ncbi.nlm.nih.gov/pubmed/15976021), and asked me to reprogram the model to use as a basis for [a future paper](http://rspb.royalsocietypublishing.org/content/early/2011/06/02/rspb.2011.0826.full). All of a sudden, I had no choice but to learn how to program. Prior to that point, my experience with R was mostly limited to doing statistical analysis and figures. I had a little bit of experience with PERL and bioinformatics, but no knowledge relatable to programming in ecology. I was, all in all, fairly illiterate (idem for maths, but that will be left to another post eventually). So a few years down the road, there are a few pieces of advice I can share with those wanting to start programming.

# Practice

Whenever I have (or want) to learn a new language, I always try to start writing. As when learning a new language (the kind people, not machines, use to communicate), immersion is probably the best way to go. As an ecologist, Lotka-Volterra models are my favorite. I also try to do some spatial things, like metacommunities. The good thing with these models are that you know the results. So you can check whether your code is giving you the expected results. And you'll learn the bases as you go.

<span class='margin'>Maynard Smith, J. [Evolutionary Genetics](http://linkinghub.elsevier.com/retrieve/pii/S0169534702025545). Oxford University Press, 2002.</span>A *really* good book to do this is *Evolutionary genetics* by John Maynard-Smith. Not only is it a good introductory book for evolutionary biology, but each chapter comes with a variety of problems that you can solve by hand and through programming. I used these to learn R, Python, and C. I plan to go back at them whenever I have to learn a new language (also because it's a good excuse to re-read through the book!). Of course any book with problems will work in the same way.

I've also greatly benefited from teaching a class in Population and Community Biology this fall. I wrote the models for each class in Python, from scratch, every week. It was a really good practice, because I had to write things differently from what I do in research. Trying to set some time apart every week to write simple things did get me a long way. Also, it will help you generate a large base of code, which you'll re-use over time.

# Read some code

Writing is good, but I also learned a lot by reading through code by other people. I was lucky enough to have people send me complete code to reproduce their papers, which was really interesting when I was trying to change their model. Do not hesitate to ask people in your department to have a look at their code. Chances are, they are working on subjects relatively close to yours, and they will be able to show you some interesting things.

Now, [as I mentioned before](http://timotheepoisot.fr/2012/01/06/science-age-social-coding/), with the increased use of *GitHub* and other social coding sites, you'll have access to a lot of code. Want to know one way to do Lotka-Volterra predator-prey in Python? [Just ask](https://github.com/dmedvinsky/lotka-volterra/blob/master/lotka-volterra.py). You can get different examples, see what you understand, what seems natural for you, and start adapting from there. Social coding will help you, do it!

# Have people read your code

Do not be ashamed of your code. You can show it around to your colleagues or to your advisor. At this point, it's time to make a short parenthesis. *Which language should you choose*? There are two things I considered. First, how many people *around you* use it? How many meters do you have to walk until you reach the office of someone good enough to help you with the problems you will run into? Alternatively, how big is the user base overall, and in your field? R and Python tend to score high on these two points among ecologists and evolutionary biologists, so you may be able to get help. The second point is, how suited is the language to what you are doing. Mostly statistics? Keep with R. Mostly simulations? Go C! And so on. Try to *ask* people what they are using. The more languages you know, the easier it seems to pick up a new one. But if you want to start programming with very little background, there is a learning curve, and you will want to maximize (i) the opportunities to get help and (ii) the fit of the language to your needs.

Back on tracks: have people read your code. You can send them by email, but you can also meet in person and discuss it line by line. If you are lucky enough to have a skilled programmer around, you will receive great feedback on how to do things faster, more efficiently, and how to use little tricks that only your language of choice has. You will learn a lot, and you will benefit a lot from the experience. Don't worry about your code looking bad, we all were there at some point; and frankly I might still be there, and I don't care because I'm an ecologist, not a programmer.

# Read some books

I have a bookshelf dedicated to programming literature. Some language references, some practical textbooks, some devoted to really particular examples, and not all of them are in languages I use. It's a good thing to have a few books at hands, because you'll be able to see how (sometimes even why, but don't get your hopes up...) things are done. And you'll see how a particular problem can be tackled, even though the code is not in a language you use.

I started reading only after I was done experimenting. Truth be told, I never read an Introduction to R type of book, same for Python. I have a few of them at home, and I open them once in a while to check things. Whether to read a lot or not is a matter of personal taste, but I found that overtime, practice has more benefits than reading. If you do want to read, be sure to actually type the code at the same time, and experiment with it. It helped me a lot, because I learned how to adapt general knowledge to my particular needs.

# Get a good editor

OK, so now you're done learning how to code. One of the most important points is, *get yourself a kick-ass code editor*. I absolutely hate Eclipse, RStudio, and other big, bloated environment for serious development. I am currently trying to learn `vim`, but be serious, who has time for that? I suspect I only want to learn it for the additional nerd credibility, because I'm not into comic books enough, so I have to compensate somehow. I use [*Sublime Text 2*](http://timotheepoisot.fr/2013/01/22/selection-sublime-plugins/) and a lot of packages, and I'm really happy with it. The point is, get something you are comfortable with. Chances are you'll be spending a lot of time looking at a screen with a blinking cursor, so you might as well want to call it home. Whoah, that almost sounds sad, does it? And an additional advice. Become extremely familiar with your terminal. The little matrix thingy that Windows people don't know exist? Turns out it's important. The more you use code, the more you'll make your editor and terminal work together, and that will increase your productivity.