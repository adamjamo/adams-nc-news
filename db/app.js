const express = require("express");
const {
  getTopics,
  getArticles,
  getArticlesById,
  patchArticleVotesById,
  getUsers,
  getArticlesCommentsById,
  postComment,
} = require("./controllers/controllers.js");
const {
  serverError,
  invalidPath,
  stringInsteadOfNum,
  customError,
  emptyPatch,
  noUser,
  noArticleId,
  failingSchema,
} = require("./errors.js");
const app = express();

app.use(express.json());
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticlesById);
app.get("/api/articles/:article_id/comments", getArticlesCommentsById);
app.patch("/api/articles/:article_id", patchArticleVotesById);
app.get("/api/users", getUsers);
app.post("/api/articles/:article_id/comments", postComment);

app.use(customError);
app.use(emptyPatch);
app.use(failingSchema);
app.use(noArticleId);
app.use(noUser);
app.use(stringInsteadOfNum);
app.use(invalidPath);
app.use(serverError);

module.exports = app;
