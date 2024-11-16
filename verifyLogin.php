<?php

include "connection.php";
include "JWT.php";

$username=$_POST["username"];
$password= $_POST["password"];
$user_id = 1;
$user_type ="student";
$jwt_string = createJWT($user_id,$user_type);


http_response_code(200);
// verify in db
echo json_encode([
    "message"=>"Login Successful",
    "jwt"=> $jwt_string
]);