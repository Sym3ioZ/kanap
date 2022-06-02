'use strict';

fetch('http://localhost:3000/api/products')
    .then(function(res) {
    if (res.ok) { 
        return res.json();
    }
    })
    .then(function(value) {
        createCartListHtml(value);
        // removeProducts(value);
    })
    .catch(function(err) {
        console.log('erreur!');
    });

function createCartListHtml(products) {
    let i = 0;
    let cartItems = document.getElementById('cart__items');

    while (i < localStorage.length) {
        let productSettingsLinea = localStorage.getItem(localStorage.key(i));
        let productSettings = JSON.parse(productSettingsLinea);
        let productSettingsId = productSettings.productId;
        let productsIndex;

        for(let prod in products) {
            if (productSettingsId == products[prod]._id) {
                productsIndex = prod;
            }
        }

        // Creating article in cart.html
        let cartItem = document.createElement('article');
        cartItem.classList.add('cart__item');
        cartItem.setAttribute('data-id', `${productSettingsId}`);
        cartItem.setAttribute('data-color', `${productSettings.productColor}`);
        cartItems.appendChild(cartItem);

        // Integrating product images in the article 'cart__item'
        let cartItemImage = document.createElement('div');
        cartItemImage.classList.add('cart__item__img');
        let itemImage = document.createElement('img');
        itemImage.setAttribute('src', `${products[productsIndex].imageUrl}`);
        itemImage.setAttribute('alt', `${products[productsIndex].description}`);
        cartItemImage.appendChild(itemImage);
        cartItem.appendChild(cartItemImage);

        // Integrating product details
        let cartItemContent = document.createElement('div');
        cartItemContent.classList.add('cart__item__content');
        cartItem.appendChild(cartItemContent);
        let cartItemContentDescription = document.createElement('div');
        cartItemContentDescription.classList.add('cart__item__content__description');
        cartItemContent.appendChild(cartItemContentDescription);
        
        // Creating name, color, and price elements in product details
        let productName = document.createElement('h2');
        productName.textContent = `${products[productsIndex].name}`;
        cartItemContentDescription.appendChild(productName);
        let productColor = document.createElement('p');
        productColor.textContent = `Couleur: ${productSettings.productColor}`;
        cartItemContentDescription.appendChild(productColor);
        let productPrice = document.createElement('p');
        productPrice.textContent = `Prix: ${products[productsIndex].price} €`;
        cartItemContentDescription.appendChild(productPrice);

        // integrating quantity and delete elements
        let cartItemContentSettings = document.createElement('div');
        cartItemContentSettings.classList.add('cart__item__content__settings');
        cartItemContent.appendChild(cartItemContentSettings);

        let cartItemContentSettingsQuantity = document.createElement('div');
        cartItemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity');
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

        let quantity = document.createElement('p');
        quantity.textContent = 'Qté: ';
        cartItemContentSettingsQuantity.appendChild(quantity);

        // Input to select quantity
        let quantityInput = document.createElement('input');
        quantityInput.classList.add('itemQuantity');
        quantityInput.setAttribute('type', 'number');
        quantityInput.setAttribute('name', 'itemQuantity');
        quantityInput.setAttribute('min', '1');
        quantityInput.setAttribute('max', '1000');
        quantityInput.setAttribute('value', `${productSettings.productQuantity}`);
        cartItemContentSettingsQuantity.appendChild(quantityInput);

        // Listening to changing value of the input, modifies quantity and totalQuantity
        quantityInput.addEventListener('change', modifyQuantity);

        function modifyQuantity(e) {
            productSettings.productQuantity = e.target.value;
            productSettingsLinea = JSON.stringify(productSettings);
            localStorage.setItem(`${productSettingsId}${productSettings.productColor}`, productSettingsLinea);
            totalCalculus();
        }

        let cartItemContentSettingsDelete = document.createElement('div');
        cartItemContentSettingsDelete.classList.add('cart__item__content__settings__delete');
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

        // On click, will delete the selected product
        let deleteItem = document.createElement('p');
        deleteItem.classList.add('deleteItem');
        deleteItem.setAttribute('id', `delete${productSettingsId}${productSettings.productColor}`);
        deleteItem.textContent = 'Supprimer';
        cartItemContentSettingsDelete.appendChild(deleteItem);

        // Selecting the article to delete on click
            let articleToDelete = deleteItem.closest('article');
            let articleToDeleteId = articleToDelete.getAttribute('data-id');
            let articleToDeleteColor = articleToDelete.getAttribute('data-color');
            let articleToDeleteIdColor = articleToDeleteId + articleToDeleteColor;
    
            deleteItem.addEventListener('click', deleteArticle);
    
            // Modifying quantity, to call the totalCalculus function that will modify quantity in real-time
            // Removing article from the DOM, and deleting hte entry of the selected product in the localstorage (cart)
                function deleteArticle() {
                    productSettings.productQuantity = -productSettings.productQuantity;
                    articleToDelete.remove();
                    localStorage.removeItem(`${articleToDeleteIdColor}`);
                    totalCalculus();
                }
        i++;
    }

    // Handling the display of total quantity and total price
    totalCalculus();

    function totalCalculus() {
        let ii = 0;
        let totalQuantity = 0;
        let totalPrice = 0;

        if (localStorage.length > 0) {
            while (ii < localStorage.length) {
                let productLinea = localStorage.getItem(localStorage.key(ii));
                let product = JSON.parse(productLinea);
                let productsIndex;

                for(let prod in products) {
                    if (product.productId == products[prod]._id) {
                        productsIndex = prod;
                    }
                }
                
                totalQuantity += +product.productQuantity;
                totalPrice += +products[productsIndex].price * +product.productQuantity;
                let totalQuantityHtml = document.getElementById('totalQuantity');
                totalQuantityHtml.textContent = totalQuantity;
                let totalPriceHtml = document.getElementById('totalPrice');
                totalPriceHtml.textContent = totalPrice;
        
                ii++;
            } 
        }
        else {
            let totalQuantityHtml = document.getElementById('totalQuantity');
            totalQuantityHtml.textContent = totalQuantity;
            let totalPriceHtml = document.getElementById('totalPrice');
            totalPriceHtml.textContent = totalPrice;
        }
    }
}