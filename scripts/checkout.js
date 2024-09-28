import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
// import '../data/cart-oop.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

export  async function loadPage() {
    try {
        await loadProducts();
    } catch (error) {
        throw new Error(`Unespected error.Plese try again later.${error}`);
    }

    renderOrderSummary();
    renderPaymentSummary();
};

loadPage();
