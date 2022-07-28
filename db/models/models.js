const db = require("../connection.js");

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((results) => {
    return results.rows;
  });
};

exports.fetchArticles = async (
  sort_by = "created_at",
  order = "DESC",
  topic
) => {
  const sortedOptions = [
    "created_at",
    "title",
    "article_id",
    "author",
    "topic",
    "body",
    "votes",
  ];

  if ((order !== "DESC") & (order !== "ASC")) {
    return Promise.reject({
      status: 404,
      message: "Must be ASC or DESC order",
    });
  }
  if (sortedOptions.includes(sort_by) === false) {
    return Promise.reject({ status: 404, message: "Sorting option invalid" });
  }

  const topicArr = [];

  let str = `SELECT articles.* , COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments on comments.article_id = articles.article_id `;

  if (topic) {
    const articleCheck = await db.query(
      `SELECT * FROM articles WHERE articles.topic = $1;`,
      [topic]
    );
    const topicCheck = await db.query(
      `SELECT * FROM topics WHERE topics.slug = $1;`,
      [topic]
    );

    if (articleCheck.rows.length === 0 && topicCheck.rows.length >= 1) {
      return articleCheck.rows;
    }
    if (articleCheck.rows.length === 0 && topicCheck.rows.length === 0) {
      return Promise.reject({ status: 404, message: "Article ID not found!" });
    } else {
      str += `WHERE articles.topic = $1 `;
      topicArr.push(topic);
    }
  }

  str += `GROUP BY articles.article_id ORDER BY articles.${sort_by} ${order};`;

  return db.query(str, topicArr).then((results) => {
    return results.rows;
  });
};

//////////////////////////////////////////////////////////

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
          message: "Article ID not found!",
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

exports.fetchArticlesComments = (article_id) => {
  return db
    .query(
      `
  SELECT * FROM comments
  WHERE article_id = $1
  
  ;`,
      [article_id]
    )
    .then((results) => {
      return results.rows;
    });
};

exports.insertComment = (username, body, id) => {
  return db
    .query(
      `INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *;`,
      [body, username, id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removeComment = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [
      comment_id,
    ])
    .then((results) => {
      return results.rows[0];
    });
};
