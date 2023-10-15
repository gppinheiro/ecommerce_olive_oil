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
        cartDiv.removeChild(document.querySelector('#cart > div'));
        cartDiv.innerHTML += showCart();
    
        if(this.productsInCart.length) this.updateBadge();
        else this.removeBadge();
    }

    updateBadge() {
        shoppingCartIcon.classList.add('badge');
        shoppingCartIcon.setAttribute('value',this.productsInCart.length);
    }
    
    removeBadge() {
        shoppingCartIcon.classList.remove('badge');
    }

    showCart() {
        this.productsInCart = JSON.parse(sessionStorage.getItem('productsInCart'));
    
        var cart = `<div class="content-wrapper">   
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
        
        if(this.productsInCart==null || this.productsInCart.length == 0) 
            cart +=     
            `<tr>
                <td colspan="5" style="text-align:center;">Não tens produtos no carrinho.</td>
            </tr>`    
        else
            this.productsInCart.forEach(element => 
                cart +=
                `<tr>
                    <td class="img">
                        <a href="">
                            <img src="${this.db.getImage(element.id)}" width="50" height="60">
                        </a>
                    </td>
                    <td>
                        <a href="">${this.db.getTitle(element.id)}</a>
                        <br>
                        <a href="javascript:removeProductsFromTheBasket('${element.id}')" class="remove">Remover</a>
                    </td>
                    <td class="price">${this.db.getPrice(element.id)}</td>
                    <td class="quantity">
                        <input type="number" name="quantity-${element.id}" value="${element.numberOfProductsInTheCart}" min="1" max="${element.quantity}" placeholder="Quantity" required>
                    </td>
                    <td class="price">${this.db.getPrice(element.id).split(' ')[0] * element.numberOfProductsInTheCart}</td>
                </tr>`  
            );
        
        cart +=
    `          </tbody>
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
                    <p>Atualizar</p>
                </button>
            </div>
        </div>`
    
        return cart;
    }

}

export {Cart};