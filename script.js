document.addEventListener("DOMContentLoaded", function() {
// Get all the quantity elements
var quantityElements = document.querySelectorAll(".container.cart tbody td:nth-child(3) span");

// Get all the unit price elements
var unitPriceElements = document.querySelectorAll(".container.cart tbody td:nth-child(2)");

// Get all the total price elements
var totalPriceElements = document.querySelectorAll(".container.cart tbody td:nth-child(4)");

// Get the total amount due element
var totalAmountDueElement = document.querySelector(".container.cart tfoot td.FinalTotal + td");

// Get the increment buttons
var incrementButtons = document.querySelectorAll(".container.cart tbody td:nth-child(3) button:last-child");

// Get the decrement buttons
var decrementButtons = document.querySelectorAll(".container.cart tbody td:nth-child(3) button:first-child");

// Get the delete buttons
var deleteButtons = document.querySelectorAll(".container.cart tbody td.btndel button");

// Initialize the total amount due variable
var totalAmountDue = 0;

// Calculate the initial total prices
for (var i = 0; i < totalPriceElements.length; i++) {
    var quantity = parseInt(quantityElements[i].textContent);
    var unitPrice = parseFloat(unitPriceElements[i].textContent.substring(1));
    var totalPrice = quantity * unitPrice;
    totalPriceElements[i].textContent = "$" + totalPrice.toFixed(2);
    totalAmountDue += totalPrice;
}

// Update the total amount due
totalAmountDueElement.textContent = "$" + totalAmountDue.toFixed(2);

// Add event listeners to the buttons
for (var i = 0; i < incrementButtons.length; i++) {
    incrementButtons[i].addEventListener("click", incrementQuantity);
}

for (var i = 0; i < decrementButtons.length; i++) {
    decrementButtons[i].addEventListener("click", decrementQuantity);
    console.log('hello');
}

for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", deleteProduct);
}

// Function to increment the quantity
function incrementQuantity() {
    var quantityElement = this.parentNode.querySelector("span");
    var quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = quantity + 1;

    updateTotalPrice(this.parentNode.parentNode);
    updateTotalAmountDue();
}

// Function to decrement the quantity
function decrementQuantity() {
    var quantityElement = this.parentNode.querySelector("span");
    var quantity = parseInt(quantityElement.textContent);

    if (quantity > 1) {
        quantityElement.textContent = quantity - 1;
        updateTotalPrice(this.parentNode.parentNode);
        updateTotalAmountDue();
    }
}

// Function to update the total price
function updateTotalPrice(rowElement) {
    var quantity = parseInt(rowElement.querySelector("td:nth-child(3) span").textContent);
    var unitPrice = parseFloat(rowElement.querySelector("td:nth-child(2)").textContent.substring(1));
    var totalPrice = quantity * unitPrice;
    rowElement.querySelector("td:nth-child(4)").textContent = "$" + totalPrice.toFixed(2);
}

// Function to update the total amount due
function updateTotalAmountDue() {
    totalAmountDue = 0;

    for (var i = 0; i < totalPriceElements.length; i++) {
        totalAmountDue += parseFloat(totalPriceElements[i].textContent.substring(1));
    }

    totalAmountDueElement.textContent = "$" + totalAmountDue.toFixed(2);
}

// Function to delete the product
function deleteProduct() {
    var rowElement = this.parentNode.parentNode;
    rowElement.parentNode.removeChild(rowElement);

    updateTotalAmountDue();
}

// Function to calculate the total price for a row
function calculateTotalPrice(rowElement) {
    var unitPrice = parseFloat(rowElement.querySelector("td:nth-child(2)").textContent.slice(1));
    var quantity = parseInt(rowElement.querySelector("td:nth-child(3) span").textContent);
    var totalPrice = unitPrice * quantity;
    rowElement.querySelector("td:nth-child(4)").textContent = "$" + totalPrice.toFixed(2);
}

// Function to update the total price for all rows
function updateTotalPrice() {
    var rows = document.querySelectorAll(".container.cart tbody tr");
    rows.forEach(function (row) {
        calculateTotalPrice(row);
    });
}

// Function to calculate the total amount due for the order
function calculateTotalAmountDue() {
    var totalPriceElements = document.querySelectorAll(".container.cart tbody td:nth-child(4)");
    var totalAmountDue = 0;
    totalPriceElements.forEach(function (element) {
        totalAmountDue += parseFloat(element.textContent.slice(1));
    });
    document.querySelector(".container.cart tfoot td.FinalTotal + td").textContent = "$" + totalAmountDue.toFixed(2);
}

// Function to save the cart to LocalStorage
function saveCartToLocalStorage() {
    var cart = [];

    var cartItems = document.querySelectorAll(".container.cart tbody tr");
    cartItems.forEach(function (item) {
        var productId = item.querySelector(".imgproduct").getAttribute("data-id");
        var quantity = parseInt(item.querySelector("td:nth-child(3) span").textContent);

        var cartItem = {
            productId: productId,
            quantity: quantity
        };

        cart.push(cartItem);
    });

    localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to load the cart from LocalStorage
function loadCartFromLocalStorage() {
    var cart = localStorage.getItem("cart");

    if (cart) {
        cart = JSON.parse(cart);

        cart.forEach(function (cartItem) {
            var productId = cartItem.productId;
            var quantity = cartItem.quantity;

            var rowElement = document.querySelector(".container.cart tbody tr .imgproduct[data-id='" + productId + "']").parentNode.parentNode;

            rowElement.querySelector("td:nth-child(3) span").textContent = quantity;

            calculateTotalPrice(rowElement);
        });

        calculateTotalAmountDue();
    }
}

// Event listeners for increment and decrement buttons
var incrementButtons = document.querySelectorAll(".container.cart tbody td:nth-child(3) button:last-child");
incrementButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        var quantityElement = this.parentNode.querySelector("span");
        var quantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = quantity + 1;

        calculateTotalPrice(this.parentNode.parentNode);
        calculateTotalAmountDue();
        saveCartToLocalStorage();
    });
});

var decrementButtons = document.querySelectorAll(".container.cart tbody td:nth-child(3) button:first-child");
decrementButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        var quantityElement = this.parentNode.querySelector("span");
        var quantity = parseInt(quantityElement.textContent);

        if (quantity > 1) {
            quantityElement.textContent = quantity - 1;
            calculateTotalPrice(this.parentNode.parentNode);
            calculateTotalAmountDue();
            saveCartToLocalStorage();
        }
    });
});

// Event listener for delete buttons
var deleteButtons = document.querySelectorAll(".container.cart tbody td.btndel button");
deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        var rowElement = this.parentNode.parentNode;
        rowElement.parentNode.removeChild(rowElement);

        calculateTotalAmountDue();
        saveCartToLocalStorage();
    });
});

// Load the cart from LocalStorage when the page loads
document.addEventListener("DOMContentLoaded", function () {
    loadCartFromLocalStorage();
});

});
