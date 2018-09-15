<!DOCTYPE html>
<html lang="en">
	<?php print_r($_POST); ?>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="keywords" content="">

    <title>StuSmart — Register Student</title>

    <!-- Styles -->
    <link href="./assets/css/page.min.css" rel="stylesheet">
    <link href="./assets/css/style.css" rel="stylesheet">
	<link href="./assets/css/mycss.css" rel="stylesheet">

    <!-- Favicons -->
    <link rel="apple-touch-icon" href="./assets/img/apple-touch-icon.png">
    <link rel="icon" href="./assets/img/favicon.png">
  </head>

  <body class="layout-centered bg-img" style="background-image: url(./assets/img/bg/4.jpg);">


    <!-- Main Content -->
    <main class="main-content">

      <div class="bg-white rounded shadow-7 w-400 mw-100 p-6">
        <h5 class="mb-7" >Welcome <?php echo $_POST["firstname"]; echo " ";echo $_POST["lastname"];?> ... Tell us something</h5>

        <form action="main_page_student.html" id="form_registration" method="post">
		<b>Choose your University<b>
		<div class="form-group" id="University">

		<select class="form-control" name="University" id="university" onchange="getCourses()" required >
			<script>
				var app = document.getElementById('university');
				var request = new XMLHttpRequest();
				request.open('GET', 'https://thestusmart.com/developer/api/university', true);
				request.onload = function () {
				  var index=0;
				  var data = JSON.parse(this.response);
				  console.log(data);
				  if (request.status >= 200 && request.status < 400) {
					data.data.docs.forEach(University => {
					   var opt = document.createElement("option");
					   opt.value= University._id;
					   opt.innerHTML = University.name; // whatever property it has

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
			</script>
			</select>

		</div>

		<a class="btn btn-block btn-primary" href="best_courses" >I can not find my university</a>

		<select class="form-control" name="Courses" id="courses" required>
		</select>
		
          <div class="form-group">
            <button class="btn btn-block btn-primary" type="submit">Register</button>
			<!--<a class="btn btn-block btn-primary" href="main_page_student.html" >Register</a> -->
          </div>
		  
		  
        </form>
		

        <hr class="w-30">

        <p class="text-center text-muted small-2">Already a member? <a href="user-login.html">Login here</a></p>
      </div>

    </main><!-- /.main-content -->


    <!-- Scripts -->
    <script src="./assets/js/page.min.js"></script>
    <script src="./assets/js/script.js"></script>
	
	<script>
		//corsi dopo aver scelto l'unviersità
		function getCourses() {	


		var e=document.getElementById('university');
		var universityid=e.options[e.selectedIndex].value;
				var app = document.getElementById('courses');
				var length = app.options.length;
				for(i=0; i<length; i++){
					app.options[i]=null;
				}
				var request = new XMLHttpRequest();
				request.open('GET', 'https://thestusmart.com/developer/api/coursebyunv/'+universityid, true);
				request.onload = function () {
				  var index=0;
				  var data = JSON.parse(this.response);
				  if (request.status >= 200 && request.status < 400) {
					data.data.docs.forEach(University => {
					   var opt = document.createElement("option");
					   opt.value= index;
					   opt.innerHTML = University.name; // whatever property it has

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

			   // var x = document.getElementById("courses");
				//if (x.style.display === "none") {
				//	x.style.display = "block";
				//} else {
				//	x.style.display = "none";
			//	}

		}
	</script>

  </body>
</html>
