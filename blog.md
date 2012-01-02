---
layout: page
title: Blog
---

{% for post in site.posts %}
		<code>{{ post.date | date_to_string }}</code> :: <span class='post-title'><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></span><p />
{% endfor %}