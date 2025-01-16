<?php
// Database connection settings
$servername = "localhost";
$username = "root";  // Use your database username
$password = "";      // Use your database password
$dbname = "sifa_hotel"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handling item details form submission
if (isset($_POST['add_item'])) {
    $item_name = $_POST['item_name'];
    $item_description = $_POST['item_description'];
    $item_price = $_POST['item_price'];
    $item_quantity = $_POST['item_quantity'];

    $sql_item = "INSERT INTO items (item_name, item_description, item_price, item_quantity)
                 VALUES ('$item_name', '$item_description', '$item_price', '$item_quantity')";

    if ($conn->query($sql_item) === TRUE) {
        echo "New item added successfully.";
    } else {
        echo "Error: " . $sql_item . "<br>" . $conn->error;
    }
}

// Handling sales details form submission
if (isset($_POST['add_sale'])) {
    $sale_item_id = $_POST['sale_item_id'];
    $sale_quantity = $_POST['sale_quantity'];
    $sale_total = $_POST['sale_total'];
    $payment_mode = $_POST['payment_mode'];

    // Updating item quantity after sale
    $sql_update_item = "UPDATE items SET item_quantity = item_quantity - $sale_quantity WHERE item_id = $sale_item_id";
    
    if ($conn->query($sql_update_item) === TRUE) {
        // Insert sale details into sales table
        $sql_sale = "INSERT INTO sales (item_id, sale_quantity, sale_total, payment_mode)
                     VALUES ('$sale_item_id', '$sale_quantity', '$sale_total', '$payment_mode')";

        if ($conn->query($sql_sale) === TRUE) {
            echo "Sale recorded successfully.";
        } else {
            echo "Error: " . $sql_sale . "<br>" . $conn->error;
        }
    } else {
        echo "Error updating item quantity: " . $conn->error;
    }
}

// Handling purchase details form submission
if (isset($_POST['add_purchase'])) {
    $purchase_item_id = $_POST['purchase_item_id'];
    $purchase_quantity = $_POST['purchase_quantity'];
    $purchase_cost = $_POST['purchase_cost'];

    // Updating item quantity after purchase
    $sql_update_purchase_item = "UPDATE items SET item_quantity = item_quantity + $purchase_quantity WHERE item_id = $purchase_item_id";

    if ($conn->query($sql_update_purchase_item) === TRUE) {
        // Insert purchase details into purchase table
        $sql_purchase = "INSERT INTO purchases (item_id, purchase_quantity, purchase_cost)
                         VALUES ('$purchase_item_id', '$purchase_quantity', '$purchase_cost')";

        if ($conn->query($sql_purchase) === TRUE) {
            echo "Purchase recorded successfully.";
        } else {
            echo "Error: " . $sql_purchase . "<br>" . $conn->error;
        }
    } else {
        echo "Error updating item quantity: " . $conn->error;
    }
}

// Close connection
$conn->close();
?>
