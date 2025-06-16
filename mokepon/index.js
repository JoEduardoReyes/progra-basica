const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const jugadores = [];

// La clase Jugador ahora almacena la posición directamente
class JUGADOR {
	constructor(id) {
		this.id = id;
		this.mokepon = null; // Se asignará más tarde
		this.x = 0;
		this.y = 0;
	}

	asignarMokepon(mokepon) {
		this.mokepon = mokepon;
	}

	actualizarPosicion(x, y) {
		this.x = x;
		this.y = y;
	}
}

// La clase Mokepon sigue siendo simple
class MOKEPON {
	constructor(nombre) {
		this.nombre = nombre;
	}
}

app.get("/unirse", (req, res) => {
	const id = `${Math.random()}`;
	const nuevoJugador = new JUGADOR(id);
	jugadores.push(nuevoJugador);
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.send(id);
});

// Este endpoint no necesita cambios, está bien
app.post("/mokepon/:jugadorId", (req, res) => {
	const { jugadorId } = req.params;
	const mokeponElegido = req.body.mokepon.nombre;
	const mokepon = new MOKEPON(mokeponElegido);

	const jugadorIndex = jugadores.findIndex((j) => j.id === jugadorId);

	if (jugadorIndex >= 0) {
		jugadores[jugadorIndex].asignarMokepon(mokepon);
		console.log(`Mokepon asignado al jugador ${jugadorId}:`, mokepon.nombre);
		res.status(200).send({ mensaje: "Mokepon elegido correctamente" });
	} else {
		res.status(404).send({ mensaje: "Jugador no encontrado" });
	}
});

// --- RUTA CORREGIDA Y MÁS ROBUSTA ---
// Esta es la función que recibe la posición y la actualiza
app.post("/mokepon/:jugadorId/posicion", (req, res) => {
	const { jugadorId } = req.params;
	const { x, y } = req.body;

	const jugadorIndex = jugadores.findIndex((j) => j.id === jugadorId);

	// Si el jugador no existe, no continuamos
	if (jugadorIndex === -1) {
		return res.status(404).send({ mensaje: "Jugador no encontrado" });
	}

	// Actualizamos la posición del jugador encontrado
	jugadores[jugadorIndex].actualizarPosicion(x, y);

	// Verificamos si el mokepon existe ANTES de usarlo
	const nombreMokepon = jugadores[jugadorIndex].mokepon?.nombre;
	if (nombreMokepon) {
		console.log(
			`El ${nombreMokepon} del jugador ${jugadorId} se está moviendo a X: ${x}, Y: ${y}`
		);
	}

	// Envía las posiciones de los enemigos (esto es para el futuro multijugador)
	const enemigos = jugadores.filter((j) => j.id !== jugadorId);
	res.send({ enemigos });
});

app.listen(8080, () => {
	console.log("Servidor corriendo en el puerto 8080");
});
