const supertest = require('supertest')
const articleRoute = require('../routes/articles')
const {connectToDb} = require("../db")


beforeAll(async () => {
   connectToDb()
  });

describe('GET /articles', () => {
    it("get all articles works", async () => {
        const response = await supertest(articleRoute).get("/articles");
        expect(response.headers["content-type"]).toBe("application/json");
        expect(response.status).toBe(200);
        done()
    })
})