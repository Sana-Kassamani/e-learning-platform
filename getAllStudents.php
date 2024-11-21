<?php 

include "connection.php";
include "JWT.php";

$headers = getallheaders();
$jwt = $headers["Authorization"];

$payload=verifyJWT($jwt);

$user_type_id=3;

$query = $connection->prepare("SELECT * FROM users where user_type_id=?;");

$query->bind_param("i",$user_type_id);
$query->execute();

$result = $query->get_result();

if($result->num_rows != 0) {
    $students = [];
    while($student= $result->fetch_assoc())
    {
        $students[]=$student;
    }
    

    http_response_code(200);
    echo json_encode([
        "message"=>"Retrieved all courses successfully",
        "students"=>$students
    ]);

} 
else {
    http_response_code(404);

    echo json_encode([
    "message" => "All Courses not found"
    ]);
}

