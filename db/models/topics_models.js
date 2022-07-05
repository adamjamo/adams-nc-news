const db = require("../connection.js");

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((results) => {
    return results.rows;
  });
};

exports.fetchArticles = () => {
  return db.query(`SELECT * FROM articles;`).then((results) => {
    return results.rows;
  });
};

// exports.fetchArticlesById = (article_id) => {
//   return db
//     .query(
//       `

//   SELECT *
// FROM articles
// WHERE articles.article_id = $1
//   `[article_id]
//     )
//     .then(({ rows, rowCount }) => {
//       if (rowCount === 0) {
//         return Promise.reject({
//           status: 404,
//           errorMessage: "article ${article_id} does not exist",
//         });
//       }
//       return rows[0];
//     });
// };

exports.fetchArticlesById = (article_id) => {
  console.log(article_id, "<<<< article_id");
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then((result) => {
      return result.rows[0];
    });
};
