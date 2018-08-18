<!DOCTYPE html>
<html lang="en">
  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="keywords" content="">

    <title>Stusmart — Subjects Upload</title>

    <!-- Styles -->
    <link href="../../assets/css/page.min.css" rel="stylesheet">
    <link href="../../assets/css/style.css" rel="stylesheet">
	<link href="../../assets/css/mycss.css" rel="stylesheet">

    <!-- Favicons -->
    <!--<link rel="apple-touch-icon" href="../assets/img/apple-touch-icon.png">
    <link rel="icon" href="../assets/img/favicon.png">-->
  </head>

  <body class="layout-centered bg-img" ">
	<div class="tab" >
		<button class="tablinks" onclick="openMethod(event, 'upload')" id="defaultOpen">Upload</button>
		<button class="tablinks" onclick="openMethod(event, 'modify')">Modify</button>
		<button class="tablinks" onclick="openMethod(event, 'delete')">Delete</button>
	</div>
    <!-- Main Content -->
    <main class="main-content">

      <div class="bg-white rounded shadow-7 w-400 mw-100 p-6">
	  <div id="upload" class="tabcontent" >
			<h5 class="mb-7">Upload Subject</h5>
		  <?php
		print_r($_GET);
	  
	  ?>
		<script>
			function populateCountry(id) {
					var app = document.getElementById(id);
					var request = new XMLHttpRequest();
					request.open('GET', 'http://178.128.53.38:4000/api/country', true);
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
			<form id="form_registration"action="upload_subject.php" method="post">
			
			<b>Choose Country<b>
			<div class="form-group" id="University_Upload">

			<select class="form-control" name="country" id="country" onchange="getState('country','state')" required >
				<script>
					populateCountry('country');
				</script>
			</select>

			</div>
			<b>Choose State <b>
			<div class="form-group">
				<select class="form-control" name="state" id="state" onchange="getUniversity('state','university')" >
				</select>
			</div>
			
			<b>Choose University <b>
			<div class="form-group">
				<select class="form-control" name="university" id="university" onchange="getFaculty('university','faculty')" >
				</select>
			</div>
			
			<b>Choose Faculty <b>
			<div class="form-group">
				<select class="form-control" name="faculty" id="faculty" onchange="getCourse('faculty','course')" >
				</select>
			</div>
			
			<b>Choose Course <b>
			<div class="form-group">
				<select class="form-control" name="course" id="course"  required>
				<?php if(isset($_GET['courseid'])) { ?>
						<option value= <?php  echo $_GET['courseid']; ?> ><?php  echo $_GET['courseid']; ?> </option>
						<?php  } ?> 
				</select>
			</div>
			
			<b>Write Subjects <b>
			  <div class="form-group">
				<input type="name" class="form-control" name="name" required>
			  </div>
			  
			 <b>Number <b>
			  <div class="form-group">
				<input type="semester" class="form-control" name="semester" required>
			  </div>

			  <div class="form-group">
				<button class="btn btn-block btn-primary" type="submit">Register</button>
			  </div>
			</form>
		</div>
		<!------------------------------------------------ DELETE SUBJECT ------------------------------------------------------------>
	    <div id="delete" class="tabcontent" >
			<h5 class="mb-7">Delete Subject</h5>
			<form id="form_registration" action="delete_subject.php"  method="post">

			<b>Choose Country <b>
			<select class="form-control" name="country_delete" id="country_delete" onchange="getState('country_delete','state_delete')" required >
				<script>
					populateCountry('country_delete');
				</script>
			</select>
			 
			<b>Choose State <b>
			<div class="form-group">
				<select class="form-control" name="state_delete" id="state_delete" required onchange="getUniversity('state_delete','university_delete')">
				</select>
			</div>
			
			<b>Choose University <b>
			<div class="form-group">
				<select class="form-control" name="university_delete" id="university_delete" required onchange="getFaculty('university_delete','faculty_delete')">
				</select>
			</div>
			
			<b>Choose Faculty <b>
			<div class="form-group">
				<select class="form-control" name="faculty_delete" id="faculty_delete" required onchange="getCourse('faculty_delete','course_delete')">
				</select>
			</div>
			
			<b>Choose Course <b>
			<div class="form-group">
				<select class="form-control" name="course_delete" id="course_delete" required onchange="getSubject('course_delete','subject_delete')">
				</select>
			</div>
			
			<b>Choose Subject <b>
			<div class="form-group">
				<select class="form-control" name="subject_delete" id="subject_delete" required>
				</select>
			</div>
				
			  <div class="form-group">
				<button class="btn btn-block btn-primary" type="submit">Cancel Faculty</button>
			  </div>
			  
			</form>
		</div>
		
		<!------------------------------------------------ MODIFY SUBJECT ------------------------------------------------------------>
		
		<div id="modify" class="tabcontent" >
			<h5 class="mb-7">Modify Subject</h5>
			<form id="form_registration" action="modify_subject.php"  method="post">

			<b>Choose Country <b>
			<select class="form-control" name="country_modify" id="country_modify" onchange="getState('country_modify','state_modify')" required >
				<script>
					populateCountry('country_modify');
				</script>
			</select>
			 
			<b>Choose State <b>
			<div class="form-group">
				<select class="form-control" name="state_modify" id="state_modify" required onchange="getUniversity('state_modify','university_modify')">
				</select>
			</div>
			
			<b>Choose University <b>
			<div class="form-group">
				<select class="form-control" name="university_modify" id="university_modify" required onchange="getFaculty('university_modify','faculty_modify')">
				</select>
			</div>
			
			<b>Choose Faculty <b>
			<div class="form-group">
				<select class="form-control" name="faculty_modify" id="faculty_modify" required onchange="getCourse('faculty_modify','course_modify')">
				</select>
			</div>
			
			<b>Choose Course <b>
			<div class="form-group">
				<select class="form-control" name="course_modify" id="course_modify" required onchange="getSubject('course_modify','subject_modify')">
				</select>
			</div>
			
			<b>Choose Subject <b>
			<div class="form-group">
				<select class="form-control" name="subject_modify" id="subject_modify" required>
				</select>
			</div>
			
			<b>Write Subjects <b>
			  <div class="form-group">
				<input type="name" class="form-control" name="name" required>
			 </div>
				
			  <div class="form-group">
				<button class="btn btn-block btn-primary" type="submit">Modify Faculty</button>
			  </div>
			  
			</form>
		</div>
		
			<a href="upload_menu.html">Back to menu</a>
			<hr class="w-30">

		  </div>

    </main><!-- /.main-content -->


    <!-- Scripts -->
    <script src="../assets/js/page.min.js"></script>
    <script src="../assets/js/script.js"></script>
	
<script>
	function getState(id,id2) {


		var e=document.getElementById(id);
		var countryid=e.options[e.selectedIndex].value;
				var app = document.getElementById(id2);
				while(app.firstChild){
				   app.removeChild(app.firstChild);
				}
				var length = app.options.length;
				for(i=0; i<length; i++){
					app.options[i]=null;
				}
				var request = new XMLHttpRequest();
				request.open('GET', 'http://178.128.53.38:4000/api/statebycountry/'+countryid, true);
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
					});
				  } else {
					const errorMessage = document.createElement('marquee');
					errorMessage.textContent = `Gah, it's not working!`;
					app.appendChild(errorMessage);
				  }
				}

				request.send();

		}
		
		
	function getUniversity(id,id2) {


		var e=document.getElementById(id);
		var stateid=e.options[e.selectedIndex].value;
				var app = document.getElementById(id2);
				while(app.firstChild){
				   app.removeChild(app.firstChild);
				}
				var length = app.options.length;
				for(i=0; i<length; i++){
					app.options[i]=null;
				}
				var request = new XMLHttpRequest();
				request.open('GET', 'http://178.128.53.38:4000/api/universitybystate/'+stateid, true);
				request.onload = function () {
				  var index=0;
				  var opt = document.createElement("option");
					   opt.value= 0;
					   opt.innerHTML = ""; // whatever property it has

					   // then append it to the select element
					   app.appendChild(opt);
				  var data = JSON.parse(this.response);
				  if (request.status >= 200 && request.status < 400) {
					data.data.docs.forEach(State => {
					   var opt = document.createElement("option");
					   opt.value= State._id;
					   opt.innerHTML = State.name; // whatever property it has

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
		
		
		function getFaculty(id,id2) {


		var e=document.getElementById(id);
		var universityid=e.options[e.selectedIndex].value;
				var app = document.getElementById(id2);
				var length = app.options.length;
				for(i=0; i<length; i++){
					app.options[i]=null;
				}
				var request = new XMLHttpRequest();
				request.open('GET', 'http://178.128.53.38:4000/api/facultybyuniversity/'+universityid, true);
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
		
	function getCourse(id,id2) {


		var e=document.getElementById(id);
		var facultyid=e.options[e.selectedIndex].value;
				var app = document.getElementById(id2);
				while(app.firstChild){
				   app.removeChild(app.firstChild);
				}
				var length = app.options.length;
				for(i=0; i<length; i++){
					app.options[i]=null;
				}
				var request = new XMLHttpRequest();
				request.open('GET', 'http://178.128.53.38:4000/api/coursebyfaculty/'+facultyid, true);
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
					   //getSubject();
					});
				  } else {
					const errorMessage = document.createElement('marquee');
					errorMessage.textContent = `Gah, it's not working!`;
					app.appendChild(errorMessage);
				  }
				}

				request.send();

		}
		
		function getSubject(id,id2) {


		var e=document.getElementById(id);
		var courseid=e.options[e.selectedIndex].value;
				var app = document.getElementById(id2);
				while(app.firstChild){
				   app.removeChild(app.firstChild);
				}
				var length = app.options.length;
				for(i=0; i<length; i++){
					app.options[i]=null;
				}
				var request = new XMLHttpRequest();
				request.open('GET', 'http://178.128.53.38:4000/api/subjectbycourse/'+courseid, true);
				request.onload = function () {
				  var index=0;
				  var opt = document.createElement("option");
					   opt.value= 0;
					   opt.innerHTML = ""; // whatever property it has

					   // then append it to the select element
					   app.appendChild(opt);
				  var data = JSON.parse(this.response);
				  if (request.status >= 200 && request.status < 400) {
					data.data.docs.forEach(Course => {
					   var opt = document.createElement("option");
					   opt.value= Course._id;
					   opt.innerHTML = Course.name; // whatever property it has

					   // then append it to the select element
					   app.appendChild(opt);
					   index++;
					   //getSubject();
					});
				  } else {
					const errorMessage = document.createElement('marquee');
					errorMessage.textContent = `Gah, it's not working!`;
					app.appendChild(errorMessage);
				  }
				}

				request.send();

		}
		function openMethod(evt, Method) {
			// Declare all variables
			var i, tabcontent, tablinks;

			// Get all elements with class="tabcontent" and hide them
			tabcontent = document.getElementsByClassName("tabcontent");
			for (i = 0; i < tabcontent.length; i++) {
				tabcontent[i].style.display = "none";
			}

			// Get all elements with class="tablinks" and remove the class "active"
			tablinks = document.getElementsByClassName("tablinks");
			for (i = 0; i < tablinks.length; i++) {
				tablinks[i].className = tablinks[i].className.replace(" active", "");
			}

			// Show the current tab, and add an "active" class to the button that opened the tab
			document.getElementById(Method).style.display = "block";
			evt.currentTarget.className += " active";
		 }
		  
		  

		// Get the element with id="defaultOpen" and click on it
		document.getElementById("defaultOpen").click();
</script>

  </body>
</html>
