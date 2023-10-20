class DB {
    getProducts() {
        let product = {
            id : 'azeitonas',
            imageSource: 'img/azeitonas.jpeg',
            title: 'Azeitonas Mistas',
            shortDescription: 'Experimente as diferentes azeitonas.',
            price: '15.99 $/kg'
        };

        return [product, product, product, product];
    }

    getImage(id) {
        if (id=="azeitonas") {
            return 'img/azeitonas.jpeg';
        }
    }
    
    getTitle(id) {
        if (id=="azeitonas") {
            return 'Azeitonas Mistas';
        }
    }
    
    getPrice(id) {
        if (id=="azeitonas") {
            return '15.99 $/kg';
        }
    }

    getShortDescription(id) {
        if (id=="azeitonas") {
            return 'Experimente as diferentes azeitonas.';
        }
    }
    
    getDescription(id) {
        if (id=="azeitonas") {
            return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
        }
    }
    
    getQuantity(id) {
        if (id=="azeitonas") {
            return 4;
        }
    }
}

export {DB};