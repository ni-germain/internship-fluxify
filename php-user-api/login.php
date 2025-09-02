<?php
header('Content-Type: application/json');
session_start();  // Start PHP session
require_once 'config.php'; // Include DB connection

// Get POST data (JSON)
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) { $input = $_POST; }

$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

// Validate required fields
if ($email === '' || $password === '') {
    http_response_code(400);
    echo json_encode(["error" => "email and password are required"]);
    exit;
}

// Find user by email
$stmt = $conn->prepare('SELECT id, name, email, password, created_at FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

// Check if user exists and password matches
if (!$user || !password_verify($password, $user['password'])) {
    http_response_code(401);
    echo json_encode(["error" => "Invalid credentials"]);
    exit;
}

// Store user id in session
$_SESSION['user_id'] = $user['id'];

// Return success response
echo json_encode([
    "message" => "Logged in successfully",
    "user" => [
        "id" => (int)$user['id'],
        "name" => $user['name'],
        "email" => $user['email'],
        "created_at" => $user['created_at']
    ]
]);

$stmt->close();
$conn->close();
