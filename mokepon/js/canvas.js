// Archivo: public/js/canvas.js

// --- VARIABLES GLOBALES DEL CANVAS ---
const mapa = document.getElementById("mapa");
const lienzo = mapa.getContext("2d");
let intervalo;
const mapaBackground = new Image();
// Variable auxiliar (array) que almacenará el estado de todos los enemigos.
let enemigos = [];

// --- FUNCIÓN PRINCIPAL PARA INICIAR LA FASE DEL MAPA ---
function iniciarFaseDeMapa() {
	const inputSeleccionadoId = document.querySelector(
		'input[name="mascota"]:checked'
	)?.id;
	if (!inputSeleccionadoId) {
		// Usamos un modal o un elemento en el DOM en lugar de alert
		alert("Debes seleccionar una mascota para continuar");
		return;
	}
	mascotaJugadorObjeto = MOKEPONES.find(
		(mokepon) => mokepon.id === inputSeleccionadoId
	);

	// SOLUCIÓN: Añadimos manualmente la propiedad mapaFoto, que es un objeto Imagen.
	// Esto es necesario porque el objeto viene de un array y no de una clase constructora.
	mascotaJugadorObjeto.mapaFoto = new Image();
	mascotaJugadorObjeto.mapaFoto.src = mascotaJugadorObjeto.foto;

	// --- CAMBIO CLAVE: Generamos una posición que no colisione con otros ---
	const posicionInicial = generarPosicionSinColision();
	mascotaJugadorObjeto.x = posicionInicial.x;
	mascotaJugadorObjeto.y = posicionInicial.y;

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

	intervalo = setInterval(pintarCanvas, 50); // 50ms = 20 FPS

	window.addEventListener("keydown", sePresionoUnaTecla);
	window.addEventListener("keyup", detenerMovimiento);

	// Event listeners para botones en pantalla
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

// --- FUNCIÓN NUEVA: ACTUALIZA EL ESTADO DE LOS ENEMIGOS ---
function actualizarEnemigos(enemigosDelServidor) {
	enemigosDelServidor.forEach((enemigoServidor) => {
		if (!enemigoServidor.mokepon) return;

		const enemigoExistente = enemigos.find((e) => e.id === enemigoServidor.id);

		if (enemigoExistente) {
			enemigoExistente.x = enemigoServidor.x;
			enemigoExistente.y = enemigoServidor.y;
		} else {
			// Asumimos que la clase Mokepon existe en otro archivo y que
			// crea las propiedades necesarias (nombre, id, foto, tipo, mapaFoto, etc.)
			const nuevoEnemigo = new Mokepon(
				enemigoServidor.mokepon.nombre,
				enemigoServidor.mokepon.id,
				enemigoServidor.mokepon.foto,
				enemigoServidor.mokepon.tipo
			);
			nuevoEnemigo.id = enemigoServidor.id;
			nuevoEnemigo.x = enemigoServidor.x;
			nuevoEnemigo.y = enemigoServidor.y;

			enemigos.push(nuevoEnemigo);
		}
	});
}

// --- FUNCIÓN DE RENDERIZADO PRINCIPAL ---
function pintarCanvas() {
	mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX;
	mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY;

	lienzo.clearRect(0, 0, mapa.width, mapa.height);
	lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);

	// SOLUCIÓN: Reemplazamos el llamado al método inexistente .pintarMokepon()
	// con la lógica de dibujado directo en el canvas.
	lienzo.drawImage(
		mascotaJugadorObjeto.mapaFoto,
		mascotaJugadorObjeto.x,
		mascotaJugadorObjeto.y,
		mascotaJugadorObjeto.ancho,
		mascotaJugadorObjeto.alto
	);

	enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

	enemigos.forEach((enemigo) => {
		// SOLUCIÓN: También usamos la lógica de dibujado directo aquí
		// para mantener la consistencia y robustez del código.
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

// --- FUNCIONES DE COLISIÓN Y POSICIONAMIENTO ---

/**
 * Genera coordenadas (x, y) aleatorias que no colisionan con ningún enemigo existente.
 * @returns {{x: number, y: number}} - Un objeto con las coordenadas seguras.
 */
function generarPosicionSinColision() {
	let nuevaPosicion;
	let hayColision;

	do {
		hayColision = false;
		const x = Math.floor(
			Math.random() * (mapa.width - mascotaJugadorObjeto.ancho)
		);
		const y = Math.floor(
			Math.random() * (mapa.height - mascotaJugadorObjeto.alto)
		);

		nuevaPosicion = { x, y };

		// Creamos un objeto temporal para la verificación de colisión
		const jugadorTemporal = {
			...mascotaJugadorObjeto,
			...nuevaPosicion,
		};

		for (const enemigo of enemigos) {
			if (verificarColision(jugadorTemporal, enemigo)) {
				hayColision = true;
				break; // Si hay colisión, salimos del bucle for y probamos nuevas coordenadas.
			}
		}
	} while (hayColision);

	return nuevaPosicion;
}

/**
 * Verifica si hay una colisión entre dos objetos (mokepones).
 * @param {Mokepon} objetoA - El primer mokepon.
 * @param {Mokepon} objetoB - El segundo mokepon.
 * @returns {boolean} - Devuelve true si hay colisión, de lo contrario false.
 */
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

	return !(
		abajoA < arribaB ||
		arribaA > abajoB ||
		derechaA < izquierdaB ||
		izquierdaA > derechaB
	);
}

function revisarColision(enemigo) {
	if (verificarColision(mascotaJugadorObjeto, enemigo)) {
		// Si hay colisión:
		detenerMovimiento();
		clearInterval(intervalo);
		mascotaEnemigoObjeto = enemigo;
		document.getElementById("ver-mapa").style.display = "none";
		document.getElementById("seleccionar-ataque").style.display = "flex";
		iniciarBatalla();
	}
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
