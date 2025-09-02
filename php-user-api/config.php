<?php
// config.php
$servername = "localhost";
$username = "root";
$password = ""; // XAMPP default
$dbname = "user_management";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "DB connection failed: " . $conn->connect_error]));
}
$conn->set_charset('utf8mb4');
?>
