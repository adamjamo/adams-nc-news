const {
  fetchTopics,
  fetchArticles,
  fetchArticlesById,
  updateArticleVotesById,
  fetchUsers,
  fetchArticlesComments,
} = require("../models/models.js");

exports.getTopics = (req, res, next) => {
  fetchTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

exports.getArticles = (req, res) => {
  fetchArticles().then((articles) => {
    return res.status(200).send({ articles });
  });
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleVotesById = (req, res, next) => {
  const { article_id } = req.params;
  const votes = req.body;
  const increase = votes.inc_votes;
  updateArticleVotesById({ article_id, increase })
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsers = (req, res) => {
  fetchUsers()
    .then((users) => {
      return res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticlesCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticlesComments(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
