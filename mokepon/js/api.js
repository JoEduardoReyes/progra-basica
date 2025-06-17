// Archivo: public/js/api.js

/**
 * Envía el mokepon seleccionado por el jugador al servidor.
 * @param {Mokepon} mascotaJugadorObjeto - El objeto completo del mokepon del jugador.
 */
function seleccionarMokepon(mascotaJugadorObjeto) {
	fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ mokepon: mascotaJugadorObjeto }),
	}).then((res) => {
		if (res.ok) {
			console.log("Mokepon seleccionado y enviado al servidor.");
		} else {
			console.error("Error al seleccionar el mokepon");
		}
	});
}

/**
 * Se une a la partida, obteniendo un ID de jugador del servidor.
 */
function unirseAlJuego() {
	fetch("http://localhost:8080/unirse").then(function (res) {
		if (res.ok) {
			res.text().then(function (id) {
				console.log("ID del jugador:", id);
				// Asigna el ID a la variable global para futuras peticiones
				jugadorId = id;
			});
		} else {
			console.error("Error al unirse al juego");
		}
	});
}

/**
 * Envía la posición actual del jugador al servidor y recibe la de los enemigos.
 * @param {number} x - La coordenada X del jugador.
 * @param {number} y - La coordenada Y del jugador.
 */
function enviarPosicion(x, y) {
	fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ x, y }),
	})
		.then((res) => {
			if (res.ok) {
				res.json().then(({ enemigos }) => {
					// --- CAMBIO CLAVE ---
					// En lugar de dibujar los enemigos directamente desde aquí,
					// llamamos a una función que actualiza nuestro estado local.
					// El dibujado se hará en el bucle principal de 'pintarCanvas'.
					// Esta función 'actualizarEnemigos' está definida en canvas.js
					actualizarEnemigos(enemigos);
				});
			}
		})
		.catch((error) => {
			console.error("Error al enviar la posición:", error);
		});
}
