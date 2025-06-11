// OPTIMIZACIÓN: Usar let/const apropiadamente y evitar variables globales innecesarias
let ataqueJugador;
let ataqueEnemigo;

// OPTIMIZACIÓN: Configuración centralizada para facilitar mantenimiento
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

// OPTIMIZACIÓN: Datos de mascotas más estructurados para futuras expansiones
const MASCOTAS_DATA = {
	HIPODOGE: { nombre: "Hipodoge", id: "hipodoge" },
	CAPIPEPO: { nombre: "Capipepo", id: "capipepo" },
	RATIGUEYA: { nombre: "Ratigueya", id: "ratigueya" },
};

const MASCOTAS = Object.values(MASCOTAS_DATA).map((mascota) => mascota.nombre);

const RESULTADOS = {
	EMPATE: 0,
	VICTORIA: 1,
	DERROTA: -1,
};

// OPTIMIZACIÓN: Cache de elementos DOM para evitar múltiples querySelector
const elementos = {};

window.addEventListener("load", iniciarJuego);

function aleatorio(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// OPTIMIZACIÓN: Cachear elementos DOM al inicio
function cachearElementos() {
	elementos.botonMascotaJugador = document.getElementById("boton-mascota");
	elementos.botonFuego = document.getElementById("boton-fuego");
	elementos.botonAgua = document.getElementById("boton-agua");
	elementos.botonTierra = document.getElementById("boton-tierra");
	elementos.botonReiniciar = document.getElementById("boton-reiniciar");
	elementos.botonNuevaPartida = document.getElementById("boton-nueva-partida");

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

	// Radio buttons de mascotas
	elementos.inputHipodoge = document.getElementById("hipodoge");
	elementos.inputCapipepo = document.getElementById("capipepo");
	elementos.inputRatigueya = document.getElementById("ratigueya");
}

function iniciarJuego() {
	// OPTIMIZACIÓN: Cachear elementos DOM una sola vez
	cachearElementos();

	// Ocultar secciones al inicio del juego
	ocultarSeccionesIniciales();

	// OPTIMIZACIÓN: Event listeners más limpios usando referencias
	elementos.botonMascotaJugador.addEventListener(
		"click",
		seleccionarMascotaJugador
	);

	// OPTIMIZACIÓN: Usar arrow functions consistentemente
	elementos.botonFuego.addEventListener("click", () =>
		realizarAtaque(ATAQUES.FUEGO)
	);
	elementos.botonAgua.addEventListener("click", () =>
		realizarAtaque(ATAQUES.AGUA)
	);
	elementos.botonTierra.addEventListener("click", () =>
		realizarAtaque(ATAQUES.TIERRA)
	);

	// Event listeners para reiniciar
	elementos.botonReiniciar.addEventListener("click", reiniciarJuego);
	elementos.botonNuevaPartida.addEventListener("click", reiniciarJuego);
}

// OPTIMIZACIÓN: Función más limpia usando array de elementos
function ocultarSeccionesIniciales() {
	const seccionesAOcultar = [
		elementos.seleccionarAtaque,
		elementos.mensajes,
		elementos.reiniciar,
		elementos.resultadoFinal,
	];

	seccionesAOcultar.forEach((seccion) => {
		seccion.style.display = "none";
	});

	// Mostrar sección de seleccionar mascota
	elementos.seleccionarMascota.style.display = "block";
}

function mostrarSeccionesBatalla() {
	// Ocultar secciones no necesarias
	elementos.seleccionarMascota.style.display = "none";
	elementos.resultadoFinal.style.display = "none";

	// Mostrar secciones de batalla
	const seccionesAMostrar = [
		elementos.seleccionarAtaque,
		elementos.mensajes,
		elementos.reiniciar,
	];

	seccionesAMostrar.forEach((seccion) => {
		seccion.style.display = "block";
	});
}

// OPTIMIZACIÓN: Configuración de resultados más estructurada
function mostrarResultadoFinal(esVictoria) {
	// Ocultar secciones de batalla
	const seccionesAOcultar = [
		elementos.seleccionarAtaque,
		elementos.mensajes,
		elementos.reiniciar,
	];

	seccionesAOcultar.forEach((seccion) => {
		seccion.style.display = "none";
	});

	// OPTIMIZACIÓN: Configuración de resultados en objeto
	const configuracionResultado = {
		victoria: {
			className: "victoria",
			emoji: "🏆",
			titulo: "¡FELICIDADES!",
			mensaje: "¡HAS GANADO LA BATALLA! ERES EL CAMPEÓN MOKEPON",
		},
		derrota: {
			className: "derrota",
			emoji: "💀",
			titulo: "GAME OVER",
			mensaje: "¡HAS SIDO DERROTADO! Mejor suerte la próxima vez...",
		},
	};

	const config = configuracionResultado[esVictoria ? "victoria" : "derrota"];

	elementos.resultadoFinal.className = config.className;
	document.getElementById("emoji-resultado").textContent = config.emoji;
	document.getElementById("titulo-resultado").textContent = config.titulo;
	document.getElementById("mensaje-resultado").textContent = config.mensaje;

	elementos.resultadoFinal.style.display = "block";
}

// OPTIMIZACIÓN: Función más limpia usando array de inputs
function seleccionarMascotaJugador() {
	const inputsMascotas = [
		{ input: elementos.inputHipodoge, mascota: MASCOTAS[0] },
		{ input: elementos.inputCapipepo, mascota: MASCOTAS[1] },
		{ input: elementos.inputRatigueya, mascota: MASCOTAS[2] },
	];

	// OPTIMIZACIÓN: Usar find() en lugar de múltiples if/else
	const mascotaSeleccionada = inputsMascotas.find((item) => item.input.checked);

	if (!mascotaSeleccionada) {
		alert("Debes seleccionar una mascota");
		return;
	}

	elementos.mascotaJugador.innerHTML = mascotaSeleccionada.mascota;
	seleccionarMascotaEnemigo();
	mostrarSeccionesBatalla();
}

function seleccionarMascotaEnemigo() {
	const indiceAleatorio = aleatorio(0, MASCOTAS.length - 1);
	const mascotaEnemiga = MASCOTAS[indiceAleatorio];
	elementos.mascotaEnemigo.innerHTML = mascotaEnemiga;
}

// Función unificada para manejar ataques
function realizarAtaque(tipoAtaque) {
	ataqueJugador = tipoAtaque;
	ataqueEnemigo = generarAtaqueEnemigo();

	const resultado = determinarResultado(ataqueJugador, ataqueEnemigo);
	mostrarResultado(resultado);
	actualizarVidas(resultado);
}

// OPTIMIZACIÓN: Función más concisa usando array de ataques
function generarAtaqueEnemigo() {
	const ataques = [ATAQUES.FUEGO, ATAQUES.AGUA, ATAQUES.TIERRA];
	const indiceAleatorio = aleatorio(0, ataques.length - 1);
	return ataques[indiceAleatorio];
}

// OPTIMIZACIÓN: Map para reglas de combate más escalable
function determinarResultado(ataqueJugador, ataqueEnemigo) {
	if (ataqueJugador === ataqueEnemigo) {
		return RESULTADOS.EMPATE;
	}

	// OPTIMIZACIÓN: Map de victorias más legible y escalable
	const reglasVictoria = new Map([
		[ATAQUES.FUEGO, ATAQUES.TIERRA],
		[ATAQUES.AGUA, ATAQUES.FUEGO],
		[ATAQUES.TIERRA, ATAQUES.AGUA],
	]);

	return reglasVictoria.get(ataqueJugador) === ataqueEnemigo
		? RESULTADOS.VICTORIA
		: RESULTADOS.DERROTA;
}

// OPTIMIZACIÓN: Mensajes más estructurados
function mostrarResultado(resultado) {
	const mensaje = document.createElement("p");

	const mensajes = {
		[RESULTADOS.EMPATE]: "¡EMPATE!",
		[RESULTADOS.VICTORIA]: `Tu mascota atacó con ${ataqueJugador}, tu enemigo atacó con ${ataqueEnemigo}, ¡GANASTE!`,
		[RESULTADOS.DERROTA]: `Tu mascota atacó con ${ataqueJugador}, tu enemigo atacó con ${ataqueEnemigo}, ¡PERDISTE!`,
	};

	mensaje.innerHTML = mensajes[resultado];

	// OPTIMIZACIÓN: Usar insertAdjacentElement para mejor performance
	elementos.resultado.insertAdjacentElement("afterbegin", mensaje);
}

// OPTIMIZACIÓN: Función más limpia con early returns
function actualizarVidas(resultado) {
	if (resultado === RESULTADOS.EMPATE) {
		return; // Early return para empates
	}

	if (resultado === RESULTADOS.VICTORIA) {
		const vidasEnemigo = parseInt(elementos.vidasEnemigo.innerHTML);
		const nuevasVidasEnemigo = vidasEnemigo - 1;
		elementos.vidasEnemigo.innerHTML = nuevasVidasEnemigo;

		if (nuevasVidasEnemigo <= 0) {
			setTimeout(
				() => mostrarResultadoFinal(true),
				CONFIG.DELAY_RESULTADO_FINAL
			);
		}
		return;
	}

	if (resultado === RESULTADOS.DERROTA) {
		const vidasJugador = parseInt(elementos.vidasJugador.innerHTML);
		const nuevasVidasJugador = vidasJugador - 1;
		elementos.vidasJugador.innerHTML = nuevasVidasJugador;

		if (nuevasVidasJugador <= 0) {
			setTimeout(
				() => mostrarResultadoFinal(false),
				CONFIG.DELAY_RESULTADO_FINAL
			);
		}
	}
}

// OPTIMIZACIÓN: Función de reinicio más estructurada
function reiniciarJuego() {
	// OPTIMIZACIÓN: Usar configuración centralizada
	elementos.vidasJugador.innerHTML = CONFIG.VIDAS_INICIALES.toString();
	elementos.vidasEnemigo.innerHTML = CONFIG.VIDAS_INICIALES.toString();

	// Limpiar contenido
	elementos.resultado.innerHTML = "";
	elementos.mascotaJugador.innerHTML = "";
	elementos.mascotaEnemigo.innerHTML = "";

	// OPTIMIZACIÓN: Desmarcar radio buttons usando array
	const radioButtons = [
		elementos.inputHipodoge,
		elementos.inputCapipepo,
		elementos.inputRatigueya,
	];

	radioButtons.forEach((radio) => {
		radio.checked = false;
	});

	// Resetear variables globales
	ataqueJugador = null;
	ataqueEnemigo = null;

	ocultarSeccionesIniciales();
}
