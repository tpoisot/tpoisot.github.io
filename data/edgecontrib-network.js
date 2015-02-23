var Gwidth = 630,
    Gheight = 500;

var color = d3.scale.category20();

var edgecolor = d3.scale.linear()
    .domain([-0.007, 0, 0.007])
    .range(["#2C7BB6", "#FFFFBF", "#D7191C"]);

var force = d3.layout.force()
    .charge(-100)
    .linkDistance(10)
    .size([Gwidth, Gheight]);

var Gsvg = d3.select(".edgecolor").append("svg")
    .attr("width", Gwidth)
    .attr("height", Gheight);

d3.json("/data/edgecontrib-web.json", function(error, graph) {
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = Gsvg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(2); })
      .style("stroke", function(d) { return edgecolor(d.value); });

  var node = Gsvg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 4)
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