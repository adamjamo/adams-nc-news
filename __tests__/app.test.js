const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data");
const db = require("../db/connection.js");
const request = require("supertest");
const app = require("../db/app.js");
beforeEach(() => seed(data));

afterAll(() => db.end());

describe("NC News Topics", () => {
  test("200 message: returns topics objects in an array", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body: { topics } }) => {
        topics.forEach((topic) => {
          expect(topic).toHaveProperty("description");
          expect(topic).toHaveProperty("slug");
          expect(topics.length).toBe(3);
        });
      });
  });
  test("404 message: Returns 404 error if path is invalid", () => {
    return request(app)
      .get("/api/topiiicccaaaanna")
      .expect(404)
      .then(({ body: { message } }) => {
        expect(message).toBe("Path not found");
      });
  });
});

describe("GET:/api/articles", () => {
  test("responds with an object containing a key of articles with array of articles", () => {
    return request(app)
      .get(`/api/articles`)
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(12);
        body.articles.forEach((article) => {
          expect.objectContaining({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(Number),
            author: expect.any(String),
            body: expect.any(String),
            created_At: expect.any(Number),
            votes: expect.any(Number),
          });
        });
      });
  });
});

describe("2. GET /api/articles/:article_id", () => {
  test("responds with article by ID", () => {
    const article_id = 3;
    return request(app)
      .get(`/api/articles/${article_id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toEqual({
          article_id: 3,
          title: "Eight pug gifs that remind me of mitch",
          topic: "mitch",
          author: "icellusedkars",
          body: "some gifs",
          created_at: "2020-11-03T09:12:00.000Z",
          votes: 0,
        });
      });
  });
  test("responds with article by ID", () => {
    const article_id = 4;
    return request(app)
      .get(`/api/articles/${article_id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toEqual({
          article_id: 4,
          title: "Student SUES Mitch!",
          topic: "mitch",
          author: "rogersop",
          body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
          created_at: "2020-05-06T01:14:00.000Z",
          votes: 0,
        });
      });
  });
});
