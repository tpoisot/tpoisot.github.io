---
layout: page
title: CV
---

# Funding

{% for category in site.data.funding %}
{% assign cat = category[1] %}
<h2>{{ cat.name }}</h2>

<ul>
{% for entry in cat.items %}
    <li>
        {{ entry.title }}
    </li>
{% endfor %}
</ul>

{% endfor %}
