const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const jugadores = [];

class JUGADOR {
	constructor(id) {
		this.id = id;
	}
	asignarMokepon(mokepon) {
		this.mokepon = mokepon;
	}
}

class MOKEPPON {
	constructor(nombre) {
		this.nombre = nombre;
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

app.post("/mokepon/:jugadorId", (req, res) => {
	const jugadorId = req.params.jugadorId;
	const mokeponElegido = req.body.mokepon.nombre;
	const mokepon = new MOKEPPON(mokeponElegido);
	console.log(`Jugador ID: ${jugadorId}, Mokepon Elegido:`, mokeponElegido);

	const jugadorIndex = jugadores.findIndex((j) => j.id === jugadorId);

	if (jugadorIndex >= 0) {
		jugadores[jugadorIndex].asignarMokepon(mokepon);
		console.log(`Mokepon asignado al jugador ${jugadorId}:`, mokepon.nombre);
		res.status(200).send({ mensaje: "Mokepon elegido correctamente" });
	} else {
		res.status(404).send({ mensaje: "Jugador no encontrado" });
	}
});

app.listen(8080, () => {
	console.log("Server is running on port 8080");
});
