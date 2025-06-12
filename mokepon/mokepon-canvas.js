// Cache de elementos DOM
const elementos = {};
let lienzo; // Variable para el contexto del canvas
let mapa; // Variable para el elemento canvas

// --- CLASE PARA DATOS ESTÁTICOS DE MOKEPONES ---
// La clase ahora solo contiene la definición de un Mokepon, no su estado en el juego.
class Mokepon {
	constructor(nombre, id, foto) {
		this.nombre = nombre;
		this.id = id;
		this.foto = foto;
	}
}

// --- CONSTANTE CON TODOS LOS MOKEPONES DISPONIBLES ---
// Usamos una constante para almacenar la lista de todos los Mokepones que existen en el juego.
const MOKEPONES = [
	new Mokepon(
		"Hipodoge 💧",
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

// Variable para guardar el objeto de la mascota seleccionada por el jugador
let mascotaJugadorObjeto;
// Objeto para manejar al personaje en el mapa (su estado dinámico)
let personajeJugador = {
	x: 20,
	y: 30,
	ancho: 80,
	alto: 80,
	mapaFoto: new Image(),
};

// --- INICIALIZACIÓN DEL JUEGO ---
window.addEventListener("load", iniciarJuego);

function iniciarJuego() {
	cachearElementos();
	inyectarMascotasHTML();

	// Ocultar las secciones que no se necesitan al inicio
	elementos.sectionVerMapa.style.display = "none";
	elementos.seleccionarAtaque.style.display = "none";
	elementos.mensajes.style.display = "none";
	elementos.reiniciar.style.display = "none";
	elementos.resultadoFinal.style.display = "none";

	// Asignación de event listeners iniciales
	elementos.botonMascotaJugador.addEventListener(
		"click",
		seleccionarMascotaJugador
	);
}

// --- FUNCIONES DE CONFIGURACIÓN INICIAL ---
function cachearElementos() {
	elementos.botonMascotaJugador = document.getElementById("boton-mascota");
	elementos.contenedorMascotas = document.getElementById("contenedor-mascotas");
	elementos.seleccionarMascota = document.getElementById("seleccionar-mascota");
	elementos.mascotaJugador = document.getElementById("mascota-jugador");
	elementos.sectionVerMapa = document.getElementById("ver-mapa");
	elementos.seleccionarAtaque = document.getElementById("seleccionar-ataque");
	elementos.mensajes = document.getElementById("mensajes");
	elementos.reiniciar = document.getElementById("reiniciar");
	elementos.resultadoFinal = document.getElementById("resultado-final");
	mapa = document.getElementById("mapa");
	lienzo = mapa.getContext("2d");
}

// Genera y muestra las mascotas en el HTML dinámicamente
function inyectarMascotasHTML() {
	let opcionesDeMascotas = "";
	// Iteramos sobre nuestra constante MOKEPONES para crear el HTML
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
	// Obtenemos el id del input seleccionado
	const inputSeleccionadoId = document.querySelector(
		'input[name="mascota"]:checked'
	)?.id;

	if (!inputSeleccionadoId) {
		alert("Debes seleccionar una mascota para continuar");
		return;
	}

	// Buscamos el objeto Mokepon correspondiente al id seleccionado
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

	// Asignamos la foto de la mascota seleccionada al objeto que se dibujará en el mapa
	personajeJugador.mapaFoto.src = mascotaJugadorObjeto.foto;

	// Usamos un manejador de eventos para dibujar la imagen solo cuando esté cargada
	personajeJugador.mapaFoto.onload = () => {
		pintarPersonaje();
	};

	// Si la imagen ya está en la caché del navegador, la dibujamos directamente
	if (personajeJugador.mapaFoto.complete) {
		pintarPersonaje();
	}
}

// Nueva función para pintar al personaje, así podemos reutilizarla
function pintarPersonaje() {
	lienzo.drawImage(
		personajeJugador.mapaFoto,
		personajeJugador.x,
		personajeJugador.y,
		personajeJugador.ancho,
		personajeJugador.alto
	);
}
