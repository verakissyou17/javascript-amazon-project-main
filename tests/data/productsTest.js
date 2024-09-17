import {getProduct} from '../../data/products.js';

describe('test suite: getProduct', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

    it('should display information about the product', () => {
        const product = getProduct(productId1);
        expect(product.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
        expect(product.id).toEqual(productId1);
        expect(product.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
        expect(product.priceCents).toEqual(1090);
    });
});