<?php

$postData = array(
    'name' => $_POST["name"]
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

// Send the request
$response = file_get_contents('http://178.128.53.38:4000/api/country/'.$_POST["country_modify"], FALSE, $context);

// Check for errors
if($response === FALSE){
    die('Error');
}

// Decode the response
$responseData = json_decode($response, TRUE);
if($responseData["success"])
{
	header("location: country_menu_upload.html");
}
// Print the date from the response
echo $response;
?>