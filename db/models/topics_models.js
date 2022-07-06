const db = require("../connection.js");

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((results) => {
    return results.rows;
  });
};

exports.fetchArticles = () => {
  return db
    .query(
      `
  SELECT articles.* , 
  COUNT(comments.article_id) AS comment_count 
  FROM articles
  LEFT JOIN comments on comments.article_id = articles.article_id 
  GROUP BY articles.article_id;`
    )
    .then((results) => {
      return results.rows;
    });
};

exports.fetchArticlesById = (article_id) => {
  return db
    .query(
      `
    SELECT articles.* , 
    COUNT(comments.article_id) AS comment_count 
    FROM articles
    LEFT JOIN comments on comments.article_id = articles.article_id
    WHERE articles.article_id = $1 
    GROUP BY articles.article_id`,
      [article_id]
    )
    .then((result) => {
      if (!result.rows[0]) {
        return Promise.reject({
          status: 404,
          message: `Article not found!`,
        });
      }

      return result.rows[0];
    });
};

exports.updateArticleVotesById = ({ article_id, increase }) => {
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *",
      [increase, article_id]
    )
    .then(({ rows }) => {
      if (!rows[0]) {
        return Promise.reject({
          status: 404,
          message: "Article ID not found!",
        });
      }
      return rows[0];
    });
};

exports.fetchUsers = () => {
  return db.query(`SELECT * FROM users;`).then((results) => {
    return results.rows;
  });
};
