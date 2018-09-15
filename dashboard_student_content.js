var baseUrl = 'http://www.thestusmart.com/';
var mainUrl = 'https://thestusmart.com/developer';
var studentid = Cookies.get('id');


paceOptions = {
  elements: false,
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
      var fullName = data.message.firstname + ' ' + data.message.lastname;
      if (!data.message.isPremium) {
        document.getElementById("upgradeBtn").innerHTML = "Subscribe";
        document.getElementById("upgradeBtn").href = 'upgrade.html';
      } else {
        document.getElementById("upgradeBtn").innerHTML = "Manage Subscription";
        document.getElementById("upgradeBtn").href = 'upgrade.html';
      }
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
populateEbookData();
populateSubject('subjectDropdown');



function deleteEbook(id) {
  NProgress.start();
  var request = new XMLHttpRequest();
  request.open('DELETE', mainUrl + '/api/ebook/' + id, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    var data = JSON.parse(this.response);;
    console.log(data);
    NProgress.done();
    if (data.success) {
      $('html,body').scrollTop(0);
      populateEbookData();
    } else {
      toastr.error(data.message);
    }
  }
  request.send();
}

function addEbook(myname, mydesc, myfilelink, myfileType, mysubjectid, mydate) {

  NProgress.start();
  console.log('Name : ' + myname);
  console.log('Desc : ' + mydesc);
  console.log('Link : ' + myfilelink);
  console.log('Type : ' + myfileType);
  console.log('Subject ID : ' + mysubjectid);
  console.log('Date : ' + mydate);
  var params = JSON.stringify({
    name: myname,
    desc: mydesc,
    filelink: myfilelink,
    fileType: myfileType,
    subjectid: mysubjectid,
    uploaderid: studentid,
    date: mydate
  });
  var request = new XMLHttpRequest();
  request.open('POST', mainUrl + '/api/ebook', true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    var data = JSON.parse(this.response);;
    console.log(data);
    NProgress.done();
    if (data.success) {
      $('html,body').scrollTop(0);
      populateEbookData();
    } else {
      toastr.error(data.message);
    }
  }
  request.send(params);
}



function getSubjectInfo(id, subjectid) {
  var app = document.getElementById(id);
  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/subject/' + subjectid, true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    var opt = document.createElement("option");
    app.value = data.data._id;
    app.innerHTML = data.data.name;;
  }
  request.send();
}


function getChapterInfo(id, chapterid) {
  var app = document.getElementById(id);
  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/chapter/' + subjectid, true);
  request.onload = function() {
    var index = 0;
    var data = JSON.parse(this.response);
    var opt = document.createElement("option");
    opt.value = data.data._id;
    opt.innerHTML = data.data.name;
    app.appendChild(opt);;
  }
  request.send();
}

function populateSubjectName(app, subjectid) {
  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/subject/' + subjectid, true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);
    app.value = data.data._id;
    app.innerHTML = add3Dots(data.data.name);
  }
  request.send();

}

function showDeleteDialog(id) {
  if (confirm('Are you sure you want to delete this pdf from database? You can not undo this action.')) {
    deleteEbook(id);
  } else {}

}

function populateSubject(subjectElementId) {
  var app = document.getElementById(subjectElementId);
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/subjectbyuser/' + studentid, true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);
    var array = data.data.docs;
    var result = Object.values(array.reduce((a, curr) => {
      (a[curr.semster] = a[curr.semster] || []).push(curr);
      return a;
    }, {}));
    result.forEach(subArray => {
      var optgroup = document.createElement("optgroup");
      optgroup.label = "Semster " + subArray[0].semster;
      subArray.forEach(Subject => {
        var opt = document.createElement("option");
        opt.value = Subject._id;
        opt.innerHTML = Subject.name;
        optgroup.appendChild(opt);
      });

      app.appendChild(optgroup);
    });


  }
  request.send();
}


function populateChapter(id, subjectid) {
  var app = document.getElementById(id);
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/chapterbysubject/' + subjectid, true);
  request.onload = function() {
    var opt = document.createElement("option");
    opt.value = 0;
    opt.innerHTML = '';
    app.appendChild(opt);
    var data = JSON.parse(this.response);;
    if (request.status >= 200 && request.status < 400) {
      data.data.docs.forEach(Chapter => {
        var opt = document.createElement("option");
        opt.value = Chapter._id;
        opt.innerHTML = Chapter.name;
        app.appendChild(opt);
      });
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Gah, it's not working!`;
      app.appendChild(errorMessage);
    }
  }
  request.send();
}


function add3Dots2(string) {
  var dots = "...";
  if (string.length > 40) {
    string = string.substring(0, 7) + dots;
  }

  return string;
}

function add3Dots(string) {
  var dots = "...";
  if (string.length > 40) {
    string = string.substring(0, 40) + dots;
  }

  return string;
}

function populateEbookData() {
  var ebookTable = document.getElementById("ebookTable");
  while (ebookTable.firstChild) {
    ebookTable.removeChild(ebookTable.firstChild);
  }
  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/ebook?uploaderid=' + studentid, true);
  request.onload = function() {
    var index = 0;
    var data = JSON.parse(this.response);
    data.data.docs.forEach(Ebook => {
      var tr1 = document.createElement('td');
      var tr2 = document.createElement('td');
      var tr3 = document.createElement('td');
      var tr4 = document.createElement('td');
      var tr6 = document.createElement('td');
      var tr7 = document.createElement('td');
      var tr8 = document.createElement('td');
      var td = document.createElement('tr');
      tr1.innerHTML = (index + 1);
      tr2.innerHTML = Ebook.name;
      var date = new Date(Ebook.createdAt);
      let now = new Date();
      const oneDay = 60 * 60 * 24 * 1000;
      console.log(now - date);
      var compareDatesBoolean = (now - date) < oneDay;
      tr8.innerHTML = '<a  href=javascript:showDeleteDialog("' + Ebook._id + '")><div style="height:100%;width:100%">Delete</div></a>'
      var link = 'https://thestusmart.com/developer/media/' + Ebook.filelink;
      tr7.innerHTML = '<a href=' + link + '><div style="height:100%;width:100%">View</div></a> ';
      tr3.innerHTML = (add3Dots(Ebook.desc));
      tr4.innerHTML = (Ebook.fileType);
      populateSubjectName(tr6, Ebook.subjectid)
      td.appendChild(tr1);
      td.appendChild(tr2);
      td.appendChild(tr3);
      td.appendChild(tr4);
      td.appendChild(tr6);
      td.appendChild(tr7);
      if (compareDatesBoolean) {
        td.appendChild(tr8);
      }
      ebookTable.appendChild(td);
      index++;
    });
  }
  request.send();
}

function Validate(oInput) {
  var _validFileExtensions = [".pdf"];
  if (oInput.type == "file") {
    var sFileName = oInput.value;
    if (sFileName.length > 0) {
      var blnValid = false;
      for (var j = 0; j < _validFileExtensions.length; j++) {
        var sCurExtension = _validFileExtensions[j];
        if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
          blnValid = true;
          break;
        }
      }

      if (!blnValid) {
        return false;
      }
    }
  }

  return true;
}


function uploadEbook() {
  var e = document.getElementById("file");
  let ebookfile = e.files[0];
  if (!ebookfile) {
    toastr.warning("Please select the file");
    return;
  }



  if (!ebookfile) {
    toastr.warning("Please select the file");
    return;
  }
  var date = document.getElementById("fileDate").value;
  var name = document.getElementById("fileName").value;
  var desc = document.getElementById("fileDesc").value;
  var type = document.getElementById('typeDropdown').options[document.getElementById('typeDropdown').selectedIndex].text;
  var subjectid = document.getElementById('subjectDropdown').options[document.getElementById('subjectDropdown').selectedIndex].value;


  if (!date) {
    toastr.warning("Please enter the file date");
    return;
  }

  if (!name) {
    toastr.warning("Please enter the file name");
    return;
  }
  if (!desc) {
    toastr.error("Please enter the file description");
    return;
  }
  if (!type) {
    toastr.error("Please select the file type");
    return;
  }
  if (!subjectid) {
    toastr.error("Please select the subject");
    return;
  }
  NProgress.start();
  let formData = new FormData();
  formData.append("file", ebookfile);
  var request = new XMLHttpRequest();
  request.open('POST', mainUrl + '/api/upload-file', true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);
    NProgress.done();
    if (data.success) {
      var filename = data.file.filename;
      addEbook(name, desc, filename, type, subjectid, date);
    } else {
      toastr.error(data.message);
    }
  }
  request.send(formData);

}
