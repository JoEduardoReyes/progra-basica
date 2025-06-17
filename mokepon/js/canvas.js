// --- VARIABLES GLOBALES DEL CANVAS ---
let mapa = document.getElementById("mapa");
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
// 'mascotaJugadorObjeto' se mantiene, pero 'mascotaEnemigoObjeto' se elimina.

// --- FUNCIÓN PRINCIPAL PARA INICIAR LA FASE DEL MAPA ---
function iniciarFaseDeMapa() {
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
	// IMPORTANTE: Le asignamos una posición inicial aleatoria a nuestro mokepon
	mascotaJugadorObjeto.x = Math.floor(Math.random() * 720);
	mascotaJugadorObjeto.y = Math.floor(Math.random() * 520);

	seleccionarMokepon(mascotaJugadorObjeto);

	document.getElementById("seleccionar-mascota").style.display = "none";
	document.getElementById("ver-mapa").style.display = "flex";
	iniciarMapa();
}

// --- LÓGICA DE PREPARACIÓN DEL CANVAS ---
function iniciarMapa() {
	mapa.width = 800;
	mapa.height = 600;
	mapaBackground.src = "https://i.ibb.co/Q7Bw5zLR/mokemap.png";

	// Ya no se crea un enemigo aleatorio aquí.
	intervalo = setInterval(pintarCanvas, 50);

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

// NUEVA FUNCIÓN PARA DIBUJAR A LOS ENEMIGOS
function dibujarEnemigos(enemigos) {
	enemigos.forEach((enemigo) => {
		// Creamos un objeto Mokepon en el cliente para manejar la imagen
		let enemigoMokepon = new Mokepon(
			enemigo.mokepon.nombre,
			enemigo.mokepon.id,
			enemigo.mokepon.foto,
			enemigo.mokepon.tipo
		);
		enemigoMokepon.x = enemigo.x;
		enemigoMokepon.y = enemigo.y;

		// Dibujamos al enemigo en el canvas
		lienzo.drawImage(
			enemigoMokepon.mapaFoto,
			enemigoMokepon.x,
			enemigoMokepon.y,
			enemigoMokepon.ancho,
			enemigoMokepon.alto
		);

		// Revisamos la colisión con este enemigo específico
		revisarColision(enemigoMokepon);
	});
}

// Pinta el estado actual del canvas en cada fotograma
function pintarCanvas() {
	mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX;
	mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY;

	lienzo.clearRect(0, 0, mapa.width, mapa.height); // Limpiamos el lienzo
	lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height); // Dibujamos el fondo

	// Dibujamos a nuestro propio mokepon
	lienzo.drawImage(
		mascotaJugadorObjeto.mapaFoto,
		mascotaJugadorObjeto.x,
		mascotaJugadorObjeto.y,
		mascotaJugadorObjeto.ancho,
		mascotaJugadorObjeto.alto
	);

	// Enviamos nuestra posición y el backend nos devolverá los enemigos
	enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);
}

// FUNCIÓN DE COLISIÓN MODIFICADA
function revisarColision(enemigo) {
	if (!enemigo) return; // Si no hay enemigo, no hacemos nada

	const arribaEnemigo = enemigo.y;
	const abajoEnemigo = enemigo.y + enemigo.alto;
	const derechaEnemigo = enemigo.x + enemigo.ancho;
	const izquierdaEnemigo = enemigo.x;

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
		return;
	}

	// Si hay colisión:
	detenerMovimiento();
	clearInterval(intervalo);

	// Guardamos el enemigo con el que colisionamos para la batalla
	mascotaEnemigoObjeto = enemigo;

	document.getElementById("ver-mapa").style.display = "none";
	document.getElementById("seleccionar-ataque").style.display = "flex";

	iniciarBatalla();
}

// --- FUNCIONES DE MOVIMIENTO (sin cambios) ---
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

// --- GESTIÓN DEL TECLADO (sin cambios) ---
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
