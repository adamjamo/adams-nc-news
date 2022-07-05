// const connection = require("./connection.js");

const express = require("express");
const { getTopics } = require("./controllers/topics_controllers.js");
const app = express();

app.use(express.json());
app.get("/api/topics", getTopics);

app.use("*", (req, res) => {
  res.status(404).send({ message: "Path not found" });
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: "server error" });
});

module.exports = app;
