var mainUrl = 'https://thestusmart.com/developer';

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



var lang = Cookies.get('lang');
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

function remove(id) {
  var contentToRemove = document.querySelectorAll(id);
  $(contentToRemove).remove();
}


function add3Dots(length, string) {
  var dots = "...";
  if (string.length > length) {
    string = string.substring(0, length) + dots;
  }

  return string;
}


populateEbookData();

function populateEbookData() {
  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/ebook?limit=6&page=1', true);
  request.onload = function() {
    var index = 0;
    var data = JSON.parse(this.response);
    console.log(data);
    data.data.docs.forEach(Ebook => {

      var date = new Date(Ebook.date)
      html = '<a class="product-1" href="item.html"><span class="badge badge-pill badge-danger badge-pos-left">New</span><div class="product-detail"><div><h6>'+add3Dots(30, Ebook.name)+'</h6><p>'+add3Dots(120, Ebook.desc)+'</p><p>'+add3Dots(30, date.toString())+'</p></div></div></a>';
      addElement('newSubjectGrid', 'DIV', index, html, "col-md-6 col-xl-4");
      index++;
    });
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
