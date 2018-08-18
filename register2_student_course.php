<?php
$token="JWT ".$_POST["token"];
	$postData = array(
		'courseid' => $_POST["course"],
  		'isComplete' => true,
      'token'=>$token
	);
	// Create the context for the request
	$context = stream_context_create(array(
		'http' => array(
			// http://www.php.net/manual/en/context.http.php
			'method' => 'PUT',
			'header' => "Authorization:\r\n".
				"Content-Type: application/json\r\n",
			'content' => json_encode($postData)
		)
	));

$response = file_get_contents('http://178.128.53.38:4000/api/users/'.$_POST["user_id"], FALSE, $context);

	// Check for errors
	if($response === FALSE){
		die('Error');
	}

	// Decode the response
	$responseData = json_decode($response, TRUE);
	if($responseData["success"])
	{header("location:main_page_student.php");
	}else{

  header("location:register2_student.html");
  }

	// Print the date from the response
	echo $response;
?>
