'use strict';

let url = new URL(window.location.href);
let orderId = url.searchParams.get('id');

let orderIdHtml = document.getElementById('orderId');
orderIdHtml.textContent = `${orderId}`;