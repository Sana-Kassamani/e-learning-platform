<?php 

include "connection.php";
include "JWT.php";

$headers = getallheaders();
$jwt = $headers["Authorization"];

$payload=verifyJWT($jwt);

$id = $payload->user_id;

$query = $connection->prepare("SELECT c.*, u.first_name, u.last_name FROM courses as c
                                 INNER JOIN users as u on c.instructor_id=u.user_id where u.user_id=?;");
$query->bind_param("i", $id);
$query->execute();

$result = $query->get_result();

if($result->num_rows != 0) {
    $courses = [];
    while($course = $result->fetch_assoc())
    {
        $courses[]=$course;
    }
    

    http_response_code(200);
    echo json_encode([
        "message"=>"Retrieved courses successfully",
        "courses"=>$courses
    ]);

} 
else {
    http_response_code(404);

    echo json_encode([
    "message" => "Courses of instructor not found"
    ]);
}


