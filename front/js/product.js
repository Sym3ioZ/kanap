'use strict';

let url = new URL(window.location.href);
let productId = url.searchParams.get('id');

fetch (`http://localhost:3000/api/products/${productId}`)
    .then (function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then (function(value) {
        console.log(value);
        var arrayProduct = [];
        arrayProduct.push(value);
        arrayProduct.push(value);
        arrayProduct.push(value);
        console.log(arrayProduct);
        createProductHtml(value);
    })
    .catch(function(err) {
        console.log('erreur!');
    });

// Creates product elements to display 
function createProductHtml(product) {
    // Creates image element
    let itemImage = document.querySelector('div.item__img');
    let productImage = document.createElement('img');
    productImage.setAttribute('src', `${product.imageUrl}`);
    productImage.setAttribute('alt', `${product.altTxt}`);
    itemImage.appendChild(productImage);

    // Inserts text between the h1 markups with the id 'title'
    let productName = document.getElementById('title');
    productName.textContent = `${product.name}`;

    // Inserts price between the span markup with the id 'price'
    let productPrice = document.getElementById('price');
    productPrice.textContent = `${product.price}`;

    // Inserts product description between the p markups with the id 'description'
    let productDescription = document.getElementById('description');
    productDescription.textContent = `${product.description}`;

    // Creates another option in the select markup ('colors') for each color available for the actual product
    for (let color in product.colors) {
        let colorChoice = document.getElementById('colors');
        let productColor = document.createElement('option');
        productColor.setAttribute('value', `${product.colors[color]}`);
        productColor.textContent = `${product.colors[color]}`;
        colorChoice.appendChild(productColor);
    }
}

// Retrieves the button element that adds the product to the cart, and waits for click event
let addToCartButton = document.getElementById('addToCart');
addToCartButton.addEventListener('click', addToCart);

// EventListener callback to add the product selection (id, quantity, color) to the cart, via localstorage
function addToCart() {
    let quantity = document.getElementById('quantity');
    let colorSelector = document.getElementById('colors');
    let color = colorSelector.options[colorSelector.selectedIndex].value;
    let cart = [`${productId}`, `${quantity.value}`, color];
    console.log(cart);
    localStorage.setItem('cart', cart);    
}

