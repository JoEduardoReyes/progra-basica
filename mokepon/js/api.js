function seleccionarMokepon(mascotaJugadorObjeto) {
	fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		// Enviamos el objeto completo del mokepon
		body: JSON.stringify({ mokepon: mascotaJugadorObjeto }),
	}).then((res) => {
		if (res.ok) {
			console.log("Mokepon seleccionado y enviado al servidor.");
		} else {
			console.error("Error al seleccionar el mokepon");
		}
	});
}
function unirseAlJuego() {
	fetch("http://localhost:8080/unirse").then(function (res) {
		if (res.ok) {
			res.text().then(function (id) {
				console.log("ID del jugador:", id);
				jugadorId = id;
			});
		} else {
			console.error("Error al unirse al juego");
		}
	});
}

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
					dibujarEnemigos(enemigos);
				});
			}
		})
		.catch((error) => {
			console.error("Error al enviar la posición:", error);
		});
}
