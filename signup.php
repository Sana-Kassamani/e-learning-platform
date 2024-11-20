<?php
include "connection.php";

$username=$_POST['username']??null;
$password=$_POST['password']??null;
$first_name=$_POST['first_name']??null;
$last_name=$_POST['last_name']??null;

if(!$username || !$password || !$first_name || !$last_name || !$user_type_id)
{
  http_response_code(400);
    echo json_encode([
    "message"=> "All fields are required"
  ]);
}
else {
  $checkUsername=$connection->prepare("SELECT * from users WHERE username=?");
$checkUsername->bind_param("s",$username);

$checkUsername->execute();

if($checkUsername->get_result()->num_rows>0)
{
    http_response_code(400);
    echo json_encode([
    "message"=> "Name is already registered"
  ]);
}
else{

  $hashed=password_hash($password,PASSWORD_DEFAULT);
  $query=$connection->prepare("INSERT INTO users(username, first_name,last_name, password,user_type_id) VALUES (?,?,?,?,?)");
  $query->bind_param("ssssi",$username,$first_name,$last_name,$hashed,$user_type_id);

  $query->execute();
  $result=$query->affected_rows;

  if($result!=0)
  {
    $inserted_id = $connection->insert_id;
    $result = $connection->query("SELECT * FROM users WHERE user_id = $inserted_id");
    $inserted_row = $result->fetch_assoc();
    http_response_code(200);
    echo json_encode([
      "message"=>"Created",
      "inserted_row"=>  $inserted_row
  ]);
  }else
  {
    http_response_code(400);
    echo json_encode([
    "message"=> "Could no create records",
  ]);
  }

}


}
