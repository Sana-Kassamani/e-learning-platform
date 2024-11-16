<?php 

include "connection.php";
include "JWT.php";
//jwt
$jwt_string="from header";

$user_id=verifyJWT($jwt_string);

//get enrolled courses from db
$courses =[
    [
        "name"=>"PHP",
        "instructor"=>"Taha Taha"
    ],
    [        "name"=>"React",
        "instructor"=>"Taha Taha"
],
    [
        "name"=>"UI/UX",
        "instructor"=>"Nour Mshawrab"
    ]

];

echo json_encode([
    "courses"=>$courses
]);