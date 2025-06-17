// Archivo: index.js (Servidor)

const express = require("express");
const cors = require("cors");

const app = express();

// --- CONSTANTES GLOBALES ---
const MAP_WIDTH = 800;
const MAP_HEIGHT = 740;
const MOKEPON_WIDTH = 80;
const MOKEPON_HEIGHT = 80;

// --- Middlewares ---
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

// Almacenamiento en memoria de los jugadores
const jugadores = [];

class Jugador {
	constructor(id) {
		this.id = id;
		this.mokepon = null;
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

// --- FUNCIÓN DE UTILIDAD PARA COLISIONES ---
function verificarColision(jugadorA, jugadorB) {
	// Solo verificar si ambos jugadores ya eligieron un mokepon
	if (!jugadorA.mokepon || !jugadorB.mokepon) return false;

	const arribaA = jugadorA.y;
	const abajoA = jugadorA.y + jugadorA.mokepon.alto;
	const derechaA = jugadorA.x + jugadorA.mokepon.ancho;
	const izquierdaA = jugadorA.x;

	const arribaB = jugadorB.y;
	const abajoB = jugadorB.y + jugadorB.mokepon.alto;
	const derechaB = jugadorB.x + jugadorB.mokepon.ancho;
	const izquierdaB = jugadorB.x;

	// Lógica de colisión AABB (Axis-Aligned Bounding Box)
	const hayColision =
		izquierdaA < derechaB &&
		derechaA > izquierdaB &&
		arribaA < abajoB &&
		abajoA > arribaB;

	return hayColision;
}

// --- ENDPOINTS DE LA API ---

app.get("/unirse", (req, res) => {
	const id = `${Math.random()}`;
	const nuevoJugador = new Jugador(id);
	jugadores.push(nuevoJugador);
	res.send(id);
});

app.post("/mokepon/:jugadorId", (req, res) => {
	const { jugadorId } = req.params;
	const { mokepon } = req.body;

	const jugadorIndex = jugadores.findIndex((j) => j.id === jugadorId);

	if (jugadorIndex !== -1) {
		const jugadorActual = jugadores[jugadorIndex];
		jugadorActual.asignarMokepon(mokepon);

		// --- LÓGICA CENTRAL: Encontrar una posición segura ---
		let x, y;
		let hayColision;

		do {
			hayColision = false;
			x = Math.floor(Math.random() * (MAP_WIDTH - MOKEPON_WIDTH));
			y = Math.floor(Math.random() * (MAP_HEIGHT - MOKEPON_HEIGHT));

			// Creamos un objeto temporal con la nueva posición para la verificación
			const jugadorTemporal = { ...jugadorActual, x, y };

			// Iteramos sobre los otros jugadores para verificar si la posición generada colisiona
			for (const otroJugador of jugadores) {
				if (otroJugador.id !== jugadorId) {
					if (verificarColision(jugadorTemporal, otroJugador)) {
						hayColision = true;
						console.log(
							`Colisión detectada en [${x}, ${y}]. Buscando nueva posición...`
						);
						break; // Si hay colisión, salimos para generar nuevas coordenadas
					}
				}
			}
		} while (hayColision);

		// Asignamos la posición segura encontrada
		jugadorActual.x = x;
		jugadorActual.y = y;

		console.log(`Posición segura asignada a ${jugadorId}: [${x}, ${y}]`);

		// Devolvemos la posición segura al cliente
		res.send({ x, y });
	} else {
		res.status(404).send({ mensaje: "Jugador no encontrado" });
	}
});

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
	const { jugadorId } = req.params;
	const { x, y } = req.body;

	const jugadorIndex = jugadores.findIndex((j) => j.id === jugadorId);

	if (jugadorIndex !== -1) {
		jugadores[jugadorIndex].actualizarPosicion(x, y);
		const enemigos = jugadores.filter((j) => j.id !== jugadorId && j.mokepon);
		res.send({ enemigos });
	} else {
		res.status(404).send({ mensaje: "Jugador no encontrado" });
	}
});

app.listen(8080, () => {
	console.log("Servidor de Mokepon corriendo en http://localhost:8080");
});
