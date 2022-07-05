// const connection = require("./connection.js");

const express = require("express");
const {
  getTopics,
  getArticles,
  getArticlesById,
} = require("./controllers/topics_controllers.js");
const app = express();

app.use(express.json());
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticlesById);

app.use("*", (req, res) => {
  res.status(404).send({ message: "Path not found" });
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: "server error" });
});

module.exports = app;
