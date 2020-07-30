---
layout: page
title: CV
---

# Career

## Appointments

<ul>
{% for entry in site.data.metadata.positions %}
    <li>
    {{ entry.rank }}
    {{ entry.date }}
    {{ entry.where }}
    </li>
{% endfor %}
</ul>

## Education

<ul>
{% for entry in site.data.metadata.education %}
    <li>
    {{ entry.diploma }}
    {{ entry.date }}
    {{ entry.university }}
    </li>
{% endfor %}
</ul>

# Publications

# Presentations

{% for category in site.data.talks %}
{% assign cat = category[1] %}
<h2>{{ cat.name }}</h2>
<ul>
{% for entry in cat.items %}
    <li>
    {{ entry.title }}
    {{ entry.date }}
    {{ entry.venue }}
    </li>
{% endfor%}
</ul>
{% endfor %}

# Funding

{% for category in site.data.funding %}
{% assign cat = category[1] %}
<h2>{{ cat.name }}</h2>

<ul>
{% for entry in cat.items %}
    <li>
        {{ entry.title }}
        {{ entry.date }}
        {{ entry.funder }}
        {{ entry.program }}
        {{ entry.amount }}
        {{ entry.role }}
    </li>
{% endfor %}
</ul>

{% endfor %}
