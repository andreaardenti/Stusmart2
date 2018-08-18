<?php

checksubjects();

function makecomplete(){
$token="JWT ".$_POST["token"];
	$postData = array(
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

$response = file_get_contents('http://178.128.53.38:4000/api/professors/'.$_POST["user_id"], FALSE, $context);

echo $response;
	// Check for errors
	if($response === FALSE){
		die('Error');
	}

	// Decode the respons
	$responseData = json_decode($response, TRUE);
	if($responseData["success"]){
	  header("location:http://www.thestusmart.com/Professor/stusmart/upload_content.html?id=".$_POST["user_id"]);
	}else{

  header("location: register2_professor.php");
  }

	// Print the date from the response
}



function checksubjects(){
	// Create the context for the request
	$context = stream_context_create(array(
		'http' => array(
			// http://www.php.net/manual/en/context.http.php
			'method' => 'GET',
			'header' => "Authorization:\r\n".
				"Content-Type: application/json\r\n",
			'content' => ''
		)
	));

	$response = file_get_contents('http://178.128.53.38:4000/api/professors/'.$_POST["user_id"], FALSE, $context);

  	echo $response;

	if($response === FALSE){
		die('Error');
	}
	$responseData = json_decode($response, TRUE);
	if($responseData["success"])
	{

if(sizeof($responseData["message"]["subjectids"])>0){
	makecomplete();
}else{
	header("location: register2_professor.php");

}
	}else {
		header("location: register2_professor.php");
  }


}
?>
