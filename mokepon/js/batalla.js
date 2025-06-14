// --- VARIABLES GLOBALES DEL JUEGO ---
const elementos = {};
let mascotaJugadorObjeto;
let mascotaEnemigoObjeto;
let vidasJugador = 3;
let vidasEnemigo = 3;
let ataqueJugador;
let ataqueEnemigo;
let jugadorId;

// --- INICIALIZACIÓN ---
window.addEventListener("load", iniciarJuego);

function iniciarJuego() {
	cachearElementos();
	inyectarMascotasHTML();
	elementos.sectionVerMapa.style.display = "none";
	elementos.seleccionarAtaque.style.display = "none";
	elementos.resultadoFinal.style.display = "none"; // Aseguramos que esté oculto
	elementos.botonMascotaJugador.addEventListener("click", iniciarFaseDeMapa);
	elementos.botonNuevaPartida.addEventListener("click", () =>
		location.reload()
	);
	unirseAlJuego();
}

// --- FUNCIONES DE CONFIGURACIÓN ---
function cachearElementos() {
	elementos.seleccionarMascota = document.getElementById("seleccionar-mascota");
	elementos.contenedorMascotas = document.getElementById("contenedor-mascotas");
	elementos.botonMascotaJugador = document.getElementById("boton-mascota");
	elementos.sectionVerMapa = document.getElementById("ver-mapa");
	elementos.seleccionarAtaque = document.getElementById("seleccionar-ataque");
	elementos.mascotaJugador = document.getElementById("mascota-jugador");
	elementos.mascotaEnemigo = document.getElementById("mascota-enemigo");
	elementos.vidasJugador = document.getElementById("vidas-jugador");
	elementos.vidasEnemigo = document.getElementById("vidas-enemigo");
	elementos.contenedorAtaques = document.getElementById("contenedor-ataques");
	elementos.resultado = document.getElementById("resultado");
	elementos.mensajes = document.getElementById("mensajes");
	// Elementos de la pantalla final
	elementos.resultadoFinal = document.getElementById("resultado-final");
	elementos.emojiResultado = document.getElementById("emoji-resultado");
	elementos.tituloResultado = document.getElementById("titulo-resultado");
	elementos.mensajeResultado = document.getElementById("mensaje-resultado");
	elementos.botonNuevaPartida = document.getElementById("boton-nueva-partida");
}

function inyectarMascotasHTML() {
	let opcionesDeMascotas = "";
	MOKEPONES.forEach((mokepon) => {
		opcionesDeMascotas += `
            <input type="radio" name="mascota" id="${mokepon.id}" />
            <label for="${mokepon.id}">${mokepon.nombre}</label>
        `;
	});
	elementos.contenedorMascotas.innerHTML = opcionesDeMascotas;
}

// --- LÓGICA DE BATALLA ---

function iniciarBatalla() {
	elementos.mensajes.style.display = "block";
	asignarAtaques(mascotaJugadorObjeto);
	asignarAtaques(mascotaEnemigoObjeto);
	elementos.mascotaJugador.innerHTML = mascotaJugadorObjeto.nombre;
	elementos.mascotaEnemigo.innerHTML = mascotaEnemigoObjeto.nombre;
	actualizarVidasUI();
	mostrarAtaques();
}

function mostrarAtaques() {
	let botonesHTML = "";
	mascotaJugadorObjeto.ataques.forEach((ataque) => {
		botonesHTML += `<button id="${ataque.id}" class="boton-de-ataque">${ataque.nombre}</button>`;
	});
	elementos.contenedorAtaques.innerHTML = botonesHTML;

	const botonesDeAtaque = document.querySelectorAll(".boton-de-ataque");
	botonesDeAtaque.forEach((boton) => {
		boton.addEventListener("click", (e) => {
			ataqueJugador = mascotaJugadorObjeto.ataques.find(
				(a) => a.id === e.target.id
			);
			secuenciaCombate();
		});
	});
}

function secuenciaCombate() {
	const indiceAleatorio = Math.floor(
		Math.random() * mascotaEnemigoObjeto.ataques.length
	);
	ataqueEnemigo = mascotaEnemigoObjeto.ataques[indiceAleatorio];
	determinarGanador();
}

function determinarGanador() {
	const tipoAtaqueJugador = ataqueJugador.tipo;
	const tipoMokeponEnemigo = mascotaEnemigoObjeto.tipo;
	const tipoAtaqueEnemigo = ataqueEnemigo.tipo;
	const tipoMokeponJugador = mascotaJugadorObjeto.tipo;
	let resultado;
	const jugadorTieneVentaja =
		VENTAJA_DE_TIPO[tipoAtaqueJugador]?.includes(tipoMokeponEnemigo);
	const enemigoTieneVentaja =
		VENTAJA_DE_TIPO[tipoAtaqueEnemigo]?.includes(tipoMokeponJugador);

	if (jugadorTieneVentaja && !enemigoTieneVentaja) {
		resultado = "GANASTE 🎉";
		vidasEnemigo--;
	} else if (enemigoTieneVentaja && !jugadorTieneVentaja) {
		resultado = "PERDISTE 😢";
		vidasJugador--;
	} else if (jugadorTieneVentaja && enemigoTieneVentaja) {
		resultado = "EMPATE por anulación 😐";
	} else {
		if (Math.random() < 0.5) {
			resultado = "GANASTE por Golpe Crítico! 💥";
			vidasEnemigo--;
		} else {
			resultado = "PERDISTE por Golpe Crítico... 💥";
			vidasJugador--;
		}
	}

	crearMensaje(resultado);
	actualizarVidasUI();
	revisarSiTerminaElJuego();
}

// --- FUNCIONES DE UI Y ESTADO DE JUEGO ---

function actualizarVidasUI() {
	elementos.vidasJugador.innerHTML = vidasJugador;
	elementos.vidasEnemigo.innerHTML = vidasEnemigo;
}

function crearMensaje(resultado) {
	let parrafo = document.createElement("p");
	parrafo.innerHTML = `Atacaste con ${ataqueJugador.nombre}. El enemigo atacó con ${ataqueEnemigo.nombre}. <br><strong>Resultado: ${resultado}</strong>`;
	elementos.resultado.insertAdjacentElement("afterbegin", parrafo);
}

function revisarSiTerminaElJuego() {
	setTimeout(() => {
		if (vidasEnemigo <= 0) {
			// Pasamos 'true' para indicar victoria
			crearMensajeFinal(true);
		} else if (vidasJugador <= 0) {
			// Pasamos 'false' para indicar derrota
			crearMensajeFinal(false);
		}
	}, 500);
}

// --- FUNCIÓN FINAL MODIFICADA ---
function crearMensajeFinal(esVictoria) {
	// Ocultamos las secciones de batalla
	elementos.seleccionarAtaque.style.display = "none";
	elementos.mensajes.style.display = "none";

	// Configuramos el mensaje final basado en si fue victoria o derrota
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

	// Llenamos la sección #resultado-final con la información
	elementos.resultadoFinal.className = config.className;
	elementos.emojiResultado.textContent = config.emoji;
	elementos.tituloResultado.textContent = config.titulo;
	elementos.mensajeResultado.textContent = config.mensaje;

	// Mostramos la sección del resultado final
	elementos.resultadoFinal.style.display = "block";
}
