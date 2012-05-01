---
layout: page
title: Essays
summary: essays
---

{% for post in site.posts %}
{% if post.type == 'essay' %}
`{{ post.date | date_to_string }}` **::** [{{ post.title }}]({{ site.url }}{{ post.url }})
{% endif %}
{% endfor %}
