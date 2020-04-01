const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => res.send("yeet"));

app.listen(port, () => console.log("running on port 3000"));
