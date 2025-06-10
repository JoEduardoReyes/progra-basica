window.addEventListener("load", iniciarJuego);

function iniciarJuego() {
	let botonMascotaJugador = document.getElementById("boton-mascota");
	botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
}

function seleccionarMascotaJugador() {
	let mascotaSeleccionada;

	// Obtener todos los radio buttons de mascotas
	let inputHipodoge = document.getElementById("hipodoge");
	let inputCapipepo = document.getElementById("capipepo");
	let inputRatigueya = document.getElementById("ratigueya");

	// Verificar cuál está seleccionado
	if (inputHipodoge.checked) {
		mascotaSeleccionada = "Hipodoge";
	} else if (inputCapipepo.checked) {
		mascotaSeleccionada = "Capipepo";
	} else if (inputRatigueya.checked) {
		mascotaSeleccionada = "Ratigueya";
	} else {
		alert("Debes seleccionar una mascota");
		return; // Salir de la función si no hay selección
	}

	alert("Seleccionaste a " + mascotaSeleccionada);
}
