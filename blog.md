---
layout: page
title: Blog
summary: blog
---

Small notes, random code snippets, half-baked opinions, and shameless self promotion about new papers. For more substantial ideas (hopefuly), look at the [essays]({{ site.url }}/essays) page.

{% for post in site.posts %}
{% if post.type == 'note' %}
`{{ post.date | date_to_string }}` **::** [{{ post.title }}]({{ site.url }}{{ post.url }})
{% endif %}

{% if post.type == 'paper' %}
`{{ post.date | date_to_string }}` **::** [{{ post.title }}]({{ site.url }}{{ post.url }}) (new paper)
{% endif %}
{% endfor %}
