<?php 

include "connection.php";
include "JWT.php";
//jwt
$jwt_string="from header";

$user_id=verifyJWT($jwt_string);

//get enrolled courses from db
$courses =[
    [
        "course_id"=>1,
        "name"=>"PHP",
        "instructor"=>"Taha Taha"
    ],
    [     "course_id"=>2,   
        "name"=>"React",
        "instructor"=>"Taha Taha"
],
    [ "course_id"=>3,
        "name"=>"UI/UX",
        "instructor"=>"Nour Mshawrab"
    ]

];

echo json_encode([
    "courses"=>$courses
]);