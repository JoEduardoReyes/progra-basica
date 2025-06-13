// Cache de elementos DOM
const elementos = {};
let lienzo; // Variable para el contexto del canvas
let mapa; // Variable para el elemento canvas
let intervalo; // Variable para guardar el intervalo del juego
// Nueva variable para la imagen de fondo del mapa
let mapaBackground = new Image();

// --- CLASE MOKEPON CON ESTADO COMPLETO Y VELOCIDAD ---
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
		this.velocidadX = 0;
		this.velocidadY = 0;
	}
}

// --- CONSTANTE CON TODOS LOS MOKEPONES DISPONIBLES ---
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

	// Listeners para movimiento con botones
	elementos.botonMoverArriba.addEventListener("mousedown", moverArriba);
	elementos.botonMoverIzquierda.addEventListener("mousedown", moverIzquierda);
	elementos.botonMoverAbajo.addEventListener("mousedown", moverAbajo);
	elementos.botonMoverDerecha.addEventListener("mousedown", moverDerecha);
	elementos.botonMoverArriba.addEventListener("mouseup", detenerMovimiento);
	elementos.botonMoverIzquierda.addEventListener("mouseup", detenerMovimiento);
	elementos.botonMoverAbajo.addEventListener("mouseup", detenerMovimiento);
	elementos.botonMoverDerecha.addEventListener("mouseup", detenerMovimiento);

	// Listeners para teclado
	window.addEventListener("keydown", sePresionoUnaTecla);
	window.addEventListener("keyup", detenerMovimiento);
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
	// Nuevas dimensiones para el mapa
	mapa.width = 800;
	mapa.height = 600;
	// Asignamos la URL de la imagen de fondo
	mapaBackground.src = "https://i.ibb.co/Q7Bw5zLR/mokemap.png";
	// Cambiamos el nombre de la función en el intervalo
	intervalo = setInterval(pintarCanvas, 50);
}

// La función ahora pinta el fondo y luego el personaje
function pintarCanvas() {
	// Actualizamos la posición del personaje basándonos en su velocidad
	mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX;
	mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY;

	// Dibujamos la imagen de fondo, cubriendo todo el canvas.
	// Esto reemplaza la necesidad de usar clearRect().
	lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);

	// Dibujamos al personaje encima del fondo
	lienzo.drawImage(
		mascotaJugadorObjeto.mapaFoto,
		mascotaJugadorObjeto.x,
		mascotaJugadorObjeto.y,
		mascotaJugadorObjeto.ancho,
		mascotaJugadorObjeto.alto
	);
}

// --- FUNCIONES DE MOVIMIENTO (AHORA ASIGNAN VELOCIDAD) ---

function moverDerecha() {
	mascotaJugadorObjeto.velocidadX = 5;
}

function moverIzquierda() {
	mascotaJugadorObjeto.velocidadX = -5;
}

function moverAbajo() {
	mascotaJugadorObjeto.velocidadY = 5;
}

function moverArriba() {
	mascotaJugadorObjeto.velocidadY = -5;
}

function detenerMovimiento() {
	mascotaJugadorObjeto.velocidadX = 0;
	mascotaJugadorObjeto.velocidadY = 0;
}

// --- FUNCIÓN PARA GESTIONAR EL TECLADO ---
function sePresionoUnaTecla(event) {
	switch (event.key) {
		case "ArrowUp":
			moverArriba();
			break;
		case "ArrowDown":
			moverAbajo();
			break;
		case "ArrowLeft":
			moverIzquierda();
			break;
		case "ArrowRight":
			moverDerecha();
			break;
		default:
			break;
	}
}
