<?php
header('Content-Type: application/json');
session_start();  // Start PHP session
require_once 'config.php'; // Include DB connection

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Not authenticated"]);
    exit;
}

// Query all users
$sql = 'SELECT id, name, email, created_at FROM users ORDER BY id DESC';
$result = $conn->query($sql);

$users = [];
while ($row = $result->fetch_assoc()) {
    $row['id'] = (int)$row['id']; // ensure id is integer
    $users[] = $row;
}

// Return users as JSON
echo json_encode($users);

// Close connection
$conn->close();
