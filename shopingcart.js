let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if (!productsInCart) {
	productsInCart = [];
}
const parentElement = document.querySelector('#buyItems');
const cartSumPrice = document.querySelector('#sum-prices');
const products = document.querySelectorAll('.product-under');
const productsContainer = document.querySelector('.products');

const countTheSumPrice = function () {
	// 4
	let sum = 0;
	productsInCart.forEach((item) => {
		sum += item.price;
	});
	return sum;
};

//show information about product 
const updateProductInfoPageHTML = function (product) {
	productsContainer.innerHTML = `
		<div class="product">
				<figure class="product-image">
					<img src="${product.image}" alt="${product.name}">
					<div class="product-over">
						<button class="btn btn-small addToCart" data-product-id="4">
							<i class="fas fa-cart-plus"></i>Add
							to cart
						</button>
					</div>
				</figure>
					<h4 class="productName">${product.name}</h4>
					<p>${product.info}</p>
					<h6 class="price">
						$<span class="priceValue">${product.price}</span>
					</h6>
		</div>
	`;
	console.log('test');
};

const updateShoppingCartHTML = function () {
	// 3
	localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	if (productsInCart.length > 0) {
		let result = productsInCart.map((product) => {
			return `
				<li class="buyItem">
					<img src="${product.image}">
					<div>
						<h5>${product.name}</h5>
						<h6>$${product.price}</h6>
						<div>
							<button class="button-minus" data-id=${product.id}>-</button>
							<span class="countOfProduct">${product.count}</span>
							<button class="button-plus" data-id=${product.id}>+</button>
						</div>
					</div>
					<div>
						<button class="button-delete" data-id=${product.id}>x</button>
					</div>
				</li>`;
		});
		parentElement.innerHTML = result.join('');
		document.querySelector('.checkout').classList.remove('hidden');
		cartSumPrice.innerHTML = '$' + countTheSumPrice();
	} else {
		document.querySelector('.checkout').classList.add('hidden');
		parentElement.innerHTML =
			'<h4 class="empty">Your shopping cart is empty</h4>';
		cartSumPrice.innerHTML = '';
	}
};

function updateProductsInCart(product) {
	// 2
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			productsInCart[i].price =
				productsInCart[i].basePrice * productsInCart[i].count;
			return;
		}
	}
	productsInCart.push(product);
}

products.forEach((item) => {
	// 1
	item.addEventListener('click', (e) => {
		if (e.target.classList.contains('addToCart')) {
			const productID = e.target.dataset.productId;
			const productName = item.querySelector('.productName').innerHTML;
			const productPrice = item.querySelector('.priceValue').innerHTML;
			const productImage = item.querySelector('img').src;
			let product = {
				name: productName,
				image: productImage,
				id: productID,
				count: 1,
				price: +productPrice,
				basePrice: +productPrice,
			};
			updateProductsInCart(product);
			updateShoppingCartHTML();
		}
		// must show more info about product
		if (e.target.classList.contains('moreInfo')) {
			const productName = item.querySelector('.productName').innerHTML;
			const productPrice = item.querySelector('.priceValue').innerHTML;
			const productImage = item.querySelector('img').src;
			const productInfo = item.querySelector('p').innerText;
			let product = {
				name: productName,
				image: productImage,
				info: productInfo,
				price: +productPrice,
			};
			console.log(product);
			updateProductInfoPageHTML(product);
		}
	});
});

parentElement.addEventListener('click', (e) => {
	// Last
	const isPlusButton = e.target.classList.contains('button-plus');
	const isMinusButton = e.target.classList.contains('button-minus');
	const isDeleteButton = e.target.classList.contains('button-delete');
	// console.log(e.target);
	if (isPlusButton || isMinusButton || isDeleteButton) {
		
		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].id == e.target.dataset.id) {
				if (isPlusButton) {
					productsInCart[i].count += 1;
				} else if (isMinusButton) {
					productsInCart[i].count -= 1;
				} else if (isDeleteButton) {
					productsInCart[i].count = 0;
				}
				productsInCart[i].price =
					productsInCart[i].basePrice * productsInCart[i].count;
			}
			if (productsInCart[i].count <= 0) {
				productsInCart.splice(i, 1);
			}
		}
		updateShoppingCartHTML();
	}
});

updateShoppingCartHTML();
