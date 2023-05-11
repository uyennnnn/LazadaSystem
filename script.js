// Lấy tất cả các nút tăng giảm số lượng sản phẩm
var quantityButtons = document.querySelectorAll("tbody button");

// Lặp qua từng nút và thêm các sự kiện click cho chúng
for (var i = 0; i < quantityButtons.length; i++) {
	var button = quantityButtons[i];
	button.addEventListener("click", function() {
		// Tìm phần tử cha của nút
		var parent = this.parentNode;
		// Tìm phần tử span chứa số lượng sản phẩm
		var quantityElement = parent.querySelector("span");
		// Lấy giá trị hiện tại của số lượng sản phẩm
		var quantity = parseInt(quantityElement.innerText);
		// Tìm phần tử chứa giá tiền của sản phẩm
		var priceElement = parent.previousElementSibling;
		// Lấy giá trị hiện tại của giá tiền
		var price = parseFloat(priceElement.innerText.replace("$", ""));
		// Tìm phần tử chứa tổng giá tiền của sản phẩm
		var totalElement = parent.nextElementSibling;
		// Tính toán số lượng và tổng giá tiền mới
		if (this.innerText == "+") {
			quantity++;
			price += price / (quantity - 1);
		} else if (this.innerText == "-" && quantity > 1) {
			quantity--;
			price -= price / (quantity + 1);
		}
		var total = quantity * price;
		// Cập nhật số lượng, giá tiền và tổng giá tiền của sản phẩm
		quantityElement.innerText = quantity;
		priceElement.innerText = "$" + price.toFixed(2);
		totalElement.innerText = "$" + total.toFixed(2);
		// Tính toán tổng giá tiền của tất cả các sản phẩm
		var totalPrices = document.querySelectorAll("tbody td:nth-child(5)");
		var subtotal = 0;
		for (var j = 0; j < totalPrices.length; j++) {
			subtotal += parseFloat(totalPrices[j].innerText.replace("$", ""));
		}
		// Cập nhật tổng giá tiền của tất cả các sản phẩm
		var grandTotalElement = document.querySelector(".total td:last-child");
		grandTotalElement.innerText = "$" + subtotal.toFixed(2);
	});
}

// Lấy tất cả các nút xóa sản phẩm
var deleteButtons = document.querySelectorAll("tbody td:last-child button");

// Lặp qua từng nút và thêm các sự kiện click cho chúng
for (var k = 0; k < deleteButtons.length; k++) {
	var button = deleteButtons[k];
	button.addEventListener("click", function() {
		// Tìm phần tử cha của nút và xóa phần tử đó
		var parent = this.parentNode.parentNode;
		parent.parentNode.removeChild(parent);
		// Tính toán tổng giá tiền của tất cả các sản phẩm
var totalPrices = document.querySelectorAll("tbody td:nth-child(5)");
var subtotal = 0;
for (var j = 0; j < totalPrices.length; j++) {
subtotal += parseFloat(totalPrices[j].innerText.replace("$", ""));
}
// Cập nhật tổng giá tiền của tất cả các sản phẩm
var grandTotalElement = document.querySelector(".total td:last-child");
grandTotalElement.innerText = "$" + subtotal.toFixed(2);
});
}
