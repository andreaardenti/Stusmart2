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


function verify(form) {
  var userid = Cookies.get('id');
  var myverificationcode = form.verificationcode.value;
  console.log(myverificationcode);
  var params = JSON.stringify({
    emailverified: true,
    verificationcode: myverificationcode
  })
  var request = new XMLHttpRequest();
  request.open('PUT', mainUrl + '/api/verify/' + userid, true);
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
