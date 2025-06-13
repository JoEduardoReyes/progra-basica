// --- VARIABLES GLOBALES DEL JUEGO ---
const elementos = {};
let mascotaJugadorObjeto; // Definida en canvas.js
let mascotaEnemigoObjeto; // Definida en canvas.js
let vidasJugador = 3;
let vidasEnemigo = 3;

// --- INICIALIZACIÓN (SOLO PREPARA LA PRIMERA PANTALLA) ---
window.addEventListener("load", iniciarJuego);

function iniciarJuego() {
	cachearElementos();
	inyectarMascotasHTML();
	elementos.sectionVerMapa.style.display = "none";
	elementos.seleccionarAtaque.style.display = "none";
	elementos.botonMascotaJugador.addEventListener("click", iniciarFaseDeMapa);
}

// --- FUNCIONES DE CONFIGURACIÓN INICIAL ---
function cachearElementos() {
	elementos.seleccionarMascota = document.getElementById("seleccionar-mascota");
	elementos.contenedorMascotas = document.getElementById("contenedor-mascotas");
	elementos.botonMascotaJugador = document.getElementById("boton-mascota");
	elementos.sectionVerMapa = document.getElementById("ver-mapa");
	elementos.seleccionarAtaque = document.getElementById("seleccionar-ataque");
	// Nuevos elementos cacheados para la batalla
	elementos.mascotaJugador = document.getElementById("mascota-jugador");
	elementos.mascotaEnemigo = document.getElementById("mascota-enemigo");
	elementos.vidasJugador = document.getElementById("vidas-jugador");
	elementos.vidasEnemigo = document.getElementById("vidas-enemigo");
	elementos.contenedorAtaques = document.getElementById("contenedor-ataques");
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

// NUEVA RESPONSABILIDAD: Iniciar la fase de batalla
// Esta función es llamada desde canvas.js después de una colisión.
function iniciarBatalla() {
	// 1. Asignar ataques a ambos combatientes usando la función de mokepones.js
	asignarAtaques(mascotaJugadorObjeto);
	asignarAtaques(mascotaEnemigoObjeto);

	// 2. Actualizar la UI con los nombres y vidas iniciales
	elementos.mascotaJugador.innerHTML = mascotaJugadorObjeto.nombre;
	elementos.mascotaEnemigo.innerHTML = mascotaEnemigoObjeto.nombre;
	elementos.vidasJugador.innerHTML = vidasJugador;
	elementos.vidasEnemigo.innerHTML = vidasEnemigo;

	// 3. Crear y mostrar los botones de ataque del jugador
	mostrarAtaques();
}

// NUEVA FUNCIÓN: Inyecta los botones de ataque en el HTML
function mostrarAtaques() {
	let botonesHTML = "";
	// Itera sobre los ataques que fueron asignados al Mokepon del jugador
	mascotaJugadorObjeto.ataques.forEach((ataque) => {
		// Crea un botón por cada ataque usando template literals
		botonesHTML += `
            <button id="${ataque.id}" class="boton-de-ataque">
                ${ataque.nombre}
            </button>
        `;
	});
	elementos.contenedorAtaques.innerHTML = botonesHTML;
	// Por ahora, solo los muestra. La lógica de click se añadirá después.
}
