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
        createProduct(value);
    })
    .catch(function(err) {
        console.log('erreur!');
    });

// Creates product elements to display 
function createProduct(product) {
    let itemImage = document.querySelector('div.item__img');
    let productImage = document.createElement('img');
    productImage.setAttribute('src', `${product.imageUrl}`);
    productImage.setAttribute('alt', `${product.altTxt}`);
    itemImage.appendChild(productImage);

    let productName = document.getElementById('title');
    productName.textContent = `${product.name}`;

    let productPrice = document.getElementById('price');
    productPrice.textContent = `${product.price}`;

    let productDescritpion = document.getElementById('description');
    productDescritpion.textContent = `${product.description}`;

    for (let color in product.colors) {
        let colorChoice = document.getElementById('colors');
        let productColor = document.createElement('option');
        console.log(product.colors[color]);
        productColor.setAttribute('value', `${product.colors[color]}`);
        productColor.textContent = `${product.colors[color]}`;
        colorChoice.appendChild(productColor);
    }
}