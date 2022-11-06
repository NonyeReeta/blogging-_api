const request = require('supertest')
const app = require('../app')
const userModel = require('../models/users')
const articleModel = require('../models/articles')
const {connectToDb} = require('../db')

describe('articles', () => {
  beforeAll( () => {
    connectToDb()
})

// afterAll(async () => {
//    await connectToDb()
// })

it("should return all articles", async () => {
  const response = await request(app).get('/articles').set('content-type', 'application/json')
  expect(response.status).toBe(200);
  const isPublished = response.body.map((article) => article.state === 'published')
  expect(isPublished).toBeTruthy()
}, 20000)

it("should return an article", async () => {
  const testTitle = "Python"
  const response = await request(app).get(`/articles/article/${testTitle}`).set('content-type', 'application/json')
  const isPublished = response.body.state === 'published'
expect(response.status).toBe(200);
expect(isPublished).toBeTruthy()
expect(isPublished).toBeTruthy()
}, 20000)


it("should return the searched article", async () => {
  const testTitle = "Python"
  const response = await request(app).get(`/articles/search/${testTitle}`).set('content-type', 'application/json')
  const isPublished = response.body.state === 'published'
expect(response.status).toBe(200);
// expect(isPublished).toBeTruthy()
// expect(isPublished).toBeTruthy()
}, 20000)

it("should return published articles sorted by read_count in decending order", async () => {
  const response = await request(app).get('/articles/sort/read_count').set('content-type', 'application/json')
  expect(response.status).toBe(200);
  if(response.body.length > 1) {
    const isGreater = response.body[0].read_count >= response.body[1].read_count;
    expect(isGreater).toBeTruthy()
  }
}, 20000)

it("should return published articles sorted by read_time in decending order", async () => {
  const response = await request(app).get('/articles/sort/reading_time').set('content-type', 'application/json')
  expect(response.status).toBe(200);
  if(response.body.length > 1) {
    const isGreater = response.body[0].reading_time >= response.body[1].reading_time;
    expect(isGreater).toBeTruthy()
  }
}, 20000)

it("should return published articles sorted by timestamp in decending order", async () => {
  const response = await request(app).get('/articles/sort/timestamp').set('content-type', 'application/json')
  expect(response.status).toBe(200);
  if(response.body.length > 1) {
    const isGreater = response.body[0].timestamp >= response.body[1].timestamp;
    expect(isGreater).toBeTruthy()
  }
}, 20000)

it('should return all articles by logged in user', async () => {
  const testUser = {
    email: 'testemail@email.com',
    password: '12345'
};
const user = await userModel.findOne({email: testUser.email});
const loginResponse = await request(app)
.post('/login')
.set('content-type', 'application/json')
.send({
    email: user.email,
    password: testUser.password
});
const token = loginResponse.body.token
const response = await request(app).get(`/articles/${testUser.email}/user-page?secret_token=${token}`).set('content-type', 'application/json')
expect(response.status).toBe(200)
}, 20000)

it('should return all draft articles by logged in user', async () => {
  const testUser = {
    email: 'testemail@email.com',
    password: '12345'
};
const user = await userModel.findOne({email: testUser.email});
const loginResponse = await request(app)
.post('/login')
.set('content-type', 'application/json')
.send({
    email: user.email,
    password: testUser.password
});
const token = loginResponse.body.token
const response = await request(app).get(`/articles/${testUser.email}/user-page/draft/?secret_token=${token}`).set('content-type', 'application/json')
expect(response.status).toBe(200)
}, 20000)

it('should return all published articles by logged in user', async () => {
  const testUser = {
    email: 'testemail@email.com',
    password: '12345'
};
const user = await userModel.findOne({email: testUser.email});
const loginResponse = await request(app)
.post('/login')
.set('content-type', 'application/json')
.send({
    email: user.email,
    password: testUser.password
});
const token = loginResponse.body.token
const response = await request(app).get(`/articles/${testUser.email}/user-page/published/?secret_token=${token}`).set('content-type', 'application/json')
expect(response.status).toBe(200)
}, 20000)

it('logged user should be able to create an article', async () => {
  const testUser = {
    email: 'testemail@email.com',
    password: '12345'
};
const user = await userModel.findOne({email: testUser.email});
const loginResponse = await request(app)
.post('/login')
.set('content-type', 'application/json')
.send({
    email: user.email,
    password: testUser.password
});
const token = loginResponse.body.token

const response = await request(app).post(`/articles/${testUser.email}/create/?secret_token=${token}`).set('content-type', 'application/json').send({
  tags: "python, data analysis",
  description: 'Duis at fermentum nulla. Nunc mollis enim porttitor est porttitor, vitae pulvinar elit mollis. ',
  body: 'Curabitur ac tristique tortor, ac ornare neque. Mauris fringilla a ante et mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur bibendum, nibh vel sollicitudin tincidunt, ex felis lacinia mauris, eget dignissim quam lorem ut libero. Etiam placerat nulla sed laoreet accumsan. Cras quis dapibus ligula. Fusce lectus enim, auctor a posuere a, tempus at justo. Cras vel molestie enim. Pellentesque sodales eget dolor sed convallis. In ornare id lorem in convallis. Maecenas ultrices semper quam. Vivamus sed leo vel ante feugiat aliquam ut ut metus.',
  title: 'Test1',
})
expect(response.status).toBe(200)
}, 60000)

it('should edit an article', async () => {
  const testTitle = 'Test1'
 const newArticle = {
  title: testTitle,
  description: 'Duis at fermentum nulla. Nunc mollis enim porttitor est porttitor',
  body: 'aaDuis at fermentum nulla. Nunc mollis enim porttitor est porttitor',
  tags: 'tag1 rag2'
 }
  const testUser = {
    email: 'testemail@email.com',
    password: '12345'
};
const user = await userModel.findOne({email: testUser.email});
const loginResponse = await request(app)
.post('/login')
.set('content-type', 'application/json')
.send({
    email: user.email,
    password: testUser.password
});
const token = loginResponse.body.token

const response = await request(app).put(`/articles/${testUser.email}/${testTitle}/edit/?secret_token=${token}`).set('content-type', 'application/json').send(newArticle)
expect(response.status).toBe(200)
}, 20000)

it('should delete an article', async () => {
  const testUser = {
    email: 'testemail@email.com',
    password: '12345'
};
  const user = await userModel.findOne({email: testUser.email});  
  const loginResponse = await request(app)
  .post('/login')
  .set('content-type', 'application/json')
  .send({
      email: user.email,
      password: testUser.password
  });
  const token = loginResponse.body.token

  const response = await request(app).delete(`/articles/${testUser.email}/Test1/delete/?secret_token=${token}`).set('content-type', 'application/json')
  expect(response.status).toBe(200)
  }, 20000)

})