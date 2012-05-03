---
layout: page
title: Blog
summary: blog
---

{% for post in site.posts %}
{% include post-excerpt.html %}
{% endfor %}
