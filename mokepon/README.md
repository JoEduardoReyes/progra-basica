# 🎮 Mokepon - Versión 4.0: El Mundo Interactivo

![Hecho con JS](https://img.shields.io/badge/Hecho%20con-Vanilla%20JS-yellow)
![HTML + CSS](https://img.shields.io/badge/Frontend-HTML%2BCSS-blue)
![Estado](https://img.shields.io/badge/Versión-4.0-blueviolet)
![Progreso](https://img.shields.io/badge/Estado-En%20Progreso-orange)

---

## 🗺️ ¡Bienvenido al Mundo Interactivo de Mokepon!

**Mokepon** ha evolucionado. Esta es la **Versión 4.0**, una reconstrucción fundamental que transforma el juego de una simple arena de combate a un mundo explorable. La introducción de `canvas` de HTML5 y una arquitectura de código completamente modular le dan una nueva dimensión al proyecto, sentando las bases para funcionalidades aún más complejas.

Ahora, no solo eliges a tu mascota; la guías a través de un mapa para encontrar a tu oponente antes de que comience la verdadera batalla.

---

## 🧠 ¿Qué hay de nuevo en la v4.0?

Esta versión introduce cambios masivos en la estructura y la jugabilidad:

- **Mundo Interactivo con Canvas**: Se ha añadido una nueva fase de juego. Ahora puedes mover a tu Mokepon por un mapa utilizando los botones en pantalla o las flechas del teclado, buscando a tu oponente.
- **Arquitectura de Código Modular**: El monolítico archivo `mokepon.js` ha sido dividido en tres módulos especializados, mejorando drásticamente la organización y mantenibilidad:
  - `js/mokepones.js`: Contiene todas las definiciones de datos (clases de `Mokepon` y `Ataque`, listas de criaturas, tabla de tipos).
  - `js/canvas.js`: Gestiona toda la lógica del mapa, incluyendo el movimiento del jugador, la creación de enemigos y la detección de colisiones.
  - `js/batalla.js`: Se enfoca exclusivamente en la lógica del combate por turnos una vez que ocurre una colisión.
- **Sistema de Combate Avanzado**: La batalla ya no es un simple piedra-papel-tijera. Se ha implementado un sistema de ventajas de tipo, asignación de ataques aleatorios y una lógica de resolución de rondas que incluye "Golpes Críticos" para desempates.
- **Sistema de Tipos Completo**: Se han añadido 3 nuevos tipos (`PELEA`, `SINIESTRO`, `NORMAL`) y se ha creado una tabla de ventajas balanceada para asegurar batallas justas y estratégicas.

> ¡Esta versión transforma Mokepon en una experiencia de mini-RPG, con exploración y un combate más profundo!

---

## 🕹️ Jugabilidad

El flujo del juego ha cambiado completamente:

1.  **Selecciona** tu Mokepon de la lista.
2.  **Explora** el mapa moviendo a tu personaje.
3.  **Encuentra** a tu oponente y choca con él para iniciar el combate.
4.  **Lucha** en una batalla estratégica por turnos, usando los 4 ataques únicos asignados a tu Mokepon.
5.  ¡Derrota a tu oponente y corónate como el campeón Mokepon!

---

## 📁 Archivos

La estructura del proyecto ahora es más profesional:

- `mokepon.html`: La estructura principal de la aplicación.
- `styles/styles.css`: La hoja de estilos unificada que da vida al juego.
- `js/`:
  - `mokepones.js`: La base de datos y definiciones del juego.
  - `canvas.js`: El motor del mapa interactivo.
  - `batalla.js`: El cerebro del sistema de combate.

---

## 🚀 Cómo Jugar Localmente

1.  Clona el repositorio:
    ```bash
    git clone [https://github.com/JoEduardoReyes/progra-basica.git](https://github.com/JoEduardoReyes/progra-basica.git)
    ```
2.  Navega a la carpeta del proyecto:
    ```bash
    cd progra-basica/mokepon
    ```
3.  Abre `mokepon.html` en tu navegador.

---

## ✨ Características

- 🐾 **Selección Dinámica de Mascotas**: La interfaz se genera desde un objeto JS.
- 🗺️ **Mapa Explorable con Canvas**: Controla a tu personaje con teclado o botones.
- 💥 **Detección de Colisiones**: El encuentro con enemigos inicia la batalla.
- ⚔️ **Sistema de Tipos Avanzado**: 6 tipos y una tabla de ventajas balanceada.
- 🎲 **Ataques Aleatorios**: Cada Mokepon recibe un set de 4 ataques únicos en cada partida.
- 🍀 **Lógica de "Golpe Crítico"**: Resuelve enfrentamientos neutrales con un factor de suerte.
- 🎨 **UI Estilo Pokémon**: Un diseño nostálgico para mejorar la experiencia.
- 🔁 **Reiniciar y Volver a Jugar**: Salta de nuevo a la acción en cualquier momento.

---

## 🧩 Próximas Versiones

| Versión | Características Planeadas                     | Estado            |
| :------ | :-------------------------------------------- | :---------------- |
| 3.0     | Renderizado Dinámico y Refactor de Código     | ✅ Completado     |
| **4.0** | **Canvas, Modularización y Combate Mejorado** | ✅ **Completado** |
| 5.0     | Backend multijugador con Node.js              | 🔜 Próximamente   |

## 📜 Licencia

Este proyecto es parte de mi viaje de aprendizaje personal y se publica con fines educativos. ¡Siéntete libre de bifurcarlo o construir sobre él!

Hecho con enfoque, pasión y JavaScript escalable por **JoEduardoReyes** 🚀
