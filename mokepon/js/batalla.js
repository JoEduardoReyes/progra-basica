// --- VARIABLES GLOBALES Y CACHE ---
const elementos = {};
let mascotaJugadorObjeto;
let mascotaEnemigoObjeto;

// --- INICIALIZACIÓN DEL JUEGO ---
window.addEventListener("load", iniciarJuego);

function iniciarJuego() {
	cachearElementos();
	inyectarMascotasHTML();

	// Ocultar todas las secciones excepto la de selección de mascota
	elementos.sectionVerMapa.style.display = "none";
	elementos.seleccionarAtaque.style.display = "none";

	// El listener ahora llama a una función que estará en canvas.js
	elementos.botonMascotaJugador.addEventListener("click", iniciarFaseDeMapa);
}

// --- FUNCIONES DE CONFIGURACIÓN INICIAL ---
function cachearElementos() {
	elementos.seleccionarMascota = document.getElementById("seleccionar-mascota");
	elementos.contenedorMascotas = document.getElementById("contenedor-mascotas");
	elementos.botonMascotaJugador = document.getElementById("boton-mascota");
	elementos.sectionVerMapa = document.getElementById("ver-mapa");
	elementos.seleccionarAtaque = document.getElementById("seleccionar-ataque");
}

function inyectarMascotasHTML() {
	// Asume que MOKEPONES existe desde mokepones.js
	let opcionesDeMascotas = "";
	MOKEPONES.forEach((mokepon) => {
		opcionesDeMascotas += `
            <input type="radio" name="mascota" id="${mokepon.id}" />
            <label for="${mokepon.id}">${mokepon.nombre}</label>
        `;
	});
	elementos.contenedorMascotas.innerHTML = opcionesDeMascotas;
}
