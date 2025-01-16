document.getElementById('purchase-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const productId = parseInt(document.getElementById('purchase-product').value);
    const quantity = parseInt(document.getElementById('purchase-quantity').value);

    if (isNaN(productId) || isNaN(quantity) || quantity <= 0) {
        document.getElementById('purchase-message').textContent = 'Invalid purchase details. Please select a product and enter a valid quantity.';
        return;
    }

    // Send purchase data to server via AJAX (example using fetch)
    fetch('/record-purchase.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            product_id: productId,
            quantity: quantity
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('purchase-message').textContent = `Purchase recorded successfully! Total: ${data.total_amount}`;
        } else {
            document.getElementById('purchase-message').textContent = 'Error recording purchase.';
        }
    })
    .catch(error => {
        document.getElementById('purchase-message').textContent = 'Error sending purchase data.';
    });
});
