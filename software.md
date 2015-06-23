---
layout: moved
title: Software
---

This page is a non-exhaustive list of software I've released. Only the
most significant/ambitious projects, or those in which I contributed a lot,
are listed.

I do *most* of my development using `R` (whether or not I like it is not
really relevant seeing how it is the *lingua franca* of ecology). For most
demanding projects, I use mostly `python` (which I'm progressively replacing
by `Julia`), and `C` or `C++` for more computationally intensive tasks
(the choice between the later two being made as a function of how I feel
re. pointers on a particular day).

# Full-featured packages

## paco

The `R` package `paco` performs the procrustes test of cophylogeny for
bipartite interaction networks. It is not fully stable yet, but reproduces
all of the analyses from the original publication.

- <i class="fa fa-fw fa-github"></i> [GitHub repository][paco_repo] (source code)
- <i class="fa fa-fw fa-terminal"></i> Easy install: `library(devtools); install_github("PoisotLab/paco")`

## rmangal

The `R` package `rmangal` offers programmatic access to ecological network
data (*beta version*), including a rich interface for meta-data on species,
traits, spatial position. It has built-in interfaces with `igraph`.

- <i class="fa fa-fw fa-file-text-o"></i> [Open draft][mangal_paper]
- <i class="fa fa-fw fa-github"></i> [GitHub repository][mangal_repo] (source code)
- <i class="fa fa-fw fa-github"></i> [GitHub repository][pymangal_repo] (python version)
- <i class="fa fa-fw fa-terminal"></i> Easy install: `library(devtools); install_github("mangal-wg/rmangal")`


## betalink

The `R` package `betalink` allows measuring the beta-diversity of (ecological)
networks sharing some of their species. It is currently being rewritten to
rely heavily on `igraph` for improved performance on large networks

- <i class="fa fa-fw fa-file-text-o"></i> [Original paper][beta_paper]
- <i class="fa fa-fw fa-github"></i> [GitHub repository][beta_repo] (source code)
- <i class="fa fa-fw fa-terminal"></i> Easy install: `library(devtools); install_github("tpoisot/betalink")`


## ESM

The `R` package `ESM` performs several measures of ecological specificity
on binary and quantitative performance data. Some of its functions are
duplicated in `bipartite`.

- <i class="fa fa-fw fa-file-text-o"></i> [Original paper][spe_paper]
- <i class="fa fa-fw fa-code"></i> [R-Forge project][spe_repo] (source code)
- <i class="fa fa-fw fa-terminal"></i> Easy install: `install.packages("ESM", repos="http://R-Forge.R-project.org")`


## digitize

The `R` package `digitize` allows to point-and-click on image files to
extract the data. It is particularly useful to get raw data from published
figures. The newest revision accomodates skewed graphics.

- <i class="fa fa-fw fa-file-text-o"></i> [Original paper][digit_paper]
- <i class="fa fa-fw fa-github"></i> [GitHub repository][digit_repo] (source code)
- <i class="fa fa-fw fa-terminal"></i> Easy install: `library(devtools); install_github("tpoisot/digitize")`


## biweb

The `biweb` suite of algorithms implements the most common descriptive analyses
for bipartite ecological networks - with [Cesar Flores][cesarito]. The core
software is written in `matlab`, and a subset of the functionalities are
available as a `python` module.

- <i class="fa fa-fw fa-file-text-o"></i> Paper in preparation
- <i class="fa fa-fw fa-github"></i> [GitHub repo][biweb_repo] (dual `matlab`/`python` code)


# Other software

## Inference of food-web structure

We propose a method to infer the structure of food-webs based on species
body-size and allometric relationships - with [Camille Albouy][cam] and
[Dominique Gravel][dom]

- <i class="fa fa-fw fa-file-text-o"></i> [Original paper][inf_paper]
- <i class="fa fa-fw fa-code"></i> [Code and example data][inf_code]



## Other (possibly) useful code

Reasonably fast generation of null bipartite networks in `C` under different
scenarios. Uses the *GNU Scientific Library*.

- <i class="fa fa-fw fa-github"></i> [GitHub repository][null_repo] (source code)


Python class to track phylogenetic structure during simulations.

- <i class="fa fa-fw fa-github"></i> [GitHub repository][pyco_repo] (source code)


Simulation of individual-based trophic communities under niche/neutral scenarios.

- <i class="fa fa-fw fa-github"></i> [GitHub repository][manna_repo] (source code)


[beta_paper]: http://onlinelibrary.wiley.com/doi/10.1111/ele.12002/abstract
[beta_repo]: https://github.com/tpoisot/betalink
[mangal_repo]: https://github.com/mangal-wg/rmangal
[pymangal_repo]: https://github.com/mangal-wg/pymangal
[mangal_paper]: https://github.com/mangal-wg/mangal
[spe_paper]: http://onlinelibrary.wiley.com/doi/10.1111/j.2041-210X.2011.00174.x/abstract
[spe_repo]: https://r-forge.r-project.org/R/?group_id=593
[digit_paper]: http://journal.r-project.org/archive/2011-1/
[digit_repo]: https://github.com/tpoisot/digitize
[biweb_repo]: https://github.com/tpoisot/biweb
[cesarito]: http://ecotheory.biology.gatech.edu/~cflores/
[inf_paper]: http://onlinelibrary.wiley.com/doi/10.1111/2041-210X.12103/abstract
[inf_code]: http://figshare.com/articles/Code_and_example_data_to_calibrate_the_niche_model_of_food_webs_based_on_allometric_relationships/650228
[cam]: http://albouycamille.free.fr/index.php
[dom]: http://chaire-eec.uqar.ca/home.php
[null_repo]: https://github.com/tpoisot/CNullModels
[pyco_repo]: https://github.com/tpoisot/PyCoPhy
[manna_repo]: https://github.com/tpoisot/manna
[paco_repo]: https://gtihub.com/PoisotLab/paco
