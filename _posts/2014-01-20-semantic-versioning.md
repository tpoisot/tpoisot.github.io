---
title: Semantic versioning for scientific software
author: Tim
type: note
layout: post
tags:
- productivity
- software
- R
---

I have recently discovered the concept of [semantic versioning][semver],
introduced by Tom Preston-Werner. In short, semantic versioning is a
way to know whether two versions of a program will behave in the same
way. A program conforming to this specification has a version number of
`major`.`minor`.`patch`, and comparing two version numbers will tell you
exactly what to expect in terms of compatibility. Versions with different
`major` numbers are not supposed to be compatible. A version with a higher
`minor` number will have additional, backwards compatible functions. Different
levels of `patch` will correspond to issues solving and so forth.

Semantic versioning is intended for programs declaring a public API, as
all `R` packages do (the various functions and data formats). Any package,
module, etc., declaring functions that will be used in user-written scripts
are within the scope of semantic versioning. A script that you wrote using
v. `1.2.3` will work when `1.3.1` or `1.2.4` are released, but *not* when
`2.0.0` is. An important point is that, unless `major` is `1`, the software
is considered unstable: the API can change very rapidly, and so it should
not be used for production.

[Yihui Xie][yx] proposes a slightly different set of rules, specifically
aimed at `R` packages. When the `minor` version increases, release the new
version of your package to `CRAN` (as `patch` versions are not supposed to
introduce new features anyway). People can just save time by referring to the
`major`.`minor` version of the package. The way semantic versioning works,
you will only submit `major`.`minor`.`0` versions to `CRAN` (because each
time a number increases, all numbers to the right are set to `0`). And so
any version with `patch` higher than `0` is a *development* version.

---

What is the relevance of that for people not contributing to software
development? I think using semantic versioning is useful if we *report*
version numbers in the papers in the same way. If you distribute supplementary
files with your paper, such as `R` scripts, don't give the package name,
but also the version of the package you used. This can be viewed using
`sessionInfo()`. If you use package `foo`, v. `1.3.0`, and the maintainer of
package `foo` uses semantic versioning, if someone tries to use your script
a few years later with `foo` v. `2.1.0`, it is *possible* that things will
break. If you clearly state which packages versions are used, it will be easier
for users to install the correct version of the packages to run your analyses.

Correct reporting of software versions is important (and I've been guilty of
not using top-notch practices myself), but if an increasing number of people
start using semantic versioning, it will *help* re-use of code. In short,
we should always give the full version number when mentioning a package
or software.

---

As a final note, this also require the those of us producing code adopt
better development practices. In *GitHub*, it is easy to tag releases,
so that all different versions are available over time. And because the
ultimate goal of semantic versioning is to ensure backwards compatibility,
we need to be sure that new fixes or additions do not break it. This can
be done by writing thorough test suites. Unless a new addition results in
previously passing tests failing, it can be considered safe.

[semver]: http://semver.org/
[yx]: http://yihui.name/en/2013/06/r-package-versioning/
