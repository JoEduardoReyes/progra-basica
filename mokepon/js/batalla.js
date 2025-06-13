// --- VARIABLES GLOBALES DEL JUEGO ---
const elementos = {};
let mascotaJugadorObjeto;
let mascotaEnemigoObjeto;
let vidasJugador = 3;
let vidasEnemigo = 3;
let ataqueJugador;
let ataqueEnemigo;

// --- INICIALIZACIÓN ---
window.addEventListener("load", iniciarJuego);

function iniciarJuego() {
	cachearElementos();
	inyectarMascotasHTML();
	elementos.sectionVerMapa.style.display = "none";
	elementos.seleccionarAtaque.style.display = "none";
	elementos.reiniciar.style.display = "none";
	elementos.botonMascotaJugador.addEventListener("click", iniciarFaseDeMapa);
	elementos.botonReiniciar.addEventListener("click", () => location.reload());
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
	elementos.reiniciar = document.getElementById("reiniciar");
	elementos.botonReiniciar = document.getElementById("boton-reiniciar");
	elementos.mensajes = document.getElementById("mensajes");
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
	// Mostramos la sección de mensajes que estaba oculta
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
		botonesHTML += `
            <button id="${ataque.id}" class="boton-de-ataque">
                ${ataque.nombre}
            </button>
        `;
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

// --- LÓGICA PARA DETERMINAR GANADOR ---
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
		resultado = "GANASTE �";
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

// --- FUNCIONES DE UI (AHORA ACTIVAS) ---

function actualizarVidasUI() {
	elementos.vidasJugador.innerHTML = vidasJugador;
	elementos.vidasEnemigo.innerHTML = vidasEnemigo;
}

function crearMensaje(resultado) {
	let parrafo = document.createElement("p");
	parrafo.innerHTML = `Atacaste con ${ataqueJugador.nombre}. El enemigo atacó con ${ataqueEnemigo.nombre}. <br><strong>Resultado: ${resultado}</strong>`;

	// CAMBIO CLAVE: Usamos insertAdjacentElement para poner el nuevo mensaje arriba
	elementos.resultado.insertAdjacentElement("afterbegin", parrafo);
}

function revisarSiTerminaElJuego() {
	if (vidasEnemigo <= 0) {
		crearMensajeFinal("¡FELICITACIONES! Has ganado la batalla.");
	} else if (vidasJugador <= 0) {
		crearMensajeFinal("GAME OVER. Has sido derrotado.");
	}
}

function crearMensajeFinal(mensajeFinal) {
	// Limpiamos los mensajes anteriores y mostramos el resultado final
	elementos.resultado.innerHTML = `<h2>${mensajeFinal}</h2>`;

	// Deshabilitar botones de ataque
	document.querySelectorAll(".boton-de-ataque").forEach((boton) => {
		boton.disabled = true;
	});

	// Mostrar la sección del botón de reiniciar
	elementos.reiniciar.style.display = "block";
}
