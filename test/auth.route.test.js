const supertest = require('supertest')
const authRoute = require('../routes/auth')
const userModel = require('../models/users')
const {connectToDb} = require("../db");

// afterEach(() => {
// jest.useRealTimers();

// })

beforeAll(async () => {
    // Connect to a Mongo DB
connectToDb()
  });

jest.useFakeTimers();


describe("POST /login", () => {
    it('POST /login works', async () => {
        const testUser = {
            email: 'test@email.com',
            password: '12345'
        };
        const response = await supertest(authRoute).post('/login').send(testUser);
        const user = await userModel.findOne({email: testUser.email})
        expect(user.email).to.equal('test@email.com')
        expect(user.password).toBeTruthy()
    })

    it('POST /signup works', async () => {
        const testUser = {
            email: 'test@email.com',
            firstname: "test",
            lastname: "Name",
            password: '12345'
        };
        const response = await supertest(authRoute).post('/signup').send(testUser);
        const user = await userModel.findOne({email: testUser.email})
        expect(response.status).toBe(200);
        expect(response.body.email).toBe('test@email.com');
        done()
    
    })
})
