init();
var mainUrl = 'http://51.15.236.80:4000';
var baseUrl = 'http://www.thestusmart.com/';

function init() {
  toasterOptions();
}

function toasterOptions() {
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
}

function verificationcode() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < 7; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function signup(form) {
  var myfirstname = form.firstNameField.value;
  var mylastname = form.lastNameField.value;
  var myemail = form.emailField.value;
  var mypassword = form.passwordField.value;
  var myconfirmpassword = form.confirmPasswordField.value;
  var myverificationcode=verificationcode();
  console.log(myverificationcode);
  if (mypassword != myconfirmpassword) {
    toastr.error("Passwords does not match");
    return;
  }
  var params = JSON.stringify({
    email: myemail,
    password: mypassword,
    firstname: myfirstname,
    lastname: mylastname,
    verificationcode:myverificationcode
  })
  var request = new XMLHttpRequest();
  request.open('POST', mainUrl + '/api/register', true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);
    if (data.success) {
      window.location.href = 'login_student.html';
    } else {
      toastr.error(data.message);
    }
  }
  request.send(params);
}

function sendCode(code, email){

}
