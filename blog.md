---
layout: page
title: Blog
summary: blog
---

{% for post in site.posts %}
{% if post.type == 'note' %}
`{{ post.date | date_to_string }}` **::** [{{ post.title }}]({{ site.url }}{{ post.url }})
{% endif %}

{% if post.type == 'paper' %}
`{{ post.date | date_to_string }}` **::** New paper — [{{ post.title }}]({{ site.url }}{{ post.url }})
{% endif %}

{% if post.type == 'essay' %}
`{{ post.date | date_to_string }}` **::** Essay — [{{ post.title }}]({{ site.url }}{{ post.url }})
{% endif %}

{% endfor %}
