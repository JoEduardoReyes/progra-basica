// Cache de elementos DOM
const elementos = {};
let lienzo; // Variable para el contexto del canvas
let mapa; // Variable para el elemento canvas

// --- CLASE MOKEPON CON ESTADO COMPLETO ---
class Mokepon {
	constructor(nombre, id, foto) {
		this.nombre = nombre;
		this.id = id;
		this.foto = foto;
		this.x = 20;
		this.y = 30;
		this.ancho = 80;
		this.alto = 80;
		this.mapaFoto = new Image();
		this.mapaFoto.src = foto;
	}
}

// --- CONSTANTE CON TODOS LOS MOKEPONES DISPONIBLES ---
const MOKEPONES = [
	new Mokepon(
		"Hipodoge �",
		"hipodoge",
		"https://i.ibb.co/fddKdfNd/hipodoge.png"
	),
	new Mokepon(
		"Capipepo 🌱",
		"capipepo",
		"https://i.ibb.co/zhN3F0RD/capipepo.png"
	),
	new Mokepon(
		"Ratigueya 🔥",
		"ratigueya",
		"https://i.ibb.co/Vp3NsXTN/ratigueya.png"
	),
	new Mokepon(
		"Perrocoptero 🚁",
		"perrocoptero",
		"https://i.ibb.co/v6b4F3bX/perrocoptero.png"
	),
	new Mokepon(
		"Gatosaurio 🦖",
		"gatosaurio",
		"https://i.ibb.co/NngH7Dyn/gatosaurio.png"
	),
	new Mokepon(
		"Largartoño 🦎",
		"largartono",
		"https://i.ibb.co/3KRrZkh/lagartono.png"
	),
];

let mascotaJugadorObjeto;

// --- INICIALIZACIÓN DEL JUEGO ---
window.addEventListener("load", iniciarJuego);

function iniciarJuego() {
	cachearElementos();
	inyectarMascotasHTML();

	elementos.sectionVerMapa.style.display = "none";
	elementos.seleccionarAtaque.style.display = "none";
	elementos.mensajes.style.display = "none";
	elementos.reiniciar.style.display = "none";
	elementos.resultadoFinal.style.display = "none";

	elementos.botonMascotaJugador.addEventListener(
		"click",
		seleccionarMascotaJugador
	);

	// Agregamos los listeners para los botones de movimiento
	elementos.botonMoverArriba.addEventListener("click", moverArriba);
	elementos.botonMoverIzquierda.addEventListener("click", moverIzquierda);
	elementos.botonMoverAbajo.addEventListener("click", moverAbajo);
	elementos.botonMoverDerecha.addEventListener("click", moverDerecha);
}

// --- FUNCIONES DE CONFIGURACIÓN INICIAL ---
function cachearElementos() {
	elementos.botonMascotaJugador = document.getElementById("boton-mascota");
	elementos.contenedorMascotas = document.getElementById("contenedor-mascotas");
	elementos.seleccionarMascota = document.getElementById("seleccionar-mascota");
	elementos.mascotaJugador = document.getElementById("mascota-jugador");
	elementos.sectionVerMapa = document.getElementById("ver-mapa");
	// CORRECCIÓN: Se corrigió el error de tipeo de "seleccionarAque" a "seleccionarAtaque"
	elementos.seleccionarAtaque = document.getElementById("seleccionar-ataque");
	elementos.mensajes = document.getElementById("mensajes");
	elementos.reiniciar = document.getElementById("reiniciar");
	elementos.resultadoFinal = document.getElementById("resultado-final");
	mapa = document.getElementById("mapa");
	lienzo = mapa.getContext("2d");

	// Cacheamos los nuevos botones de movimiento
	elementos.botonMoverArriba = document.getElementById("mover-arriba");
	elementos.botonMoverIzquierda = document.getElementById("mover-izquierda");
	elementos.botonMoverAbajo = document.getElementById("mover-abajo");
	elementos.botonMoverDerecha = document.getElementById("mover-derecha");
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

	elementos.seleccionarMascota.style.display = "none";
	elementos.sectionVerMapa.style.display = "flex";

	iniciarMapa();
}

// --- LÓGICA DEL CANVAS ---

function iniciarMapa() {
	mapa.width = 550;
	mapa.height = 400;

	mascotaJugadorObjeto.mapaFoto.onload = () => {
		pintarPersonaje();
	};

	if (mascotaJugadorObjeto.mapaFoto.complete) {
		pintarPersonaje();
	}
}

function pintarPersonaje() {
	// Limpiamos el canvas antes de volver a dibujar para evitar que la imagen se repita
	lienzo.clearRect(0, 0, mapa.width, mapa.height);

	lienzo.drawImage(
		mascotaJugadorObjeto.mapaFoto,
		mascotaJugadorObjeto.x,
		mascotaJugadorObjeto.y,
		mascotaJugadorObjeto.ancho,
		mascotaJugadorObjeto.alto
	);
}

// --- FUNCIONES DE MOVIMIENTO ---

function moverDerecha() {
	mascotaJugadorObjeto.x += 5; // Modificamos la posición en X
	pintarPersonaje(); // Volvemos a dibujar el personaje en su nueva posición
}

function moverIzquierda() {
	mascotaJugadorObjeto.x -= 5;
	pintarPersonaje();
}

function moverAbajo() {
	mascotaJugadorObjeto.y += 5;
	pintarPersonaje();
}

function moverArriba() {
	mascotaJugadorObjeto.y -= 5;
	pintarPersonaje();
}
