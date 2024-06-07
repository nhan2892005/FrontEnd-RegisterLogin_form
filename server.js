if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
};
// Description: Main server file for the application
const express = require('express')
const bcrypt = require('bcrypt')
var path = require('path');
const app = express()
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport');// Passport
const initializePassport = require('./passport-config');// Passport
initializePassport(
    passport, 
    email => users.find(user => user.email === email), 
    id => users.find(user => user.id === id)
)

// Port
const port = 3001

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session
({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
// End of Middleware

// Users
var users = []

//Login
app.post('/login', passport.authenticate('local', {
    successRedirect: '/newpage',
    failureRedirect: '/',
    failureFlash: true
}));
// end of Login

// Register
app.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.regpassword, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.reguser,
            email: req.body.regemail,
            password: hashedPassword
        })
        res.redirect('/')
    } catch {
        console.log(e)
        res.redirect('/')
    }
    console.log(users)
})
// End of Register

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
// End of View Engine

//Routes
app.get('/', (req, res) => {
  res.render('index.ejs')
})
app.get('/newpage', (req, res) => {
    res.render('newpage.ejs')
});
// End of Routes

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})