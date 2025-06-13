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
	console.log("Iniciando batalla...");
	asignarAtaques(mascotaJugadorObjeto);
	asignarAtaques(mascotaEnemigoObjeto);

	// Actualizamos la UI, pero la lógica principal estará en la consola.
	elementos.mascotaJugador.innerHTML = mascotaJugadorObjeto.nombre;
	elementos.mascotaEnemigo.innerHTML = mascotaEnemigoObjeto.nombre;
	elementos.vidasJugador.innerHTML = vidasJugador;
	elementos.vidasEnemigo.innerHTML = vidasEnemigo;

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

	console.log("Botones de ataque mostrados. Añadiendo listeners...");
	const botonesDeAtaque = document.querySelectorAll(".boton-de-ataque");
	botonesDeAtaque.forEach((boton) => {
		boton.addEventListener("click", (e) => {
			console.log("¡Botón de ataque clickeado!");
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

	console.log("--- INICIA SECUENCIA DE COMBATE ---");
	console.log("Ataque del Jugador:", ataqueJugador);
	console.log("Ataque del Enemigo:", ataqueEnemigo);

	determinarGanador();
}

// --- LÓGICA PARA DETERMINAR GANADOR (ENFOCADA EN CONSOLA) ---
function determinarGanador() {
	const tipoAtaqueJugador = ataqueJugador.tipo;
	const tipoMokeponEnemigo = mascotaEnemigoObjeto.tipo;
	const tipoAtaqueEnemigo = ataqueEnemigo.tipo;
	const tipoMokeponJugador = mascotaJugadorObjeto.tipo;

	let resultado;

	console.log(
		`Tu ataque tipo ${tipoAtaqueJugador} vs. Mokepon enemigo tipo ${tipoMokeponEnemigo}`
	);
	console.log(
		`Ataque enemigo tipo ${tipoAtaqueEnemigo} vs. tu Mokepon tipo ${tipoMokeponJugador}`
	);

	// 1. Revisa si hay una ventaja clara
	const jugadorTieneVentaja =
		VENTAJA_DE_TIPO[tipoAtaqueJugador]?.includes(tipoMokeponEnemigo);
	const enemigoTieneVentaja =
		VENTAJA_DE_TIPO[tipoAtaqueEnemigo]?.includes(tipoMokeponJugador);

	console.log("¿Jugador tiene ventaja?", jugadorTieneVentaja);
	console.log("¿Enemigo tiene ventaja?", enemigoTieneVentaja);

	// 2. Aplica la lógica de 3 pasos
	if (jugadorTieneVentaja && !enemigoTieneVentaja) {
		resultado = "VICTORIA (Ventaja Clara)";
		// vidasEnemigo--; // Lógica de vidas comentada temporalmente
	} else if (enemigoTieneVentaja && !jugadorTieneVentaja) {
		resultado = "DERROTA (Ventaja Clara del Enemigo)";
		// vidasJugador--; // Lógica de vidas comentada temporalmente
	} else if (jugadorTieneVentaja && enemigoTieneVentaja) {
		resultado = "EMPATE (Ventajas Anuladas)";
	} else {
		// 3. Punto muerto, se resuelve por suerte (Golpe Crítico)
		console.log("Sin ventajas claras... ¡Se decide por suerte!");
		if (Math.random() < 0.5) {
			resultado = "VICTORIA (Golpe de Suerte Crítico)";
			// vidasEnemigo--; // Lógica de vidas comentada temporalmente
		} else {
			resultado = "DERROTA (Golpe de Suerte Crítico del Enemigo)";
			// vidasJugador--; // Lógica de vidas comentada temporalmente
		}
	}

	// 4. Muestra el resultado final en la consola
	console.log("Resultado de la ronda:", resultado);
	console.log("--- FIN DE LA RONDA ---");

	// Las funciones de UI están comentadas para depurar la lógica primero.
	// crearMensaje(resultado);
	// actualizarVidasUI();
	// revisarSiTerminaElJuego();
}

// --- FUNCIONES DE UI (TEMPORALMENTE INACTIVAS) ---

// function actualizarVidasUI() {
//     elementos.vidasJugador.innerHTML = vidasJugador;
//     elementos.vidasEnemigo.innerHTML = vidasEnemigo;
// }

// function crearMensaje(resultado) {
//     let parrafo = document.createElement('p');
//     parrafo.innerHTML = `Tu mascota atacó con ${ataqueJugador.nombre}. La mascota enemiga atacó con ${ataqueEnemigo.nombre}. Resultado: ${resultado}`;
//     elementos.resultado.appendChild(parrafo);
// }

// function revisarSiTerminaElJuego() {
//     if (vidasEnemigo <= 0) {
//         crearMensajeFinal("¡FELICITACIONES! Has ganado la batalla.");
//     } else if (vidasJugador <= 0) {
//         crearMensajeFinal("GAME OVER. Has sido derrotado.");
//     }
// }

// function crearMensajeFinal(mensajeFinal) {
//     elementos.resultado.innerHTML = mensajeFinal;
//     document.querySelectorAll('.boton-de-ataque').forEach(boton => {
//         boton.disabled = true;
//     });
//     elementos.reiniciar.style.display = 'block';
// }
