window.addEventListener("load", iniciarJuego);

function aleatorio(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

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

	let spanMascotaJugador = document.getElementById("mascota-jugador");
	spanMascotaJugador.innerHTML = mascotaSeleccionada;

	seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
	let mascotaEnemiga;
	let mascotaAleatoria = aleatorio(1, 3);

	// 1 = Hipodoge, 2 = Capipepo, 3 = Ratigueya
	if (mascotaAleatoria == 1) {
		mascotaEnemiga = "Hipodoge";
	} else if (mascotaAleatoria == 2) {
		mascotaEnemiga = "Capipepo";
	} else {
		mascotaEnemiga = "Ratigueya";
	}

	let spanMascotaEnemigo = document.getElementById("mascota-enemigo");
	spanMascotaEnemigo.innerHTML = mascotaEnemiga;
}
