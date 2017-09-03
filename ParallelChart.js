var ParallelChart = {
draw: function(id, array, pWidth, pHeight, pMarginTop, pMarginleft, extraWidth, indicator){

  var extHeight = 0;
if(indicator == 1) extHeight = 50;
else extHeight = 80;
// Handles a brush event, toggling the display of foreground lines.
function brush() {
  var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
      extents = actives.map(function(p) { return y[p].brush.extent(); });
  foreground.style("display", function(d) {
    return actives.every(function(p, i) {
      return extents[i][0] <= d[p] && d[p] <= extents[i][1];
    }) ? null : "none";
  });
}
//  var array = [
//    {name:"ayman", Heading:"30", Shooting:"70", Memory:"50"},
//    {name:"hosam", Heading:"15", Shooting:"80", Memory:"60"},
//    {name:"jameel", Heading:"100", Shooting:"12", Memory:"0"}
//  ]



// linear color scale
 // color scale
 var colors = ['#2e62cd', '#ffa200', '#29b15c', '#ae41d6', '#ec4949',
 '#db7ca9', '#d4c22a', '#1d8371', '#774831', '#8f8d88',
 '#174c16', '#85bbbd', '#9385bd', '#bd8585', '#ff7cf1',
 '#7c8bff', '#7cffdf', '#29b15c', '#7c9a33', '#9a5a33',
 '#ae00a8', '#d8f9c5', '#466548', '#677488', '#888467',
 '#cc894d', '#594954', '#2e7171', '#6a6172', '#ffecdc'];

var colorscale = d3.scale.ordinal()
.range(colors);



var margin = {top: pMarginTop, right: 0, bottom: 0, left: 0 },
    width = pWidth;
    height = pHeight;

var x = d3.scale.ordinal().rangePoints([0, width], 1),
    y = {};

var line = d3.svg.line(),
    axis = d3.svg.axis().orient("left"),
    background,
    foreground;

d3.select(id).select("svg").remove();
var svg = d3.select(id).append("svg")
    .attr("width", width + extraWidth)
    .attr("height", height + extHeight)
    .style("margin-top", 0)
    .style("margin-left", pMarginleft)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  // Extract the list of dimensions and create a scale for each.
  x.domain(dimensions = d3.keys(array[0]).filter(function(d) {
    return d != "name" && (y[d] = d3.scale.linear()
        .domain([0,100])
        .range([height, 0]));
  }));

  // Add grey background lines for context.
  background = svg.append("g")
      .attr("class", "background")
    .selectAll("path")
      .data(array)
    .enter().append("path")
      .attr("d", path);

  // Add blue foreground lines for focus.
  foreground = svg.append("g")
      .attr("class", "foreground")
    .selectAll("path")
      .data(array)
    .enter().append("path")
      .attr("d", path)
      // .style('stroke', d3.scale.category10("10"));
      .style('stroke', function(d, i) { return colorscale(i); })
      .style('stroke-width', '2px');
  //Add tooltips
  var tooltips= d3.selectAll("path")
    .append("title")
        .classed("tooltip", true)
        .text(function(d) { return d.name });
    
    
  // Add a group element for each dimension.
  var g = svg.selectAll(".dimension")
      .data(dimensions)
    .enter().append("g")
      .attr("class", "dimension")
      .attr("transform", function(d) { return "translate(" + x(d) + ")"; });

  // Add an axis and title.
  g.append("g")
      .attr("class", "axis")
      .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
    .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .text(function(d) { return d; });

  // Add and store a brush for each axis.
  // g.append("g")
  //     .attr("class", "brush")
  //     .each(function(d) { d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brush", brush)); })
  //   .selectAll("rect")
  //     .attr("x", -8)
  //     .attr("width", 16);

// Returns the path for a given data point.
function path(d) {
  return line(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
}


} // end of draw
};  // end of ParralelChart variable