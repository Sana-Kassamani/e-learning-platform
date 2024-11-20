<?php 

include "connection.php";
include "JWT.php";

$headers = getallheaders();
$jwt = $headers["Authorization"];

$payload=verifyJWT($jwt);

$course_id=$_POST["course_id"]??null;
$instructor_id =$_POST["instructor_id"]?? null;

if(!$course_id || !$instructor_id)
{
    http_response_code(404);

    echo json_encode([
    "message" => "Failed to Assign instructor to course. Fields are required"
    ]);

}
else{
    $query = $connection->prepare("UPDATE courses SET instructor_id =? where course_id = ?;");

$query->bind_param("ii", $instructor_id,$course_id);

if($query->execute()) {
    http_response_code(200);
    echo json_encode([
        "message"=>"Assigned instructor to course successfully"
    ]);

} 
else {
    http_response_code(404);

    echo json_encode([
    "message" => "Failed to Assign instructor to course "
    ]);
}


}
