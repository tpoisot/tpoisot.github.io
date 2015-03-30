---
author: Tim
layout: post
title: COinS metadata in Jekyll blogposts
type: note
tags:
- jekyll
- bibliography
---

[COinS](http://ocoins.info/) is a specification to embed metadata in web pages. In short, when these data are present, most bibliography software are able to add the resource to your library. Having these data in blog posts can be good, because you can keep track of blog posts with your other references, but you can also formally cite blog posts in your papers (if some people can turn [blog posts into *TREE* papers](http://dynamicecology.wordpress.com/2011/06/17/zombie-ideas-in-ecology/), citing blog posts might not be so far away).

Adding `COinS` data to your blog is usually done through plug-ins. A short googling revealed that there is no plug-in to generate these data for blogs running `jekyll`. Having 5 minutes to lose, I decided to just go ahead and write one. Here it goes:

{% highlight html %}
{% raw %}
<span
	class="Z3988" 
	title="ctx_ver=Z39.88-2004
	&amp;rft_val_fmt=info%3Aofi%2Ffmt%3Akev%3Amtx%3Adc
	&amp;rfr_id=info%3Asid%2Focoins.info%3Agenerator
	&amp;rft.title={{ page.title}}
	&amp;rft.creator={{site.author.name}}
	&amp;rft.date={{ page.date | date: "%Y-%m-%d" }}
	&amp;rft.language=EN
	&amp;rft.rights=CC-BY-SA
	&amp;rft_id={{site.production_url}}{{page.url}}">
</span>
{% endraw %}
{% endhighlight %}

As usual, if you want to use it (and there might be some tweaking to do, if you don't use *Jekyll bootstrap*), just place it in the `_includes` directory, and somewhere in your blog layout

{% highlight html %}
{% raw %}
{% include coins.html %}
{% endraw %}
{% endhighlight %}

So right now, if you are using Zotero, you might see a little reference icon in your address bar. Mendeley is also able to detect `COinS` data, and so might be other programs.