\c nc_news

SELECT articles.* , COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments on comments.article_id = articles.article_id GROUP BY articles.article_id