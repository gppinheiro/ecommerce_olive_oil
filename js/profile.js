const general = document.getElementById('general');
const address = document.getElementById('address');
const password = document.getElementById('password');
const accountGeneral = document.getElementById('account-general');
const accountAddress = document.getElementById('account-address');
const accountPassword = document.getElementById('account-password');

class Profile {
    
    addEventHandlers() {
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