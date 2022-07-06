const express = require("express");
const {
  getTopics,
  getArticles,
  getArticlesById,
  patchArticleVotesById,
  getUsers,
} = require("./controllers/controllers.js");
const {
  serverErr,
  invalidPath,
  stringInsteadOfNum,
  customError,
  emptyPatch,
} = require("./errors.js");
const app = express();

app.use(express.json());
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticlesById);
app.patch("/api/articles/:article_id", patchArticleVotesById);
app.get("/api/users", getUsers);

app.use(customError);
app.use(emptyPatch);
app.use(stringInsteadOfNum);
app.use(invalidPath);
app.use(serverErr);
module.exports = app;
