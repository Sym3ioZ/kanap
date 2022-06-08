'use strict';

// Retrieving product Id from the url
let url = new URL(window.location.href);
let productId = url.searchParams.get('id');

fetch (`http://localhost:3000/api/products/${productId}`)
    .then (function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then (function(value) {
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
    for (let j in product.colors) {
        let colorChoice = document.getElementById('colors');
        let productColor = document.createElement('option');
        productColor.setAttribute('value', `${product.colors[j]}`);
        productColor.textContent = `${product.colors[j]}`;
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
    let productSettings = {
        productId : `${productId}`, 
        productQuantity : +`${quantity.value}`, 
        productColor : color
    }
    let productSettingsLinea = JSON.stringify(productSettings);

    let counter = 0;
    let i =0;
    // Determines if the product with the selected color already exists in the cart(localstorage), if true, only modifies quantity and break
    while (i < localStorage.length) {
        if ((localStorage.key(i) == (productId + color)) && (colorSelector.selectedIndex != 0)) {
            let localCart = JSON.parse(localStorage.getItem(localStorage.key(i)));
            localCart.productQuantity += +quantity.value;
            let localCartLinea = JSON.stringify(localCart);
            localStorage.setItem(localStorage.key(i), localCartLinea);
            counter = -1;
            break;
        }
        i++;
        counter++;
    }

    // If the previous loop didn't succeeded, then counter == localstorage length, and then it sets the productsettings in a new entry of the cart (localstorage)
    if ((counter == localStorage.length) && (colorSelector.selectedIndex != 0)) {
        localStorage.setItem(`${productId}`+`${color}`, productSettingsLinea);
    }

    // Displays a short temporary message to confirm that the product is added to cart
    let addToCart = document.querySelector('.item__content');
    let addToCartMessage = document.createElement('p');
    if (colorSelector.selectedIndex == 0) {
        addToCartMessage.textContent = 'Veuillez choisir une couleur !';
    }
    else {
        addToCartMessage.textContent = 'Article ajouté au panier !';
    }
        addToCartMessage.style.textAlign = 'center';
        addToCart.appendChild(addToCartMessage);
        window.setTimeout(removeP, 3000);
        function removeP() {
            addToCartMessage.remove();
        }
}