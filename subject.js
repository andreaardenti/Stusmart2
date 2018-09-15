var studentid = Cookies.get('id');
var token = Cookies.get('token');
var subjectid = Cookies.get('subjectid');
var baseUrl = 'http://www.thestusmart.com/';
var mainUrl = 'https://thestusmart.com/developer';
console.log(subjectid);

if (!studentid) {
  window.location.href = 'login_student.html'
}


NProgress.start();

function logOut() {
  Cookies.remove('id');
  Cookies.remove('token');
  Cookies.remove('subjectid');
  window.location.href = 'login_student.html';
}
getStudentInfo();
getSubjectInfo();

function getStudentInfo() {

  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/users/' + studentid, true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);
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

      getEbooks1();
      getEbooks2();
      getEbooks3();
    }
  }
  request.send();
}


function remove1() {
  var regattr = getElementsByAttribute("id", "'div1'");
  $(regattr).remove();
}

function remove2() {
  var regattr = getElementsByAttribute("id", "'div2'");
  $(regattr).remove();
}

function remove3() {
  var regattr = getElementsByAttribute("id", "'div3'");
  $(regattr).remove();
}


function getElementsByAttribute(attr, value) {
  if ('querySelectorAll' in document) {
    return document.querySelectorAll("[" + attr + "=" + value + "]")
  } else {
    var els = document.getElementsByTagName("*"),
      result = []

    for (var i = 0, _len = els.length; i < _len; i++) {
      var el = els[i]

      if (el.hasAttribute(attr)) {
        if (el.getAttribute(attr) === value) result.push(el)
      }
    }

    return result
  }
}


function getSubjectInfo() {
  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/subject/' + subjectid, true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);
    if (data.success) {
      document.getElementById('subjectInfo').innerHTML = data.data.name;
    } else {}
  }
  request.send();
}


function openLink(link) {
  window.location.href = link;
}

function getEbooks1() {
  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/ebook/?subjectid=' + subjectid + '&fileType=Chapter%20Note&sortBy=date', true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    NProgress.done();
    if (request.status >= 200 && request.status < 400) {
      index = 1;
      var arrayDocs = data.data.docs;
      if (arrayDocs.length == 0) {
        remove1();
        return;
      }
      arrayDocs.forEach(Ebook => {
        addElement('chapterNoteList', Ebook, index);
        index++;
      });
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Gah, it's not working!`;
      app.appendChild(errorMessage);
    }
  }
  request.send();
}

function getEbooks2() {
  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/ebook/?subjectid=' + subjectid + '&fileType=Whole%20Course&sortBy=date', true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    NProgress.done();
    if (request.status >= 200 && request.status < 400) {
      index = 1;
      var arrayDocs = data.data.docs;
      if (arrayDocs.length == 0) {
        remove2();
        return;
      }
      arrayDocs.forEach(Ebook => {
        addElement('wholeCourseList', Ebook, index);
        index++;
      });
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Gah, it's not working!`;
      app.appendChild(errorMessage);
    }
  }
  request.send();
}

function getEbooks3() {
  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/ebook/?subjectid=' + subjectid + '&fileType=Daily%20Note&sortBy=date', true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    NProgress.done();
    if (request.status >= 200 && request.status < 400) {
      index = 1;
      var arrayDocs = data.data.docs;
      if (arrayDocs.length == 0) {
        remove3();
        return;
      }
      arrayDocs.forEach(Ebook => {
        addElement('dailyNoteList', Ebook, index);
        index++;
      });
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Gah, it's not working!`;
      app.appendChild(errorMessage);
    }
  }
  request.send();
}



function addElement(parentId, Ebook, index) {
  var link = 'https://thestusmart.com/developer/media/' + Ebook.filelink;
  var p = document.getElementById(parentId);
  var outerCard = document.createElement('div');
  outerCard.className = "card";

  var h6 = document.createElement('h6');
  h6.className = "card-title";

  var a = document.createElement('a');
  a.className = "d-flex align-items-center collapsed";
  a.setAttribute('data-toggle', 'collapse');
  a.href = "#collapse-job-" + index;
  var date = new Date(Ebook.date)
  a.innerHTML = "<strong class=\"mr-auto\">" + Ebook.name + "</strong> <span class=\"small text-lighter\">" + date.toString() + " </span>";
  h6.appendChild(a);

  var belowdv = document.createElement('div');
  belowdv.className = "collapse";
  belowdv.id = "collapse-job-" + index;
  belowdv.setAttribute('data-parent', '#accordion-job');

  var belowcardbody = document.createElement('div');
  belowcardbody.className = "card-body";

  var belowp = document.createElement('p');
  belowp.innerHTML = Ebook.desc;

  var viewButton = document.createElement('button');
  viewButton.setAttribute('type', 'button');
  viewButton.className = "btn btn-primary";
  viewButton.innerHTML = "View";

  viewButton.onclick = function() {
    Cookies.set('noteid', Ebook._id, {
      expires: 7
    });
    window.location.href = "Note.html";
  };
  belowcardbody.appendChild(belowp);
  belowcardbody.appendChild(viewButton);
  belowdv.appendChild(belowcardbody);


  outerCard.appendChild(h6);
  outerCard.appendChild(belowdv);

  console.log(outerCard.innerHTML);
  p.appendChild(outerCard);
  p.appendChild(belowdv);

}
