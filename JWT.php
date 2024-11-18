<?php

require "vendor/autoload.php";
use Firebase\JWT\JWT;

$secret_key="MySecretKey";

function createJWT($payload){

    $token= JWT::encode($payload,$secret_key,"HS256");
    return $token;
}
function verifyJWT($jwtString){
    $key = new Key($secret_key,"HS256");
    $payload=JWT::decode($jwtString,$key);
    return $payload;
}