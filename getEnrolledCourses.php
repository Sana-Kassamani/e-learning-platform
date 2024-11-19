<?php 

include "connection.php";
include "JWT.php";

$headers = getallheaders();
$jwt = $headers["Authorization"];

$payload=verifyJWT($jwt);

$id = $payload->user_id;

$query = $connection->prepare("SELECT c.*,u.first_name,u.last_name FROM courses as c INNER JOIN enrollments as e on c.course_id=e.course_id 
                                INNER JOIN users as u on c.instructor_id=u.user_id where e.user_id=?;");
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
    "message" => "Courses of user not found"
    ]);
}


// //get enrolled courses from db
// $courses =[
//     [
//         "course_id"=>1,
//         "name"=>"PHP",
//         "instructor"=>"Taha Taha"
//     ],
//     [     "course_id"=>2,   
//         "name"=>"React",
//         "instructor"=>"Taha Taha"
// ],
//     [ "course_id"=>3,
//         "name"=>"UI/UX",
//         "instructor"=>"Nour Mshawrab"
//     ]

// ];

// echo json_encode([
//     "courses"=>$courses
// ]);