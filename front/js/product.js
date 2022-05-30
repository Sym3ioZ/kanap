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

function createProduct(product) {
    document.getElementsByClassName('item__img').innerHTML = 
        `<img src= "${product.imageUrl}" alt= "${product.altTxt}" />`;
}