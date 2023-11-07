import { Order } from './order.js';

function getStatus(state) {
    switch(state) {
        case "Em processamento":
            return 'status-process';
        case "Em trânsito":
            return 'status-intransit';
        case "Entregue":
            return 'status-delivered';
        default:
            return 'status;'
    }
}

function renderStatus() {
    let status = document.createElement('p');
    status.classList = getStatus("Em processamento");
    status.textContent = "Em processamento";
    status.id = 'status-' + '1';
    return status;
}

function renderDate() {
    let date = document.createElement('p');
    date.classList = 'date';
    date.textContent = '13 de Novembro, 2022';
    date.id = 'date-' + '1';
    return date;
}

function renderPrice() {
    let price = document.createElement('p');
    price.classList = 'price';
    price.textContent = '5.99'+'$';
    price.id = 'price-' + '1';
    return price;
}

function renderSeeOrder(orderClass) {
    let seeOrder = document.createElement('a');
    seeOrder.setAttribute('data-toggle','modal');
    seeOrder.setAttribute('data-target','#modal-order-1');

    seeOrder.addEventListener("click", () => {
        orderClass.renderOrder();
    });

    return seeOrder;
}

function renderImage(orderClass) {
    let seeOrder = renderSeeOrder(orderClass);
    let img = document.createElement('img');
    img.src = "./img/gallo_classico.png";
    seeOrder.appendChild(img);
    return seeOrder;
}

class Orders {    
    constructor() {
        this.order = new Order('1');
    }

    renderOrder() {
        let row = document.getElementById('row-orders-1');
        while (row.firstChild) {
            row.removeChild(row.lastChild);
        }

        const order = document.createElement('div');
        order.id = '1';
        order.classList = 'col-sm';

        order.appendChild(renderStatus());
        order.appendChild(renderDate());
        order.appendChild(renderPrice());
        order.appendChild(renderImage(this.order));

        row.appendChild(order);
    }
}

export {Orders};