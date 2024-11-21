<?php 

include "connection.php";
include "JWT.php";

$headers = getallheaders();
$jwt = $headers["Authorization"];

$payload=verifyJWT($jwt);
$course_id=$_POST["course_id"];
$user_type_id=3;

$query = $connection->prepare("Select * FROM users where user_type_id=3 and user_id not in 
                            (SELECT e.user_id FROM courses as c INNER Join enrollments as e on c.course_id=e.course_id where c.course_id=?);");

$query->bind_param("i",$course_id);




if($query->execute()) {
    $result = $query->get_result();
    $students = [];
    while($student= $result->fetch_assoc())
    {
        $students[]=$student;
    }
    

    http_response_code(200);
    echo json_encode([
        "message"=>"Retrieved uninvited students successfully",
        "students"=>$students
    ]);

} 
else {
    http_response_code(404);

    echo json_encode([
    "message" => "uninvited students not found"
    ]);
}

