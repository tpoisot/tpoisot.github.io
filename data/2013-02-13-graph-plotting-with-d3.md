---
author: Tim
layout: post
title: Estimating node contribution to network properties
type: note
tags:
- ecological networks
- modularity
- open lab book
- python
- networkx
---

This is a network:

<div class='web'></div>

also let's regenerate the file.

This should be a lineplot:

<div class='lineplot'></div>

Is it working?


This should finally be a scatterplot:

<div class='scatterplot'></div>

D3 is so awesome!

<script>

var width = 600,
    height = 200;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-200)
    .linkDistance(20)
    .size([width, height]);

var Gsvg = d3.select(".web").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("{{ site.url }}/data/sialia.json", function(error, graph) {
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = Gsvg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); })
      .style("stroke", '#ccc');

  var node = Gsvg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
});

</script>

<script>

var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d%H%M%S").parse;
// 2013-02-12 12:00:00

var sx = d3.time.scale()
    .range([0, width]);

var sy = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var SxAxis = d3.svg.axis()
    .scale(sx)
    .orient("bottom");

var SyAxis = d3.svg.axis()
    .scale(sy)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return sx(d.date); })
    .y(function(d) { return sy(d.temperature); });

var svg = d3.select(".lineplot").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("{{ site.url }}/data/out.tsv", function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

  data.forEach(function(d) {
    d.date = parseDate(d.date);
  });

  var cities = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, temperature: +d[name]};
      })
    };
  });

  sx.domain(d3.extent(data, function(d) { return d.date; }));

  sy.domain([
    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
  ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(SxAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(SyAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Modularity");

  var city = svg.selectAll(".city")
      .data(cities)
    .enter().append("g")
      .attr("class", "city");

  city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  city.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + sx(d.value.date) + "," + sy(d.value.temperature) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });
});

</script>

<script>

var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
    
var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var Ssvg = d3.select(".scatterplot").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("{{ site.url }}/data/out.tsv", function(error, data) {
  data.forEach(function(d) {
    d.q = +d.q;
    d.qr = +d.qr;
  });

  x.domain(d3.extent(data, function(d) { return d.q; })).nice();
  y.domain(d3.extent(data, function(d) { return d.qr; })).nice();

  Ssvg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Modularity");

  Ssvg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Realized modularity")

  Ssvg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.q); })
      .attr("cy", function(d) { return y(d.qr); });

});

</script>