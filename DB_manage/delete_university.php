<?php

// Create the context for the request
$context = stream_context_create(array(
    'http' => array(
        // http://www.php.net/manual/en/context.http.php
        'method' => 'DELETE',
        'header' => "Authorization:\r\n".
            "Content-Type: application/json\r\n",
        'content' => ''
    )
));

// Send the request
$response = file_get_contents('https://thestusmart.com/developer/api/university/'.$_POST["university_delete"], FALSE, $context);

// Check for errors
if($response === FALSE){
    die('Error');
}

// Decode the response
$responseData = json_decode($response, TRUE);
if($responseData["success"])
{
	header("location: university_menu_upload.html");
}
// Print the date from the response
echo $response;
?>