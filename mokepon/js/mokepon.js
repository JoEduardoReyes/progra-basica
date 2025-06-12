// Variables para almacenar mascotas seleccionadas
let mascotaJugadorSeleccionada = null;
let mascotaEnemigoSeleccionada = null;

// Configuración centralizada para facilitar mantenimiento
const CONFIG = {
	VIDAS_INICIALES: 3,
	DELAY_RESULTADO_FINAL: 500,
};

// Constantes para mejor legibilidad
const ATAQUES = {
	FUEGO: "Fuego",
	AGUA: "Agua",
	TIERRA: "Tierra",
};

// Estructura para ataques individuales
class Ataque {
	constructor(nombre, emoji, id) {
		this.nombre = nombre;
		this.emoji = emoji;
		this.id = id;
	}
}

// Clase Mascota para encapsular datos y comportamientos
class Mascota {
	constructor(nombre, id, ataques = []) {
		this.nombre = nombre;
		this.id = id;
		this.ataques = ataques;
	}

	getInputElement() {
		return document.getElementById(this.id);
	}

	estaSeleccionada() {
		return this.getInputElement().checked;
	}

	deseleccionar() {
		this.getInputElement().checked = false;
	}

	obtenerAtaqueAleatorio() {
		if (this.ataques.length === 0) {
			return ATAQUES.FUEGO;
		}
		const indiceAleatorio = aleatorio(0, this.ataques.length - 1);
		return this.ataques[indiceAleatorio].nombre;
	}
}

// ¡AÑADE NUEVOS MOKEPONES AQUÍ!
// Solo necesitas añadir una nueva entrada a este objeto.
const MASCOTAS_DATA = {
	HIPODOGE: new Mascota("Hipodoge", "hipodoge", [
		new Ataque(ATAQUES.AGUA, "💧", "boton-agua"),
		new Ataque(ATAQUES.AGUA, "💧", "boton-agua"),
		new Ataque(ATAQUES.AGUA, "💧", "boton-agua"),
		new Ataque(ATAQUES.FUEGO, "🔥", "boton-fuego"),
		new Ataque(ATAQUES.TIERRA, "🌱", "boton-tierra"),
	]),
	CAPIPEPO: new Mascota("Capipepo", "capipepo", [
		new Ataque(ATAQUES.TIERRA, "🌱", "boton-tierra"),
		new Ataque(ATAQUES.TIERRA, "🌱", "boton-tierra"),
		new Ataque(ATAQUES.TIERRA, "🌱", "boton-tierra"),
		new Ataque(ATAQUES.AGUA, "💧", "boton-agua"),
		new Ataque(ATAQUES.FUEGO, "🔥", "boton-fuego"),
	]),
	RATIGUEYA: new Mascota("Ratigueya", "ratigueya", [
		new Ataque(ATAQUES.FUEGO, "🔥", "boton-fuego"),
		new Ataque(ATAQUES.FUEGO, "🔥", "boton-fuego"),
		new Ataque(ATAQUES.FUEGO, "🔥", "boton-fuego"),
		new Ataque(ATAQUES.AGUA, "💧", "boton-agua"),
		new Ataque(ATAQUES.TIERRA, "🌱", "boton-tierra"),
	]),
};

const RESULTADOS = {
	EMPATE: 0,
	VICTORIA: 1,
	DERROTA: -1,
};

// Cache de elementos DOM
const elementos = {};

window.addEventListener("load", iniciarJuego);

function aleatorio(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// Cachea los elementos DOM al inicio
function cachearElementos() {
	elementos.botonMascotaJugador = document.getElementById("boton-mascota");
	elementos.botonFuego = document.getElementById("boton-fuego");
	elementos.botonAgua = document.getElementById("boton-agua");
	elementos.botonTierra = document.getElementById("boton-tierra");
	elementos.botonReiniciar = document.getElementById("boton-reiniciar");
	elementos.botonNuevaPartida = document.getElementById("boton-nueva-partida");
	elementos.contenedorMascotas = document.getElementById("contenedor-mascotas");

	// Secciones
	elementos.seleccionarMascota = document.getElementById("seleccionar-mascota");
	elementos.seleccionarAtaque = document.getElementById("seleccionar-ataque");
	elementos.mensajes = document.getElementById("mensajes");
	elementos.reiniciar = document.getElementById("reiniciar");
	elementos.resultadoFinal = document.getElementById("resultado-final");

	// Elementos de juego
	elementos.mascotaJugador = document.getElementById("mascota-jugador");
	elementos.mascotaEnemigo = document.getElementById("mascota-enemigo");
	elementos.vidasJugador = document.getElementById("vidas-jugador");
	elementos.vidasEnemigo = document.getElementById("vidas-enemigo");
	elementos.resultado = document.getElementById("resultado");
}

function iniciarJuego() {
	cachearElementos();
	inyectarMascotas();

	// Asignación de event listeners
	elementos.botonMascotaJugador.addEventListener(
		"click",
		seleccionarMascotaJugador
	);
	elementos.botonFuego.addEventListener("click", () =>
		realizarAtaque(ATAQUES.FUEGO)
	);
	elementos.botonAgua.addEventListener("click", () =>
		realizarAtaque(ATAQUES.AGUA)
	);
	elementos.botonTierra.addEventListener("click", () =>
		realizarAtaque(ATAQUES.TIERRA)
	);
	elementos.botonReiniciar.addEventListener("click", reiniciarJuego);
	elementos.botonNuevaPartida.addEventListener("click", reiniciarJuego);
}

// NUEVA FUNCIÓN: Genera y muestra las mascotas en el HTML dinámicamente
function inyectarMascotas() {
	let opcionesDeMascotas = "";
	for (const mascotaKey in MASCOTAS_DATA) {
		const mascota = MASCOTAS_DATA[mascotaKey];
		// Usamos template literals para crear el HTML de cada mascota
		opcionesDeMascotas += `
            <input type="radio" name="mascota" id="${mascota.id}" />
            <label for="${mascota.id}">${mascota.nombre}</label>
        `;
	}
	elementos.contenedorMascotas.innerHTML = opcionesDeMascotas;
}

function seleccionarMascotaJugador() {
	const mascotasDisponibles = Object.values(MASCOTAS_DATA);
	mascotaJugadorSeleccionada = mascotasDisponibles.find((mascota) =>
		mascota.estaSeleccionada()
	);

	if (!mascotaJugadorSeleccionada) {
		alert("Debes seleccionar una mascota");
		return;
	}

	elementos.mascotaJugador.innerHTML = mascotaJugadorSeleccionada.nombre;
	seleccionarMascotaEnemigo();

	// Oculta la sección de selección de mascota y muestra la de ataque
	elementos.seleccionarMascota.style.display = "none";
	mostrarSeccionesBatalla();
}

function seleccionarMascotaEnemigo() {
	const mascotasDisponibles = Object.values(MASCOTAS_DATA);
	const indiceAleatorio = aleatorio(0, mascotasDisponibles.length - 1);
	mascotaEnemigoSeleccionada = mascotasDisponibles[indiceAleatorio];
	elementos.mascotaEnemigo.innerHTML = mascotaEnemigoSeleccionada.nombre;
}

// Muestra las secciones necesarias para la batalla
function mostrarSeccionesBatalla() {
	const seccionesAMostrar = [
		elementos.seleccionarAtaque,
		elementos.mensajes,
		elementos.reiniciar,
	];

	seccionesAMostrar.forEach((seccion) => {
		seccion.style.display = "block";
	});
}

function realizarAtaque(tipoAtaque) {
	const ataqueJugador = tipoAtaque;
	const ataqueEnemigo = mascotaEnemigoSeleccionada.obtenerAtaqueAleatorio();

	const resultado = determinarResultado(ataqueJugador, ataqueEnemigo);
	mostrarResultado(resultado, ataqueJugador, ataqueEnemigo);
	actualizarVidas(resultado);
}

function determinarResultado(ataqueJugador, ataqueEnemigo) {
	if (ataqueJugador === ataqueEnemigo) {
		return RESULTADOS.EMPATE;
	}

	const reglasVictoria = new Map([
		[ATAQUES.FUEGO, ATAQUES.TIERRA],
		[ATAQUES.AGUA, ATAQUES.FUEGO],
		[ATAQUES.TIERRA, ATAQUES.AGUA],
	]);

	return reglasVictoria.get(ataqueJugador) === ataqueEnemigo
		? RESULTADOS.VICTORIA
		: RESULTADOS.DERROTA;
}

function mostrarResultado(resultado, ataqueJugador, ataqueEnemigo) {
	const mensaje = document.createElement("p");
	const mensajes = {
		[RESULTADOS.EMPATE]: "¡EMPATE!",
		[RESULTADOS.VICTORIA]: `Tu mascota atacó con ${ataqueJugador}, el enemigo con ${ataqueEnemigo}. ¡GANASTE! 🎉`,
		[RESULTADOS.DERROTA]: `Tu mascota atacó con ${ataqueJugador}, el enemigo con ${ataqueEnemigo}. ¡PERDISTE! 😢`,
	};
	mensaje.innerHTML = mensajes[resultado];
	elementos.resultado.insertAdjacentElement("afterbegin", mensaje);
}

function actualizarVidas(resultado) {
	if (resultado === RESULTADOS.EMPATE) return;

	if (resultado === RESULTADOS.VICTORIA) {
		const vidasEnemigo = parseInt(elementos.vidasEnemigo.innerHTML) - 1;
		elementos.vidasEnemigo.innerHTML = vidasEnemigo;
		if (vidasEnemigo <= 0) {
			setTimeout(
				() => mostrarResultadoFinal(true),
				CONFIG.DELAY_RESULTADO_FINAL
			);
		}
	} else {
		const vidasJugador = parseInt(elementos.vidasJugador.innerHTML) - 1;
		elementos.vidasJugador.innerHTML = vidasJugador;
		if (vidasJugador <= 0) {
			setTimeout(
				() => mostrarResultadoFinal(false),
				CONFIG.DELAY_RESULTADO_FINAL
			);
		}
	}
}

function mostrarResultadoFinal(esVictoria) {
	[
		elementos.seleccionarAtaque,
		elementos.mensajes,
		elementos.reiniciar,
	].forEach((s) => (s.style.display = "none"));

	const config = esVictoria
		? {
				className: "victoria",
				emoji: "🏆",
				titulo: "¡FELICIDADES!",
				mensaje: "¡HAS GANADO LA BATALLA! ERES EL CAMPEÓN MOKEPON",
		  }
		: {
				className: "derrota",
				emoji: "💀",
				titulo: "GAME OVER",
				mensaje: "¡HAS SIDO DERROTADO! Mejor suerte la próxima vez...",
		  };

	elementos.resultadoFinal.className = config.className;
	document.getElementById("emoji-resultado").textContent = config.emoji;
	document.getElementById("titulo-resultado").textContent = config.titulo;
	document.getElementById("mensaje-resultado").textContent = config.mensaje;

	elementos.resultadoFinal.style.display = "block";
}

function reiniciarJuego() {
	location.reload();
}
