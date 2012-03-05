---
layout: page
title: Blog
summary: blog
---

{% for post in site.posts %}
`{{ post.date | date_to_string }}` **::** [{{ post.title }}]({{ site.url }}{{ post.url }})
{% endfor %}
