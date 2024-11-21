<?php 

include "connection.php";
include "JWT.php";

$headers = getallheaders();
$jwt = $headers["Authorization"];

$payload=verifyJWT($jwt);
$id = $payload->user_id;
$assignment_id=$_POST["assignment_id"];
// $file=$_POST["file"];
$file = $_FILES['file'];

$file_name = $file['name'];

$file_type = $file ['type'];

$file_size = $file ['size'];

$file_path = $file ['tmp_name'];


$target_directory = 'images/';
$target_file = $target_directory . basename($file_name);

if(move_uploaded_file($file_path, $target_file))
{
$query = $connection->prepare("INSERT INTO submissions (student_id,assignment_id,file) VALUES (?,?,?);;");

$query->bind_param("iis", $id,$assignment_id,$target_file);
if($query->execute()) {
    $inserted_id = $connection->insert_id;
    $result = $connection->query("SELECT * FROM submissions WHERE submission_id = $inserted_id");
    $inserted_row = $result->fetch_assoc();
    http_response_code(200);
    echo json_encode([
    "message" => "Submission added successfully",
    "inserted_row"=>$inserted_row
    ]);
}
    
else {
    http_response_code(500);
    echo json_encode([
        "message" => "Failed to add submission to the database."
    ]);
    }
    
}
else{

    http_response_code(500);
    echo json_encode([
        "message" => "Failed to upload file."
    ]);
}



// catch(\Throwable $err){
//     http_response_code(401);
//     echo json_encode([
//         "error"=> $err,
//         "message"=> "Access Declined"
//     ]);

// }