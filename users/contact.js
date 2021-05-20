function checkoutFunction() {
    const UserModel2 = require('./model2')
    const newUser2 = new UserModel2({
        class: 'History'
    })

    newUser2
        .save()
        .then((document)=>{
            if(document){
                res.sendFile(path.join(process.cwd() + '/login.html'))
            }else{
                res.send('document did not save')
            }
        })
        .catch((err)=>{
            console.log(err)
            res.send('Error 1 happened')
        })
}

//function checkoutFunction() {
//  //document.getElementById("demo").innerHTML = document.getElementById("checkout2").innerHTML;
//  var MongoClient = require('mongodb').MongoClient;
//  var url = "mongodb+srv://${username}:${password}@notetaking2.7q2bv.mongodb.net/notetaking2?retryWrites=true&w=majority";
//  MongoClient.connect(url, function(err, db) {
//    if (err) throw err;
//    var dbo = db.db("notetaking2");
//    var myquery = { _id: ObjectId("609febd5fdee49001544da54") };
//    var newvalues = { $set: { firstName: "jarred" } };
//    dbo.collection("notetaking2.users").updateOne(myquery, newvalues, function(err, res) {
//    if (err) throw err;
//   console.log("1 document updated");
//    db.close();
//    });
//    });
//  }
//document.getElementById("checkout22").addEventListener("click", function() {
//  document.getElementById("demo").innerHTML = "Hello World";
//});

//const selectElement = document.querySelector('#checkout2');

//selectElement.addEventListener('change', (event) => {
//  const result = document.querySelector('#demo');
//  result.textContent = `You like ${event.target.value}`;
//});

//Nodemailer
//const form = document.getElementById("contact-form");

//const formEvent = form.addEventListener("submit", (event) => {
//  event.preventDefault();
//  let mail = new FormData(form);
//  sendMail(mail);
//});

//const sendMail = (mail) => {
//  fetch("https://notetaking12.herokuapp.com/public/send", {
//    method: "post",
//    body: mail,
//  }).then((response) => {
//    return response.json();
//  });
//};
//Nodemailer