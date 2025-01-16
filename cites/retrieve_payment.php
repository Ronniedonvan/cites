<?php
// Get all payments with corresponding purchase details
$stmt = $pdo->query("SELECT p.payment_id, p.payment_amount, p.payment_method, p.payment_date, pu.purchase_id, i.name AS item_name 
                     FROM payments p
                     JOIN purchases pu ON p.purchase_id = pu.purchase_id
                     JOIN items i ON pu.item_id = i.id");

$payments = $stmt->fetchAll();

foreach ($payments as $payment) {
    echo "<p>Payment ID: {$payment['payment_id']}, Item: {$payment['item_name']}, Payment Amount: KES {$payment['payment_amount']}, Method: {$payment['payment_method']}, Date: {$payment['payment_date']}</p>";
}
?>
