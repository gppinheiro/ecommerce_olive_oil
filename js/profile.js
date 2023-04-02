import {Order} from './order.js';

const order = new Order();

const account = document.getElementById('account');
const orders = document.getElementById('orders');
const myAccount = document.getElementById('my-account');
const myOrders = document.getElementById('my-orders');

const general = document.getElementById('general');
const address = document.getElementById('address');
const password = document.getElementById('password');
const accountGeneral = document.getElementById('account-general');
const accountAddress = document.getElementById('account-address');
const accountPassword = document.getElementById('account-password');

class Profile {
    
    addEventHandlers() {
        account.onclick = () => {
            account.classList.add("active");
            orders.classList.remove("active");
            myAccount.style.display = 'block';
            myOrders.style.display = 'none';
        }

        orders.onclick = () => {
            account.classList.remove("active");
            orders.classList.add("active");
            myAccount.style.display = 'none';
            myOrders.style.display = 'block';
            order.renderOrder();
        }


        general.onclick = () => {
            general.classList.add("active");
            address.classList.remove("active");
            password.classList.remove("active");
            accountGeneral.style.display = 'block';
            accountAddress.style.display = 'none';
            accountPassword.style.display = 'none';
        };

        address.onclick = () => {
            general.classList.remove("active");
            address.classList.add("active");
            password.classList.remove("active");
            accountGeneral.style.display = 'none';
            accountAddress.style.display = 'block';
            accountPassword.style.display = 'none';
        };

        password.onclick = () => {
            general.classList.remove("active");
            address.classList.remove("active");
            password.classList.add("active");
            accountGeneral.style.display = 'none';
            accountAddress.style.display = 'none';
            accountPassword.style.display = 'block';
        };
    }

}

export {Profile};