var margin = {top: 20, right: 50, bottom: 30, left: 40},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var OffSet = 0.85;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

var color = d3.scale.category20();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select(".barplot").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/data/stackbardemo.csv", function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "site"; }));

  data.forEach(function(d, i) {
    var y0 = 0;
    d.abund = color.domain().map(function(name, j) { return {ab: d[name], name: name, y0: j, j: j, y1: j += +d[name]*OffSet}; });
    d.stop = d.abund[d.abund.length - 1].j;
    d.total = d.abund[d.abund.length - 1].data;
  });

  //y1.sort(function(a, b) { return b.total - a.total; });

  x.domain(data.map(function(d) { return d.site; }));
  var YMax = d3.max(data, function(d) { return d.stop + 1; });
  y.domain([0, YMax]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  data.forEach(function(d, i) {
    if(i == 1){
       var y0 = 0;
      d.temp = color.domain().map(function(name, k) {
        var temp_y = d3.scale.linear()
          .rangeRound([(k+1)*(height/YMax), (k)*(height/YMax)+(height/YMax)*(1-OffSet)])
          .domain([0, 1]);
        var temp_yAxis = d3.svg.axis()
          .scale(temp_y)
          .orient("left")
          .ticks(3)
          .tickFormat(d3.format(".1s"));
        svg.append("g")
          .attr("class", "y axis")
          .call(temp_yAxis);
        return 0; 
      });
    };
  });

  var site = svg.selectAll(".state")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x(d.site) + ",0)"; });

  var rect = site.selectAll("rect")
      .data(function(d) { return d.abund; })
    .enter().append("rect")
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.y1); })
      .attr("height", function(d) { return y(d.y0) - y(d.y1); })
      .style("fill", function(d) { return color(d.name); });

      rect.append("title").text(function(d) { return "Freq.: "+d.ab; });

  var legend = svg.selectAll(".legend")
      .data(color.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width + 50)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

});