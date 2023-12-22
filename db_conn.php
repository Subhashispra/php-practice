<?php 

$sName = "24.199.98.118";
$uName = "admin";
$pass = "a9dd5aca12f64049dc8d36800ca3d9a8111501a21e730a9d";
$db_name = "auth_db";

try {
    $conn = new PDO("mysql:host=$sName;dbname=$db_name", 
                    $uName, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
  echo "Connection failed : ". $e->getMessage();
}
