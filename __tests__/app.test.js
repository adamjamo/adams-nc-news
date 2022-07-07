const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data");
const db = require("../db/connection.js");
const request = require("supertest");
const app = require("../db/app.js");
const sorted = require("jest-sorted");
beforeEach(() => seed(data));

afterAll(() => db.end());

describe("GET /api/topics", () => {
  describe("Happy Paths", () => {
    test("200 message: returns topics objects in an array", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics).toHaveLength(3);
          topics.forEach((topic) => {
            expect(topic).toHaveProperty("description");
            expect(topic).toHaveProperty("slug");
            expect(topics.length).toBe(3);
          });
        });
    });
    describe("Error Handling", () => {
      test("404 message: Returns 404 error if path is invalid", () => {
        return request(app)
          .get("/api/topiiicccaaaanna")
          .expect(404)
          .then(({ body: { message } }) => {
            expect(message).toBe("Path not found");
          });
      });
    });
  });
});

describe("GET /api/articles", () => {
  describe("Happy Paths", () => {
    test("Responds with an object containing a key of articles with array of articles", () => {
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
});

describe("GET /api/articles/:article_id", () => {
  describe("Happy Paths", () => {
    test("Responds with the article by ID", () => {
      const article_id = 3;
      return request(app)
        .get(`/api/articles/${article_id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual({
            article_id: 3,
            title: "Eight pug gifs that remind me of mitch",
            topic: "mitch",
            author: "icellusedkars",
            body: "some gifs",
            created_at: "2020-11-03T09:12:00.000Z",
            votes: 0,
            comment_count: "2",
          });
        });
    });
    test("Responds with article including comment count when article has no comments", () => {
      const article_id = 8;
      return request(app)
        .get(`/api/articles/${article_id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual({
            article_id: 8,
            title: "Does Mitch predate civilisation?",
            topic: "mitch",
            author: "icellusedkars",
            body: "Archaeologists have uncovered a gigantic statue from the dawn of humanity, and it has an uncanny resemblance to Mitch. Surely I am not the only person who can see this?!",
            created_at: "2020-04-17T01:08:00.000Z",
            votes: 0,
            comment_count: "0",
          });
        });
    });
    test("Arranges articles in date order", () => {
      return request(app)
        .get(`/api/articles`)
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSorted("created_at", {
            descending: true,
          });
        });
    });

    describe("Error Handling", () => {
      test("404 message: Returns 404 error if article doesn't exist", () => {
        const article_id = 13;
        return request(app)
          .get(`/api/articles/${article_id}`)
          .expect(404)
          .then(({ body: { message } }) => {
            expect(message).toEqual("Article not found!");
          });
      });
      test("400 message: Returns 400 error if data type is incorrect", () => {
        const article_id = "abc";
        return request(app)
          .get(`/api/articles/${article_id}`)
          .expect(400)
          .then(({ body: { message } }) => {
            expect(message).toBe("Invalid data type, must be a number!");
          });
      });
    });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  describe("Happy Paths", () => {
    test("Responds with an array of comments for the given article_id containing comment_id, votes, created_at, author and body", () => {
      const article_id = 3;
      return request(app)
        .get(`/api/articles/${article_id}/comments`)
        .expect(200)
        .then(({ body }) => {
          console.log(body, "IS THIS HERE?????");
          expect(body.comments).toEqual([
            {
              article_id: 3,
              author: "icellusedkars",
              body: "git push origin master",
              comment_id: 10,
              created_at: "2020-06-20T07:24:00.000Z",
              votes: 0,
            },
            {
              article_id: 3,
              author: "icellusedkars",
              body: "Ambidextrous marsupial",
              comment_id: 11,
              created_at: "2020-09-19T23:10:00.000Z",
              votes: 0,
            },
          ]);
        });
    });
  });
  describe("Error Handling", () => {
    test("Responds with 404 error if passed and invalid path", () => {
      const article_id = 3;
      return request(app)
        .get(`/api/articles/${article_id}/efgfds`)
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toEqual("Path not found");
        });
    });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  describe("Happy Paths", () => {
    test("status:200, updates article votes with a plus amount", () => {
      const voteUpdate = {
        inc_votes: 1,
      };
      const article_id = 3;
      return request(app)
        .patch(`/api/articles/${article_id}`)
        .send(voteUpdate)
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual({
            article_id: 3,
            title: "Eight pug gifs that remind me of mitch",
            topic: "mitch",
            author: "icellusedkars",
            body: "some gifs",
            created_at: "2020-11-03T09:12:00.000Z",
            votes: 1,
          });
        });
    });
    test("status:200, updates article votes with a minus amount", () => {
      const voteUpdate = {
        inc_votes: -1,
      };
      const article_id = 3;
      return request(app)
        .patch(`/api/articles/${article_id}`)
        .send(voteUpdate)
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual({
            article_id: 3,
            title: "Eight pug gifs that remind me of mitch",
            topic: "mitch",
            author: "icellusedkars",
            body: "some gifs",
            created_at: "2020-11-03T09:12:00.000Z",
            votes: -1,
          });
        });
    });
    describe("Error Handling", () => {
      test("status:400, responds with an error message when passed a bad user ID", () => {
        const voteUpdate = {
          inc_votes: "abc",
        };
        const article_id = 2;
        return request(app)
          .patch(`/api/articles/${article_id}`)
          .send(voteUpdate)
          .expect(400)
          .then(({ body: { message } }) => {
            expect(message).toBe("Invalid data type, must be a number!");
          });
      });
      test("status:400, responds with an error message if passed an empty object", () => {
        const voteUpdate = {};
        const article_id = 2;
        return request(app)
          .patch(`/api/articles/${article_id}`)
          .send(voteUpdate)
          .expect(400)
          .then(({ body: { message } }) => {
            expect(message).toBe("Empty input");
          });
      });

      test("400 message: Returns 400 error if given incorrect data type in voteUpdate", () => {
        const voteUpdate = {
          inc_votes: "Ten",
        };
        const article_id = 2;
        return request(app)
          .patch(`/api/articles/${article_id}`)
          .send(voteUpdate)
          .expect(400)
          .then(({ body: { message } }) => {
            expect(message).toEqual("Invalid data type, must be a number!");
          });
      });
      test("404 message: Returns 404 error if article ID doesn't exist", () => {
        const voteUpdate = {
          inc_votes: 2,
        };
        const article_id = 9999;
        return request(app)
          .patch(`/api/articles/${article_id}`)
          .send(voteUpdate)
          .expect(404)
          .then(({ body: { message } }) => {
            expect(message).toEqual("Article ID not found!");
          });
      });
    });
  });
});

describe("GET USERS", () => {
  test("Responds with an array of objects containing users", () => {
    return request(app)
      .get(`/api/users`)
      .expect(200)
      .then(({ body }) => {
        expect(body.users).toHaveLength(4);
        body.users.forEach((user) => {
          expect.objectContaining({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
});
