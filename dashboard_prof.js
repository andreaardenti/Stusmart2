var baseUrl = 'http://www.thestusmart.com/';
var mainUrl = 'https://thestusmart.com/developer';
var professorid = Cookies.get('id');
console.log(professorid);
if (!Cookies.get('id')) {
  window.location.href = 'login_professor.html'
}

function logOut() {
  Cookies.remove('id');
  Cookies.remove('token');
  window.location.href = 'login_professor.html'
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
populateChapterData();
populateFCData();
populateMCQData();
populateEbookData();
populateSubject('subjectDropdownFC', 'chapterDropdownFC');
populateSubject('subjectDropdownMCQ', 'chapterDropdownMCQ');
populateSubject('subjectDropdown');
populateSubject('subjectDropdownChapter');

function addEbook(myname, mydesc, myfilelink, myfileType, mysubjectid) {
  console.log('Name : ' + myname);
  console.log('Desc : ' + mydesc);
  console.log('Link : ' + myfilelink);
  console.log('Type : ' + myfileType);
  console.log('Subject ID : ' + mysubjectid);
  var params = JSON.stringify({
    name: myname,
    desc: mydesc,
    filelink: myfilelink,
    fileType: myfileType,
    subjectid: mysubjectid,
    uploaderid: professorid
  })
  var request = new XMLHttpRequest();
  request.open('POST', mainUrl + '/api/ebook', true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    var data = JSON.parse(this.response);;
    if (data.success) {
      window.location.reload(false);
    } else {
      toastr.error(data.message);
    }
  }
  request.send(params);
}



function addChapter() {
  var myname = document.getElementById("chapterName").value;
  if (!myname) {
    toastr.error("Please enter chapter name");
    return;
  }
  var mysubjectid = document.getElementById('subjectDropdownChapter').options[document.getElementById('subjectDropdownChapter').selectedIndex].value;

  if (document.getElementById('subjectDropdownChapter').selectedIndex == 0) {
    toastr.error("Please select a subject");
    return;

  }
  var params = JSON.stringify({
    name: myname,
    subjectid: mysubjectid
  })
  var request = new XMLHttpRequest();
  request.open('POST', mainUrl + '/api/chapter', true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    var data = JSON.parse(this.response);;
    if (data.success) {
      window.location.reload(false);
    } else {
      toastr.error(data.message);
    }
  }
  request.send(params);
}

function addMCQ(myimageUrl) {
  var myquestion = document.getElementById("mcqquestionName").value;
  var myrightAnswer = document.getElementById("mcqcorrectAnswer").value;
  var myrightAnswerDesc = document.getElementById("mcqcorrectAnswerDesc").value;
  var mywrongAnswers = [document.getElementById("mcqwrongAnswer1").value, document.getElementById("mcqwrongAnswer2").value, document.getElementById("mcqwrongAnswer3").value];
  var mychapterid = document.getElementById('chapterDropdownMCQ').options[document.getElementById('chapterDropdownMCQ').selectedIndex].value;
  var mysubjectid = document.getElementById('subjectDropdownMCQ').options[document.getElementById('subjectDropdownMCQ').selectedIndex].value;

  if (!myquestion) {
    toastr.error("Please enter the question name");
    return;
  }


  if (!myrightAnswer) {
    toastr.error("Please enter the right answer");
    return;
  }


  if (!myrightAnswerDesc) {
    toastr.error("Please enter the right answer description");
    return;
  }

  var params = JSON.stringify({
    question: myquestion,
    rightAnswer: myrightAnswer,
    rightAnswerDesc: myrightAnswerDesc,
    wrongAnswers: mywrongAnswers,
    imageUrl: myimageUrl,
    subjectid: mysubjectid,
    uploaderid: professorid,
    chapterid: mychapterid
  })
  var request = new XMLHttpRequest();
  request.open('POST', mainUrl + '/api/mcq', true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    var data = JSON.parse(this.response);;
    if (data.success) {
      window.location.reload(false);
    } else {
      toastr.error(data.message);
    }
  }
  request.send(params);
}

function addFC() {
  var myquestion = document.getElementById("fcquestionName").value;
  var myfullAnswer = document.getElementById("fcfullAnswer").value;
  var mychapterid = document.getElementById('chapterDropdownFC').options[document.getElementById('chapterDropdownFC').selectedIndex].value;
  var mysubjectid = document.getElementById('subjectDropdownFC').options[document.getElementById('subjectDropdownFC').selectedIndex].value;
  var params = JSON.stringify({
    question: myquestion,
    answers: [myfullAnswer],
    chapter: mychapterid,
    subjectid: mysubjectid,
    uploaderid: professorid

  })
  var request = new XMLHttpRequest();
  request.open('POST', mainUrl + '/api/study', true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    var data = JSON.parse(this.response);;
    if (data.success) {
      window.location.reload(false);
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
    opt.value = data.data._id;
    opt.innerHTML = data.data.name;;
    app.append(opt);
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

function populateSubjectName(id, subjectid) {
  var app = document.getElementById(id);
  if (app) {
    var request = new XMLHttpRequest();
    request.open('GET', mainUrl + '/api/subject/' + subjectid, true);
    request.onload = function() {
      var data = JSON.parse(this.response);
      console.log(data);
      app.value = data.data._id;
      app.innerHTML = data.data.name;
    }
    request.send();
  }

}

function populateSubject(subjectElementId, chapterElementId) {
  var app = document.getElementById(subjectElementId);
  if (chapterElementId) {
    app.addEventListener("change", function() {
      populateChapter(chapterElementId, app.options[app.selectedIndex].value);
    });
  }
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/professors/' + professorid, true);
  request.onload = function() {
    var opt = document.createElement("option");
    opt.value = 0;
    opt.innerHTML = '';
    app.appendChild(opt);
    var data = JSON.parse(this.response);;
    if (request.status >= 200 && request.status < 400) {
      data.message.subjectids.forEach(Subject => {
        getSubjectInfo(subjectElementId, Subject);
      });
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Gah, it's not working!`;
      app.appendChild(errorMessage);
    }
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


function populateChapterData() {
  var chapterTable = document.getElementById("chapterTable");
  while (chapterTable.firstChild) {
    chapterTable.removeChild(chapterTable.firstChild);
  }
  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/chapter', true);
  request.onload = function() {
    var index = 0;
    var data = JSON.parse(this.response);
    data.data.docs.forEach(Chapter => {
      var tr1 = document.createElement('td');
      var tr2 = document.createElement('td');
      var tr3 = document.createElement('td');
      var td = document.createElement('tr');
      tr1.innerHTML = (index + 1);
      tr2.innerHTML = (Chapter.name);
      tr3.innerHTML = (Chapter.subjectid);

      td.appendChild(tr1);
      td.appendChild(tr2);
      td.appendChild(tr3);
      chapterTable.appendChild(td);
      index++;
    });

  }
  request.send();
}

function populateEbookData() {
  var ebookTable = document.getElementById("ebookTable");
  while (ebookTable.firstChild) {
    ebookTable.removeChild(ebookTable.firstChild);
  }
  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/ebook', true);
  request.onload = function() {
    var index = 0;
    var data = JSON.parse(this.response);
    data.data.docs.forEach(Ebook => {
      var tr1 = document.createElement('td');
      var tr2 = document.createElement('td');
      var tr3 = document.createElement('td');
      var tr4 = document.createElement('td');
      var tr5 = document.createElement('td');
      var tr6 = document.createElement('td');
      var td = document.createElement('tr');
      tr1.innerHTML = (index + 1);
      tr2.innerHTML = (Ebook.name);
      tr3.innerHTML = (Ebook.desc);
      tr4.innerHTML = (Ebook.fileType);
      tr5.innerHTML = (Ebook.filelink);
      tr6.innerHTML = (Ebook.subjectid);
      td.appendChild(tr1);
      td.appendChild(tr2);
      td.appendChild(tr3);
      td.appendChild(tr4);
      td.appendChild(tr5);
      td.appendChild(tr6);
      ebookTable.appendChild(td);
      index++;
    });
  }
  request.send();
}


function populateMCQData() {
  var mcqTable = document.getElementById("mcqTable");
  while (mcqTable.firstChild) {
    mcqTable.removeChild(mcqTable.firstChild);
  }
  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/mcq', true);
  request.onload = function() {
    var index = 0;
    var data = JSON.parse(this.response);
    data.data.docs.forEach(MCQ => {
      var tr1 = document.createElement('td');
      var tr2 = document.createElement('td');
      var tr3 = document.createElement('td');
      var tr4 = document.createElement('td');
      var tr5 = document.createElement('td');
      var tr7 = document.createElement('td');
      var td = document.createElement('tr');
      tr1.innerHTML = (index + 1);
      tr2.innerHTML = (MCQ.question);
      tr3.innerHTML = (MCQ.rightAnswer);
      tr4.innerHTML = (MCQ.wrongAnswers);
      tr5.innerHTML = (MCQ.chapter);
      var iidd = MCQ.subjectid + index;
      tr7.id = iidd;

      console.log(tr7.id);
      populateSubjectName(iidd, MCQ.subjectid);
      td.appendChild(tr1);
      td.appendChild(tr2);
      td.appendChild(tr3);
      td.appendChild(tr4);
      td.appendChild(tr5);
      td.appendChild(tr7);
      mcqTable.appendChild(td);
      index++;
    });
  }
  request.send();
}


function populateFCData() {
  var fcTable = document.getElementById("flashcardTable");
  while (fcTable.firstChild) {
    fcTable.removeChild(fcTable.firstChild);
  }
  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/study', true);
  request.onload = function() {
    var index = 0;
    var data = JSON.parse(this.response);
    data.data.docs.forEach(Study => {
      var tr1 = document.createElement('td');
      var tr2 = document.createElement('td');
      var tr3 = document.createElement('td');
      var tr5 = document.createElement('td');
      var td = document.createElement('tr');
      tr1.innerHTML = (index + 1);
      tr2.innerHTML = (Study.question);
      tr3.innerHTML = (Study.answers);
      tr5.innerHTML = (Study.subjectid);
      var iidd = Study.subjectid + index;
      tr5.id = iidd;
      populateSubjectName(iidd, Study.subjectid);
      td.appendChild(tr1);
      td.appendChild(tr2);
      td.appendChild(tr3);
      td.appendChild(tr5);
      fcTable.appendChild(td);
      index++;
    });
  }
  request.send();
}


function uploadEbook() {
  var e = document.getElementById("file");
  let ebookfile = e.files[0];
  if (!ebookfile) {
    toastr.error("Please select the file");
    return;
  }
  var name = document.getElementById("fileName").value;
  var desc = document.getElementById("fileDesc").value;
  var type = document.getElementById('typeDropdown').options[document.getElementById('typeDropdown').selectedIndex].text;
  var subjectid = document.getElementById('subjectDropdown').options[document.getElementById('subjectDropdown').selectedIndex].value;

  if (!name) {
    toastr.error("Please enter the file name");
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

  let formData = new FormData();
  formData.append("file", ebookfile);
  var request = new XMLHttpRequest();
  request.open('POST', mainUrl + '/api/upload-file', true);
  request.onload = function() {
    var data = JSON.parse(this.response);;
    if (data.success) {
      var filename = data.file.filename;
      addEbook(name, desc, filename, type, subjectid);
    } else {
      toastr.error(data.message);
    }
  }
  request.send(formData);

}


function uploadMCQ() {
  var e = document.getElementById("mcqimage");
  let photo = e.files[0]
  if (!photo) {
    addMCQ("");
  } else {
    let formData = new FormData();
    formData.append("image", photo);
    var request = new XMLHttpRequest();
    request.open('POST', mainUrl + '/api/upload-image', true);
    request.onload = function() {
      var data = JSON.parse(this.response);
      if (data.success) {
        var filename = data.file.filename;
        addMCQ(filename);
      } else {
        toastr.error(data.message);
      }
    }
    request.send(formData);
  }
}
