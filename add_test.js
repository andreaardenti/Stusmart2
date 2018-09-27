var currentdate;
var courseid = "5ba9df97023e8845407094de";

var studentid = Cookies.get('id');

if (!Cookies.get('id')) {
  window.location.href = 'login_student.html'
}
var mainUrl = 'https://thestusmart.com/developer';



getStudentInfo();

function getStudentInfo() {
  var request = new XMLHttpRequest();
  request.open('GET', mainUrl+'/api/users/' + studentid, true);
  request.onload = function() {
    NProgress.done();
    var data = JSON.parse(this.response);
    console.log(data);
    if (data.success) {
      courseid=data.message.courseid;
    }
  }
  request.send();
}

jQuery(document).ready(function($) {
  $(function() {
    $('input[name="datetime"]').daterangepicker({
      timePicker: true,
      singleDatePicker: true,
      showDropdowns: true,
      locale: {
        format: 'M/DD hh:mm A'
      }
    }, function(start, end, label) {
      currentdate = start._d.getTime();
      console.log(currentdate);
    });
  });
});

var total = 0;

function addTask() {
  total++;
  var p = document.getElementById("questions");
  var questiondiv = document.createElement('div');
  questiondiv.id = "question" + total;
  questiondiv.className = "option";


  questiondiv.appendChild(createInput("form-control", "Question", "text", "ques" + total));

  var deletebtn = document.createElement('button');
  deletebtn.className = "btn btn-danger";
  deletebtn.innerHTML = "Delete";
  deletebtn.setAttribute('type', 'button');
  deletebtn.onclick = function() {
    removeOption(questiondiv);
    total--;
  };
  questiondiv.appendChild(deletebtn);
  p.appendChild(questiondiv);
}

function createInput(classname, placeholder, type, id) {
  var quediv = document.createElement('div');
  quediv.className = "form-group";
  var queInp = document.createElement('input');
  queInp.className = classname;
  queInp.id = id;
  queInp.setAttribute('type', type);
  queInp.setAttribute('placeholder', placeholder);
  quediv.appendChild(queInp);
  return quediv;
}

function getbr() {
  var br = document.createElement('br');
  return br;
}

function removeOption(contentToRemove) {
  $(contentToRemove).remove();

}

populateSubject("subjectDropdown", courseid);

function populateSubject(id, subjectid) {
  var app = document.getElementById(id);
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/subjectbycourse/' + subjectid, true);
  request.onload = function() {
    var index = 0;
    var opt = document.createElement("option");
    opt.value = 0;
    opt.innerHTML = '';
    app.appendChild(opt);
    var data = JSON.parse(this.response);
    console.log(data);
    if (request.status >= 200 && request.status < 400) {
      data.newdata.forEach(University => {
        var opt = document.createElement("option");
        opt.value = University._id;
        opt.innerHTML = University.name;
        app.appendChild(opt);
        index++;
      });
    } else {}
  }
  request.send();
}

function publishAssignment() {
  var testName = document.getElementById("assignmentName").value;
  if (!validateInput(testName, "assignmentName")) {
    return;
  }
  var testDesc = document.getElementById("assignmentDesc").value;
  if (!validateInput(testDesc, "assignmentDesc")) {
    return;
  }

  var subjectValue = document.getElementById('subjectDropdown').options[document.getElementById('subjectDropdown').selectedIndex].value
  if (subjectValue == 0) {
    toastr.error("Please select your course");
    return;
  }



  var testArray = new Array();
  for (i = 1; i <= total; i++) {
    try {
      var myquestion = document.getElementById("ques" + i).value;
      if (!validateInput(myquestion, "ques" + i)) {
        return;
      }
      testArray.push(myquestion);
    } catch (err) {
      console.log(err);
    }
  }
  if (testArray.length == 0) {
    toastr.error("Please add at least one question");
    return;
  }


  var params = JSON.stringify({
    question: testName,
    description: testDesc,
    subjectid: subjectValue
  });
  console.log(params);
  var request = new XMLHttpRequest();
  request.open('POST', mainUrl + '/api/assignment', true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    var data = JSON.parse(this.response);;
    console.log(data);
    NProgress.done();
    if (data.success) {
      var id=data.data._id;
      $('html,body').scrollTop(0);
      toastr.success("Assignment Created");

      for (i = 0; i < testArray.length; i++) {
        postEachTask(testArray[i], id);
      }
    } else {
      toastr.error(data.message);
    }
  }
  request.send(params);



}

function postEachTask(myquestion, myassignmentid){
    var params = JSON.stringify({
      question: myquestion,
      assignmentid: myassignmentid
    });
    console.log(params);
    var request = new XMLHttpRequest();
    request.open('POST', mainUrl + '/api/task', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
      var data = JSON.parse(this.response);;
      console.log(data);
      NProgress.done();
      if (data.success) {
        toastr.success(myquestion+" has been posted");
      } else {
        toastr.error(data.message);
      }
    }
    request.send(params);
}

function validateInput(question, id) {

  if (!question) {
    document.getElementById(id).className = "form-control is-invalid";
    window.location = "#" + id;
    return false;
  } else {
    document.getElementById(id).className = "form-control";
    return true;
  }
}

function getInputValue(eachDiv, id) {
  for (k = 0; k <= eachDiv.children.length - 1; k++) {
    var eachChild = eachDiv.children[k];
    if (eachChild.id = id) {
      return eachChild.value;
    }
  }
}

function Test(wrongAnswers, rightAnswerDesc, rightAnswer, subCategory, question, category) {
  this.wrongAnswers = wrongAnswers;
  this.rightAnswerDesc = rightAnswerDesc;
  this.rightAnswer = rightAnswer;
  this.subCategory = subCategory;
  this.question = question;
  this.category = category;
}
