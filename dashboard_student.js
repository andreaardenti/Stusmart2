var studentid = Cookies.get('id');
var token = Cookies.get('token');
var baseUrl = 'http://www.thestusmart.com/';

console.log(studentid);
if (!studentid) {
  window.location.href = 'login_student.html'
}



function logOut() {
  Cookies.remove('id');
  Cookies.remove('token');
  Cookies.remove('subjectid');
  window.location.href = 'login_student.html';
}

getStudentInfo();

function getStudentInfo() {
  var request = new XMLHttpRequest();
  request.open('GET', 'http://178.128.53.38:4000/api/users/' + studentid, true);
  request.onload = function() {
    console.log(data);
    var data = JSON.parse(this.response);
    if (data.success) {
      var fullName = data.message.firstname + ' ' + data.message.lastname;

      if (!data.message.isPremium) {
        document.getElementById("upgradeBtn").innerHTML = "Subscribe";
        document.getElementById("upgradeBtn").href = 'upgrade.html';
      } else {
          document.getElementById("upgradeBtn").innerHTML = "Manage Subscription";
          document.getElementById("upgradeBtn").href = 'upgrade.html';
      }
      document.getElementById('stName').innerHTML = fullName;

      if (data.message.isuploader) {
        document.getElementById('myStats').style.visibility = "visible";
        document.getElementById("uploadContent").innerHTML = "Upload Content";
        document.getElementById("uploadContent").href = 'dashboard_student_content.html';
      } else {
        document.getElementById("uploadContent").innerHTML = "Become an uploader";
        document.getElementById("uploadContent").href = 'dashboard_uploader_apply.html';
        document.getElementById('myStats').style.visibility = "hidden";
      }

      getUniversityData(data.message.courseid);
      getCourse(data.message.courseid);
    }
  }
  request.send();
}

function getUniversityData(courseid) {
  var request = new XMLHttpRequest();
  request.open('GET', 'http://178.128.53.38:4000/api/universitybycourse/' + courseid, true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);
    if (data.success) {
      var unvName = data.university.name;
      var facultyName = data.faculty.name;
      var courseName = data.course.name;
      document.getElementById('courses').innerHTML = "University : " + unvName + "<br>Faculty : " + facultyName + "<br>Course : " + courseName;
    }
  }
  request.send();
}


function getCourseName(courseid, unvName) {
  console.log(courseid);
  var request = new XMLHttpRequest();
  request.open('GET', 'http://178.128.53.38:4000/api/course/' + courseid, true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);
    if (data.success) {
      var courseName = data.data.name
    }
  }
  request.send();
}


function getCourse(courseid) {
  console.log(courseid);
  var request = new XMLHttpRequest();
  request.open('GET', 'http://178.128.53.38:4000/api/course/' + courseid, true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);
    if (data.success) {
      var courseName = data.course.coursedata.name;
      var semsterDesign = data.course.coursedata.semsterdesign;
      var totalsem = data.course.totalsem;
      var html = '<a class="nav-link active" href="#" data-shuffle="button">All</a>';
      addElement('subjecttabs', 'li', 0, html, "nav-item");
      for (i = 1; i <= totalsem; i++) {
        html = '<a class="nav-link" href="#" data-shuffle="button" data-group="sem ' + i + '">Sem ' + i + '</a>';
        addElement('subjecttabs', 'li', 0, html, "nav-item");
      }
      getAllsubjects(courseid);
    }
  }
  request.send();
}

function addElement(parentId, elementTag, elementId, html, className) {
  var p = document.getElementById(parentId);
  var newElement = document.createElement(elementTag);
  newElement.setAttribute('id', elementId);
  newElement.className = className;
  newElement.innerHTML = html;
  p.appendChild(newElement);
}


function addElementWithExtra(parentId, elementTag, elementId, html, className, semster, subjectid) {
  var parent = document.getElementById(parentId);
  var newElement = document.createElement(elementTag);
  newElement.setAttribute('id', elementId);
  newElement.className = className;
  newElement.setAttribute('data-shuffle', 'item');
  newElement.setAttribute('data-groups', 'sem ' + semster);
  newElement.innerHTML = html;
  newElement.addEventListener('click', function() {
    navigateSubject(subjectid);
  }, false);
  parent.appendChild(newElement);
}

function navigateSubject(subjectid) {
  Cookies.set("subjectid", subjectid);
  window.location.href = 'subject.html';
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function getAllsubjects(courseid) {
  var request = new XMLHttpRequest();
  request.open('GET', 'http://178.128.53.38:4000/api/subjectbycourse/' + courseid, true);
  request.onload = function() {
    var index = 0;
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {

      console.log(data);
      var arrayDocs = data.newdata;
      arrayDocs = shuffle(arrayDocs);
      arrayDocs.forEach(Subject => {
        if (Subject.hasnotes) {
          var html = '<div class="square"><h5>' + Subject.name + '</h5></div>';
          addElementWithExtra('AllSubject', 'DIV', Subject._id, html, "col-6 col-lg-3", Subject.semster, Subject._id);
          index++;
        } else {
          var html = '<div class="squarebad"><h5>' + Subject.name + '</h5></div>';
          addElementWithExtra('AllSubject', 'DIV', Subject._id, html, "col-6 col-lg-3", Subject.semster, Subject._id);
          index++;
        }
      });
      mainScript();
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Gah, it's not working!`;
      app.appendChild(errorMessage);
    }
  }

  request.send();
}

function mainScript() {
  'use strict';
  $(function() {
    page.config({
      googleApiKey: 'AIzaSyDRBLFOTTh2NFM93HpUA4ZrA99yKnCAsto',
      googleAnalyticsId: '',
      reCaptchaSiteKey: '6Ldaf0MUAAAAAHdsMv_7dND7BSTvdrE6VcQKpM-n',
      reCaptchaLanguage: '',
      disableAOSonMobile: true,
      smoothScroll: true,

    });
  });









}
