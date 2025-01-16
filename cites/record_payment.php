<?php
// record-payment.php
header('Content-Type: application/json');

// Check if the data is received via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputData = json_decode(file_get_contents('php://input'), true);
    $purchase_id = $inputData['purchase_id'];
    $payment_amount = $inputData['payment_amount'];
    $payment_method = $inputData['payment_method'];

    // Ensure the payment amount is valid
    if (is_numeric($payment_amount) && $payment_amount > 0) {
        // Insert payment record into the database
        $stmt = $pdo->prepare("INSERT INTO payments (purchase_id, payment_amount, payment_method) VALUES (:purchase_id, :payment_amount, :payment_method)");
        $stmt->execute([
            'purchase_id' => $purchase_id,
            'payment_amount' => $payment_amount,
            'payment_method' => $payment_method
        ]);

        // Return success response with payment amount
        echo json_encode(['success' => true, 'payment_amount' => number_format($payment_amount, 2)]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid payment amount']);
    }
}
?>
