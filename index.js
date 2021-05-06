const express = require('express')
const bodyParser = require('body-parser')
//start new session stuff
const session = require('express-session')
//end new session stuff
const mongoose = require('mongoose')

const app = express()
var path = require('path')
const passport = require('./auth')

const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const cors = require("cors");
require("dotenv").config();

app.use(cors({ origin: "*" }));

const PORT = process.env.PORT || 4000

const noteRoutes = require('./notes/routes')
const userRoutes = require('./users/routes')

const { username, password } = process.env
const { EMAIL, PASS } = process.env

console.log(username)
console.log(password)
console.log(EMAIL)
console.log(PASS)

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

//app.use("/public", express.static(process.cwd() + "/public")); //make public static

//EMAIL = amdcolraine777@gmail.com,
//PASS = Christopher/1933/AMDG

const transporter = nodemailer.createTransport({
  service: "smtp.live.com",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

//Index page (static HTML)
//app.route("/").get(function (req, res) {
//  res.sendFile(process.cwd() + "/public/contact.html");
//});
//Nodemailer

app.post("/public/send", (req, res) => {
    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
      console.log(fields);
      Object.keys(fields).forEach(function (property) {
        data[property] = fields[property].toString();
      });
      console.log(data);
      const mail = {
        sender: `${data.sender} <${data.senderEmail}>`,
        to: process.env.EMAIL, // receiver email,
        subject: data.senderAge,
        text: `${data.sender} <${data.senderEmail}> \n${data.message}`,
      };
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong.");
        } else {
          res.status(200).send("Email successfully sent to recipient!");
        }
      });
    });
  });

app.listen(PORT, ()=>{
    console.log(`The app is running on http://localhost:${PORT}`)
})