const express = require('express')
const bodyParser = require('body-parser')
//start new session stuff
const session = require('express-session')
//end new session stuff
const mongoose = require('mongoose')
const app = express()
var path = require('path')
const passport = require('./auth')

const PORT = process.env.PORT || 4000

const noteRoutes = require('./notes/routes')
const userRoutes = require('./users/routes')

const { username, password } = process.env

console.log(username)
console.log(username)

mongoose.connect(`mongodb+srv://${username}:${password}@notetaking2.7q2bv.mongodb.net/notetaking2?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})

//start new session stuff
app.use(session({
    secret: 'some secret',
    //cookie: {maxAge: 30000},
    saveUninitialized: true,
    resave: false
}))
app.use(passport.initialize())
app.use(passport.session())
//end new session stuff

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname)))
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'index.html'))
})

app.use('/notes', noteRoutes)
app.use('/users', userRoutes)

app.listen(PORT, ()=>{
    console.log(`The app is running on http://localhost:${PORT}`)
})

//Nodemailer
const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  let mail = new FormData(form);
  sendMail(mail);
});

const sendMail = (mail) => {
  fetch("https://notetaking12.herokuapp.com/send", {
    method: "post",
    body: mail,
  }).then((response) => {
    return response.json();
  });
};
//Nodemailer