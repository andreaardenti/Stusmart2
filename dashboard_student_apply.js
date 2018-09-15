var baseUrl = 'http://www.thestusmart.com/';
var mainUrl = 'https://thestusmart.com/developer';
var studentid = Cookies.get('id');


paceOptions = {
  // Disable the 'elements' source
  elements: false,

  // Only show the progress on regular and ajax-y page navigation,
  // not every request
  restartOnRequestAfter: false
}
console.log(studentid);
if (!Cookies.get('id')) {
  window.location.href = 'login_student.html'
}


NProgress.start();
getStudentInfo();

function getStudentInfo() {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://thestusmart.com/developer/api/users/' + studentid, true);
  request.onload = function() {

    NProgress.done();
    console.log(data);
    var data = JSON.parse(this.response);
    if (data.success) {
      var fullName = data.message.firstname + ' ' + data.message.lastname
      document.getElementById('stName').innerHTML = fullName;
    }
  }
  request.send();
}

function logOut() {
  Cookies.remove('id');
  Cookies.remove('token');
  Cookies.remove('subjectid');
  window.location.href = 'login_student.html';
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
};
