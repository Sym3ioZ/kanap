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
        createProductsHtml(value);
    })
    .catch(function(err) {
        console.log('erreur!');
    });

// creates a product element in index.html for every entry returned by fetch above
function createProductsHtml(products) {
    for (let prod in products) {  

        let productLink = document.createElement('a');
        productLink.style.width = '70%';
        productLink.setAttribute("href",`./product.html?id=${products[prod]._id}`);

        let productArticle = document.createElement('article');
        productLink.appendChild(productArticle);

        let articleImage = document.createElement('img');
        articleImage.setAttribute('src', `${products[prod].imageUrl}`);
        articleImage.setAttribute('alt', `${products[prod].altTxt}`);
        productArticle.appendChild(articleImage);

        let productName = document.createElement('h3');
        productName.classList.add('productName');
        productName.textContent = `${products[prod].name}`;
        productArticle.appendChild(productName);

        let productDescription = document.createElement('p');
        productDescription.classList.add('productDescritpion');
        productDescription.textContent = `${products[prod].description}`;
        productArticle.appendChild(productDescription);

        items.appendChild(productLink);
    };
};