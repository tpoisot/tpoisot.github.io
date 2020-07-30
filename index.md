---
layout: page
title: CV
---

# Funding

## Grants

<ul>
{% for entry in site.data.funding.grants %}
   <li>
    {{ entry.title }}
   </li>
{% endfor %}
</ul>

## Research contracts

<ul>
{% for entry in site.data.funding.contracts %}
   <li>
    {{ entry.title }}
   </li>
{% endfor %}
</ul>
