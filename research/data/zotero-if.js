var margin = {top: 20, right: 80, bottom: 30, left: 60},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
    
var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category20();

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

d3.tsv("/data/zotero-if.tsv", function(error, data) {
  data.forEach(function(d) {
    d.IF = +d.IF;
    d.count = +d.count;
  });

  x.domain(d3.extent(data, function(d) { return d.IF; })).nice();
  y.domain(d3.extent(data, function(d) { return d.count; })).nice();

  Ssvg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Impact factor");

  Ssvg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Count")

  Ssvg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("title", function(d) { return d.journal; })
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.IF); })
      .attr("cy", function(d) { return y(d.count); });

});