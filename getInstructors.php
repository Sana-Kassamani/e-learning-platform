<?php 

include "connection.php";
include "JWT.php";

$headers = getallheaders();
$jwt = $headers["Authorization"];

$payload=verifyJWT($jwt);

$id = $payload->user_id;

$user_type_id=2;
$query = $connection->prepare("SELECT user_id, first_name,last_name FROM users where user_type_id=?");
$query->bind_param("i",$user_type_id);

$query->execute();

$result = $query->get_result();

if($result->num_rows != 0) {
    $instructors = [];
    while($instructor = $result->fetch_assoc())
    {
        $instructors[]=$instructor;
    }
    

    http_response_code(200);
    echo json_encode([
        "message"=>"Retrieved all instructors successfully",
        "instructors"=>$instructors
    ]);

} 
else {
    http_response_code(404);

    echo json_encode([
    "message" => "All instructors not found"
    ]);
}

