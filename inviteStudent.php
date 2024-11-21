<?php 

include "connection.php";
include "JWT.php";

$headers = getallheaders();
$jwt = $headers["Authorization"];

$payload=verifyJWT($jwt);
$student_id = $_POST["student_id"];
$course_id=$_POST["course_id"];

$query = $connection->prepare("INSERT INTO enrollments (user_id, course_id, is_enrolled, is_invited)
VALUES (?, ?, 0, 1);");

$query->bind_param("ii", $student_id,$course_id);
$query->execute();

if($query->affected_rows == 1) {
    // $inserted_id = $connection->insert_id;
    // $result = $connection->query("SELECT * FROM courses WHERE course_id = $inserted_id");
    // $inserted_row = $result->fetch_assoc();
    http_response_code(200);
    echo json_encode([
    "message" => "Invitation added successfully",
    // "inserted_row"=>$inserted_row
    ]);
}
    
else {
        http_response_code(404);
    
        echo json_encode([
        "message" => "Invitation failed"
        ]);
    }


// catch(\Throwable $err){
//     http_response_code(401);
//     echo json_encode([
//         "error"=> $err,
//         "message"=> "Access Declined"
//     ]);

// }