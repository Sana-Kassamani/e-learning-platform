<?php 

include "connection.php";
include "JWT.php";
//jwt
$jwt_string="from header";

$user_id=verifyJWT($jwt_string);


// get name from db
$name = "Joe";
http_response_code(200);
echo json_encode([
    "name"=> $name,
]);