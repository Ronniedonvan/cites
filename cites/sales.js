document.getElementById('sales-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const productId = parseInt(document.getElementById('product').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    if (isNaN(productId) || isNaN(quantity) || quantity <= 0) {
        document.getElementById('sales-message').textContent = 'Invalid sale details. Please select a product and enter a valid quantity.';
        return;
    }

    const item = items.find(i => i.id === productId);
    const total = item ? item.price * quantity : 0;

    if (item && quantity > 0) {
        // Send sale data to the server (via AJAX, fetch, etc.)
        fetch('/record_sale.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item_id: item.id,
                quantity: quantity,
                total_amount: total
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('sales-message').textContent = `Sale recorded for ${item.name} (Code: ${item.code})! Total: ${formatKES(total)}`;
            } else {
                document.getElementById('sales-message').textContent = 'Error recording sale.';
            }
        });
    } else {
        document.getElementById('sales-message').textContent = 'Invalid sale details.';
    }
});
