document.getElementById("#checkout").addEventListener("click", function() {
  document.getElementById("#demo").innerHTML = "Hello World";
});

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