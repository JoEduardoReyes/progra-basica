// --- VARIABLES GLOBALES DEL CANVAS ---
let mapa = document.getElementById("mapa");
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
// mascotaJugadorObjeto y mascotaEnemigoObjeto se definirán aquí

// --- FUNCIÓN PRINCIPAL PARA INICIAR LA FASE DEL MAPA ---
// Esta función es llamada desde batalla.js cuando el jugador hace clic en "Seleccionar"
function iniciarFaseDeMapa() {
	// 1. Lógica para seleccionar la mascota del jugador
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

	// 2. Oculta la pantalla de selección y muestra el mapa
	document.getElementById("seleccionar-mascota").style.display = "none";
	document.getElementById("ver-mapa").style.display = "flex";

	// 3. Inicia el mapa (prepara el canvas y los listeners)
	iniciarMapa();
}

// --- LÓGICA DE PREPARACIÓN DEL CANVAS ---
function iniciarMapa() {
	mapa.width = 800;
	mapa.height = 600;
	mapaBackground.src = "https://i.ibb.co/Q7Bw5zLR/mokemap.png";

	// Se obtiene el enemigo usando la función de mokepones.js
	mascotaEnemigoObjeto = obtenerEnemigoAleatorio(mascotaJugadorObjeto);

	// Inicia el motor de juego
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

	if (
		mascotaJugadorObjeto.velocidadX !== 0 ||
		mascotaJugadorObjeto.velocidadY !== 0
	) {
		revisarColision();
	}
}

// --- FUNCIÓN DE COLISIÓN (MODIFICADA) ---
function revisarColision() {
	const arribaEnemigo = mascotaEnemigoObjeto.y;
	const abajoEnemigo = mascotaEnemigoObjeto.y + mascotaEnemigoObjeto.alto;
	const derechaEnemigo = mascotaEnemigoObjeto.x + mascotaEnemigoObjeto.ancho;
	const izquierdaEnemigo = mascotaEnemigoObjeto.x;

	const arribaMascota = mascotaJugadorObjeto.y;
	const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
	const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
	const izquierdaMascota = mascotaJugadorObjeto.x;

	if (
		abajoMascota < arribaEnemigo ||
		arribaMascota > abajoEnemigo ||
		derechaMascota < izquierdaEnemigo ||
		izquierdaMascota > derechaEnemigo
	) {
		return; // No hay colisión, la función termina aquí.
	}

	// Si hay colisión:
	detenerMovimiento();
	clearInterval(intervalo); // Detiene el dibujado del mapa.

	// CAMBIO PRINCIPAL: Ocultamos el mapa y mostramos la sección de ataque.
	document.getElementById("ver-mapa").style.display = "none";
	document.getElementById("seleccionar-ataque").style.display = "flex";

	// Futuro: Aquí se iniciará la lógica de batalla desde batalla.js
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
		}
	}
}
