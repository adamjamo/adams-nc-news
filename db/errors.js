const res = require("express/lib/response");

exports.customError = (err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else next(err);
};

exports.stringInsteadOfNum = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "Invalid data type, must be a number!" });
  } else next(err);
};

exports.emptyPatch = (err, req, res, next) => {
  console.log(err);
  if (err.code === "23502") {
    res.status(400).send({ message: "Empty input" });
  } else next(err);
};

exports.invalidPath = (req, res) => {
  res.status(404).send({ message: "Path not found" });
};

exports.serverErr = (err, req, res, next) => {
  res.status(500).send({ message: "Server error" });
};
