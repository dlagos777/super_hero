$(()=> {

    function traerData(superhero){
        $.ajax({
            type:"GET",
            url: "https://www.superheroapi.com/api.php/10222886118495107/"+superhero,
            success: function(data){

            let stats = []
            for(key in data.powerstats){
                stats.push({label: key, y: data.powerstats[key]})
            }

            let superhero = {
                nombre: data.name,
                imagen: data.image.url,
                conexiones: data.connections["group-affiliation"],
                ocupacion: data.work.occupation,
                biografiaPublicado: data.biography.publisher,
                biografiaPrimeraAparicion: data.biography["first-appearance"],
                altura: data.appearance.height,
                peso: data.appearance.weight,
                alianzas: data.biography.aliases,
                estadisticas: stats
            }

            mostrarHero(superhero);
            mostrarGrafico(superhero);

            },
            error: function(error){
                alert(error)
            },
            async: true
        })
    }   
                
    let buscador = $("form");

    buscador.submit(function(event){
        event.preventDefault();
        let superhero = $("#superhero").val();
        traerData(superhero);
    })

    function mostrarHero(superhero){

        $("#datos-superhero").find("img").attr("src",superhero.imagen);
        $("#datos-superhero").find(".card-title").html(`Nombre: ${superhero.nombre}`);
        $("#datos-superhero").find(".card-text-1").html(`Conexiones: ${superhero.conexiones}`);
        $("#datos-superhero").find(".card-text-2").html(`Publicado por: ${superhero.biografiaPublicado}`);
        $("#datos-superhero").find(".card-text-3").html(`Ocupación: ${superhero.ocupacion}`);
        $("#datos-superhero").find(".card-text-4").html(`Primera Aparición: ${superhero.biografiaPrimeraAparicion}`); 
        $("#datos-superhero").find(".card-text-5").html(`Altura: ${superhero.altura}`);  
        $("#datos-superhero").find(".card-text-6").html(`Peso: ${superhero.peso}`);
        $("#datos-superhero").find(".card-text-7").html(`Alianzas: ${superhero.alianzas}`);              
    }

    function mostrarGrafico(superhero){
        let chart = new CanvasJS.Chart("graficoHero", {
            theme: "dark2", // "light1", "light2", "dark1", "dark2"
	        exportEnabled: false,
	        animationEnabled: true,
            title: {
                text:`Información del SuperHero "${superhero.nombre}"`
            },

	        data: [{
		        type: "pie",
                showInLegend: true,
                toolTipContent: "{label}: <strong>{y}%</strong>",
		        indexLabel: "{label} - {y}%",
                legendText: "{label}",
                dataPoints: superhero.estadisticas
            }]
          
        });
        chart.render();      
    }  
})