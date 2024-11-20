<?php 

include "connection.php";
include "JWT.php";

$headers = getallheaders();
$jwt = $headers["Authorization"];

$payload=verifyJWT($jwt);
$course_id=$_POST["course_id"];

$query = $connection->prepare("SELECT c.*, u.first_name,u.last_name FROM courses as c 
                                LEFT JOIN users as u on c.instructor_id=u.user_id WHERE c.course_id=?;");
$query->bind_param("i", $course_id);
$query->execute();
$result = $query->get_result();
echo json_encode(
[
    "message"=> $result
]
);
if($result->num_rows != 0) {

$course = $result->fetch_assoc();
    
http_response_code(200);
echo json_encode([
"message" => "Single Course retrieved successfully",
"course"=>$course
]);
}

else {
    http_response_code(404);

    echo json_encode([
    "message" => "Course not found"
    ]);
}
