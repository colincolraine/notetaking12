//Nodemailer
const router = require('express').Router()
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

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

router.post("/send", (req, res) => {
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