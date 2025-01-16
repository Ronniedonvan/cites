document.getElementById('payment-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const purchaseId = parseInt(document.getElementById('purchase-id').value);
    const paymentAmount = parseFloat(document.getElementById('payment-amount').value);
    const paymentMethod = document.getElementById('payment-method').value;

    if (isNaN(paymentAmount) || paymentAmount <= 0) {
        document.getElementById('payment-message').textContent = 'Please enter a valid payment amount.';
        return;
    }

    // Send payment data to server via AJAX (example using fetch)
    fetch('/record-payment.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            purchase_id: purchaseId,
            payment_amount: paymentAmount,
            payment_method: paymentMethod
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('payment-message').textContent = `Payment recorded successfully! Amount: ${data.payment_amount}`;
        } else {
            document.getElementById('payment-message').textContent = 'Error recording payment.';
        }
    })
    .catch(error => {
        document.getElementById('payment-message').textContent = 'Error sending payment data.';
    });
});
