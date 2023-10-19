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
        sessionStorage.setItem('productsInCart',JSON.stringify(this.productsInCart));
    }
    
    removeProductsFromCart(id) {
        let index = 0;
        this.productsInCart.forEach(element => {
            if(element.id==id) return;
            index+=1;
        });
        this.productsInCart.splice(index,1);
    
        sessionStorage.setItem('productsInCart',JSON.stringify(this.productsInCart));
        cartDiv.innerHTML = this.renderCart();
    
        if(this.productsInCart.length) this.updateBadge();
        else this.removeBadge();
    }

    getBadgeElement() {
        let badge = document.getElementById('badge');

        if(badge == null && this.productsInCart.length) {
            badge = document.createElement('span');
            badge.id = 'badge';

            shoppingCartIcon.appendChild(badge);
        }

        return badge;
    } 

    updateBadge() {
        const badge = this.getBadgeElement();
        if(badge != null) badge.setAttribute('value',this.productsInCart.length);
    }
    
    removeBadge() {
        const badge = this.getBadgeElement();
        shoppingCartIcon.removeChild(badge);
    }

    renderCart() {
        this.productsInCart = JSON.parse(sessionStorage.getItem('productsInCart'));

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
        return `<tr>
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
                        <input type="number" name="quantity-${element.id}" value="${element.numberOfProductsInTheCart}" min="1" max="${element.quantity}" placeholder="Quantity" required>
                    </td>
                    <td class="price">${this.db.getPrice(element.id).split(' ')[0] * element.numberOfProductsInTheCart}</td>
                </tr>`  
    }

    _renderFooter() {
        return `</tbody>
            </table>
            <div class="subtotal">
                <span class="text">Subtotal</span>
                <span class="price">0$</span>
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

}

export {Cart};