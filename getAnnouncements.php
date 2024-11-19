<?php 

include "connection.php";
include "JWT.php";

$headers = getallheaders();
$jwt = $headers["Authorization"];

    $payload=verifyJWT($jwt);
    $course_id=$_POST["course_id"];
    
    $query = $connection->prepare("SELECT * FROM announcements WHERE course_id =?;");
    $query->bind_param("i", $course_id);
    $query->execute();
    $result = $query->get_result();

if($result->num_rows != 0) {
    $announcements = [];

    while($announ = $result->fetch_assoc())
        {
            $announcements[]=$announ;
        }
        
    http_response_code(200);
    echo json_encode([
    "message" => "Announcements retrieved successfully",
    "announcements"=>$announcements
    ]);
}
    
else {
        http_response_code(404);
    
        echo json_encode([
        "message" => "Announcements not found"
        ]);
    }

// } 
// catch(\Throwable $err){
//     http_response_code(401);
//     echo json_encode([
//         "error"=> $err,
//         "message"=> "Access Declined"
//     ]);

// }