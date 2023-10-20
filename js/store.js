import { DB } from './db.js';

class Store {
    constructor() {
        this.db = new DB();
    }

    renderStore() {
        let store = this._renderHeader();
        store += this._renderProducts();

        return store;
    }

    _renderHeader() {
        return `<h1>Seleção de Produtos</h1>
                <h3>Desfrute e saboreie os nossos produtos internacionalmente.</h3>`;
    }

    _renderProducts() {
        const products = this.db.getProducts();
        
        let productsRenderization = `<div class="products">`;
        
        products.forEach( (product) => {
            productsRenderization += this._renderProduct(product);
        });

        productsRenderization += `</div>`;

        return productsRenderization;
    }

    _renderProduct(product) {
        return `<a class="product">
                    <img class="product-img" src="${product.imageSource}">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-short-description">${product.shortDescription}</p>
                    <p class="product-price">${product.price}</p>
                    <button type="button" id="${product.id}_add_to_cart_button" class="btn add-to-cart">
                        <span class="material-symbols-outlined">shopping_cart</span>
                        <p>Adicionar ao Carrinho</p>
                    </button>
                </a>`;
    }


}

export {Store};