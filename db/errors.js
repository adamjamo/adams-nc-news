const res = require("express/lib/response");

exports.customError = (err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else next(err);
};

exports.emptyPatch = (err, req, res, next) => {
  if (err.code === "23502" && Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "Empty input" });
  } else next(err);
};

exports.failingSchema = (err, req, res, next) => {
  if (err.code === "23502" && Object.keys(req.body).length > 1) {
    res
      .status(400)
      .send({ message: "failing Schema, please check your inputs" });
  } else next(err);
};

exports.noArticleId = (err, req, res, next) => {
  if (err.code === "23503" && err.constraint === "comments_article_id_fkey") {
    res.status(404).send({ message: "Article ID not found!" });
  } else next(err);
};

exports.noUser = (err, req, res, next) => {
  if (err.code === "23503" && err.constraint === "comments_author_fkey") {
    res.status(404).send({ message: "Username does not exist" });
  } else next(err);
};

exports.stringInsteadOfNum = (err, req, res, next) => {
  if (err.code === "22P02" || err.code === "42601") {
    console.log(err, "STRINGINSTEADOFNUM");
    res.status(400).send({ message: "Invalid data type, must be a number!" });
  } else next(err);
};

exports.invalidPath = (req, res, next) => {
  res.status(404).send({ message: "Path not found" });
};

exports.serverError = (err, req, res, next) => {
  res.status(500).send({ message: "internal server error" });
};
