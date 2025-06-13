// --- VARIABLES GLOBALES DEL JUEGO ---
const elementos = {}; // Cache de elementos DOM
let mascotaJugadorObjeto;
let mascotaEnemigoObjeto;
// Las variables de vidas y ataques no se usan por ahora, pero se pueden reactivar después.
// let vidasJugador = 3;
// let vidasEnemigo = 3;

// --- INICIALIZACIÓN DEL JUEGO ---
window.addEventListener("load", iniciarJuego);

function iniciarJuego() {
	cachearElementos();
	inyectarMascotasHTML();

	// Ocultar secciones que no se usan al principio
	elementos.seleccionarAtaque.style.display = "none";
	elementos.mensajes.style.display = "none";
	elementos.reiniciar.style.display = "none";
	elementos.resultadoFinal.style.display = "none";
	elementos.sectionVerMapa.style.display = "none"; // Ocultamos el mapa también

	// --- LISTENERS PRINCIPALES ---
	elementos.botonMascotaJugador.addEventListener(
		"click",
		seleccionarMascotaJugador
	);
	// Los listeners de reinicio se pueden reactivar con la lógica de batalla
	// elementos.botonReiniciar.addEventListener("click", () => location.reload());
	// elementos.botonNuevaPartida.addEventListener("click", () => location.reload());
}

// --- FUNCIONES DE CONFIGURACIÓN ---
function cachearElementos() {
	// Elementos principales
	elementos.seleccionarMascota = document.getElementById("seleccionar-mascota");
	elementos.contenedorMascotas = document.getElementById("contenedor-mascotas");
	elementos.botonMascotaJugador = document.getElementById("boton-mascota");
	elementos.sectionVerMapa = document.getElementById("ver-mapa");

	// Elementos de batalla (se mantienen para el futuro)
	elementos.seleccionarAtaque = document.getElementById("seleccionar-ataque");
	elementos.mensajes = document.getElementById("mensajes");
	elementos.reiniciar = document.getElementById("reiniciar");
	elementos.resultadoFinal = document.getElementById("resultado-final");
	elementos.botonReiniciar = document.getElementById("boton-reiniciar");
	elementos.botonNuevaPartida = document.getElementById("boton-nueva-partida");
}

function inyectarMascotasHTML() {
	// Esta función asume que la constante MOKEPONES está definida en mokepones.js
	let opcionesDeMascotas = "";
	MOKEPONES.forEach((mokepon) => {
		opcionesDeMascotas += `
            <input type="radio" name="mascota" id="${mokepon.id}" />
            <label for="${mokepon.id}">${mokepon.nombre}</label>
        `;
	});
	elementos.contenedorMascotas.innerHTML = opcionesDeMascotas;
}

// --- LÓGICA DE SELECCIÓN ---
function seleccionarMascotaJugador() {
	const inputSeleccionadoId = document.querySelector(
		'input[name="mascota"]:checked'
	)?.id;
	if (!inputSeleccionadoId) {
		alert("Debes seleccionar una mascota para continuar");
		return;
	}

	mascotaJugadorObjeto = MOKEPONES.find(
		(mokepon) => mokepon.id === inputSeleccionadoId
	);

	// Oculta la selección y prepara el canvas
	elementos.seleccionarMascota.style.display = "none";
	elementos.sectionVerMapa.style.display = "flex";

	// Llama a las funciones para preparar el escenario del canvas
	seleccionarMascotaEnemigo();
	// Esta función está en canvas.js y tomará el control desde aquí
	iniciarMapa();
}

function seleccionarMascotaEnemigo() {
	const enemigosPosibles = MOKEPONES.filter(
		(mokepon) => mokepon.id !== mascotaJugadorObjeto.id
	);
	const indiceAleatorio = aleatorio(0, enemigosPosibles.length - 1);
	mascotaEnemigoObjeto = enemigosPosibles[indiceAleatorio];

	// Asignar posición aleatoria al enemigo (el canvas lo usará para dibujarlo)
	mascotaEnemigoObjeto.x = aleatorio(0, 720); // 800 (ancho mapa) - 80 (ancho mokepon)
	mascotaEnemigoObjeto.y = aleatorio(0, 520); // 600 (alto mapa) - 80 (alto mokepon)
}

// --- UTILIDADES ---
function aleatorio(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
