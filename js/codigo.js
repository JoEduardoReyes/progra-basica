function aleatorio(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function eleccion(jugada) {
	switch (jugada) {
		case 1:
			return "Piedra 🪨";
		case 2:
			return "Papel 🧻";
		case 3:
			return "Tijera ✂️";
		default:
			return "MAL ELEGIDO";
	}
}

// Variables de puntuación
let triunfos = 0;
let perdidas = 0;

// Juego al mejor de 5 (primero en llegar a 3 gana)
while (triunfos < 3 && perdidas < 3) {
	// 1 es piedra, 2 es papel, 3 es tijera
	let pc = aleatorio(1, 3);
	let jugador = parseInt(
		prompt("Elige: 1 para piedra, 2 para papel, 3 para tijera")
	);

	alert("PC elige: " + eleccion(pc));
	alert("Tu eliges: " + eleccion(jugador));

	// Combate de la ronda
	if (pc == jugador) {
		alert("EMPATE 😲");
	} else if (
		(jugador == 1 && pc == 3) ||
		(jugador == 2 && pc == 1) ||
		(jugador == 3 && pc == 2)
	) {
		alert("GANASTE LA RONDA 🎊");
		triunfos = triunfos + 1;
	} else {
		alert("PERDISTE LA RONDA 🥲");
		perdidas = perdidas + 1;
	}

	// Mostrar marcador actual (solo si el juego no ha terminado)
	if (triunfos < 3 && perdidas < 3) {
		alert("Marcador: Tú " + triunfos + " - " + perdidas + " PC");
	}
}

// Alerts de victoria/derrota definitiva
if (triunfos == 3) {
	alert(
		"🏆 ¡VICTORIA DEFINITIVA! 🏆\n¡Felicidades! Ganaste el mejor de 5\nMarcador final: " +
			triunfos +
			" - " +
			perdidas
	);
} else {
	alert(
		"💀 DERROTA DEFINITIVA 💀\n¡La PC te venció!\nMarcador final: " +
			triunfos +
			" - " +
			perdidas
	);
}
