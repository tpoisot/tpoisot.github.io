---
layout: page
title: CV
---

# Funding

{% for category in site.data.funding %}
{{ category }}
{% assign cat = category[1] %}
<h2>{{ category.name }}</h2>

<ul>
{% for entry in cat.items %}
    {{ entry.title }}
{% endfor %}
</ul>

{% endfor %}
