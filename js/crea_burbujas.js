//by Pablo Andres Boada Aragon
//on 05/03/2018

function crea_burbujas (seccion,archivo,nombre_svg){   
    /*console.log("Inicia funcion crea_burbujas");  
    console.log("seccion:" + seccion); 
    console.log("archivo:" + archivo); 
    console.log("nom_svg:" + nombre_svg); */
    
    var margin = {top: 75, right: 15, bottom: 125, left: 85},
    width = 400,
    height = 400;

    var svg = d3.select("body").selectAll(seccion)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("id", nombre_svg ); //diferencio los svg para el toolstip

    var diameter = +svg.attr("width"),
        g = svg.append("g").attr("transform", "translate(2,2)"),
        format = d3.format(",d");

    var pack = d3.pack().size([diameter - 4, diameter - 4]);

    d3.json(archivo, function(error, root) 
    {
        if (error) throw error;

        root = d3.hierarchy(root)
          .sum(function(d) { return d.size; })
          .sort(function(a, b) { return b.value - a.value; });
    //console.log(root);
    //console.log(root.children.length);
     //console.log("root.descendants()");
     //console.log(root.descendants());
     //console.log("des");
     //console.log(des);
     //console.log(root.leaves());
     //var r = root.children[1].data.name;
     //console.log(r);
     //var descendants = root.descendants();
     //console.log(descendants);
     //showArrayElements(ancestors, "root.ancestors()");
     //showArrayElements(descendants, "root.descendants()");
     //showArrayElements(descendants, "root.descendants()");
     //console.log("childrens");
     //console.log(root.value); 
     var node = g.selectAll(".node")
                 .data(pack(root).descendants())
                 .enter().append("g")
                 .attr("class", function(d) {                                          
                                         return d.data.name.trim().toUpperCase().replace(",","").replace(new RegExp('[ ]{1}'),'_').replace(new RegExp('[ ]{1}'),'_');
                                            })                                                
                 .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; }); 
     
        node.append("circle")
         .data(pack(root).descendants())
         .attr("class", function(d) {
                                    //console.log(d.data.name.trim().replace(",",""));
                                    return  d.data.name.trim().toUpperCase().replace(",","").replace(new RegExp('[ ]{1}'),'_').replace(new RegExp('[ ]{1}'),'_');
                                     })
          .attr("r", function(d) { return d.r; })
          .on("mouseover", function(d){
                                        var su =  "."+d.data.name.trim().toUpperCase().replace(",","").replace(new RegExp('[ ]{1}'),'_').replace(new RegExp('[ ]{1}'),'_');
                                        d3.selectAll(su).style("fill", "red");   
                                        var total_2017 = d3.select("#Incidentes2017").selectAll(".INCIDENTES_TOTALES").datum();
                                        //console.log(total_2017.value);
                                        var total_2018 = d3.select("#Incidentes2018").selectAll(".INCIDENTES_TOTALES").datum();
                                        //console.log(total_2018.value);
                                        var sel2017 = d3.select("#Incidentes2017").selectAll(su).datum();
                                        var sel2018 = d3.select("#Incidentes2018").selectAll(su).datum();                                        
                                        //console.log(sel2017.data.name + " " + sel2017.value);
                                        //console.log(sel2018.data.name + " " + sel2018.value);                                        
                                        //console.log(sel2017.data.name + " " + sel2017.value/total_2017);
                                        //console.log(sel2018.data.name + " " + sel2018.value/total_2018); 
                                        //console.log("op1: " + sel2017.value);
                                        //console.log("op2: " + total_2018.value);                                        
                                        var porcentaje2017 = sel2017.value/total_2017.value * 100;
                                        var porcentaje2018 = sel2018.value/total_2018.value * 100;                                        
                                        d3.select(".med2017").text(porcentaje2017.toFixed(2) + "%");
                                        d3.select(".med2018").text(porcentaje2018.toFixed(2) + "%");
                                        
                                        var palabra_filtrada = d.data.name.trim();
                                        console.log("Entrando a prueba con filtro " + palabra_filtrada);  
                                        
                                        var datos_filtrados = prueba(palabra_filtrada);
                                        console.log("prueba me retorno: " + datos_filtrados);
                                        actualizar_barras(datos_filtrados, palabra_filtrada);
                                        //prueba(d.data.name.trim());
                                  })
                .on("mouseout", function(d){
                                        d3.selectAll("."+d.data.name.trim().toUpperCase().replace(",","").replace(new RegExp('[ ]{1}'),'_').replace(new RegExp('[ ]{1}'),'_'))
                                          .style("fill", "#1f77b4");
                                      });  
                                      
            
        node.append("title")
            .text(function(d) { return d.data.name + "\n" + format(d.value); });
                                      
            node.filter(function(d) { return !d.children; })
                .append("text")
                .attr("dy", "0.3em")
                .style("font-size","11px")
                .attr("fill", "black")              
                .text(function(d) { return d.data.name.substring(0, d.r / 3); });     
     
    });   
   
}


function showArrayElements(data, title) {
  d3.select('#content')
    .append('div')
    .html('<span>' + title + '</span>: ' + data.map(function(d) {return d.data.name;}).join(', '))
}


function actualizar_barras(datos_filtrados, palabra_filtrada){
    
    console.log("actualizar_barras!!!!!!!!");
    console.log("datos_filtrados " + datos_filtrados);
    console.log("palabra_filtrada " + palabra_filtrada);
   
    /*var data_proceso = "data/" + archivo_sel;
    
    
    d3.json(data_proceso, function(error, data) {
  	if (error) throw error;
        
        //declaracion de variables
        data.sort(function(a, b) { return a.value - b.value; }); 
        
        var margin = {top: 20, right: 45, bottom: 30, left: 60},        
            width = 400,
            height = 400; 
            
            width =  width - margin.left - margin.right,
            height = height - margin.top - margin.bottom;
            
        var x = d3.scaleLinear().range([0, width]);
        var y = d3.scaleBand().range([height, 0]);
        
        
        x.domain([0, d3.max(data, function(d) { return d.value; })]);
        y.domain(data.map(function(d) { return d.area; })).padding(0.1); 
        
        var chart = d3.select(".chart_total");    
        var ps = chart.selectAll("rect")
                      .data(data);
              
        data = d3.hierarchy(data);
                
        // Creates items
       ps.enter()
          .append("rect")
          .attr("class", "bar")
          .attr("x", 20)
          .attr("height", 20)
          .attr("y", 10)
          .attr("width", 10);
  
         // Updates items
        //reconstruye eje x
        var xaxis = d3.select(".x.axis");   
        xaxis.call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d); }).tickSizeInner([-height]));
        var yaxis = d3.select(".y.axis");   
        yaxis.call(d3.axisLeft(y));
        
        ps.attr("width", function(d) {return x(d.value);});  
        // Deletes items
        ps.exit().remove();
       
        
        })*/
        
}
