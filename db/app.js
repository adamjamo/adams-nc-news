// const connection = require("./connection.js");

const express = require("express");
const {
  getTopics,
  getArticles,
  getArticlesById,
  patchArticleVotesById,
} = require("./controllers/topics_controllers.js");
const app = express();

app.use(express.json());
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticlesById);
app.patch("/api/articles/:article_id", patchArticleVotesById);

app.use((err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "Invalid ID" });
  } else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.code === "23502") {
    res.status(400).send({ message: "Empty input" });
  } else next(err);
});

app.use("*", (req, res) => {
  res.status(404).send({ message: "Path not found" });
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: "server error" });
});

module.exports = app;
