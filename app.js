require('dotenv').config()
const express = require('express')
const {connectToDb} = require("./db")
const authRouter = require("./routes/auth")
const passport = require('passport')
// const connectEnsureLogins = require('connect-ensure-login')
const bodyParser = require('body-parser')
const session = require('express-session')
const articleRoute = require('./routes/articles')

const app = express()
const PORT = process.env.PORT || 8080


// app.use(session({
//     secret: '7861',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: true,
//       maxAge: 3000000 *60
//     },
//   }))


//   passport.serializeUser(function(user, done) {
//     done(null, user);
//   });
  
//   passport.deserializeUser(function(user, done) {
//     done(null, user);
//   });


require('./authentication/auth')

//  CONNECTING TO DATABASE INSTANCE
connectToDb()

// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(passport.session())

app.use('/', authRouter);
app.use('articles/:email/create', passport.authenticate('jwt', { session: false }), articleRoute)
app.use('articles/:email/edit', passport.authenticate('jwt', { session: false }), articleRoute)
app.use('articles/:email/user-page', passport.authenticate('jwt', { session: false }), articleRoute)
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