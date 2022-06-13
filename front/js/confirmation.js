'use strict';

// Retrieving the orderId from the URL (passed from cart.js in the url parameters)
let url = new URL(window.location.href);
let orderId = url.searchParams.get('id');

// Displaying the orderId to the user
let orderIdHtml = document.getElementById('orderId');
orderIdHtml.textContent = `${orderId}`;