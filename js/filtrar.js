/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function prueba(palabra_filtrada) {
    /*d3.csv("data/datos_prueba.csv",function(datos){
        //console.log(datos);
        data = datos;
        var filtrados = datafilter();//filter csv 
        //console.log(filtrados);
    });*/
    
    /*d3.json("data/Incidentes2017.json", function(datos_json){
       //console.log("...Filtrando Datos");
       datos_json = d3.hierarchy(datos_json)
          .sum(function(d) { return d.size; })
          .sort(function(a, b) { return b.value - a.value; });
       //console.log(datos_json.children);
       //console.log(datos_json.descendants());
       datos = datos_json;
       var filtrados_json = datafilter_json(palabra_filtrada);// filter json
       //console.log("filtrados json:");
       //console.log(filtrados_json);
    });*/
    
    d3.json("data/Logistica.json", function(datos_json){
       console.log("...Filtrando Datos de Logistica.json");
       datos_json = d3.hierarchy(datos_json)
          .sum(function(d) { return d.size; })
          .sort(function(a, b) { return b.value - a.value; });
       //console.log(datos_json.children);
       //console.log(datos_json.descendants());
       datos = datos_json;
       var filtrados_json = datafilter_json(palabra_filtrada);// filter json
       //console.log("filtrados json:");
       //console.log(filtrados_json);
    });
    
    
}

/*function datafilter(d){
    var sector = document.getElementById("sec");
    var sec = sector.options[sector.selectedIndex].value;    
    data = data.filter(function(d) { return d.sec  === sec;});
    return data;
}*/

function datafilter_json(palabra_filtrada){
    //console.log("datos: " + datos);
    //console.log("palabra_filtrada: " + palabra_filtrada);
    /*for(var i=0; i<datos.children.length; i=i+1){
        if(datos.children[i].data.name === palabra_filtrada){
            data = datos.children[i].data;
            return data;
        }
    }  */  
    var todos = datos.leaves();
    console.log("todos: " + todos);
    console.log(todos.length);
    for(var i=0; i<todos.length; i=i+1){
        if(todos[i].data.name === palabra_filtrada){
            data = todos[i].data;
            console.log("Retornando: " + data);
            return data;
        }
    }
}