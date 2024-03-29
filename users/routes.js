const router = require('express').Router()
const UserModel = require('./model')
const UserModel2 = require('./model2')
const bcrypt = require('bcryptjs')
const Chance = require('chance')
const chance = new Chance()
var path = require('path')
const passport = require('../auth')
const nodemailer = require("nodemailer")

router.post('/checkout', (req, res, next)=>{
    const newUser2 = new UserModel2({
        class1: req.body.class1,
        class2: req.body.class2,
        email: req.session.email
    })

    newUser2
        .save()
        .then((document)=>{
            if(document){
                res.sendFile(path.join(process.cwd() + '/thank-you.html'))
            }else{
                res.send('document did not save')
            }
        })
        .catch((err)=>{
            console.log(err)
            res.send('Error 1 happened')
        })
    
})

router.get('/dashboard', (req, res)=>{
    //res.render(path.join(__dirname, 'dashboard.html'))
    //res.sendFile(path.join(process.cwd() + '/dashboard.html'))
    //res.render('dashboard')
    //var middleName = "Colin"
    //res.render('dashboard', {middleName: middleName})
    //res.render('dashboard', {firstName: req.body.firstName})
    res.render('dashboard', {email: req.session.email})
})

router.post('/thankyou', (request, response)=>{
    console.log('I got a request');
    const data = request.body.innerHTML;

let transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: 'amdcolraine777@gmail.com',
pass: 'Christopher/1933/AMDG'
}
});
let mailOptions = {
from: 'amdcolraine777@gmail.com',
to: 'amdcolraine777@gmail.com',
subject: 'These are the choices',
//You can pass HTML as well. In order to pass html replace text with html.
html: `<html>${JSON.stringify(data)}</html>`
};

transporter.sendMail(mailOptions, function(error, info){
if (error) {
console.log(error);
} else {
console.log('Email sent: ' + info.response);
}
});
return response.json("Success");
})
    //jsonString = req.body.jsonString
    //res.render('thankyou', {
      //  jsonString: jsonString
      //})
    //    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    //    { name: 'Tux', organization: "Linux", birth_year: 1996},
    //    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    //  ];
    //var tagline = "No programming concept is complete without a cute animal mascot.";
    //var jsonString = sessionStorage.getItem("jsonString");
    
    //res.render(path.join(__dirname, 'dashboard.html'))
    //res.sendFile(path.join(process.cwd() + '/dashboard.html'))
    //res.render('dashboard')
    //var middleName = "Colin"
    //res.render('dashboard', {middleName: middleName})
    //res.render('dashboard', {firstName: req.body.firstName})
    //res.render('dashboard', {email: req.session.email})
    //res.render('thankyou', {email: req.session.email})
    
    //res.render('thankyou', {jsonString: jsonString})
    //res.render('thankyou', {
    //    mascots: mascots,
    //    tagline: tagline
    //  });


router.post('/login',
    passport.authenticate('local-login'),
    (req, res) => {
    res.redirect('/users/dashboard')
    }
    //loginInputValidation,
    //findUser,
    //checkPassword,
    //giveAccess

    //start new session stuff
    //(req, res) => {
    //    const {email, password} = req.body
    //    if(email && password) {
    //        if(req.session.authenticated) {
    //            res.json(req.session)
    //        } else {
    //            if (password === '123') {
    //                res.session.authenticated = true
    //                req.session.user = {
    //                    email, password
    //                }
    //                res.json(req.session)
    //            } else { 
    //                res.status(403).json({msg: 'Bad Credentials'})
    //            }
    //        }
    //    } else res.status(403).json({msg: 'Bad Credentials'})
    //}
    //end new session stuff
    )


router.post('/register',
registerinputValidation,
isEmailRegistered,
//hashPassword,
(req, res, next)=>{
    console.log(req.body.password)
    const newUser = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        class: "Art"
    })

    newUser
        .save()
        .then((document)=>{
            if(document){
                document.password = undefined
                //res.json(document)
                res.sendFile(path.join(process.cwd() + '/login.html'))
            }else{
                res.send('document did not save')
            }
        })
        .catch((err)=>{
            console.log(err)
            res.send('Error 1 happened')
        })
})

router.get('/:id', (req, res, next)=>{
    UserModel
    .findById(req.params.id)
    .then((result)=>{
        if(!result){
            res
                .status(404)
                .send('User not found')
        }else{
            result.password = undefined
            res.json(result)
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send('Error 2 happened')
    })
})

function registerinputValidation(req, res, next){
    const{firstName,lastName, email, password} = req.body
    const missingFields = []

    if(!firstName){
        missingFields.push('firstName')
    }
    if(!lastName){
        missingFields.push('lastName')
    }
    if(!email){
        missingFields.push('email')
    }
    if(!password){
        missingFields.push('password')
    }
    if(missingFields.length){
        res
            .status(400)
            .send(`The following fields are missing: ${missingFields.join(' ')}`)
    }else{
        next()
    }
}

function isEmailRegistered(req, res, next){
    const {email} = req.body
    UserModel.findOne({email})
        .then((result)=>{
            if(result){
                res
                    .status(400)
                    .send(`${email} is already registered`)
            }else{
                next()
            }
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).send('Error 3 happened')
        })
}

function hashPassword(req, res,next){
    const { password } = req.body
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, passwordHash) {
        if(err){
            res.status(500).send('err')
        }else{
            req.body.password = passwordHash
            next()
        }
    });
});
}

function loginInputValidation(req, res, next){
    const{email, password} = req.body
    const missingFields = []

    if(!email){
        missingFields.push('email')
    }
    if(!password){
        missingFields.push('password')
    }
    if(missingFields.length){
        res
            .status(400)
            .send(`The following fields are missing: ${missingFields.join(' ')}`)
    }else{
        next()
    }
}

function findUser(req, res, next){
    const {email} = req.body
    UserModel
    .findOne({ email: email})
    .then((userDocument)=>{
        if(!userDocument){
            res
                .status(404)
                .send(`${email} is not registered`)
        }else{
            req.userDocument = userDocument
            next()
        }
    })
    .catch((err)=>{
        console.log(err)
        res
            .status(500)
            .send('Error 4 happened')
    })
}

function checkPassword(req, res, next){
    const hashPassword = req.userDocument.password
    const { password } = req.body
    bcrypt.compare(password, hashPassword, function(err, isPasswordCorrect) {
        if(err){
            console.log(err)
            res.status(500).send('Error 5 happened')
        }else if(isPasswordCorrect){
            next()
        }else{
            res.status(400).send('Password is incorrect')
        }
    })
}

function giveAccess(req, res, next){
    const accessToken = chance.guid()
    req.userDocument.accessToken = accessToken
    req.userDocument
        .save()
        .then((result)=>{
            if(result){
                //res.send(accessToken)
                //res.sendFile(path.join(__dirname + '/6053a783b5ea260015d74bcf'))
                //window.location.href = "https://ogilviejerome.herokuapp.com/users/6053a783b5ea260015d74bcf"
                //res.redirect('/users/6053a783b5ea260015d74bcf')
                //res.redirect('/users/' + req.params['id'])
                //var UserId = objectToInsert._id
                //res.redirect('/users/' + attr[_id])
                //res.redirect(__dirname)
                //res.redirect('/users/' + UserId)

                //res.redirect('/users/dashboard')
                //res.redirect('/users/dashboard?firstName='+firstName)
                res.redirect('/users/dashboard')
            }else{
                res
                    .staus(400)
                    .send('Error')
            }
        })
        .catch((err)=>{
            console.log(err)
            res
                .status(500)
                .send('Error 6 happened')
        })
    }

module.exports = router