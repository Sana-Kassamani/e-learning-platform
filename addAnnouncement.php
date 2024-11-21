<?php 

include "connection.php";
include "JWT.php";

$headers = getallheaders();
$jwt = $headers["Authorization"];

$payload=verifyJWT($jwt);
$content=$_POST["content"]?? null;
$course_id=$_POST["course_id"]?? null;

if($content == null || $course_id == null){
    http_response_code(400);
    echo json_encode([
        "message"=>"all fields required"
    ]);
}
$query = $connection->prepare("INSERT INTO announcements (content, course_id) VALUES (?,?);");

$query->bind_param("si", $content,$course_id);
$query->execute();

if($query->affected_rows == 1) {
    
    http_response_code(200);
    echo json_encode([
    "message" => "Announcement added successfully",
    ]);
}
    
else {
        http_response_code(404);
    
        echo json_encode([
        "message" => "Announcement addition failed"
        ]);
    }


// catch(\Throwable $err){
//     http_response_code(401);
//     echo json_encode([
//         "error"=> $err,
//         "message"=> "Access Declined"
//     ]);

// }