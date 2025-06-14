const express = require("express");

const app = express();

const jugadores = [];

class JUGADOR {
	constructor(id) {
		this.id = id;
	}
}

app.get("/unirse", (req, res) => {
	const id = `${Math.random()}`;
	const nuevoJugador = new JUGADOR(id);
	jugadores.push(nuevoJugador);
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST");
	res.send(id);
});

app.listen(8080, () => {
	console.log("Server is running on port 8080");
});
