var ScatPlotChart = {
draw: function(ticksX, ticksY, minY, data){
var margin = {
            top: 5,
            right: 20,
            bottom: 20,
            left: 40
        },
        width = 1150 - margin.left - margin.right,
        height = 900 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(ticksX);
        //.innerTickSize(-width)
        //.tickPadding(23);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(ticksY + minY);

    d3.select(".corDraw").select("svg").remove();
    var svg = d3.select(".corDraw").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var theCounter = [];
    for(var i = 0; i<data.length; i++){
        theCounter[i] = data[i].counter;
    }

    color = d3.scale.linear().domain([1,d3.max(theCounter)])
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb('#FFF1F1'), d3.rgb("#950000")])


    var line = d3.svg.line()
        .x(function(d) {
            return x(d.x);
        })
        .y(function(d) {
            return y(d.yhat);
        });

    x.domain(d3.extent(data, function(d) {
        return d.x;
    }));
    y.domain([0, d3.max(data, function(d) {
        return d.y;
    })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

        function make_x_axis() {        
            return d3.svg.axis()
                .scale(x)
                 .orient("bottom")
                 .ticks(ticksX)
        }
        
        function make_y_axis() {        
            return d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(ticksY+2)
        }

  // add the X gridlines
    svg.append("g")			
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(make_x_axis()
      .tickSize(-height, 0 ,0)
      .tickFormat("")
        )

    // add the Y gridlines
    svg.append("g")			
    .attr("class", "grid")
    .call(make_y_axis()
      .tickSize(-width, 0 ,0 )
      .tickFormat("")
        )

    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("fill", function(d){return color(d.counter)})
        .attr("cx", function(d) {
            return x(d.x);
        })
        .attr("cy", function(d) {
            return y(d.y);
        });

        var tooltips= d3.selectAll(".dot")
        .append("title")
            .classed("tooltip", true)
            .text(function(d) { return d.counter });

    svg.append("path")
        .datum(data)
        .attr("class", "line2")
        .attr("d", line);

    }

}
