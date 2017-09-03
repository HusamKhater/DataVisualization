var radarChartLegends ={
	draw: function(id, width, height, LegendOptions, extraWidth, extraHeight){
			
 var colorscale = d3.scale.category20();

  // color scale
  var colors = ['#2e62cd', '#ffa200', '#29b15c', '#ae41d6', '#ec4949',
  '#db7ca9', '#d4c22a', '#1d8371', '#774831', '#8f8d88',
  '#174c16', '#85bbbd', '#9385bd', '#bd8585', '#ff7cf1',
  '#7c8bff', '#7cffdf', '#29b15c', '#7c9a33', '#9a5a33',
  '#ae00a8', '#d8f9c5', '#466548', '#677488', '#888467',
  '#cc894d', '#594954', '#2e7171', '#6a6172', '#ffecdc'];

var colorscale = d3.scale.ordinal()
.range(colors);



	var svg = d3.select(id)
	.selectAll('svg')
	.append('svg')
	.attr("width", width + extraWidth)
	.attr("height", height+ extraHeight)

//Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)') 
	.attr("x", width - 70 + 100)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("Players Comparison")
	
		
//Initiate Legend	
	var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)') 
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", width - 65 + 100)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", width - 52 + 100)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;

	

	}
}
