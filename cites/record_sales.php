<?php
// Assuming you have a connection to your database in $pdo

$data = json_decode(file_get_contents('php://input'), true);

$item_id = $data['item_id'];
$quantity = $data['quantity'];
$total_amount = $data['total_amount'];

// Insert sale into the database
$stmt = $pdo->prepare("INSERT INTO sales (item_id, quantity, total_amount) VALUES (?, ?, ?)");
$stmt->execute([$item_id, $quantity, $total_amount]);

// Check if the insertion was successful
if ($stmt->rowCount()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
