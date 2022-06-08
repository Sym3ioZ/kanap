'use strict';

fetch('http://localhost:3000/api/products')
    .then(function(res) {
    if (res.ok) { 
        return res.json();
    }
    })
    .then(function(value) {
        createCartListHtml(value);
    })
    .catch(function(err) {
        console.log('erreur!');
    });

// Declaring products array that will be sent to the API
let products = [];

function createCartListHtml(productsList) {
    let i = 0;
    let cartItems = document.getElementById('cart__items');

    while (i < localStorage.length) {
        let productSettingsLinea = localStorage.getItem(localStorage.key(i));
        let productSettings = JSON.parse(productSettingsLinea);
        let productSettingsId = productSettings.productId;
        let productsIndex;

        for(let prod in productsList) {
            if (productSettingsId == productsList[prod]._id) {
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
        itemImage.setAttribute('src', `${productsList[productsIndex].imageUrl}`);
        itemImage.setAttribute('alt', `${productsList[productsIndex].description}`);
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
        productName.textContent = `${productsList[productsIndex].name}`;
        cartItemContentDescription.appendChild(productName);
        let productColor = document.createElement('p');
        productColor.textContent = `Couleur: ${productSettings.productColor}`;
        cartItemContentDescription.appendChild(productColor);
        let productPrice = document.createElement('p');
        productPrice.textContent = `Prix: ${productsList[productsIndex].price} €`;
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

        // Modifying quantity, to call the totalCalculus function that will modify quantity and price display in real-time
        // Removing article from the DOM, and deleting the entry of the selected product in the localstorage (cart)
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
        let j = 0;
        let totalQuantity = 0;
        let totalPrice = 0;

        if (localStorage.length > 0) {
            while (j < localStorage.length) {
                let productLinea = localStorage.getItem(localStorage.key(j));
                let product = JSON.parse(productLinea);
                let productsIndex2;

                for(let prod in productsList) {
                    if (product.productId == productsList[prod]._id) {
                        productsIndex2 = prod;
                    }
                }
                
                totalQuantity += +product.productQuantity;
                totalPrice += +productsList[productsIndex2].price * +product.productQuantity;

                j++;
            } 
        }
        let totalQuantityHtml = document.getElementById('totalQuantity');
        totalQuantityHtml.textContent = totalQuantity;
        let totalPriceHtml = document.getElementById('totalPrice');
        totalPriceHtml.textContent = totalPrice;

        productsReload();
    }
}

// Creates empty products array and updates it (if necessary), containing only ids of the products in the cart
function productsReload() {
    products = [];
    let k = 0;
    while (k < localStorage.length) {
        let productSettingsLinea = localStorage.getItem(localStorage.key(k));
        let productSettings = JSON.parse(productSettingsLinea);
        let productSettingsId = productSettings.productId;
        products.push(productSettingsId);

        k++;
    }
}

// Declaring contact object to store all form inputs
let contact = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    email: ''
};

// declaring all vars pointing to the form elements, and their respective error messages
let firstName = document.getElementById('firstName');
let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
let lastName = document.getElementById('lastName');
let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
let address = document.getElementById('address');
let addressErrorMsg = document.getElementById('addressErrorMsg');
let city = document.getElementById('city');
let cityErrorMsg = document.getElementById('cityErrorMsg');
let email = document.getElementById('email');
let emailErrorMsg = document.getElementById('emailErrorMsg');

contactFormCheck ();

// Checks each form input comparing to regex masks, and displays error message if not valid (via inputCheck() callback)
function contactFormCheck () {
    // Declaring regex masks to check inputs validity
    let maskNameCity = /^[a-zA-Zéèëêöôï \-]+$/; // names and city name (only alphabetical chars)
    let maskAddress = /^[a-zA-Z0-9éèëêöôï \-]+$/; // Address can contain numbers (ie: zip code, street number,...)
    let maskEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/; //.fr, .com, .gouv,...

    firstName.addEventListener('change', inputCheck);
    lastName.addEventListener('change', inputCheck);
    city.addEventListener('change', inputCheck);
    address.addEventListener('change', inputCheck);
    email.addEventListener('change', inputCheck);

    function inputCheck () {
        if (maskNameCity.test(firstName.value)) {
            firstNameErrorMsg.textContent = '';
            contact.firstName = firstName.value;
        }
        else {
            firstNameErrorMsg.textContent = 'Erreur !';
        }

        if (maskNameCity.test(lastName.value)) {
            lastNameErrorMsg.textContent = '';
            contact.lastName = lastName.value;
        }
        else {
            lastNameErrorMsg.textContent = 'Erreur !';
        }

        if (maskNameCity.test(city.value)) {
            cityErrorMsg.textContent = '';
            contact.city = city.value;
        }
        else {
            cityErrorMsg.textContent = 'Erreur !';
        }

        if (maskAddress.test(address.value)) {
            addressErrorMsg.textContent = '';
            contact.address = address.value;
        }
        else {
            addressErrorMsg.textContent = 'Erreur !';
        }

        if (maskEmail.test(email.value)) {
            emailErrorMsg.textContent = '';
            contact.email = email.value;
        }
        else {
            emailErrorMsg.textContent = 'Erreur !';
        }
    }
}

// Submit handling, and POST request
productsReload(); // recalling this function to refresh the products array before sending it to the API

// Function that will check if one or more input is invalid
function formCheck() {
    if ((firstNameErrorMsg.textContent || lastNameErrorMsg.textContent || addressErrorMsg.textContent || cityErrorMsg.textContent || emailErrorMsg.textContent == 'Erreur !')) {
        return false;
    }
    else {
        return true;
    }
}


let orderSubmitButton = document.getElementById('order');
orderSubmitButton.addEventListener('click', postOrder);

// Checks if contact form is OK, then calls POST request to retrieve orderId that will be displayed on confirmation.html
async function postOrder(e) {
    e.preventDefault();

    if (!formCheck()) {
        alert('Erreur formulaire! Veuillez vérifier votre saisie.'); // If one or more input is invalid, displays errormsg and doesn't POST
    }
    else {
        let order = {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({contact, products})
        }
        
        let postOrder = await fetch('http://localhost:3000/api/products/order', order)
            .then(function(res) {
                if (res.ok) { 
                    return res.json();
                }
            })
            .then(function(value) {
                console.log(value);
                return value;
            })
            .catch(function(err) {
                console.log(err);
                alert(err);
            });

        let orderId = postOrder.orderId; // Retrieves orderId from API response

        console.log(orderId);

        document.location.assign (`./confirmation.html?id=${orderId}`); // Redirects to confirmation page with the orderId in url
    }
}