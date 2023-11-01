import { DB } from './db.js';

class Checkout {
    constructor() {
        this.db = new DB();
        this.subtotal = 0;
    }

    renderOrderOverview() {
        const productsInCart = JSON.parse(sessionStorage.getItem('productsInCart'));
        
        if(productsInCart == null) {
            return;
        }

        this._renderOrderDetails(productsInCart);
        this._renderOrderSummary();
    }

    _renderOrderDetails(products) {
        const orderItems = document.getElementById('order-items');
        products.forEach( (product) => {
            orderItems.innerHTML += this._renderItem(product);
        });
    }

    _renderItem(product) {
        return `<li class="order-item">
                    <a href="">
                        <img src="${this.db.getImage(product.id)}">
                    </a>
                    <div class="details">
                        <div class="info">
                            <p class="title">${this.db.getTitle(product.id)}</p>
                            <p class="description">Quantidade: ${product.numberOfProductsInTheCart}</p>
                        </div>
                        <p class="price">${this._calculateItemPrice(product.id, product.numberOfProductsInTheCart)}$</p>
                    </div>
                </li>`;
    }

    _calculateItemPrice(productId, quantity) {
        const price = this.db.getPrice(productId).split(' ')[0] * quantity;
        this.subtotal += price;
        return price;
    }

    _renderOrderSummary() {
        const subtotalElement = document.getElementsByClassName('subtotal')[0].lastChild;
        const taxesElement = document.getElementsByClassName('taxes')[0].lastChild;
        const totalElement = document.getElementsByClassName('total')[0].lastChild;

        subtotalElement.innerHTML = `${this.subtotal}$`;
        taxesElement.innerHTML = `${this._calculateTaxes()}$`;
        totalElement.innerHTML = `${this._calculateTotal()}$`;
    }

    _calculateTaxes() {
        return this.subtotal * 0.23;
    }

    _calculateTotal() {
        return this.subtotal + this._calculateTaxes();
    }

    saveShippingInformation() {
        const firstName = document.getElementById('firstname').value;
        const lastName = document.getElementById('lastname').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const country = document.getElementById('country').value;
        const zipCode = document.getElementById('zipcode').value;

        sessionStorage.setItem('firstName', firstName);
        sessionStorage.setItem('lastName', lastName);
        sessionStorage.setItem('address', address);
        sessionStorage.setItem('city', city);
        sessionStorage.setItem('country', country);
        sessionStorage.setItem('zipCode', zipCode);
    }

    moveToPayment() {
        this._setProgressIndicator(1, 3);
        this._setContent('payment');
    }

    _setProgressIndicator(from, to) {
        const progressIndicator = document.getElementsByClassName('progress-indicator')[0];
        const steps = progressIndicator.childNodes[1].childNodes;
        steps[from].removeAttribute('class');
        steps[to].setAttribute('class', 'is-active');
    }

    _setContent(step) {
        const content = document.getElementsByClassName('content')[0];
        content.className = `content ${step}`;
    }

    moveToShipping() {
        this._setProgressIndicator(3, 1);
        this._setContent('shipping');
    }

    moveToConfirmation() {
        this._setProgressIndicator(3, 5);
        this._setContent('review');
    }
}

export {Checkout};