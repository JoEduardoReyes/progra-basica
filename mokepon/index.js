const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.send("Hola, este es mi primer servidor con Node.js");
});

app.listen(8080, () => {
	console.log("Server is running on port 8080");
});
