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
                                <form action="" method="post">
                                    <input type="number" name="quantity" value="1" min="1" max="4" placeholder="Quantidade" required>
                                    <input type="hidden" name="product_id" value="azeitonas">
                                    <input type="submit" value="Adicionar ao carrinho">
                                </form>
                                <div class="stock_advisor">
                                </div>
                                <div class="description">
                                    ${getDescription(id)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
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