<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="keywords" content="">

    <title>StuSmart — Register</title>

    <!-- Styles -->
    <link href="./assets/css/page.min.css" rel="stylesheet">
    <link href="./assets/css/style.css" rel="stylesheet">
	<link href="./assets/css/mycss.css" rel="stylesheet">

    <!-- Favicons -->
  </head>

  <body class="layout-centered bg-img" style="background-image: url(./assets/img/bg/4.jpg);">


    <!-- Main Content -->
    <main class="main-content">

      <div class="bg-white rounded shadow-7 w-400 mw-100 p-6">
        <h5 class="mb-7">Create an account</h5>

        <form id="form_registration"action="http://www.thestusmart.com/StuSmart_marketplace/upload_user.php" method="post">
		
          <div class="form-group">
            <input type="text" id="st_name" class="form-control" name="firstname" placeholder="Your Name" required />
          </div>
		  
		  <div class="form-group">
            <input type="text" id="st_username" class="form-control" name="lastname" placeholder="Your Surname" required>
          </div>

          <div class="form-group">
            <input type="email" id="st_email" class="form-control" name="email" placeholder="Email Address" 
					pattern="[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*" required>
          </div>

          <div class="form-group">
            <input type="password" id="st_password" class="form-control" name="st_password" placeholder="Password" required minlength="6" maxlength="12">
			<span class="validity"></span><b size="3"> Between 6 and 12.</b>
          </div>

          <div class="form-group">
            <input type="password" id="confirm_password" class="form-control" name="password_confirm" placeholder="Password (confirm)">
          </div>
		  
		  <b> Who are you </b>
              <div class="form-group">
                <div class="custom-control custom-radio">
                  <label><input type="radio" id="professor" class="abc" value=0 name="IsStudent">
                  Professor</label>
                </div>
				
				<div class="custom-control custom-radio">
				  <label><input type="radio" id="student" class="abc" value=1 name="IsStudent" checked>
                  Student</label>
                </div>
			 </div> 
			 
	<b>Choose Country<b>
		<div class="form-group" id="University_Upload">

		<select class="form-control" name="country" id="country" onchange="getUniversity()" required >
			<script>
				var app = document.getElementById('country');
				var request = new XMLHttpRequest();
				request.open('GET', 'https://thestusmart.com/developer/api/country', true);
				request.onload = function () {
				  var index=0;
				  				  var opt = document.createElement("option");
					   opt.value= 0;
					   opt.innerHTML = ""; // whatever property it has

					   // then append it to the select element
					   app.appendChild(opt);
				  var data = JSON.parse(this.response);
				  console.log(data);
				  if (request.status >= 200 && request.status < 400) {
					data.data.docs.forEach(Country => {
					   var opt = document.createElement("option");
					   opt.value= Country._id;
					   opt.innerHTML = Country.name; // whatever property it has

					   // then append it to the select element
					   app.appendChild(opt);
					   index++;
					   //getUniversity();
					});
				  } else {
					const errorMessage = document.createElement('marquee');
					errorMessage.textContent = `Gah, it's not working!`;
					app.appendChild(errorMessage);
				  }
				}

				request.send();
			</script>
			</select>

		</div>
		<b>Choose University <b>
		<div class="form-group">
			<select class="form-control" name="university" id="university" onchange="getFaculty()" required>
			</select>
		</div>
		
		<b>Choose Faculty <b>
		<div class="form-group">
			<select class="form-control" name="faculty" id="faculty" onchange="getCourse()" required>
			</select>
		</div>
		
		<b>Choose Course <b>
          <div class="form-group">
			<select class="form-control" name="course" id="course" required>
			</select>
		  </div>
			 


          <div class="form-group py-3">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" required>
              <label class="custom-control-label">I agree to the <a class="ml-1" href="terms.html">terms of service</a></label>
            </div>
          </div>

          <div class="form-group">
            <button class="btn btn-block btn-primary" type="submit" onchange="Sendform()">Register</button>
			<!-- <a class="btn btn-block btn-primary" href="register_professor.html" >Step 2 professor</a> 
			<a class="btn btn-block btn-primary" href="register_student.html" >Step 2 student</a> -->
          </div>
		  
		  
        </form>

        <div class="divider">Or Register With</div>
        <div class="text-center">
          <a class="btn btn-circle btn-sm btn-facebook mr-2" href="#"><i class="fa fa-facebook"></i></a>
          <a class="btn btn-circle btn-sm btn-google mr-2" href="#"><i class="fa fa-google"></i></a>
          <a class="btn btn-circle btn-sm btn-twitter" href="#"><i class="fa fa-twitter"></i></a>
        </div>

        <hr class="w-30">
		<div id="university"></div>
		<script src="scripts.js"></script>
        <p class="text-center text-muted small-2">Already a member? <a href="user-login.html">Login here</a></p>
		
      </div>


    </main><!-- /.main-content -->


    <!-- Scripts -->
    <script src="./assets/js/page.min.js"></script>
    <script src="./assets/js/script.js"></script>
	
<script>
// Function Password
 var password = document.getElementById("st_password")
  , confirm_password = document.getElementById("confirm_password");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;


// Function Label 

$(".abc").each(function()
{
    $(this).change(function()
    {
        $(".abc").prop('checked',false);
        $(this).prop('checked',true);
    });
});

</script>

<script>
	function getUniversity() {


		var e=document.getElementById('country');
		var countryid=e.options[e.selectedIndex].value;
				var app = document.getElementById('university');
				var length = app.options.length;
				for(i=0; i<length; i++){
					app.options[i]=null;
				}
				var request = new XMLHttpRequest();
				request.open('GET', 'https://thestusmart.com/developer/api/universitybycountry/'+countryid, true);
				request.onload = function () {
				  var index=0;
				  				  var opt = document.createElement("option");
					   opt.value= 0;
					   opt.innerHTML = ""; // whatever property it has

					   // then append it to the select element
					   app.appendChild(opt);
				  var data = JSON.parse(this.response);
				  if (request.status >= 200 && request.status < 400) {
					data.data.docs.forEach(Country => {
					   var opt = document.createElement("option");
					   opt.value= Country._id;
					   opt.innerHTML = Country.name; // whatever property it has

					   // then append it to the select element
					   app.appendChild(opt);
					   index++;
					   //getFaculty();
					});
				  } else {
					const errorMessage = document.createElement('marquee');
					errorMessage.textContent = `Gah, it's not working!`;
					app.appendChild(errorMessage);
				  }
				}

				request.send();

		}
		
		
		function getFaculty() {


		var e=document.getElementById('university');
		var universityid=e.options[e.selectedIndex].value;
				var app = document.getElementById('faculty');
				var length = app.options.length;
				for(i=0; i<length; i++){
					app.options[i]=null;
				}
				var request = new XMLHttpRequest();
				request.open('GET', 'https://thestusmart.com/developer/api/facultybyunv/'+universityid, true);
				request.onload = function () {
				  var index=0;
				  				  var opt = document.createElement("option");
					   opt.value= 0;
					   opt.innerHTML = ""; // whatever property it has

					   // then append it to the select element
					   app.appendChild(opt);
				  var data = JSON.parse(this.response);
				  if (request.status >= 200 && request.status < 400) {
					data.data.docs.forEach(University => {
					   var opt = document.createElement("option");
					   opt.value= University._id;
					   opt.innerHTML = University.name; // whatever property it has

					   // then append it to the select element
					   app.appendChild(opt);
					   index++;
					   //getCourse();
					});
				  } else {
					const errorMessage = document.createElement('marquee');
					errorMessage.textContent = `Gah, it's not working!`;
					app.appendChild(errorMessage);
				  }
				}

				request.send();

		}
		
		function getCourse() {


		var e=document.getElementById('faculty');
		var facultyid=e.options[e.selectedIndex].value;
				var app = document.getElementById('course');
				var length = app.options.length;
				for(i=0; i<length; i++){
					app.options[i]=null;
				}
				var request = new XMLHttpRequest();
				request.open('GET', 'https://thestusmart.com/developer/api/coursebyfaculty/'+facultyid, true);
				request.onload = function () {
				  var index=0;
				  	   var opt = document.createElement("option");
					   opt.value= 0;
					   opt.innerHTML = ""; // whatever property it has

					   // then append it to the select element
					   app.appendChild(opt);
				  var data = JSON.parse(this.response);
				  if (request.status >= 200 && request.status < 400) {
					data.data.docs.forEach(Faculty => {
					   var opt = document.createElement("option");
					   opt.value= Faculty._id;
					   opt.innerHTML = Faculty.name; // whatever property it has

					   // then append it to the select element
					   app.appendChild(opt);
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
	
</script>


  </body>
</html>
