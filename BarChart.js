var BarChart ={
	draw: function(id, width, height, extraWidth, extraHeight, data){
			

var m = [80, 10, 10, 30],
    w = width - m[1] - m[3],
    h = height - m[0] - m[2];



var format = d3.format(",.0f");

var x = d3.scale.linear().range([0, w]),
    y = d3.scale.ordinal().rangeRoundBands([0, h], .15);

var xAxis = d3.svg.axis().scale(x).orient("top").tickSize(-h),
    yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);
d3.select(id).select("svg").remove();
var svg = d3.select(id).append("svg")
    .attr("width", w + m[1] + m[3] + extraWidth)
    .attr("height", h + m[0] + m[2] + extraHeight)
  .append("g")
    .attr("transform", "translate(" + 140 + "," + 30 + ")");

    
   


  // Parse numbers, and sort by value.
  data.forEach(function(d) { d.value = +d.value; });
  data.sort(function(a, b) { return b.value - a.value; });

  // Set the scale domain.
  x.domain([0, d3.max(data, function(d) { return d.value; })]);
  y.domain(data.map(function(d) { return d.name; }));

  var bar = svg.selectAll("g.bar")
      .data(data)
    .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(0," + y(d.name) + ")"; });

  bar.append("rect")
      .attr("width", function(d) { return x(d.value); })
      .attr("height", y.rangeBand());

  bar.append("text")
      .attr("class", "value")
      .attr("x", function(d) { return x(d.value); })
      .attr("y", y.rangeBand() / 2)
      .attr("dx", -3)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(function(d) { return format(d.value); });

  svg.append("g")
      .attr("class", "x axis")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    }
}