function seleccionarMokepon(mascotaJugadorObjeto) {
	fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ mokepon: mascotaJugadorObjeto }),
	}).then((res) => {
		if (res.ok) {
			res.json().then((data) => {
				console.log(data.mensaje);
			});
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
		body: JSON.stringify({ x, y }), // Se envían las coordenadas
	})
		.then((res) => {
			if (res.ok) {
				res.json().then(({ enemigos }) => {
					// MENSAJE CORREGIDO: Ahora muestra las coordenadas que se envían.
					console.log(
						`Posición enviada -> X: ${Math.round(x)}, Y: ${Math.round(y)}`
					);

					// La lógica para manejar a los enemigos sigue aquí para el futuro,
					// cuando necesites dibujar a los otros jugadores en el mapa.
					// Puedes descomentar la siguiente línea para ver sus datos en la consola.
					// console.log("Datos de enemigos recibidos:", enemigos);
				});
			}
		})
		.catch((error) => {
			console.error("Error al enviar la posición:", error);
		});
}
