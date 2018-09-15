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
$response = file_get_contents('https://thestusmart.com/developer/api/subject/'.$_POST["subject_delete"], FALSE, $context);

// Check for errors
if($response === FALSE){
    die('Error');
}

// Decode the response
$responseData = json_decode($response, TRUE);
if($responseData["success"])
{
	header("location: subject_menu_upload.php");
}
// Print the date from the response
echo $response;
?>