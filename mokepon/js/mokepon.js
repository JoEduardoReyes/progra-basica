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
		if (this.getInputElement()) {
			this.getInputElement().checked = false;
		}
	}

	obtenerAtaqueAleatorio() {
		if (this.ataques.length === 0) {
			// Fallback si no tiene ataques definidos
			return ATAQUES.FUEGO;
		}
		const indiceAleatorio = aleatorio(0, this.ataques.length - 1);
		return this.ataques[indiceAleatorio].nombre;
	}
}

// ¡AÑADE NUEVOS MOKEPONES AQUÍ!
// Solo necesitas añadir una nueva entrada a este objeto para expandir el juego.
const MASCOTAS_DATA = {
	HIPODOGE: new Mascota("Hipodoge 💧", "hipodoge", [
		new Ataque(ATAQUES.AGUA, "💧", "boton-agua"),
		new Ataque(ATAQUES.FUEGO, "🔥", "boton-fuego"),
		new Ataque(ATAQUES.AGUA, "💧", "boton-agua"),
		new Ataque(ATAQUES.TIERRA, "🌱", "boton-tierra"),
		new Ataque(ATAQUES.AGUA, "💧", "boton-agua"),
	]),
	CAPIPEPO: new Mascota("Capipepo 🌱", "capipepo", [
		new Ataque(ATAQUES.TIERRA, "🌱", "boton-tierra"),
		new Ataque(ATAQUES.AGUA, "💧", "boton-agua"),
		new Ataque(ATAQUES.TIERRA, "🌱", "boton-tierra"),
		new Ataque(ATAQUES.FUEGO, "🔥", "boton-fuego"),
		new Ataque(ATAQUES.TIERRA, "🌱", "boton-tierra"),
	]),
	RATIGUEYA: new Mascota("Ratigueya 🔥", "ratigueya", [
		new Ataque(ATAQUES.FUEGO, "🔥", "boton-fuego"),
		new Ataque(ATAQUES.AGUA, "💧", "boton-agua"),
		new Ataque(ATAQUES.FUEGO, "🔥", "boton-fuego"),
		new Ataque(ATAQUES.TIERRA, "🌱", "boton-tierra"),
		new Ataque(ATAQUES.FUEGO, "🔥", "boton-fuego"),
	]),
	PERROCOPTERO: new Mascota("Perrocoptero 🚁", "perrocoptero", [
		new Ataque(ATAQUES.TIERRA, "🌱", "boton-tierra"),
		new Ataque(ATAQUES.FUEGO, "🔥", "boton-fuego"),
		new Ataque(ATAQUES.TIERRA, "🌱", "boton-tierra"),
		new Ataque(ATAQUES.FUEGO, "🔥", "boton-fuego"),
		new Ataque(ATAQUES.AGUA, "💧", "boton-agua"),
	]),
	GATOSAURIO: new Mascota("Gatosaurio 🦖", "gatosaurio", [
		new Ataque(ATAQUES.TIERRA, "🌱", "boton-tierra"),
		new Ataque(ATAQUES.FUEGO, "🔥", "boton-fuego"),
		new Ataque(ATAQUES.AGUA, "💧", "boton-agua"),
		new Ataque(ATAQUES.FUEGO, "🔥", "boton-fuego"),
		new Ataque(ATAQUES.AGUA, "💧", "boton-agua"),
	]),
	LARGARTOÑO: new Mascota("Largartoño 🦎", "largartono", [
		new Ataque(ATAQUES.AGUA, "💧", "boton-agua"),
		new Ataque(ATAQUES.TIERRA, "🌱", "boton-tierra"),
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

// --- INICIALIZACIÓN DEL JUEGO ---
window.addEventListener("load", iniciarJuego);

function iniciarJuego() {
	cachearElementos();
	inyectarMascotas();

	// Asignación de event listeners iniciales
	elementos.botonMascotaJugador.addEventListener(
		"click",
		seleccionarMascotaJugador
	);
	elementos.botonReiniciar.addEventListener("click", reiniciarJuego);
	elementos.botonNuevaPartida.addEventListener("click", reiniciarJuego);

	elementos.sectionVerMapa.style.display = "none";
}

// --- FUNCIONES DE CONFIGURACIÓN INICIAL ---
function cachearElementos() {
	elementos.botonMascotaJugador = document.getElementById("boton-mascota");
	elementos.botonReiniciar = document.getElementById("boton-reiniciar");
	elementos.botonNuevaPartida = document.getElementById("boton-nueva-partida");
	elementos.contenedorMascotas = document.getElementById("contenedor-mascotas");
	elementos.contenedorAtaques = document.getElementById("contenedor-ataques");
	elementos.seleccionarMascota = document.getElementById("seleccionar-mascota");
	elementos.seleccionarAtaque = document.getElementById("seleccionar-ataque");
	elementos.mensajes = document.getElementById("mensajes");
	elementos.reiniciar = document.getElementById("reiniciar");
	elementos.resultadoFinal = document.getElementById("resultado-final");
	elementos.mascotaJugador = document.getElementById("mascota-jugador");
	elementos.mascotaEnemigo = document.getElementById("mascota-enemigo");
	elementos.vidasJugador = document.getElementById("vidas-jugador");
	elementos.vidasEnemigo = document.getElementById("vidas-enemigo");
	elementos.resultado = document.getElementById("resultado");
	elementos.sectionVerMapa = document.getElementById("ver-mapa");
	elementos.mapa = document.getElementById("mapa");
}

// Genera y muestra las mascotas en el HTML dinámicamente
function inyectarMascotas() {
	let opcionesDeMascotas = "";
	for (const mascotaKey in MASCOTAS_DATA) {
		const mascota = MASCOTAS_DATA[mascotaKey];
		opcionesDeMascotas += `
            <input type="radio" name="mascota" id="${mascota.id}" />
            <label for="${mascota.id}">${mascota.nombre}</label>
        `;
	}
	elementos.contenedorMascotas.innerHTML = opcionesDeMascotas;
}

// --- LÓGICA DE SELECCIÓN ---
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
	elementos.seleccionarMascota.style.display = "none";

	// Llama a las funciones para preparar la batalla
	mostrarAtaques(mascotaJugadorSeleccionada.ataques);
	seleccionarMascotaEnemigo();
	mostrarSeccionesBatalla();
}

function seleccionarMascotaEnemigo() {
	const mascotasDisponibles = Object.values(MASCOTAS_DATA);
	const indiceAleatorio = aleatorio(0, mascotasDisponibles.length - 1);
	mascotaEnemigoSeleccionada = mascotasDisponibles[indiceAleatorio];
	elementos.mascotaEnemigo.innerHTML = mascotaEnemigoSeleccionada.nombre;
}

// --- LÓGICA DE BATALLA ---
// Muestra los ataques del Mokepon seleccionado y asigna listeners
function mostrarAtaques(ataques) {
	let ataquesHtml = "";
	// Crea el HTML para cada botón de ataque usando template literals
	ataques.forEach((ataque) => {
		ataquesHtml += `
            <button id="${ataque.id}" class="boton-de-ataque" data-attack="${ataque.nombre}">${ataque.nombre} ${ataque.emoji}</button>
        `;
	});
	elementos.contenedorAtaques.innerHTML = ataquesHtml;

	// IMPORTANTE: Agrega event listeners DESPUÉS de que los botones son creados
	const botonesDeAtaque = document.querySelectorAll(".boton-de-ataque");
	botonesDeAtaque.forEach((boton) => {
		boton.addEventListener("click", (e) => {
			const ataqueNombre = e.target.dataset.attack;
			realizarAtaque(ataqueNombre);
		});
	});
}

function realizarAtaque(tipoAtaque) {
	const ataqueEnemigo = mascotaEnemigoSeleccionada.obtenerAtaqueAleatorio();
	const resultado = determinarResultado(tipoAtaque, ataqueEnemigo);
	mostrarResultado(resultado, tipoAtaque, ataqueEnemigo);
	actualizarVidas(resultado);
}

function determinarResultado(ataqueJugador, ataqueEnemigo) {
	if (ataqueJugador === ataqueEnemigo) return RESULTADOS.EMPATE;

	const reglasVictoria = new Map([
		[ATAQUES.FUEGO, ATAQUES.TIERRA],
		[ATAQUES.AGUA, ATAQUES.FUEGO],
		[ATAQUES.TIERRA, ATAQUES.AGUA],
	]);

	return reglasVictoria.get(ataqueJugador) === ataqueEnemigo
		? RESULTADOS.VICTORIA
		: RESULTADOS.DERROTA;
}

// --- ACTUALIZACIÓN DE UI ---
function mostrarSeccionesBatalla() {
	[
		elementos.seleccionarAtaque,
		elementos.mensajes,
		elementos.reiniciar,
	].forEach((s) => (s.style.display = "block"));
}

function mostrarResultado(resultado, ataqueJugador, ataqueEnemigo) {
	const mensaje = document.createElement("p");
	const mensajes = {
		[RESULTADOS.EMPATE]: "¡EMPATE!",
		[RESULTADOS.VICTORIA]: `Atacaste con ${ataqueJugador}, el enemigo con ${ataqueEnemigo}. ¡GANASTE! 🎉`,
		[RESULTADOS.DERROTA]: `Atacaste con ${ataqueJugador}, el enemigo con ${ataqueEnemigo}. ¡PERDISTE! 😢`,
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

// --- UTILIDADES ---
function reiniciarJuego() {
	location.reload();
}

function aleatorio(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
