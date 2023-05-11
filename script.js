
document.addEventListener('DOMContentLoaded', function () {
    const plusButtons = document.querySelectorAll('button:nth-of-type(2)');
    const minusButtons = document.querySelectorAll('button:nth-of-type(1)');
    const deleteButtons = document.querySelectorAll('.btndel button');
    const cart = document.querySelector('.cart');
    const finalTotal = document.querySelector('.FinalTotal + td');

    function updateLocalStorage() {
        const products = [];
        cart.querySelectorAll('tbody > tr:not(.voucher)').forEach(row => {
            products.push({
                id: row.querySelector('.imgproduct').getAttribute('data-id'),
                quantity: parseInt(row.querySelector('td:nth-of-type(3) > span').textContent)
            });
        });
        localStorage.setItem('cart', JSON.stringify(products));
    }

    function updateTotalPrice() {
        let totalAmount = 0;
        cart.querySelectorAll('tbody > tr:not(.voucher)').forEach(row => {
            const unitPrice = parseFloat(row.querySelector('td:nth-of-type(2)').textContent.slice(1));
            const quantity = parseInt(row.querySelector('td:nth-of-type(3) > span').textContent);
            const totalPrice = unitPrice * quantity;
            row.querySelector('td:nth-of-type(4)').textContent = `$${totalPrice.toFixed(2)}`;
            totalAmount += totalPrice;
        });
        finalTotal.textContent = `$${totalAmount.toFixed(2)}`;
        updateLocalStorage();
    }

    plusButtons.forEach(button => {
        button.addEventListener('click', function () {
            const quantitySpan = this.parentElement.querySelector('span');
            quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
            updateTotalPrice();
        });
    });

    minusButtons.forEach(button => {
        button.addEventListener('click', function () {
            const quantitySpan = this.parentElement.querySelector('span');
            const currentQuantity = parseInt(quantitySpan.textContent);
            if (currentQuantity > 1) {
                quantitySpan.textContent = currentQuantity - 1;
                updateTotalPrice();
            }
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const row = this.parentElement.parentElement;
            row.parentElement.removeChild(row);
            updateTotalPrice();
        });
    });

    updateTotalPrice();
});
