//INICIANDO MAPA
var map = L.map('map').setView([-8.053804,-34.8851482,18], 13); // Esuda
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

//MAPA INICIA NA ESUDA
var routing = L.Routing.control({
      waypoints: [
        L.latLng(-8.053804,-34.8851482,18),  // ESUDA
        L.latLng(0)      // PONTO FINAL
      ],
      routeWhileDragging: false,
      language: 'pt-BR',
      showAlternatives: false,
      show: false,
      addWaypoints: false
    }).addTo(map);

//FUNCAO PARA TRACAR ROTA NO MAPA  
function definirDestino() {
  var destino = document.getElementById("destino").value;

  //TRANSFORMANDO NOME EM GEOLOCALIZACAO
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${destino}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        var lat = parseFloat(data[0].lat);
        var lon = parseFloat(data[0].lon);

        routing.setWaypoints([
          L.latLng(-8.053804,-34.8851482,18),
          L.latLng(lat, lon)
        ]);
      }
    });
  

  document.getElementById("overlay-tracar").style.display = "flex";
  document.getElementById("local").innerHTML = destino;
}

function fecharOverlayTracar() {
  document.getElementById("overlay-tracar").style.display = "none";
}

//FUNÇÃO ABRIR OVERLAY DO PERFIL
function abrirOverlay() {
  document.getElementById("overlay").style.display = "flex";
}

function fecharOverlay() {
  document.getElementById("overlay").style.display = "none";
}

//FUNÇÃO ABRIR OVERLAY DA ROTA PUBLICADA
function abrirOverlaySidebarLeftCard() {
  document.getElementById("overlay-sidebar-left-card").style.display = "flex"
}

function fecharOverlaySidebarLeftCard() {
  document.getElementById("overlay-sidebar-left-card").style.display = "none"
}

//FUNCAO ABRIR OVERLAY EM CORRIDAS SOLICITADAS
function abrirOverlaySidebarRightCard() {
  document.getElementById("overlay-sidebar-right-card").style.display = "flex"
}

function fecharOverlaySidebarRightCard() {
  document.getElementById("overlay-sidebar-right-card").style.display = "none"
}


function abrirOverlayPerfil() {
  document.getElementById("overlay-perfil").style.display = "flex";
}

function fecharOverlayPerfil() {
  document.getElementById("overlay-perfil").style.display = "none"
}

function solicitarCorrida() {
  document.getElementById("buttom-sidebar-right-card").style.display = "flex"
  document.getElementById("overlay-sidebar-left-card").style.display = "none"
  document.getElementById("card1").style.display = "none"

}


function cancelarCorrida() {
  document.getElementById("buttom-sidebar-right-card").style.display = "none"
  document.getElementById("card1").style.display = "flex"
}

function aceitarPassageiro() {
  document.getElementById('card1').style.display = "flex"
  document.getElementById('overlay-sidebar-left-card').style.display = "none"
  document.querySelector(".buttom-sidebar-left-card").style.display = "none"
}

function abrirOverlayPerfilNumero() {
  document.getElementById("overlay-perfil-numero").style.display = "flex"
  document.getElementById("overlay-perfil").style.display = "none"

}

function fecharOverlayPerfilNumero() {
  document.getElementById("overlay-perfil-numero").style.display = "none"
}

function salvarNumero() {
  document.getElementById("overlay-perfil-numero").style.display = "none"
}

function abrirOverlayPerfilSenha() {
  document.getElementById("overlay-perfil-senha").style.display = "flex"
  document.getElementById("overlay-perfil").style.display = "none"

}

function fecharOverlayPerfilSenha() {
  document.getElementById("overlay-perfil-senha").style.display = "none"
}

function salvarSenha() {
  document.getElementById("overlay-perfil-senha").style.display = "none"
}

const btn = document.getElementById("status")

  btn.onmouseover = () => btn.textContent = "Cancelar?"
  btn.onmouseout  = () => btn.textContent = "Pendente"