<?php

require "vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

define("SECRET_KEY", "MySecretKey");

function createJWT($payload){

    $token= JWT::encode($payload,SECRET_KEY,"HS256");
    return $token;
}
function verifyJWT($jwtString){
    $key = new Key(SECRET_KEY,"HS256");
    $payload=JWT::decode($jwtString,$key);
    return $payload;
}