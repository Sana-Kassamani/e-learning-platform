
<?php 


include "JWT.php";

$headers = getallheaders();
$jwt = $headers["Authorization"];

$payload=verifyJWT($jwt);
$user_type_id = 2;

include "signup.php";
