'use strict';

let onclick = document.getElementById('button');

onclick.addEventListener('click', function () {
    alert ('Clic clic !!');
    console.log ('clic réussi!');
});

let products;
fetch('http://localhost:3000/api/products')
    .then(function(res) {
    if (res.ok) { 
        return res.json();
    }
    })
    .then(function(value) {
        console.log(value);
        products = value;
    })
    .catch(function(err) {
        console.log('erreur!');
    });

let kanap1 = document.getElementById('k1');
let kanap3 = document.getElementById('k3');
let kanap4 = document.getElementById('k4');
let kanap6 = document.getElementById('k6');

kanap1.addEventListener('click', function() {
    alert (products[0].price);
    console.log(products[0]._id, products[0].name, products[0].price);
});
kanap3.addEventListener('click', function() {
    alert (products[2].name);
});
kanap4.addEventListener('click', function() {
    alert (products[3]._id);
});
kanap6.addEventListener('click', function() {
    alert (products[5].description);
});
