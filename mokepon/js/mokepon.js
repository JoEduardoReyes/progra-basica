let ataqueJugador;
let ataqueEnemigo;

// Constantes para mejor legibilidad
const ATAQUES = {
	FUEGO: "Fuego",
	AGUA: "Agua",
	TIERRA: "Tierra",
};

const MASCOTAS = ["Hipodoge", "Capipepo", "Ratigueya"];

const RESULTADOS = {
	EMPATE: 0,
	VICTORIA: 1,
	DERROTA: -1,
};

window.addEventListener("load", iniciarJuego);

function aleatorio(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function iniciarJuego() {
	// Ocultar secciones al inicio del juego
	ocultarSeccionesIniciales();

	let botonMascotaJugador = document.getElementById("boton-mascota");
	botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

	let botonFuego = document.getElementById("boton-fuego");
	botonFuego.addEventListener("click", () => realizarAtaque(ATAQUES.FUEGO));
	let botonAgua = document.getElementById("boton-agua");
	botonAgua.addEventListener("click", () => realizarAtaque(ATAQUES.AGUA));
	let botonTierra = document.getElementById("boton-tierra");
	botonTierra.addEventListener("click", () => realizarAtaque(ATAQUES.TIERRA));

	// Agregar event listener al botón de reiniciar
	let botonReiniciar = document.getElementById("boton-reiniciar");
	botonReiniciar.addEventListener("click", reiniciarJuego);
}

function ocultarSeccionesIniciales() {
	// Ocultar secciones que no se necesitan al inicio
	document.getElementById("seleccionar-ataque").style.display = "none";
	document.getElementById("mensajes").style.display = "none";
	document.getElementById("reiniciar").style.display = "none";

	// Asegurar que la sección de seleccionar mascota esté visible
	document.getElementById("seleccionar-mascota").style.display = "block";
}

function mostrarSeccionesBatalla() {
	// Ocultar la sección de seleccionar mascota
	document.getElementById("seleccionar-mascota").style.display = "none";

	// Mostrar las secciones de batalla
	document.getElementById("seleccionar-ataque").style.display = "block";
	document.getElementById("mensajes").style.display = "block";
	document.getElementById("reiniciar").style.display = "block";
}

function seleccionarMascotaJugador() {
	// Obtener todos los radio buttons de mascotas
	let inputHipodoge = document.getElementById("hipodoge");
	let inputCapipepo = document.getElementById("capipepo");
	let inputRatigueya = document.getElementById("ratigueya");

	let mascotaSeleccionada;

	// Verificar cuál está seleccionado
	if (inputHipodoge.checked) {
		mascotaSeleccionada = MASCOTAS[0];
	} else if (inputCapipepo.checked) {
		mascotaSeleccionada = MASCOTAS[1];
	} else if (inputRatigueya.checked) {
		mascotaSeleccionada = MASCOTAS[2];
	} else {
		alert("Debes seleccionar una mascota");
		return;
	}

	document.getElementById("mascota-jugador").innerHTML = mascotaSeleccionada;
	seleccionarMascotaEnemigo();

	// Cambiar a la fase de batalla
	mostrarSeccionesBatalla();
}

function seleccionarMascotaEnemigo() {
	let indiceAleatorio = aleatorio(0, MASCOTAS.length - 1);
	let mascotaEnemiga = MASCOTAS[indiceAleatorio];

	document.getElementById("mascota-enemigo").innerHTML = mascotaEnemiga;
}

// Función unificada para manejar ataques
function realizarAtaque(tipoAtaque) {
	ataqueJugador = tipoAtaque;
	ataqueEnemigo = generarAtaqueEnemigo();

	let resultado = determinarResultado(ataqueJugador, ataqueEnemigo);
	mostrarResultado(resultado);
	actualizarVidas(resultado);
}

function generarAtaqueEnemigo() {
	let ataqueAleatorio = aleatorio(1, 3);

	if (ataqueAleatorio === 1) {
		return ATAQUES.FUEGO;
	} else if (ataqueAleatorio === 2) {
		return ATAQUES.AGUA;
	} else {
		return ATAQUES.TIERRA;
	}
}

// Función centralizada para determinar el resultado
function determinarResultado(ataqueJugador, ataqueEnemigo) {
	if (ataqueJugador === ataqueEnemigo) {
		return RESULTADOS.EMPATE;
	}

	// Condiciones de victoria del jugador
	const condicionesVictoria = [
		ataqueJugador === ATAQUES.FUEGO && ataqueEnemigo === ATAQUES.TIERRA,
		ataqueJugador === ATAQUES.AGUA && ataqueEnemigo === ATAQUES.FUEGO,
		ataqueJugador === ATAQUES.TIERRA && ataqueEnemigo === ATAQUES.AGUA,
	];

	return condicionesVictoria.some((condicion) => condicion)
		? RESULTADOS.VICTORIA
		: RESULTADOS.DERROTA;
}

// Reemplaza la función mostrarResultado en tu archivo mokepon.js

function mostrarResultado(resultado) {
	let sectionMensajes = document.getElementById("resultado");
	let mensaje = document.createElement("p");

	switch (resultado) {
		case RESULTADOS.EMPATE:
			mensaje.innerHTML = "¡EMPATE!";
			break;
		case RESULTADOS.VICTORIA:
			mensaje.innerHTML = `Tu mascota atacó con ${ataqueJugador}, tu enemigo atacó con ${ataqueEnemigo}, ¡GANASTE!`;
			break;
		case RESULTADOS.DERROTA:
			mensaje.innerHTML = `Tu mascota atacó con ${ataqueJugador}, tu enemigo atacó con ${ataqueEnemigo}, ¡PERDISTE!`;
			break;
	}

	// Insertar el nuevo mensaje al principio (arriba) en lugar de al final
	sectionMensajes.insertBefore(mensaje, sectionMensajes.firstChild);
}

function actualizarVidas(resultado) {
	let spanVidasJugador = document.getElementById("vidas-jugador");
	let spanVidasEnemigo = document.getElementById("vidas-enemigo");

	switch (resultado) {
		case RESULTADOS.EMPATE:
			// No se modifica nada
			break;
		case RESULTADOS.VICTORIA:
			// Si el jugador gana, el enemigo pierde una vida
			let vidasEnemigo = parseInt(spanVidasEnemigo.innerHTML);
			spanVidasEnemigo.innerHTML = vidasEnemigo - 1;
			// Verificar si el juego terminó
			if (vidasEnemigo - 1 <= 0) {
				mostrarResultadoFinal(
					"¡FELICIDADES! 🎉\n¡HAS GANADO LA BATALLA!\n🏆 ERES EL CAMPEÓN MOKEPON 🏆"
				);
			}
			break;
		case RESULTADOS.DERROTA:
			// Si el jugador pierde, el jugador pierde una vida
			let vidasJugador = parseInt(spanVidasJugador.innerHTML);
			spanVidasJugador.innerHTML = vidasJugador - 1;
			// Verificar si el juego terminó
			if (vidasJugador - 1 <= 0) {
				mostrarResultadoFinal(
					"💀 GAME OVER 💀\n¡HAS SIDO DERROTADO!\n😢 Mejor suerte la próxima vez..."
				);
			}
			break;
	}
}

function mostrarResultadoFinal(mensaje) {
	// Usar setTimeout para que el DOM se actualice antes del alert
	setTimeout(() => {
		alert(mensaje);
		reiniciarJuego();
	}, 100);
}

function reiniciarJuego() {
	// Reiniciar vidas
	document.getElementById("vidas-jugador").innerHTML = "3";
	document.getElementById("vidas-enemigo").innerHTML = "3";

	// Limpiar mensajes de batalla
	document.getElementById("resultado").innerHTML = "";

	// Limpiar selección de mascotas
	document.getElementById("mascota-jugador").innerHTML = "";
	document.getElementById("mascota-enemigo").innerHTML = "";

	// Desmarcar radio buttons
	document.getElementById("hipodoge").checked = false;
	document.getElementById("capipepo").checked = false;
	document.getElementById("ratigueya").checked = false;

	// Resetear variables globales
	ataqueJugador = null;
	ataqueEnemigo = null;

	ocultarSeccionesIniciales();
}
