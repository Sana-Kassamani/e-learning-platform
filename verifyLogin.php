<?php

include "connection.php";

$username=$_POST["username"];
$password= $_POST["password"];

// verify in db
echo json_encode([
    "message"=>"Login Successful"
]);