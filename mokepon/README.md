# 🎮 Mokepon - Version 3.0

![Made with JS](https://img.shields.io/badge/Made%20with-Vanilla%20JS-yellow)
![HTML + CSS](https://img.shields.io/badge/Frontend-HTML%2BCSS-blue)
![Status](https://img.shields.io/badge/Version-3.0-brightgreen)
![Progress](https://img.shields.io/badge/Completed-100%25-success)

---

## 🔥🌱💧 Welcome to the Dynamic Arena!

**Mokepon** is a browser-based mini-game inspired by classic turn-based monster battles. This is **Version 3.0**, where the game's architecture gets a major upgrade. We've moved from static HTML to a dynamic system where creatures are rendered directly from JavaScript, making the game scalable and easier to expand.

The roster has grown! Now featuring new creatures like **Perrocoptero, Gatosaurio, and Largartoño**.

---

## 🧠 What's New in v3.0?

- **Dynamic Creature Rendering**: The pet selection screen is now generated automatically from a JavaScript object (`MASCOTAS_DATA`). This means adding new Mokepons is as simple as adding a new entry to the object, with no HTML changes needed.
- **Expanded Roster**: More creatures have joined the battle, each with its unique set of attacks.
- **Object-Oriented Structure**: The code has been refactored using `Classes` for `Mascota` and `Ataque`, making the logic cleaner, more modular, and easier to maintain.
- **Centralized Configuration**: A new `CONFIG` object holds key game settings (like starting lives), making it easy to tweak game balance.

> This version focuses on smart code architecture, transforming the game into a scalable and easily expandable project!

---

## 🕹️ Gameplay

- Choose your pet from an expanding, dynamically-generated list.
- Battle using fire, water, or earth attacks.
- Face a random enemy in each match.
- The first player to reduce the opponent’s lives to zero wins.

---

## 📁 Files

- `mokepon.html`: The core HTML structure, now with a dynamic container for the pets.
- `mokepon.js`: The heart of the game, containing all logic, creature data, and the new dynamic rendering functions.
- `mokepon.css`: All styles for the game, including the Pokémon-inspired theme.

---

## 🚀 How to Play Locally

1.  Clone the repository:
    ```bash
    git clone [https://github.com/JoEduardoReyes/progra-basica.git](https://github.com/JoEduardoReyes/progra-basica.git)
    ```
2.  Navigate to the project folder:
    ```bash
    cd progra-basica/mokepon
    ```
3.  Open `mokepon.html` in your browser.

---

## ✨ Features

- 🐾 **Dynamic Pet Selection**: Radio buttons and labels are generated from a JS object.
- 🔥 **Element-Based Attacks**: A classic fire, water, and earth combat system.
- 📜 **Live Battle Log**: See the results of each round in the messages panel.
- 🎨 **Pokémon-Style UI**: A nostalgic design to enhance the gaming experience.
- 🔁 **Restart and Replay**: Jump back into the action anytime.

---

## 🧩 Upcoming Versions

| Version | Planned Features                         | Status           |
| :------ | :--------------------------------------- | :--------------- |
| 2.0     | Styled version with CSS + layout         | ✅ Completed     |
| **3.0** | **Dynamic JS Rendering & Code Refactor** | ✅ **Completed** |
| 4.0     | Responsive design + animations           | 🔄 In progress   |
| 5.0     | Multiplayer backend with Node.js         | 🔜 Coming soon   |

## 📜 License

This project is part of my personal educational journey and is released for learning purposes. Feel free to fork or build on it!

Made with focus, passion, and scalable JS by **JoEduardoReyes** 🚀
