// script.js

// Example of adding a simple alert when an item is added to the cart
document.querySelectorAll('.product-item button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Item added to cart!');
document.getElementById('shop-now').addEventListener('click', function() {
    window.location.href = 'products.html';
// cart.js
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalItems = document.getElementById('total-items');
        const totalAmount = document.getElementById('total-amount');

        if (cartItemsContainer) {
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
                totalItems.textContent = 'Total Items: 0';
                totalAmount.textContent = 'Total Amount: $0.00';
                return;
            }

            const cartItemsHtml = cart.map(item => `
                <div class="cart-item">
                    <p>${item.name} x ${item.quantity}</p>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            `).join('');

            cartItemsContainer.innerHTML = cartItemsHtml;

            // Calculate totals
            const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
            const totalCost = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            totalItems.textContent = `Total Items: ${totalQuantity}`;
            totalAmount.textContent = `Total Amount: $${totalCost.toFixed(2)}`;
        }
    }

    function updateCart(id, quantity) {
        const existingProduct = cart.find(item => item.id === id);
        if (existingProduct) {
            existingProduct.quantity = quantity;
        } else {
            cart.push({
                id,
                name: `Product ${id}`, // Replace with actual product name
                price: 1000, // Replace with actual product price
                quantity
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    function removeFromCart(id) {
        const updatedCart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        displayCart();
    }

    // Display the cart items and totals on page load
    displayCart();

    // Event listener for remove buttons
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const productId = event.target.getAttribute('data-id');
            removeFromCart(productId);
        }
    });
});


        });
        
    });
});
