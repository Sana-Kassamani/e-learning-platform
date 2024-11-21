<?php 

include "connection.php";
include "JWT.php";

$headers = getallheaders();
$jwt = $headers["Authorization"];

$payload=verifyJWT($jwt);

$user_id= $_POST["user_id"];
$banned = $_POST["banned"];

$query = $connection->prepare("UPDATE users SET banned=? WHERE user_id = ?;");

$query->bind_param("ii",$banned,$user_id);



if($query->execute())
{
    http_response_code(200);
    echo json_encode([
        "message"=> "User banned updated"
    ]);
}
else{
    http_response_code(400);
    echo json_encode([
        "message"=> "error updating banned in user"
    ]);
}


