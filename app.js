require('dotenv').config()
const express = require('express')
const {connectToDb} = require("./db")
const authRouter = require("./routes/auth")
const passport = require('passport')
const bodyParser = require('body-parser')
const articleRoute = require('./routes/articles')

const app = express()
const PORT = process.env.PORT || 8080


require('./authentication/auth')

//  CONNECTING TO DATABASE INSTANCE
connectToDb()

// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(passport.session())

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

// app.set('views', 'views');
// app.set('view engine', 'ejs');

// // renders the login page
// app.get('/login', (req, res) => {
//     res.render('login');
// });

// // renders the signup page
// app.get('/signup', (req, res) => {
//     res.render('signup');
// });
// // render home page
// app.get('/', (req, res) => {
//     res.render('home')
// })


app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
});

module.exports = app;
