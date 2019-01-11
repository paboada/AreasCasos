function crear_bar_chart(seccion_bar){   
    
    var svg = d3.select("body").selectAll(seccion_bar)
                .append("svg")
                .attr("class","bar_chart")
                .attr("width", 400)
                .attr("height", 400);
        
    var margin = {top: 20, right: 45, bottom: 30, left: 60},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;
  
var tooltip = d3.select("body").append("div").attr("class", "toolTip");
  
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleBand().range([height, 0]);

var g = svg.append("g")
        .attr("class","cont_barras")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  
d3.json("data/Logistica.json", function(error, data) {
  	if (error) throw error;
  	data.sort(function(a, b) { return a.value - b.value; });
        
        x.domain([0, d3.max(data, function(d) { return d.value; })]);
        y.domain(data.map(function(d) { return d.area; })).padding(0.1);
        
        g.append("g")
           .attr("class", "x axis")
           .attr("transform", "translate(" + (35) + "," + height + ")")
           .call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d); }).tickSizeInner([-height]));
   
        g.append("g")
           .data(data) //para que actualice el orden de los titulos en el eje y
           .attr("class", "y axis")
           .call(d3.axisLeft(y));
   
        g.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", margin.left-25)
            .attr("height", y.bandwidth())
            .attr("y", function(d) { return y(d.area); })
            .attr("width", function(d) { return x(d.value); });
});
}
