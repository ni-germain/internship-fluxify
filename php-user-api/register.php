<?php
header('Content-Type: application/json');
require_once 'config.php'; // Include DB connection

// Get POST data (JSON)
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) { $input = $_POST; }

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

// Validate required fields
if ($name === '' || $email === '' || $password === '') {
    http_response_code(400);
    echo json_encode(["error" => "name, email, and password are required"]);
    exit;
}

// Check if email already exists
$stmt = $conn->prepare('SELECT id FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    http_response_code(409);
    echo json_encode(["error" => "Email already registered"]);
    exit;
}
$stmt->close();

// Hash the password
$hash = password_hash($password, PASSWORD_BCRYPT);

// Insert user into database
$stmt = $conn->prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
$stmt->bind_param('sss', $name, $email, $hash);

if ($stmt->execute()) {
    echo json_encode([
        "message" => "User registered successfully",
        "user" => ["id" => $stmt->insert_id, "name" => $name, "email" => $email]
    ]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Insert failed"]);
}

$stmt->close();
$conn->close();
