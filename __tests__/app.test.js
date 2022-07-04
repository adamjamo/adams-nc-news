const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data");
const db = require("../db/connection.js");
const request = require("supertest");
const app = require("../db/app.js");
beforeEach(() => seed(data));
//console.log(shopData + "this is shop data");
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
