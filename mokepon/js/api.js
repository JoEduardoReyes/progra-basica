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
		console.log(res);
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
