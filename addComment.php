<?php 

include "connection.php";
include "JWT.php";

$headers = getallheaders();
$jwt = $headers["Authorization"];

$payload=verifyJWT($jwt);

$user_id=$payload->user_id;

$content=$_POST["content"];
$is_private = $_POST['is_private'] === 'true' ? 1 : 0;
$assignment_id=$_POST["assignment_id"];


$query = $connection->prepare("INSERT INTO comments (content,is_private,student_id,assignment_id)
VALUES (?, ?, ?, ?);");

$query->bind_param("siii",$content,$is_private,$user_id,$assignment_id );
$query->execute();

if($query->affected_rows == 1) {
    // $inserted_id = $connection->insert_id;
    // $result = $connection->query("SELECT * FROM comments WHERE comment_id = $inserted_id");
    // $inserted_row = $result->fetch_assoc();
    http_response_code(200);
    echo json_encode([
    "message" => "Comment added successfully",
    "inserted_row"=>$inserted_row
    ]);
}
    
else {
        http_response_code(404);
    
        echo json_encode([
        "message" => "Comment addition failed"
        ]);
    }


// catch(\Throwable $err){
//     http_response_code(401);
//     echo json_encode([
//         "error"=> $err,
//         "message"=> "Access Declined"
//     ]);

// }