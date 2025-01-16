// Initial item data (if no data in localStorage)
let items = JSON.parse(localStorage.getItem('items')) || [
    { id: 1, code: 'LPT001', name: 'Laptop', category: 'Electronics', description: 'Core i5, 3rd generation', price: 30000 },
    { id: 2, code: 'FNB001', name: 'Rice', category: 'Food and Beverages', description: 'A staple grain commonly used in meals.', price: 1000 },
    { id: 3, code: 'HHI001', name: 'Toilet Paper', category: 'Household Items', description: 'Essential paper product for hygiene.', price: 500 },
    { id: 4, code: 'PCP001', name: 'Shampoo', category: 'Personal Care Products', description: 'Hair cleansing product for daily use.', price: 700 },
    { id: 5, code: 'STA001', name: 'Notebook', category: 'Stationery', description: 'Used for writing, drawing, and note-taking.', price: 300 },
    { id: 6, code: 'HT001', name: 'Hammer', category: 'Hardware and Tools', description: 'A tool for driving nails or breaking objects.', price: 1200 },
];

// Function to format a number as KES currency
function formatKES(amount) {
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES'
    }).format(amount);
}

// Function to render items dynamically and populate dropdowns
function loadItems() {
    const itemsContainer = document.getElementById('items-container');
    const salesProductDropdown = document.getElementById('product');
    const purchaseProductDropdown = document.getElementById('purchase-product');
    
    // Render items in the items container
    itemsContainer.innerHTML = items.map(item => `
        <div class="item-card">
            <h3>Item Name: ${item.name}</h3>
            <p><strong>Item Code:</strong> ${item.code}</p>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Description:</strong> ${item.description}</p>
            <p><strong>Price:</strong> ${formatKES(item.price)}</p>
        </div>
    `).join('');

    // Populate the sales and purchase product dropdowns
    const generateDropdownOptions = (items) => {
        return items.map(item => 
            `<option value="${item.id}">${item.name} (Code: ${item.code})</option>`
        ).join('');
    };

    // Populate sales and purchase dropdowns
    salesProductDropdown.innerHTML = generateDropdownOptions(items);
    purchaseProductDropdown.innerHTML = generateDropdownOptions(items);
}

// Function to add a new item
function addItem(name, code, category, description, buyingPrice, sellingPrice) {
    const id = items.length ? items[items.length - 1].id + 1 : 1; // Generate unique ID
    const profit = sellingPrice - buyingPrice;

    items.push({
        id,
        code,
        name,
        category,
        description,
        price: sellingPrice,
    });

    saveItemsToLocalStorage(); // Save items to localStorage
    loadItems(); // Refresh the items list
    alert(`Item added successfully! Profit: ${formatKES(profit)}`);
}

// Save items to localStorage
function saveItemsToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(items));
}

// Add Item Form Handler
document.getElementById('add-item-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('item-name').value.trim();
    const code = document.getElementById('item-code').value.trim();
    const category = document.getElementById('item-category').value.trim();
    const description = document.getElementById('item-description').value.trim();
    const buyingPrice = parseFloat(document.getElementById('item-buying-price').value);
    const sellingPrice = parseFloat(document.getElementById('item-selling-price').value);

    if (name && code && category && description && buyingPrice > 0 && sellingPrice > 0) {
        document.getElementById('item-profit').value = formatKES(sellingPrice - buyingPrice); // Display profit
        addItem(name, code, category, description, buyingPrice, sellingPrice);
        this.reset(); // Reset form fields
    } else {
        alert('Please fill in all fields with valid data.');
    }
});

// Load initial items
document.addEventListener('DOMContentLoaded', loadItems);

// Profit Calculation Handler
document.addEventListener("DOMContentLoaded", () => {
    const buyingPriceInput = document.getElementById("item-buying-price");
    const sellingPriceInput = document.getElementById("item-selling-price");
    const profitInput = document.getElementById("item-profit");

    function calculateProfit() {
        const buyingPrice = parseFloat(buyingPriceInput.value) || 0;
        const sellingPrice = parseFloat(sellingPriceInput.value) || 0;

        if (buyingPrice > 0 && sellingPrice > 0) {
            const profit = sellingPrice - buyingPrice;
            profitInput.value = profit >= 0 ? formatKES(profit) : `Loss: ${formatKES(-profit)}`;
        } else {
            profitInput.value = "Invalid input";
        }
    }

    buyingPriceInput.addEventListener("input", calculateProfit);
    sellingPriceInput.addEventListener("input", calculateProfit);
});

// Handle Sales Submission
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
        document.getElementById('sales-message').textContent = `Sale recorded for ${item.name} (Code: ${item.code})! Total: ${formatKES(total)}`;
    } else {
        document.getElementById('sales-message').textContent = 'Invalid sale details.';
    }
});

// Handle Purchase Submission
document.getElementById('purchase-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const productId = parseInt(document.getElementById('purchase-product').value);
    const quantity = parseInt(document.getElementById('purchase-quantity').value);

    if (isNaN(productId) || isNaN(quantity) || quantity <= 0) {
        document.getElementById('purchase-message').textContent = 'Invalid purchase details. Please select a product and enter a valid quantity.';
        return;
    }

    const item = items.find(i => i.id === productId);
    const total = item ? item.price * quantity : 0;

    if (item && quantity > 0) {
        document.getElementById('purchase-message').textContent = `Purchase successful for ${item.name} (Code: ${item.code})! Total: ${formatKES(total)}`;
    } else {
        document.getElementById('purchase-message').textContent = 'Invalid purchase details.';
    }
});

// Handle Payment Submission
document.getElementById('payment-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const method = document.querySelector('input[name="payment-method"]:checked')?.value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (method && amount > 0) {
        document.getElementById('payment-message').textContent = `Payment of ${formatKES(amount)} using ${method} was successful!`;
    } else {
        document.getElementById('payment-message').textContent = 'Invalid payment details.';
    }
});

// Load items on page load
window.onload = loadItems;
