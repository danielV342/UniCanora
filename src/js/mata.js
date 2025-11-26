var map = L.map('map').setView([-8.053804,-34.8851482,18], 13); // Esuda
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

var routing = L.Routing.control({
      waypoints: [
        L.latLng(-8.053804,-34.8851482,18),  // Ponto A
        L.latLng(0)      // Ponto B
      ],
      routeWhileDragging: false,
      language: 'pt-BR',
      showAlternatives: false,
      show: false,
      addWaypoints: false
    }).addTo(map);

function definirDestino() {
  var destino = document.getElementById("destino").value;

  // Geocodificação (converter endereço em coordenadas)
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${destino}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        var lat = parseFloat(data[0].lat);
        var lon = parseFloat(data[0].lon);

        // Atualiza rota
        routing.setWaypoints([
          L.latLng(-8.053804,-34.8851482,18), // mantém a origem
          L.latLng(lat, lon)        // novo destino
        ]);
      }
    });
    
}