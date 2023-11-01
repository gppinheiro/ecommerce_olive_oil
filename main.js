import { Cart } from './modules.js';
import { Checkout } from './modules.js';
import { Store } from './modules.js';

const idAddToCartButton = "_add_to_cart_button";
const idDeleteButton = "_delete_button";

const productsDiv = document.getElementById('products');
const cartDiv = document.getElementById('cart');

const store = new Store();
const cart = new Cart();
const checkout = new Checkout();

window.addEventListener("load", (event) => {
    if(location.href.includes("index.html")) {
        productsDiv.innerHTML += store.renderStore();
        cart.updateBadge();

        const addToCartButtons = productsDiv.querySelectorAll(`[id$="${idAddToCartButton}"]`);
        addToCartButtons.forEach( (button) => {
            const productId = button.id.split("_")[0];
            button.onclick = () => { 
                cart.addProductsToCart(productId,1); 
            };
        });
    }
    else if(location.href.includes("cart.html")) {
        cartDiv.innerHTML += cart.renderCart();
        cart.updateBadge();

        const cartDeleteButtons = cartDiv.querySelectorAll(`[id$="${idDeleteButton}"]`);
        cartDeleteButtons.forEach( (button) => {
            const productId = button.id.split("_")[0];
            button.onclick = () => { 
                cart.removeProductsFromCart(productId) 
            };
        });

        const quantityInputs = cartDiv.querySelectorAll(`[id^='quantity_']`);
        quantityInputs.forEach( (input) => {
            input.onkeydown = (e) => {
                cart.limitQuantitySelected(e);
            }
        });

        const updateCart = document.getElementById("update_cart");
        updateCart.onclick = () => {
            cart.updateCart();
        };
    }
    else if(location.href.includes("checkout.html")) {
        checkout.renderOrderOverview();

        const shippingButton = document.getElementById('shipping_button');
        shippingButton.onclick = () => {
            checkout.saveShippingInformation();
            checkout.moveToPayment();
        }

        const backButton = document.getElementById('back_button');
        backButton.onclick = () => {
            checkout.moveToShipping();
        }

        const paymentButton = document.getElementById('payment_button');
        paymentButton.onclick = () => {
            checkout.moveToConfirmation();
        }
    }
});