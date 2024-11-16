<?php 

include "connection.php";
include "JWT.php";
//jwt
$jwt_string="from header";

$user_id=verifyJWT($jwt_string);

$course_id=$_POST["course_id"];
//get enrolled courses from db
$course =
    [
        "course_id"=>1,
        "name"=>"PHP",
        "instructor"=>"Taha Taha",
        "announcements"=>[["content"=>"Assignment uploaded for Monday"],["content"=>"Class time changed to 9:30-11"],["content"=>"Midterm Exam on Dec 1"]],
        "assignments"=> [
            [
                "title"=> "Expense Tracker",
                "due_date"=> "November 20, 11:59 pm",
            ],
            [
                "title"=> "E-learning",
                "due_date"=> "November 21, 11:59 pm"
            ],
            [
                "title"=> "Movie recommender",
                "due_date"=> "November 22, 12:00 pm"
            ]
        ]
    ];

echo json_encode([
    "course"=>$course
]);