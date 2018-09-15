var studentid = Cookies.get('id');
var token = Cookies.get('token');
var noteid = Cookies.get('noteid');
var baseUrl = 'http://www.thestusmart.com/';
var mainUrl = 'https://thestusmart.com/developer';

var isPremium = false;
var page_limit = 4;



// Previous page of the PDF
$("#pdf-prev").on('click', function() {
  if (__CURRENT_PAGE != 1)
    showPage(--__CURRENT_PAGE);
});

// Next page of the PDF
$("#pdf-next").on('click', function() {
  if (__CURRENT_PAGE != __TOTAL_PAGES)
    if (!isPremium && __CURRENT_PAGE > page_limit - 1) {
      toastr.error("Limit Reached\nPlease subscribe as premium user to view full content.");
    } else {
      showPage(++__CURRENT_PAGE);
    }
});



var __PDF_DOC,
  __CURRENT_PAGE,
  __TOTAL_PAGES,
  __PAGE_RENDERING_IN_PROGRESS = 0,
  __CANVAS = $('#pdf-canvas').get(0),
  __CANVAS_CTX = __CANVAS.getContext('2d');

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
getNoteInfo();

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
      document.getElementById('stName').innerHTML = fullName;
    }
  }
  request.send();
}

function showPDF(pdf_url) {
  $("#pdf-loader").show();

  PDFJS.getDocument({
    url: pdf_url
  }).then(function(pdf_doc) {
    __PDF_DOC = pdf_doc;
    __TOTAL_PAGES = __PDF_DOC.numPages;

    // Hide the pdf loader and show pdf container in HTML
    $("#pdf-loader").hide();
    $("#pdf-contents").show();

    // Show the first page
    showPage(1, __TOTAL_PAGES);
  }).catch(function(error) {
    // If error re-show the upload button
    $("#pdf-loader").hide();
    $("#upload-button").show();

    alert(error.message);
  });;
}


$(document).ready(function() {
  // Check Radio-box
  $(".rating input:radio").attr("checked", false);

  $('.rating input').click(function() {
    $(".rating span").removeClass('checked');
    $(this).parent().addClass('checked');
  });

  $('input:radio').change(
    function() {
      var userRating = this.value;
      alert(userRating);
    });
});

function showPage(page_no) {
  __PAGE_RENDERING_IN_PROGRESS = 1;
  __CURRENT_PAGE = page_no;

  // Disable Prev & Next buttons while page is being loaded
  $("#pdf-next, #pdf-prev").attr('disabled', 'disabled');

  // While page is being rendered hide the canvas and show a loading message
  $("#pdf-canvas").hide();
  $("#page-loader").show();

  // Update current page in HTML
  $("#pdf-current-page").text(page_no + " Of " + __TOTAL_PAGES);

  // Fetch the page
  __PDF_DOC.getPage(page_no).then(function(page) {
    // As the canvas is of a fixed width we need to set the scale of the viewport accordingly
    var scale_required = __CANVAS.width / page.getViewport(1).width;

    // Get viewport of the page at required scale
    var viewport = page.getViewport(scale_required);

    // Set canvas height
    __CANVAS.height = viewport.height;

    var renderContext = {
      canvasContext: __CANVAS_CTX,
      viewport: viewport
    };

    // Render the page contents in the canvas
    page.render(renderContext).then(function() {
      __PAGE_RENDERING_IN_PROGRESS = 0;

      // Re-enable Prev & Next buttons
      $("#pdf-next, #pdf-prev").removeAttr('disabled');

      // Show the canvas and hide the page loader
      $("#pdf-canvas").show();
      $("#page-loader").hide();
    });
  });
}

function getNoteInfo() {
  var request = new XMLHttpRequest();
  request.open('GET', mainUrl + '/api/ebook/' + noteid + '/' + studentid, true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);
    console.log(parseInt(data.avgrating));
    var link = 'https://thestusmart.com/developer/media/' + data.note.filelink;
    //if (isPremium) {
      PDFObject.embed(link, "#example1");
      $("#pdf-main-container").hide();
    /*} else {
      showPDF(link);
      $("#example1").hide();
    }
    */
    console.log(link);
  }
  request.send();
}

function openLink(link) {
  window.location.href = link;
}

function addElement(parentId, elementTag, elementId, html, className, link) {
  var p = document.getElementById(parentId);
  var newElement = document.createElement(elementTag);
  newElement.setAttribute('id', elementId);
  newElement.className = className;
  newElement.innerHTML = html;
  p.appendChild(newElement);
}
