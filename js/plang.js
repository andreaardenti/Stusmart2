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
