require('dotenv').config()
const express = require('express')
const {connectToDb} = require("./db")
const ArticleRoute = require("./routes/articles")
const authRouter = require("./routes/auth")
const passport = require('passport')
// const connectEnsureLogins = require('connect-ensure-login')
const bodyParser = require('body-parser')
// const session = require('express-session')
const userModel = require('./models/users')
const articleRoute = require('./routes/articles')


require('./authentication/auth')

const app = express()
const PORT = process.env.PORT || 8080

//  CONNECTING TO DATABASE INSTANCE
connectToDb()

// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', authRouter);
app.use('/create', passport.authenticate('jwt', { session: false }), articleRoute)
app.use('/edit', passport.authenticate('jwt', { session: false }), articleRoute)
app.use('/delete', passport.authenticate('jwt', { session: false }), articleRoute)
app.use('/articles', articleRoute)

app.set('views', 'views');
app.set('view engine', 'ejs');

// renders the login page
app.get('/login', (req, res) => {
    res.render('login');
});

// renders the signup page
app.get('/signup', (req, res) => {
    res.render('signup');
});
// render home page
app.get('/', (req, res) => {
    res.render('home')
})


app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
});