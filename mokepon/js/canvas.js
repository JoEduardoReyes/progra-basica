// --- VARIABLES GLOBALES DEL CANVAS ---
let mapa = document.getElementById("mapa");
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();

// --- LÓGICA DEL CANVAS ---

// Esta función es llamada desde batalla.js después de seleccionar las mascotas.
function iniciarMapa() {
	// Dimensiones del mapa
	mapa.width = 800;
	mapa.height = 600;
	// URL de la imagen de fondo
	mapaBackground.src = "https://i.ibb.co/Q7Bw5zLR/mokemap.png";

	// Inicia el "motor de juego", que redibuja el canvas constantemente
	intervalo = setInterval(pintarCanvas, 50);

	// --- LISTENERS PARA EL MOVIMIENTO ---
	// Estos listeners llaman a las funciones de este mismo archivo.
	window.addEventListener("keydown", sePresionoUnaTecla);
	window.addEventListener("keyup", detenerMovimiento);

	// Asignar listeners a los botones de la interfaz
	const botonArriba = document.getElementById("mover-arriba");
	const botonAbajo = document.getElementById("mover-abajo");
	const botonIzquierda = document.getElementById("mover-izquierda");
	const botonDerecha = document.getElementById("mover-derecha");

	botonArriba.addEventListener("mousedown", moverArriba);
	botonAbajo.addEventListener("mousedown", moverAbajo);
	botonIzquierda.addEventListener("mousedown", moverIzquierda);
	botonDerecha.addEventListener("mousedown", moverDerecha);

	botonArriba.addEventListener("mouseup", detenerMovimiento);
	botonAbajo.addEventListener("mouseup", detenerMovimiento);
	botonIzquierda.addEventListener("mouseup", detenerMovimiento);
	botonDerecha.addEventListener("mouseup", detenerMovimiento);
}

// Pinta el estado actual del canvas en cada fotograma
function pintarCanvas() {
	// Actualiza la posición del jugador en base a su velocidad
	mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX;
	mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY;

	// Pinta el fondo, lo que limpia el frame anterior
	lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);

	// Dibuja al personaje del jugador en su nueva posición
	lienzo.drawImage(
		mascotaJugadorObjeto.mapaFoto,
		mascotaJugadorObjeto.x,
		mascotaJugadorObjeto.y,
		mascotaJugadorObjeto.ancho,
		mascotaJugadorObjeto.alto
	);

	// Dibuja al personaje enemigo en su posición aleatoria
	lienzo.drawImage(
		mascotaEnemigoObjeto.mapaFoto,
		mascotaEnemigoObjeto.x,
		mascotaEnemigoObjeto.y,
		mascotaEnemigoObjeto.ancho,
		mascotaEnemigoObjeto.alto
	);
}

// --- FUNCIONES DE MOVIMIENTO ---

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

// --- GESTIÓN DEL TECLADO ---
function sePresionoUnaTecla(event) {
	// Solo reaccionamos si el canvas es visible
	if (document.getElementById("ver-mapa").style.display !== "none") {
		switch (event.key) {
			case "ArrowUp":
			case "w":
				moverArriba();
				break;
			case "ArrowDown":
			case "s":
				moverAbajo();
				break;
			case "ArrowLeft":
			case "a":
				moverIzquierda();
				break;
			case "ArrowRight":
			case "d":
				moverDerecha();
				break;
			default:
				break;
		}
	}
}
