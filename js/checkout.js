import { ProgressIndicator } from './enums.js';

class Checkout {
    constructor(db) {
        this.db = db;
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
        const subtotalElement = document.getElementsByClassName('subtotal')[0].childNodes[3];
        const taxesElement = document.getElementsByClassName('taxes')[0].childNodes[3];
        const totalElement = document.getElementsByClassName('total')[0].childNodes[3];

        subtotalElement.innerHTML = `${this.subtotal}$`;
        taxesElement.innerHTML = `${this._calculateTaxes().toFixed(2)}$`;
        totalElement.innerHTML = `${this._calculateTotal().toFixed(2)}$`;
    }

    _calculateTaxes() {
        return this.subtotal * 0.23;
    }

    _calculateTotal() {
        return this.subtotal + this._calculateTaxes();
    }

    renderOrderAddress() {
        const firstName = sessionStorage.getItem('firstName');
        const lastName = sessionStorage.getItem('lastName');
        const address = sessionStorage.getItem('address');
        const city = sessionStorage.getItem('city');
        const country = sessionStorage.getItem('country');
        const zipCode = sessionStorage.getItem('zipCode');

        const orderAddress = document.getElementById('order-address');
        orderAddress.innerHTML = this._renderAddress(firstName, lastName, address, city, country, zipCode);
    }

    _renderAddress(firstName, lastName, address, city, country, zipCode) {
        return `<h3>Endereco de Envio</h3>
                <p>${firstName} ${lastName}</p>
                <p>${address}</p>
                <p>${zipCode}, ${city}</p>
                <p>${country}</p>`;
    }

    moveToPayment() {
        this._setProgressIndicator(ProgressIndicator.Shipping, ProgressIndicator.Payment);
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
        this._setProgressIndicator(ProgressIndicator.Payment, ProgressIndicator.Shipping);
        this._setContent('shipping');
    }

    moveToConfirmation() {
        this._setProgressIndicator(ProgressIndicator.Payment, ProgressIndicator.Review);
        this._setContent('review');
    }

    saveShippingInformation() {
        const name = document.getElementById('name').value;
        const nif = document.getElementById('nif').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const country = document.getElementById('country').value;
        const zipCode = document.getElementById('zipcode').value;

        sessionStorage.setItem('name', name);
        sessionStorage.setItem('nif', nif);
        sessionStorage.setItem('address', address);
        sessionStorage.setItem('city', city);
        sessionStorage.setItem('country', country);
        sessionStorage.setItem('zipCode', zipCode);
    }

    saveInvoiceInformation() {
        const name = document.getElementById('name-invoice').value;
        const nif = document.getElementById('nif-invoice').value;
        const address = document.getElementById('address-invoice').value;
        const city = document.getElementById('city-invoice').value;
        const country = document.getElementById('country-invoice').value;
        const zipCode = document.getElementById('zipcode-invoice').value;

        sessionStorage.setItem('name-invoice', name);
        sessionStorage.setItem('nif-invoice', nif);
        sessionStorage.setItem('address-invoice', address);
        sessionStorage.setItem('city-invoice', city);
        sessionStorage.setItem('country-invoice', country);
        sessionStorage.setItem('zipCode-invoice', zipCode);
    }
}

export {Checkout};