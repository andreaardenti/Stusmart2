var studentid = Cookies.get('id');
var token = Cookies.get('token');
var noteid = Cookies.get('noteid');
var baseUrl = 'http://www.thestusmart.com/';
var mainUrl = 'http://178.128.53.38:4000';



NProgress.start();

function logOut() {
  Cookies.remove('id');
  Cookies.remove('token');
  Cookies.remove('subjectid');
  window.location.href = 'login_student.html';
}
getStudentInfo();

function getStudentInfo() {

  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/users/' + studentid, true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);
    if (data.success) {
      var fullName = data.message.firstname + ' ' + data.message.lastname
      isPremium = data.message.isPremium;
      document.getElementById('stName').innerHTML = fullName;
    }
  }
  request.send();
}
