$(document).ready(function() {
  $("form").on("submit", manejoFomulario);
})
const manejoFomulario = function(e) {
  e.preventDefault();
  let idHeroe = $("#numHeroe").val();
  validarFormulario(idHeroe);
}
function validarFormulario(datos) {
  const token = '3572a92b3c147a4bfd21ff01ab5936c8';
  const regex = /^\d+$/;
  if (regex.test(datos) && datos > 0 && datos <= 733 ) {
    $("#img-welcome").addClass("d-none");
    $(".heroe").superhero(token, datos);
  }
  else if( datos> 733){
    alert("Heroe no encontrado. Intenta con un número menor al ingresado.");
  }
  else {
    alert("No se puede buscar heroe. Quizas usaste una letra."+"\n"+" Prueba con ingresar un numero");
  }
}

