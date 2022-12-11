function showCart(products) {
    return `<div class="cart content-wrapper">
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
                        <tbody>
                            ${ products.length == 0 ? 
                                `<tr>
                                    <td colspan="5" style="text-align:center;">Não tens produtos no carrinho.</td>
                                </tr>`:
                                products.forEach( function (element) {
                                    `<tr>
                                        <td class="img">
                                            <a href="">
                                                <img src="../images/loja/<?=$product['img']?>" width="50" height="60" alt="<?=$product['name']?>">
                                            </a>
                                        </td>
                                        <td>
                                            <a href="loja.php?page=loja_produto&id=<?=$product['id']?>"><?=$product['name']?></a>
                                            <br>
                                            <a href="loja.php?page=loja_carrinho&remove=<?=$product['id']?>" class="remove">Remover</a>
                                        </td>
                                        <td class="price">&euro;<?=$product['price']?></td>
                                        <td class="quantity">
                                            <input type="number" name="quantity-<?=$product['id']?>" value="<?=$products_in_cart[$product['id']]?>" min="1" max="<?=$product['quantity']?>" placeholder="Quantity" required>
                                        </td>
                                        <td class="price">&euro;<?=$product['price'] * $products_in_cart[$product['id']]?></td>
                                    </tr>
                                    <?php endforeach; ?>
                                    <?php endif; ?>
                                    
                                    `
                                    
                                })

                            }
                            <?php if (empty($products)): ?>
                            <tr>
                                <td colspan="5" style="text-align:center;">Não tens produtos no carrinho.</td>
                            </tr>
                            <?php else: ?>
                            <?php foreach ($products as $product): ?>
                            <tr>
                                <td class="img">
                                    <a href="loja.php?page=loja_produto&id=<?=$product['id']?>">
                                        <img src="../images/loja/<?=$product['img']?>" width="50" height="60" alt="<?=$product['name']?>">
                                    </a>
                                </td>
                                <td>
                                    <a href="loja.php?page=loja_produto&id=<?=$product['id']?>"><?=$product['name']?></a>
                                    <br>
                                    <a href="loja.php?page=loja_carrinho&remove=<?=$product['id']?>" class="remove">Remover</a>
                                </td>
                                <td class="price">&euro;<?=$product['price']?></td>
                                <td class="quantity">
                                    <input type="number" name="quantity-<?=$product['id']?>" value="<?=$products_in_cart[$product['id']]?>" min="1" max="<?=$product['quantity']?>" placeholder="Quantity" required>
                                </td>
                                <td class="price">&euro;<?=$product['price'] * $products_in_cart[$product['id']]?></td>
                            </tr>
                            <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                    <div class="subtotal">
                        <span class="text">Subtotal</span>
                        <span class="price">&euro;<?=$subtotal?></span>
                    </div>
                    <div class="buttons">
                        <input type="submit" value="Update" name="update">
                        <input type="submit" value="Checkout" name="placeorder">
                    </div>
                </form>
            </div>`;
}