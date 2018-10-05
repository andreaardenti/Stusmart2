var mainUrl = 'https://thestusmart.com/developer';
function contact(form) {
  var myname = form.nameField.value;
  var myemail = form.emailField.value;
  var mysubject = form.subjectField.value;
  var mymessage = form.messageField.value;
  var params = JSON.stringify({
    email: myemail,
    name: myname,
    subject: mysubject,
    message: mymessage
  })
  var request = new XMLHttpRequest();
  request.open('POST', mainUrl + '/api/contact', true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);
    if (data.success) {
      toastr.success(data.message);
    } else {
      toastr.error(data.message);
    }
  }
  request.send(params);
}
