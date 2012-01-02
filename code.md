---
layout: page
title: Code
---

{% assign chapo-page = {{ {{ {{page.title}} | prepend:'chapo-' }} | append:'.html' }} %}
{{chapo-page}}

<div id='chapo'>
	prepend - prepend a string e.g. {{ 'bar' | prepend:'foo' }} #=> 'foobar'
	append - append a string e.g. {{ 'foo' | append:'bar' }} #=> 'foobar'
	{% include chapo-{% page.title %}.html %}
</div>

<div id='main'>

	<div class='project'>
		<h2>Analyzing bipartite networks in Python</h2>
		<a href='http://tpoisot.github.com/bipy/'>bipy</a> is a Python module to analyse bipartite ecological networks.
	</div>

	<div class='project'>
		<h2>Measuring Ecological Specificity</h2>
		<a href='https://r-forge.r-project.org/projects/esm/'>ESM</a> is a R package to measure ecological specialization at the species level. Most of its functions are included in bipy.
	</div>
	
</div>

<div id='aside'>

	{% include sidebar-social.html %}

</div>