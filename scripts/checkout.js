import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/cart-oop.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

async function loadPage() {
    try {
        await loadProductsFetch();

        const cartItems = await new Promise((resolve, reject) => {
            loadCart(() => {
                // reject('error');
                resolve('cartItems');
            })
        })
    } catch (error) {
        throw new Error(`Unespected error.Plese try again later.${error}`);
    }

    renderOrderSummary();
    renderPaymentSummary();
};

loadPage();

// Promise.all([
//    loadProductsFetch(),
//     new Promise((resolve) => {
//       loadCart(() => {
//         resolve();
//       });
//     })
// ]).then(() => {
//     renderOrderSummary ();
//     renderPaymentSummary();
// })

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve('value 1');
//   });
// }).then((value) => {
//     console.log(value);
//     return new Promise((resolve) => {
//       loadCart(() => {
//         resolve();
//       });
//     });
//   }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   });

// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary ();
//         renderPaymentSummary();
//     });
// });
