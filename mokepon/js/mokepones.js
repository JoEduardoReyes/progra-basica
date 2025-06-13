// --- CLASE PARA DEFINIR CADA ATAQUE ---
class Ataque {
	constructor(nombre, id, tipo) {
		this.nombre = nombre;
		this.id = id;
		this.tipo = tipo;
	}
}

// --- CLASE MOKEPON CON TIPO Y LISTA DE ATAQUES ---
class Mokepon {
	constructor(nombre, id, foto, tipo) {
		this.nombre = nombre;
		this.id = id;
		this.foto = foto;
		this.tipo = tipo;
		this.ataques = []; // Este array se llenará más adelante
		this.x = 20;
		this.y = 30;
		this.ancho = 80;
		this.alto = 80;
		this.mapaFoto = new Image();
		this.mapaFoto.src = foto;
		this.velocidadX = 0;
		this.velocidadY = 0;
	}
}

// --- BASE DE DATOS DE ATAQUES DISPONIBLES ---
const ATAQUES_DISPONIBLES = [
	// Ataques de Fuego
	new Ataque("Lanzallamas 🔥", "lanzallamas", "FUEGO"),
	new Ataque("Ascuas 🔥", "ascuas", "FUEGO"),
	new Ataque("Giro Fuego 🔥", "giro-fuego", "FUEGO"),
	new Ataque("Infierno 🔥", "infierno", "FUEGO"),
	new Ataque("Llamarada 🔥", "llamarada", "FUEGO"),
	// Ataques de Agua
	new Ataque("Pistola Agua 💧", "pistola-agua", "AGUA"),
	new Ataque("Hidrobomba 💧", "hidrobomba", "AGUA"),
	new Ataque("Burbuja 💧", "burbuja", "AGUA"),
	new Ataque("Surf 💧", "surf", "AGUA"),
	new Ataque("Rayo Burbuja 💧", "rayo-burbuja", "AGUA"),
	// Ataques de Tierra
	new Ataque("Terremoto 🌱", "terremoto", "TIERRA"),
	new Ataque("Fisura 🌱", "fisura", "TIERRA"),
	new Ataque("Avalancha 🌱", "avalancha", "TIERRA"),
	new Ataque("Bofetón Lodo 🌱", "bofeton-lodo", "TIERRA"),
	new Ataque("Disparo Lodo 🌱", "disparo-lodo", "TIERRA"),
	// Ataques de Pelea
	new Ataque("Golpe Kárate 🤜", "golpe-karate", "PELEA"),
	new Ataque("Patada Baja 🤜", "patada-baja", "PELEA"),
	new Ataque("Doble Patada 🤜", "doble-patada", "PELEA"),
	new Ataque("Sumisión 🤜", "sumision", "PELEA"),
	new Ataque("Golpe Cuerpo 🤜", "golpe-cuerpo", "PELEA"),
	// Ataques de Siniestro
	new Ataque("Mordisco 👹", "mordisco", "SINIESTRO"),
	new Ataque("Pulso Umbrío 👹", "pulso-umbrio", "SINIESTRO"),
	new Ataque("Finta 👹", "finta", "SINIESTRO"),
	new Ataque("Triturar 👹", "triturar", "SINIESTRO"),
	new Ataque("Buena Baza 👹", "buena-baza", "SINIESTRO"),
	// Ataques Normales
	new Ataque("Placaje 💪", "placaje", "NORMAL"),
	new Ataque("Arañazo 💪", "aranazo", "NORMAL"),
	new Ataque("Golpe Cabeza 💪", "golpe-cabeza", "NORMAL"),
	new Ataque("Hiperrayo 💪", "hiperrayo", "NORMAL"),
	new Ataque("Ataque Rápido 💪", "ataque-rapido", "NORMAL"),
	new Ataque("Látigo 💪", "latigo", "NORMAL"),
	new Ataque("Derribo 💪", "derribo", "NORMAL"),
];

// --- CONSTANTE CON TODOS LOS MOKEPONES DISPONIBLES ---
const MOKEPONES = [
	new Mokepon(
		"Hipodoge 💧",
		"hipodoge",
		"https://i.ibb.co/fddKdfNd/hipodoge.png",
		"AGUA"
	),
	new Mokepon(
		"Capipepo 🌱",
		"capipepo",
		"https://i.ibb.co/zhN3F0RD/capipepo.png",
		"TIERRA"
	),
	new Mokepon(
		"Ratigueya 🔥",
		"ratigueya",
		"https://i.ibb.co/Vp3NsXTN/ratigueya.png",
		"FUEGO"
	),
	new Mokepon(
		"Perrocoptero 🚁",
		"perrocoptero",
		"https://i.ibb.co/v6b4F3bX/perrocoptero.png",
		"NORMAL"
	),
	new Mokepon(
		"Gatosaurio 🦖",
		"gatosaurio",
		"https://i.ibb.co/NngH7Dyn/gatosaurio.png",
		"SINIESTRO"
	),
	new Mokepon(
		"Largartoño 🦎",
		"largartono",
		"https://i.ibb.co/3KRrZkh/lagartono.png",
		"PELEA"
	),
];

const VENTAJA_DE_TIPO = {
	FUEGO: ["TIERRA", "PELEA"],
	AGUA: ["FUEGO", "SINIESTRO"],
	TIERRA: ["AGUA", "NORMAL"],
	PELEA: ["SINIESTRO", "NORMAL"],
	SINIESTRO: ["FUEGO", "TIERRA"],
	NORMAL: ["AGUA", "PELEA"],
};

// --- FUNCIÓN PARA ASIGNAR ATAQUES A UN MOKEPON ---
function asignarAtaques(mokepon) {
	mokepon.ataques = [];
	const ataquesDeSuTipo = ATAQUES_DISPONIBLES.filter(
		(ataque) => ataque.tipo === mokepon.tipo
	);
	const ataquesDeOtrosTipos = ATAQUES_DISPONIBLES.filter(
		(ataque) => ataque.tipo !== mokepon.tipo
	);
	while (mokepon.ataques.length < 2) {
		const indiceAleatorio = Math.floor(Math.random() * ataquesDeSuTipo.length);
		const ataqueSeleccionado = ataquesDeSuTipo[indiceAleatorio];
		if (!mokepon.ataques.includes(ataqueSeleccionado)) {
			mokepon.ataques.push(ataqueSeleccionado);
		}
	}
	while (mokepon.ataques.length < 4) {
		const indiceAleatorio = Math.floor(
			Math.random() * ataquesDeOtrosTipos.length
		);
		const ataqueSeleccionado = ataquesDeOtrosTipos[indiceAleatorio];
		if (!mokepon.ataques.includes(ataqueSeleccionado)) {
			mokepon.ataques.push(ataqueSeleccionado);
		}
	}
}

// --- NUEVA FUNCIÓN PARA SELECCIONAR UN ENEMIGO ALEATORIO ---
// Esta función será llamada por canvas.js para obtener un oponente.
function obtenerEnemigoAleatorio(mascotaJugador) {
	// 1. Filtra la lista para no escoger al mismo Mokepon del jugador
	const enemigosPosibles = MOKEPONES.filter(
		(mokepon) => mokepon.id !== mascotaJugador.id
	);

	// 2. Escoge un índice aleatorio de la lista de posibles enemigos
	const indiceAleatorio = Math.floor(Math.random() * enemigosPosibles.length);
	const enemigoSeleccionado = enemigosPosibles[indiceAleatorio];

	// 3. Asigna una posición aleatoria en el mapa al enemigo
	// (Asumimos un tamaño de mapa de 800x600 por ahora)
	enemigoSeleccionado.x = Math.floor(Math.random() * 720); // 800 (ancho) - 80 (mokepon)
	enemigoSeleccionado.y = Math.floor(Math.random() * 520); // 600 (alto) - 80 (mokepon)

	// 4. Retorna el objeto del enemigo completamente listo para ser dibujado
	return enemigoSeleccionado;
}
