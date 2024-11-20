<?php 

include "connection.php";
include "JWT.php";

$headers = getallheaders();
$jwt = $headers["Authorization"];

$payload=verifyJWT($jwt);
$title=$_POST["title"];
$description=$_POST["description"];

$query = $connection->prepare("INSERT INTO courses (title, description) VALUES (?,?);");

$query->bind_param("ss", $title,$description);
$query->execute();

if($query->affected_rows == 1) {
    $inserted_id = $connection->insert_id;
    $result = $connection->query("SELECT * FROM courses WHERE course_id = $inserted_id");
    $inserted_row = $result->fetch_assoc();
    http_response_code(200);
    echo json_encode([
    "message" => "Course added successfully",
    "inserted_row"=>$inserted_row
    ]);
}
    
else {
        http_response_code(404);
    
        echo json_encode([
        "message" => "course addition failed"
        ]);
    }


// catch(\Throwable $err){
//     http_response_code(401);
//     echo json_encode([
//         "error"=> $err,
//         "message"=> "Access Declined"
//     ]);

// }