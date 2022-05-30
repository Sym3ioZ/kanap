'use strict';

let items = document.getElementById('items');

fetch('http://localhost:3000/api/products')
    .then(function(res) {
    if (res.ok) { 
        return res.json();
    }
    })
    .then(function(value) {
        console.log(value);
        createProducts(value);
    })
    .catch(function(err) {
        console.log('erreur!');
    });

// creates a product element in index.html for every value returned by fetch above
function createProducts(products) {
    for (let prod in products) {  
        let homeProduct = document.createElement('div');
        homeProduct.style.width = "70%";
        (items.appendChild(homeProduct)).innerHTML =
            `<a href="./product.html?${products[prod]._id}">
                <article>
                    <img src= "${products[prod].imageUrl}" alt= "${products[prod].altTxt}" />
                    <h3 class="productName">${products[prod].name}</h3>
                    <p class="productDescription">${products[prod].description}</p>
                </article>
            </a>`;
    };
}