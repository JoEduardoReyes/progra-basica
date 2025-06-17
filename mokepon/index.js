const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const jugadores = [];

class JUGADOR {
	constructor(id) {
		this.id = id;
		this.mokepon = null;
		// La posición inicial se asigna aleatoriamente para evitar que aparezcan en el mismo lugar
		this.x = Math.floor(Math.random() * 720); // Ancho del mapa - ancho del mokepon
		this.y = Math.floor(Math.random() * 520); // Alto del mapa - alto del mokepon
	}

	asignarMokepon(mokepon) {
		this.mokepon = mokepon;
	}

	actualizarPosicion(x, y) {
		this.x = x;
		this.y = y;
	}
}

// La clase Mokepon ya no es necesaria aquí, ya que recibimos el objeto completo del cliente.

app.get("/unirse", (req, res) => {
	const id = `${Math.random()}`;
	const nuevoJugador = new JUGADOR(id);
	jugadores.push(nuevoJugador);
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.send(id);
});

// Endpoint para asignar Mokepon
app.post("/mokepon/:jugadorId", (req, res) => {
	const { jugadorId } = req.params;
	// Recibimos el objeto completo del mokepon desde el cliente
	const mokepon = req.body.mokepon;

	const jugadorIndex = jugadores.findIndex((j) => j.id === jugadorId);

	if (jugadorIndex >= 0) {
		jugadores[jugadorIndex].asignarMokepon(mokepon);
		console.log(`Mokepon asignado al jugador ${jugadorId}:`, mokepon.nombre);
		res.status(200).send({ mensaje: "Mokepon elegido correctamente" });
	} else {
		res.status(404).send({ mensaje: "Jugador no encontrado" });
	}
});

// Endpoint para recibir y enviar posiciones
app.post("/mokepon/:jugadorId/posicion", (req, res) => {
	const { jugadorId } = req.params;
	const { x, y } = req.body;

	const jugadorIndex = jugadores.findIndex((j) => j.id === jugadorId);

	if (jugadorIndex >= 0) {
		jugadores[jugadorIndex].actualizarPosicion(x, y);

		// Filtramos para enviar a todos los jugadores MENOS al actual.
		// Solo enviamos los que ya han elegido un Mokepon.
		const enemigos = jugadores.filter((j) => j.id !== jugadorId && j.mokepon);

		// Enviamos el array de enemigos (puede estar vacío)
		res.send({ enemigos });
	} else {
		res.status(404).send({ mensaje: "Jugador no encontrado" });
	}
});

app.listen(8080, () => {
	console.log("Servidor multijugador corriendo en el puerto 8080");
});
