'use strict';

// Retrieves the "items" section in index.html
let items = document.getElementById('items');

// Requests the API to retrieve the full catalog of products
fetch('http://localhost:3000/api/products')
    .then(function(res) {
    if (res.ok) { 
        return res.json();
    }
    })
    .then(function(value) {
        createProductsHtml(value);
    })
    .catch(function(err) {
        console.log('erreur!');
    });

// creates a product element in index.html for every entry (product) returned by fetch above
function createProductsHtml(products) {
    for (let prod in products) {  

        // Creates the "a" link that contains the product card
        let productLink = document.createElement('a');
        productLink.style.width = '70%';
        productLink.setAttribute("href",`./product.html?id=${products[prod]._id}`); // Sends the id in the url

        // Creates the "article" representing the product card
        let productArticle = document.createElement('article');
        productLink.appendChild(productArticle);

        // Creates the "image" element
        let articleImage = document.createElement('img');
        articleImage.setAttribute('src', `${products[prod].imageUrl}`);
        articleImage.setAttribute('alt', `${products[prod].altTxt}`);
        productArticle.appendChild(articleImage);

        // Creates the "h3" title with the name of the product
        let productName = document.createElement('h3');
        productName.classList.add('productName');
        productName.textContent = `${products[prod].name}`;
        productArticle.appendChild(productName);

        // Creates a "p" block with the product description
        let productDescription = document.createElement('p');
        productDescription.classList.add('productDescritpion');
        productDescription.textContent = `${products[prod].description}`;
        productArticle.appendChild(productDescription);

        // Inserts each product "a" block into the "items" section retrieved on top of this script
        items.appendChild(productLink);
    };
};