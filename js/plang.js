var lang = Cookies.get('lang');
switch (lang) {
  case 'ita':
    remove('#langau');
    remove('#langcn');
    break;


  case 'au':
    remove('#langita');
    remove('#langcn');
    break;


  case 'cn':
    remove('#langau');
    remove('#langita');
    break;

  default:
    remove('#langcn');
    remove('#langita');
    break;

}

function remove(id) {
  var contentToRemove = document.querySelectorAll(id);
  $(contentToRemove).remove();
}

function changeIta() {
  Cookies.set('lang', 'ita', {
    expires: 7
  });
  location.reload();
}

function changeCn() {
  Cookies.set('lang', 'cn', {
    expires: 7
  });
  location.reload();
}


function changeAu() {
  Cookies.set('lang', 'au', {
    expires: 7
  });
  location.reload();
}

if (Cookies.get('id')) {
  removeLogin();
} else {
  removeReg();
}

function removeLogin() {
  var loginattr = getElementsByAttribute("href", "'login_student.html'");
  $(loginattr).remove();
  var signupattr = getElementsByAttribute("href", "'register.html'");
  $(signupattr).remove();
}


function removeReg() {
  var regattr = getElementsByAttribute("href", "'dashboard_student.html'");
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

switch (lang) {
  case 'ita':

    remove('#cndd');
    remove('#ausdd');
    break;


  case 'au':
    remove('#cndd');
    remove('#itadd');
    break;


  case 'cn':
    remove('#itadd');
    remove('#ausdd');
    break;

  default:
    remove('#cndd');
    remove('#itadd');
    break;

}
