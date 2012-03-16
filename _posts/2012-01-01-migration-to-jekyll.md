---
layout: post
title: Goodbye Wordpress, hello Jekyll!
summary: blog
chapo: A new platform for this website.
author: Tim
---

A few weeks ago, I discovered [Jekyll](https://github.com/mojombo/jekyll). In a nutshell, Jekyll is a static site generator who promised me I'll be able to [blog like a hacker](http://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html). This site is now hosted on GitHub, and [both the template and the content can be forked](https://github.com/tpoisot/tpoisot.github.com), so everything is basically open source.

Jekyll is a lot of fun to use, especially because all of the content reside in *static text files* instead of a database. It's also fully compatible with the [markdown](http://daringfireball.net/projects/markdown/) format, which is a lot easier to write than html. For example, writing a simple text in bold in markdown is done through

{% highlight bash %}
**text in bold**
{% endhighlight %}

rather than the equivalent html

{% highlight html %}
<strong>text in bold</strong>
{% endhighlight %}

So a less lot keys to press (especially on my new QWERTY keyboard). The fact that Jekyll uses the [Liquid](https://github.com/Shopify/liquid/wiki) templating language also make the overall design process *fun*. In addition, the whole system is working on GitHub, so I have complete version control on everything. This is so awesome!