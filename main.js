import {Cart} from './modules.js';

const addToCartButton = document.getElementById('azeitonas');
const cartDiv = document.getElementById('cart');

const cart = new Cart();

window.addEventListener("load", (event) => {
    if(location.href.includes("index.html")) {
        addToCartButton.click(cart.addProductsToCart("azeitonas",1));
    }
    else if(location.href.includes("cart.html")) {
        document.getElementById('cart').innerHTML += cart.showCart();
        cart.updateBadge();
    }
});