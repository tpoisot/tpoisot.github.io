---
layout: page
title: CV
---

# Career

## Appointments

<ul>
{% for entry in site.data.metadata.positions %}
    <li>
    <date>{{ entry.date }}</date>
    <role>{{ entry.rank }}</role><br />
    <place>{{ entry.where }}</place>
    </li>
{% endfor %}
</ul>

## Affiliations

<ul>
{% for entry in site.data.metadata.memberships %}
    <li>
    <date>{{ entry.date }}</date>
    <thing>{{ entry.rank }}</thing><br />
    <place>{{ entry.center }}</place>
    </li>
{% endfor %}
</ul>

## Education

<ul>
{% for entry in site.data.metadata.education %}
    <li>
    <date>{{ entry.date }}</date>
    <thing>{{ entry.diploma }}</thing><br />
    <place>{{ entry.university }}</place>
    </li>
{% endfor %}
</ul>

# Teaching

{% for category in site.data.teaching %}
{% assign cat = category[1] %}
<h2>{{ cat.name }}</h2>

<ul>
{% for entry in cat.items %}
    <li>
        <date>{{ entry.date }}</date>
        <thing>{{ entry.title }}</thing><br />
        <place>{{ entry.institution }} ({{ entry.code }})</place><br />
        <description>{{ entry.description }} - about {{ entry.attendance }} students</description>
        <br />
    </li>
{% endfor %}
</ul>

{% endfor %}

# Funding

{% for category in site.data.funding %}
{% assign cat = category[1] %}
<h2>{{ cat.name }}</h2>

<ul>
{% for entry in cat.items %}
    <li>
        <date>{{ entry.date }}</date>
        <thing>{{ entry.title }}</thing><br />
        {{ entry.funder }}
        {{ entry.program }}
        <br />
        <amount>{{ entry.amount }} CAD</amount>{% if entry.role %} (as {{ entry.role }}){% endif %}
    </li>
{% endfor %}
</ul>

{% endfor %}

# Service

## Editorial responsibilities

<ul class="listing editorial">
{% for entry in site.data.service.editorial %}
    <li class="entry">
    <role>{{ entry.role }}</role>, <journal>{{ entry.journal }}</journal>
    <date>{{ entry.date }}</date>
    </li>
{% endfor %}
</ul>

# Academic production

## Publications

<ul>
{% for publication in site.data.publications %}
    <li>
    {% for author in publication.author %}
        {{author.given}} {{author.family}}
    {% endfor %}
    {{ publication.title }}
    {{ publication.DOI }}
    </li>
{% endfor %}
</ul>


## Presentations

{% for category in site.data.talks %}
{% assign cat = category[1] %}
<h3>{{ cat.name }}</h3>
<ul>
{% for entry in cat.items %}
    <li>
    <date>{{ entry.date }}</date>
    <thing>{{ entry.title }}</thing><br />
    <place>{{ entry.venue }}</place>
    </li>
{% endfor%}
</ul>
{% endfor %}

