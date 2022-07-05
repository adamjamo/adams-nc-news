const {
  fetchTopics,
  fetchArticles,
  fetchArticlesById,
} = require("../models/topics_models.js");

exports.getTopics = (req, res, next) => {
  fetchTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

exports.getArticles = (req, res) => {
  console.log("inside controller");
  fetchArticles().then((articles) => {
    return res.status(200).send({ articles });
  });
};

exports.getArticlesById = (req, res) => {
  const { article_id } = req.params;
  fetchArticlesById(article_id).then((article) => {
    res.status(200).send({ articles: article });
  });
};
