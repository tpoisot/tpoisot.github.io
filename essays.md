---
layout: page
title: Essays
summary: essays
---

Some opinions about ecology, open science, computing, you name it.

{% for post in site.posts %}
{% if post.type == 'essay' %}
`{{ post.date | date_to_string }}` **::** [{{ post.title }}]({{ site.url }}{{ post.url }})
{% endif %}
{% endfor %}
