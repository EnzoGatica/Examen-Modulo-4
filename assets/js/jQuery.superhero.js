jQuery.fn.superhero = function(token, heroId) {
  console.log(token, heroId)
  let accessToken = token
  let idAPI = heroId;
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://superheroapi.com/api.php/${accessToken}/${idAPI}`,
    "method": "GET",
    "dataType": "json",
    "headers": {
      "Accept": "*/*"
    }
  };
  $.ajax(settings)
  .done(function (data) {
    //Grafico
    const chartData = []
    for(const power in data.powerstats) {
      if(data.powerstats[power] !== "null" ) {
        chartData.push({ y: Number(data.powerstats[power]), label: power })
      } else {
        continue;
      }
    }
    $("#heroChart").CanvasJSChart({
      title: {
        animationEnabled: true,
        text: `Estadísticas de Poder para ${data.name}`,
        fontSize: 28
      },
      data: [
        {
          type: "pie",
          startAngle: 25,
          toolTipContent: "<b>{label}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          dataPoints: chartData
        }
      ]
    })
    heroCard(data)
  })
  .fail();
  return this
}
function heroCard(data) {
  let heroCard = 
    `
    <h3 class="text-center">SuperHero Encontrado</h3>
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${data.image.url}" class="img-fluid rounded-start " alt="${data.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Nombre: ${data.name}</h5>
            <p class="card-text">Conexiones: ${data.connections.relatives}</p>
            <em class="card-text"><small class="text-body-secondary">Publicado por: ${data.biography.publisher}</small></em>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Ocupación: ${data.work.occupation}</li>
            <li class="list-group-item">Primera Aparición: ${data.biography["first-appearance"]}</li>
            <li class="list-group-item">Altura: ${data.appearance.height[1]}</li>
            <li class="list-group-item">Peso: ${data.appearance.weight[1]}</li>
            <li class="list-group-item">Alianzas: ${data.connections["group-affiliation"]}</li>
          </ul>
        </div>
      </div>
    </div>
  `
  $("#heroCard").html(heroCard);
}