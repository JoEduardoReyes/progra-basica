// Archivo: public/js/api.js

/**
 * Se une a la partida, obteniendo un ID de jugador del servidor.
 */
function unirseAlJuego() {
	fetch("http://localhost:8080/unirse").then(function (res) {
		if (res.ok) {
			res.text().then(function (id) {
				console.log("ID del jugador:", id);
				jugadorId = id; // Asigna el ID a la variable global
			});
		} else {
			console.error("Error al unirse al juego");
		}
	});
}

/**
 * Envía el mokepon seleccionado al servidor y devuelve una promesa
 * que se resuelve con la posición inicial segura asignada por el servidor.
 * @param {Mokepon} mascotaJugadorObjeto - El objeto del mokepon del jugador.
 * @returns {Promise<{x: number, y: number}|null>} - Promesa con las coordenadas iniciales o null si falla.
 */
async function seleccionarMokepon(mascotaJugadorObjeto) {
	try {
		const res = await fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ mokepon: mascotaJugadorObjeto }),
		});

		if (res.ok) {
			const posicion = await res.json();
			console.log("Posición inicial recibida del servidor:", posicion);
			return posicion; // Devuelve { x, y }
		} else {
			console.error("Error al seleccionar el mokepon en el servidor");
			return null;
		}
	} catch (error) {
		console.error("Error de conexión al seleccionar mokepon:", error);
		return null;
	}
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
					actualizarEnemigos(enemigos);
				});
			}
		})
		.catch((error) => {
			// No mostramos error en consola para no saturar si el servidor se reinicia
		});
}
