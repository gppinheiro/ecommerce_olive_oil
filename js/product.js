var productsBasket = [];

function addProductToTheBasket(id, quantity) {
    addProductsToTheBasket(id, quantity);
    document.querySelector('#azeitonas > div > div.modal-header > button').click();
    updateBadge();
}

function updateBadge() {
    document.getElementById('icon-basket').classList.add('badge');
    document.getElementById('icon-basket').setAttribute('value',productsBasket.length);
}

function removeBadge() {
    document.getElementById('icon-basket').classList.remove('badge');
}

function addProductsToTheBasket(id, quantity) {
    var product = {'id':id, 'numberOfProductsInTheCart': quantity, 'quantity': getQuantity(id)};
    productsBasket.push(product);
    sessionStorage.setItem('productsInCart',JSON.stringify(productsBasket));
}

function removeProductsFromTheBasket(id) {
    var index = 0;
    productsBasket.forEach(element => {
        if(element.id==id) return;
        index+=1;
    });
    productsBasket.splice(index,1);

    sessionStorage.setItem('productsInCart',JSON.stringify(productsBasket));
    document.getElementById('cart').removeChild(document.querySelector('#cart > div'));
    document.getElementById('cart').innerHTML += showCart();

    if(productsBasket.length) updateBadge();
    else removeBadge();
}

function getProduct(id) {
return `    <div class="modal-dialog modal-dialog-centered" role="document" id="${id}">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="product content-wrapper">
                            <img src="${getImage(id)}" width="500" height="600">
                            <div>
                                <h1>${getTitle(id)}</h1>
                                <span class="price">${getPrice(id)}</span>
                                <form action="javascript:addProductToTheBasket(product_id.value,quantity.value)" method="post">
                                    <input type="number" name="quantity" id="quantity" value="1" min="1" max="${getQuantity(id)}" placeholder="Quantidade" required>
                                    <input type="hidden" name="product_id" id="product_id" value="azeitonas">
                                    <input type="submit" value="Adicionar ao carrinho">
                                </form>
                                ${getQuantity(id)==0 ? '<div class="stock_advisor"><p style="color: red; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">Sem Stock. Lamentamos o incómodo.</p></div>' : ''}
                                <div class="description">
                                    ${getDescription(id)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}

function showCart() {
    productsBasket = JSON.parse(sessionStorage.getItem('productsInCart'));

    var cart = `<div class="cart content-wrapper">
                            <form action="" method="post">
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
    
    if(productsBasket==null || productsBasket.length == 0) 
        cart +=     
        `<tr>
            <td colspan="5" style="text-align:center;">Não tens produtos no carrinho.</td>
        </tr>`    
    else
        productsBasket.forEach(element => 
            cart +=
            `<tr>
                <td class="img">
                    <a href="">
                        <img src="${getImage(element.id)}" width="50" height="60">
                    </a>
                </td>
                <td>
                    <a href="">${getTitle(element.id)}</a>
                    <br>
                    <a href="javascript:removeProductsFromTheBasket('${element.id}')" class="remove">Remover</a>
                </td>
                <td class="price">${getPrice(element.id)}</td>
                <td class="quantity">
                    <input type="number" name="quantity-${element.id}" value="${element.numberOfProductsInTheCart}" min="1" max="${element.quantity}" placeholder="Quantity" required>
                </td>
                <td class="price">${getPrice(element.id).split(' ')[0] * element.numberOfProductsInTheCart}</td>
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
                <input type="submit" value="Update" name="update">
                <input type="submit" value="Checkout" name="placeorder">
            </div>
        </form>
    </div>`

    return cart;
}

function getImage(id) {
    if (id=="azeitonas") {
        return 'img/azeitonas.jpeg';
    }
}

function getTitle(id) {
    if (id=="azeitonas") {
        return 'Azeitonas Mistas';
    }
}

function getPrice(id) {
    if (id=="azeitonas") {
        return '15.99 $/kg';
    }
}

function getDescription(id) {
    if (id=="azeitonas") {
        return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    }
}

function getQuantity(id) {
    if (id=="azeitonas") {
        return 4;
    }
}