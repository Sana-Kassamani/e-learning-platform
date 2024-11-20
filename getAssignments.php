<?php 

include "connection.php";
include "JWT.php";

$headers = getallheaders();
$jwt = $headers["Authorization"];

$payload=verifyJWT($jwt);
$course_id=$_POST["course_id"];

$query = $connection->prepare("SELECT * FROM assignments WHERE course_id =?;");
$query->bind_param("i", $course_id);

if($query->execute()) {
    $result = $query->get_result();
    $assignments = [];

    while($assign = $result->fetch_assoc())
        {
            $assignments[]=$assign;
        }
        
    http_response_code(200);
    echo json_encode([
    "message" => "Assignmnets retrieved successfully",
    "assignments"=>$assignments
    ]);
}
    
else {
        http_response_code(404);
    
        echo json_encode([
        "message" => "Assignments not found"
        ]);
    }


// catch(\Throwable $err){
//     http_response_code(401);
//     echo json_encode([
//         "error"=> $err,
//         "message"=> "Access Declined"
//     ]);

// }