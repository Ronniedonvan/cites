<?php
// record-purchase.php
header('Content-Type: application/json');

// Check if the data is received via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputData = json_decode(file_get_contents('php://input'), true);
    $product_id = $inputData['product_id'];
    $quantity = $inputData['quantity'];

    // Ensure product_id and quantity are valid
    if (is_numeric($product_id) && is_numeric($quantity) && $quantity > 0) {
        // Get the item price from the items table
        $stmt = $pdo->prepare("SELECT price FROM items WHERE id = :item_id");
        $stmt->execute(['item_id' => $product_id]);
        $item = $stmt->fetch();

        if ($item) {
            $price = $item['price'];
            $total_amount = $price * $quantity;

            // Insert purchase data into the database
            $stmt = $pdo->prepare("INSERT INTO purchases (item_id, quantity, total_amount) VALUES (:item_id, :quantity, :total_amount)");
            $stmt->execute([
                'item_id' => $product_id,
                'quantity' => $quantity,
                'total_amount' => $total_amount
            ]);

            // Return success response with total amount
            echo json_encode(['success' => true, 'total_amount' => number_format($total_amount, 2)]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Item not found']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid data']);
    }
}
?>
