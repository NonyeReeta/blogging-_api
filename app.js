require('dotenv').config()
const express = require('express')
const {connectToDb} = require("./db")
const authRouter = require("./routes/auth")
const passport = require('passport')
const bodyParser = require('body-parser')
const articleRoute = require('./routes/articles')
// importing cors
const cors = require('cors')

const app = express()
const PORT = 3000

// TO HANDLE CORS ERROR
app.use(cors({
    origin: 'http://localhost:4200'
}))


require('./authentication/auth')

//  CONNECTING TO DATABASE INSTANCE
connectToDb()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', authRouter);
app.use('articles/:email/create', passport.authenticate('jwt', { session: false }), articleRoute)
app.use('articles/search/:arg', passport.authenticate('jwt', { session: false }), articleRoute)
app.use('articles/sort/read_count', passport.authenticate('jwt', { session: false }), articleRoute)
app.use('articles/:email/:title/edit', passport.authenticate('jwt', { session: false }), articleRoute)
app.use('articles/:email/user-page', passport.authenticate('jwt', { session: false }), articleRoute)
app.use('articles/:email/user-page/draft', passport.authenticate('jwt', { session: false }), articleRoute)
app.use('articles/:email/user-page/published', passport.authenticate('jwt', { session: false }), articleRoute)
app.use('articles/:email/:title/delete', passport.authenticate('jwt', { session: false }), articleRoute)
app.use('/articles', articleRoute)
app.use('/articles/:email/state/:title', articleRoute)

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
});

module.exports = app;
