<?php 

include "connection.php";
include "JWT.php";


$headers = getallheaders();
$jwt = $headers["Authorization"];

$payload=verifyJWT($jwt);

$id = $payload->user_id;

$query = $connection->prepare("SELECT * FROM users WHERE user_id = ?");
$query->bind_param("i", $id);
$query->execute();

$result = $query->get_result();

if($result->num_rows != 0) {
    $user = $result->fetch_assoc();

    http_response_code(200);
    echo json_encode([
    "message" => "Name retrieved successfully",
    "name" => $user['first_name'] . ' ' . $user['last_name'],
    ]);

} 
else {
    http_response_code(404);

    echo json_encode([
    "message" => "User not found"
    ]);
}
