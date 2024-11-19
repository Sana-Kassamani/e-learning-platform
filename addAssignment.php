<?php 

include "connection.php";
include "JWT.php";

$headers = getallheaders();
$jwt = $headers["Authorization"];

$payload=verifyJWT($jwt);
$title=$_POST["title"];
$description=$_POST["description"];
$due_date=$_POST["due_date"];
$course_id=$_POST["course_id"];

$query = $connection->prepare("INSERT INTO assignments (title, description, due_date, course_id) VALUES (?,?,?,?);");

$query->bind_param("sssi", $title,$description,$due_date,$course_id);
$query->execute();

if($query->affected_rows == 1) {
    
    http_response_code(200);
    echo json_encode([
    "message" => "Assignmnets added successfully",
    ]);
}
    
else {
        http_response_code(404);
    
        echo json_encode([
        "message" => "Assignment addition failed"
        ]);
    }


// catch(\Throwable $err){
//     http_response_code(401);
//     echo json_encode([
//         "error"=> $err,
//         "message"=> "Access Declined"
//     ]);

// }