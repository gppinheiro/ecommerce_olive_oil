import { DB } from './db.js';

const cartDiv = document.getElementById('cart');
const shoppingCartIcon = document.getElementById('shopping_cart');

class Cart {
    constructor() {
        this.db = new DB();
        this.productsInCart = [];
    }

    addProductsToCart(id, quantity) {
        const product = {'id':id, 'numberOfProductsInTheCart': quantity, 'quantity': this.db.getQuantity(id)};
        this.productsInCart.push(product);
        this._setSessionStorage();
        this.updateBadge();
    }

    _setSessionStorage() {
        sessionStorage.setItem('productsInCart',JSON.stringify(this.productsInCart));
    }

    updateBadge() {
        const badge = this.getBadgeElement();
        if(badge != null) badge.setAttribute('value',this.productsInCart.length);
    }

    getBadgeElement() {
        this._getItemSessionStorage();

        let badge = document.getElementById('badge');

        if(badge == null && this.productsInCart.length) {
            badge = document.createElement('span');
            badge.id = 'badge';

            shoppingCartIcon.appendChild(badge);
        }

        return badge;
    } 

    _getItemSessionStorage() {
        this.productsInCart = JSON.parse(sessionStorage.getItem('productsInCart'));
    }
    
    removeProductsFromCart(id) {
        let index = 0;
        this.productsInCart.forEach(element => {
            if(element.id==id) return;
            index+=1;
        });
        this.productsInCart.splice(index,1);
    
        this._setSessionStorage();
        cartDiv.innerHTML = this.renderCart();
    
        if(this.productsInCart.length) this.updateBadge();
        else this._removeBadge();
    }

    _removeBadge() {
        const badge = this.getBadgeElement();
        shoppingCartIcon.removeChild(badge);
    }

    renderCart() {
        this._getItemSessionStorage();

        if(this.productsInCart==null || this.productsInCart.length == 0) return this._renderEmptyState();
    
        let cart = this._renderHeader();
        this.productsInCart.forEach(element => cart += this._renderElement(element));
        cart += this._renderFooter();
    
        return cart;
    }

    _renderEmptyState() {
        return `<h1>Carrinho</h1>
                <div class='empty-state'>
                    <h2>Não tem produtos no carrinho.</h2>
                    <img src="../img/empty_state_no_products.jpg">
                </div>`;
    }

    _renderHeader() {
        return `<h1>Carrinho</h1>
                <div class="content-wrapper">   
                    <table>
                        <thead>
                            <tr>
                                <td colspan="2">Produto</td>
                                <td>Preço</td>
                                <td>Quantidade</td>
                                <td>Total</td>
                            </tr>
                        </thead>
                        <tbody>`;
    }

    _renderElement(element) {
        return `<tr id="product_${element.id}">
                    <td class="img">
                        <a href="">
                            <img src="${this.db.getImage(element.id)}" width="50" height="60">
                        </a>
                    </td>
                    <td>
                        <a href="">${this.db.getTitle(element.id)}</a>
                        <br>
                        <a id="${element.id}_delete_button" class="remove">Remover</a>
                    </td>
                    <td class="price">${this.db.getPrice(element.id)}</td>
                    <td class="quantity">
                        <input type="number" id="quantity_${element.id}" value="${element.numberOfProductsInTheCart}" min="1" max="${element.quantity}" required>
                    </td>
                    <td class="price">${this.db.getPrice(element.id).split(' ')[0] * element.numberOfProductsInTheCart}</td>
                </tr>`  
    }

    _renderFooter() {
        return `</tbody>
            </table>
            <div class="subtotal">
                <span class="text">Subtotal</span>
                <span class="price subtotal_placeholder">${this._calculateSubtotal()} $</span>
            </div>
            <div class="buttons">
                <button type="button" class="btn" id="update_cart">
                    <span class="material-symbols-outlined">restart_alt</span>
                    <p>Atualizar</p>
                </button>
                <button type="button" class="btn" id="checkout_cart">
                    <span class="material-symbols-outlined">shopping_cart_checkout</span>
                    <p>Checkout</p>
                </button>
            </div>
        </div>`;
    }

    _calculateSubtotal() {
        let subtotal = 0;

        this.productsInCart.forEach( (product) => {
            subtotal += this.db.getPrice(product.id).split(' ')[0] * product.numberOfProductsInTheCart;
        });

        return subtotal;
    }

    updateCart() {
        const cartProducts = cartDiv.querySelectorAll(`[id^='product_']`);
        
        let productIndex = 0;
        cartProducts.forEach( (product) => {
            const quantity = this._updateProductPrice(product);
            this._updateProductQuantity(productIndex, quantity);
            productIndex++;
        });

        this._updateSubtotal();
    }

    _updateProductPrice(product) {
        const productId = product.id.split("_")[1];
        const quantity = parseInt(product.getElementsByTagName('input')[0].value);
        const price = this.db.getPrice(productId).split(' ')[0] * quantity;

        product.getElementsByClassName('price')[1].innerHTML = `${price} $`;

        return quantity;
    }

    _updateProductQuantity(productIndex, quantity) {
        this.productsInCart[productIndex].numberOfProductsInTheCart = quantity;
        this._setSessionStorage();
    }

    _updateSubtotal() {
        cartDiv.getElementsByClassName("subtotal_placeholder")[0].innerHTML = `${this._calculateSubtotal()} $`;
    }

    limitQuantitySelected(event) {
        const typed = event.key;
            
        if(!isNaN(typed)) event.preventDefault();
        
        if ( (event.target.value + typed) <= event.target.max) {
            event.target.value += typed;
        } 
        else {
            event.target.value = event.target.max;
        }
    }

}

export {Cart};