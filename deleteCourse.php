<?php 

include "connection.php";
include "JWT.php";

$headers = getallheaders();
$jwt = $headers["Authorization"];

$payload=verifyJWT($jwt);
$course_id=$_POST["course_id"];


$query = $connection->prepare("DELETE From courses where course_id =?");

$query->bind_param("i", $course_id);
$query->execute();

if($query->affected_rows == 1) {
    
    http_response_code(200);
    echo json_encode([
    "message" => "Course deleted successfully",
    ]);
}
    
else {
        http_response_code(404);
    
        echo json_encode([
        "message" => "course deleting failed"
        ]);
    }


// catch(\Throwable $err){
//     http_response_code(401);
//     echo json_encode([
//         "error"=> $err,
//         "message"=> "Access Declined"
//     ]);

// }