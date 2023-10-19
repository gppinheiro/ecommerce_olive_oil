import {Cart} from './modules.js';

const addToCartButton = document.getElementById('azeitonas');

const idDeleteButton = "_delete_button";
const cartDiv = document.getElementById('cart');

const cart = new Cart();

window.addEventListener("load", (event) => {
    if(location.href.includes("index.html")) {
        addToCartButton.click(cart.addProductsToCart("azeitonas",1));
    }
    else if(location.href.includes("cart.html")) {
        cartDiv.innerHTML += cart.renderCart();
        cart.updateBadge();

        const cartDeleteButtons = cartDiv.querySelectorAll(`[id$="${idDeleteButton}"]`);
        cartDeleteButtons.forEach( (button) => {
            debugger;
            const productId = button.id.split("_")[0];
            button.onclick = function() { cart.removeProductsFromCart(productId) };
        });
    }
});