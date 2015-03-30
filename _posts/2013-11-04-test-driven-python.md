---
title: Notes on test-driven development (in Python)
author: Tim
layout: post
type: note
tags:
- scientific software
- python
- open lab book
---

I'm looking into the methodology of *test-driven development*, that is when
you write your tests *before* writing your code. The advertised benefit is
that you know in advance the behavior of your code, and it will make it easier
to implement and debug. This [paper at O'Reilly][orp] is a good introduction
(although the exact functions of `unittest` it uses are now deprecated). To
get started, I'll work on a simple script that takes a series of numerical
values, and divide them by their max, to get the equivalent series of values
but in [0;1]. Let's start with the basics:

~~~ python
import unittest     # for testing
import numpy as np  # for other things
~~~

The first function I'd like to write will be called `scale`, and it will take a
(`numpy`) array of numerical values, and return the same array divided by its
maximal value. So my first *unit test* will test that the function performs
as needed:

~~~ python
class scaleTest(unittest.TextCase):
   def testOnKnownResult(self):
      KnownInput = np.array([2.0, 1.0, 0.0])
      Scaled = scale(KnownInput)
      self.assertTrue((Scaled[0] == 1.0) and (Scaled[1] == 0.5))
~~~

There are a number of stupid-proofing steps required. First, the function
cannot work when all values in the array are 0, or if there are negative
values, so I'll write a test for that. I want the function `scale` to raise a
`ValueError`.

~~~ python
def testNegative(self):
   WithNeg = np.array([-1.0, 1.0, 0.0])
   self.assertRaises(ValueError, scale, WithNeg)
def testNull(self):
   OnlyNull = np.array([0.0, 0.0, 0.0])
   self.assertRaises(ValueError, scale, OnlyNull)
~~~

Now I have one test to check that the expected behavior is indeed obtained,
and two tests to check that the input values are correct. Things are starting
to look good! The one final thing that I want to enforce is the type of
inputs. Specifically, I want `numpy` arrays of numeric types. If this is
not the case, the `scale` function will raise a `TypeError`.

{%highlight python %}
def testType(self):
   WithChar = np.array([1, '0.0', 0.1])
   self.assertRaises(TypeError, scale, WithCar)
{% endhighlight %}

At this point, even though I haven't yet wrote a single line of the `scale`
function, I know quite well how it should work! Importantly, I know the
type of data that will come in this function. This is something I like when
writing code: I need to understand which data go where, and how they are
formatted and transformed along the way. I try to make students think about
this when giving courses. What kind of data go in? What kind of data come
out? This approach forces to determine when and how the function will break,
and it's great to have a very clear idea of the data types.

Now is the time to program the actual function. It will take one argument,
and return another array (the original one is not modified). Let's write
the simplest possible form of this function:

{% highlight python %}
def scale(p):
   return p/np.max(p)
{% endhighlight %}

In most situations, I would have been happy writing the function this way. Let's integrate it with the test suite, and see how it goes:

~~~ python
#! /usr/bin/python2

import unittest
import numpy as np

## scaleTest goes here

## scale goes here

def main():
   unittest.main()

if __name__ == '__main__':
   main()
~~~

Here is the output of running this file:

~~~
======================================================================
FAIL: testNegative (__main__.scaleTest)
----------------------------------------------------------------------
Traceback (most recent call last):
File "lv.py", line 21, in testNegative
self.assertRaises(ValueError, scale, WithNeg)
AssertionError: ValueError not raised
======================================================================
FAIL: testNull (__main__.scaleTest)
----------------------------------------------------------------------
Traceback (most recent call last):
File "lv.py", line 18, in testNull
self.assertRaises(ValueError, scale, WithNeg)
AssertionError: ValueError not raised
----------------------------------------------------------------------
Ran 4 tests in 0.001s
FAILED (failures=2)
~~~

There are *only* two failed tests. This is because `testOnKnownResult` is
expected to succeed, and `testType` will catch the `TypeError` raised by
`np.max` if there are arguments of the bad type. So now I just need to test
that the argument are not negative, or not only zeroes:

{% highlight python %}
def scale(p):
   # We test that values are positive
   if np.min(p) < 0.0:
      raise ValueError('Values of p cannot be smaller than 0')
   # We test that values are not all null
   if np.max(p) == 0.0:
      raise ValueError('Values of p cannot be all equal to 0')
   # Finally we return the result
   return p/np.max(p)
{% endhighlight %}

With these two checks, we can now re-run the tests:

{% highlight text %}
....
----------------------------------------------------------------------
Ran 4 tests in 0.001s
OK
{% endhighlight %}

Mission accomplished! It requires some discipline to work this way, but I
actually enjoyed going through this example. I really like the fact that
this approach forces to ask question about the structure of the code first,
and write the actual code later.

[orp]: http://www.onlamp.com/pub/a/python/2004/12/02/tdd_pyunit.html
