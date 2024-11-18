<?php

include "connection.php";
include "JWT.php";

$username=$_POST["username"]?? null;
$password= $_POST["password"]?? null;

if($username == null || $password == null){
    http_response_code(400);
    echo json_encode([
        "message"=>"Credentials required"
    ]);
}
$query = $connection->prepare("SELECT * FROM users WHERE username = ?");
$query->bind_param("s", $username);
$query->execute();

$result = $query->get_result();
if($result->num_rows != 0){
    $user = $result->fetch_assoc(); //since 1 row
    $check_ban = $user["banned"]; // check if ban
    $check_pass=password_verify($password,$user["password"]); // check if correct password

    if($check_pass && !$check_ban){
        $payload = [
            "user_id"=> $user["user_id"],
            "user_type_id"=> $user["user_type_id"] //1 for admin, 2 for instructor, 3 for student
        ];
        $jwt_string = createJWT($user_id,$user_type);
        http_response_code(200);
        // verify in db
        echo json_encode([
            "message"=>"Login Successful",
            "jwt"=> $jwt_string,
            "user_type"=>$user_type
        ]);

    }
    else if(!$check_pass)
    {
        http_response_code(401);
        echo json_encode([
            "message" => "Invalid Credentials",
        ]);
    }
    else { // checkban is true
        http_response_code(403);
        echo json_encode([
            "message"=> "You are banned"
        ]);
    }
}
else{
    http_response_code(401);
    echo json_encode([
         "message" => "Invalid Credentials"
    ]);
}
