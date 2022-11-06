const request = require('supertest')
const userModel = require('../models/users')
const app = require('../app')
const {connectToDb} = require('../db')



describe('Auth', () => {
    beforeAll( () => {
        connectToDb()
    })

    it('signup a new user', async () => {
        
        const response = await request(app).post('/signup').send({
            // using a new email before each test since email is unique
            email: 'testsix@email.com', // next email value = testseven@email.com',
            firstName: "Test",
            lastName: "Name",
            password: '12345'
        });
        console.log(response.body)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token');
        
    }, 20000)

    it('POST /login works', async () => {
        const testUser = {
            email: 'testemail@email.com',
            password: '12345'
        };
        const user = await userModel.findOne({email: testUser.email});
        const response = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({
            email: user.email,
            password: testUser.password
        });
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')

    }, 20000)
    
})
