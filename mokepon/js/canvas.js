// Archivo: public/js/canvas.js

const mapa = document.getElementById("mapa");
const lienzo = mapa.getContext("2d");
let intervalo;
const mapaBackground = new Image();
let enemigos = [];

/**
 * Función principal asíncrona para iniciar la fase del mapa.
 */
async function iniciarFaseDeMapa() {
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

	// Esperamos a que el servidor nos dé una posición segura
	const posicionInicial = await seleccionarMokepon(mascotaJugadorObjeto);

	if (!posicionInicial) {
		alert(
			"No se pudo conectar con el servidor para obtener una posición. Por favor, recarga la página."
		);
		return;
	}

	// Asignamos la posición segura que recibimos
	mascotaJugadorObjeto.x = posicionInicial.x;
	mascotaJugadorObjeto.y = posicionInicial.y;

	document.getElementById("seleccionar-mascota").style.display = "none";
	document.getElementById("ver-mapa").style.display = "flex";
	iniciarMapa();
}

/**
 * Prepara el canvas e inicia el bucle de renderizado.
 */
function iniciarMapa() {
	mapa.width = 800;
	mapa.height = 740; // Usamos la altura correcta
	mapaBackground.src = "https://i.ibb.co/Q7Bw5zLR/mokemap.png";

	intervalo = setInterval(pintarCanvas, 50); // 20 FPS

	window.addEventListener("keydown", sePresionoUnaTecla);
	window.addEventListener("keyup", detenerMovimiento);

	// Añadir listeners para botones en pantalla (touch)
	document
		.getElementById("mover-arriba")
		.addEventListener("mousedown", moverArriba);
	document
		.getElementById("mover-abajo")
		.addEventListener("mousedown", moverAbajo);
	document
		.getElementById("mover-izquierda")
		.addEventListener("mousedown", moverIzquierda);
	document
		.getElementById("mover-derecha")
		.addEventListener("mousedown", moverDerecha);

	document
		.getElementById("mover-arriba")
		.addEventListener("mouseup", detenerMovimiento);
	document
		.getElementById("mover-abajo")
		.addEventListener("mouseup", detenerMovimiento);
	document
		.getElementById("mover-izquierda")
		.addEventListener("mouseup", detenerMovimiento);
	document
		.getElementById("mover-derecha")
		.addEventListener("mouseup", detenerMovimiento);
}

/**
 * Actualiza la lista local de enemigos con los datos del servidor.
 * @param {Array} enemigosDelServidor - La lista de enemigos del servidor.
 */
function actualizarEnemigos(enemigosDelServidor) {
	enemigosDelServidor.forEach((enemigoServidor) => {
		if (!enemigoServidor.mokepon) return;

		const enemigoExistente = enemigos.find((e) => e.id === enemigoServidor.id);

		if (enemigoExistente) {
			// Si ya lo conocemos, solo actualizamos su posición
			enemigoExistente.x = enemigoServidor.x;
			enemigoExistente.y = enemigoServidor.y;
		} else {
			// Si es nuevo, creamos el objeto completo y lo añadimos
			const nuevoEnemigo = new Mokepon(
				enemigoServidor.mokepon.nombre,
				enemigoServidor.mokepon.id,
				enemigoServidor.mokepon.foto,
				enemigoServidor.mokepon.tipo
			);
			nuevoEnemigo.id = enemigoServidor.id; // ID del JUGADOR
			nuevoEnemigo.x = enemigoServidor.x;
			nuevoEnemigo.y = enemigoServidor.y;

			enemigos.push(nuevoEnemigo);
			console.log("Nuevo enemigo detectado:", nuevoEnemigo);
		}
	});
}

/**
 * Bucle principal que dibuja todo en el canvas.
 */
function pintarCanvas() {
	mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX;
	mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY;

	lienzo.clearRect(0, 0, mapa.width, mapa.height);
	lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);

	// Dibujar nuestro mokepon
	lienzo.drawImage(
		mascotaJugadorObjeto.mapaFoto,
		mascotaJugadorObjeto.x,
		mascotaJugadorObjeto.y,
		mascotaJugadorObjeto.ancho,
		mascotaJugadorObjeto.alto
	);

	enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

	// Dibujar a todos los enemigos y revisar colisiones
	enemigos.forEach((enemigo) => {
		lienzo.drawImage(
			enemigo.mapaFoto,
			enemigo.x,
			enemigo.y,
			enemigo.ancho,
			enemigo.alto
		);
		revisarColision(enemigo);
	});
}

// --- LÓGICA DE COLISIÓN Y MOVIMIENTO ---

function verificarColision(objetoA, objetoB) {
	if (!objetoA || !objetoB) return false;

	const arribaA = objetoA.y;
	const abajoA = objetoA.y + objetoA.alto;
	const derechaA = objetoA.x + objetoA.ancho;
	const izquierdaA = objetoA.x;

	const arribaB = objetoB.y;
	const abajoB = objetoB.y + objetoB.alto;
	const derechaB = objetoB.x + objetoB.ancho;
	const izquierdaB = objetoB.x;

	const hayColision =
		izquierdaA < derechaB &&
		derechaA > izquierdaB &&
		arribaA < abajoB &&
		abajoA > arribaB;
	return hayColision;
}

function revisarColision(enemigo) {
	if (verificarColision(mascotaJugadorObjeto, enemigo)) {
		detenerMovimiento();
		clearInterval(intervalo);
		mascotaEnemigoObjeto = enemigo;
		document.getElementById("ver-mapa").style.display = "none";
		document.getElementById("seleccionar-ataque").style.display = "flex";
		iniciarBatalla(); // Se asume que esta función está en batalla.js
	}
}

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
