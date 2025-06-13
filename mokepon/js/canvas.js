// --- VARIABLES GLOBALES DEL CANVAS ---
let mapa = document.getElementById("mapa");
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();

// --- LÓGICA DEL CANVAS ---

function iniciarMapa() {
	mapa.width = 800;
	mapa.height = 600;
	mapaBackground.src = "https://i.ibb.co/Q7Bw5zLR/mokemap.png";
	intervalo = setInterval(pintarCanvas, 50);

	// Listeners para el movimiento
	window.addEventListener("keydown", sePresionoUnaTecla);
	window.addEventListener("keyup", detenerMovimiento);

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
	mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX;
	mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY;

	lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);

	lienzo.drawImage(
		mascotaJugadorObjeto.mapaFoto,
		mascotaJugadorObjeto.x,
		mascotaJugadorObjeto.y,
		mascotaJugadorObjeto.ancho,
		mascotaJugadorObjeto.alto
	);

	lienzo.drawImage(
		mascotaEnemigoObjeto.mapaFoto,
		mascotaEnemigoObjeto.x,
		mascotaEnemigoObjeto.y,
		mascotaEnemigoObjeto.ancho,
		mascotaEnemigoObjeto.alto
	);

	// Revisamos la colisión en cada fotograma, solo si el personaje se está moviendo
	if (
		mascotaJugadorObjeto.velocidadX !== 0 ||
		mascotaJugadorObjeto.velocidadY !== 0
	) {
		revisarColision();
	}
}

// --- NUEVA FUNCIÓN DE COLISIÓN ---
function revisarColision() {
	// Definimos los 4 lados de cada Mokepon para que el código sea más legible
	const arribaEnemigo = mascotaEnemigoObjeto.y;
	const abajoEnemigo = mascotaEnemigoObjeto.y + mascotaEnemigoObjeto.alto;
	const derechaEnemigo = mascotaEnemigoObjeto.x + mascotaEnemigoObjeto.ancho;
	const izquierdaEnemigo = mascotaEnemigoObjeto.x;

	const arribaMascota = mascotaJugadorObjeto.y;
	const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
	const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
	const izquierdaMascota = mascotaJugadorObjeto.x;

	// Si se cumple alguna de estas, NO hay colisión. Si ninguna se cumple, SÍ hay.
	if (
		abajoMascota < arribaEnemigo ||
		arribaMascota > abajoEnemigo ||
		derechaMascota < izquierdaEnemigo ||
		izquierdaMascota > derechaEnemigo
	) {
		// No hay colisión, no hacemos nada.
		return;
	}

	// Si el código llega hasta aquí, significa que hubo una colisión.
	detenerMovimiento();
	clearInterval(intervalo); // Detenemos el "motor" del juego para que no siga revisando.
	alert("¡Has encontrado un oponente! Prepárate para la batalla.");
	// Aquí es donde, en el futuro, llamaríamos a la función para iniciar el combate elemental.
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
