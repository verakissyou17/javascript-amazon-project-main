import {orders} from '../data/orders.js';
import { getProduct, loadProducts } from '../data/products.js';
import { formatCurrency } from '../scripts/utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { addToCart, calculateCartQuantity } from '../data/cart.js';

renderPage();

async function renderPage() {
    try {
        await loadProducts();
    } catch (error) {
        throw new Error(`Unespected error.Plese try again later.${error}`);
    }
    renderOrdersPage();
}

export function renderOrdersPage () {
  let ordersHTML = '';

  orders.forEach((order) => {
    const orderDate = order.orderTime;
    const date = dayjs(orderDate);
    const dateString = date.format('MMMM, D');

    order.products.forEach((product) => {
      const matchingProduct = getProduct(product.productId);
      const productPriceCents = matchingProduct.priceCents * product.quantity;
      const deliveryDate = dayjs(product.estimatedDeliveryTime);
      const deliveryDateString = deliveryDate.format('MMMM, D');


      ordersHTML += `
         <div class="order-container">          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dateString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(productPriceCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${deliveryDateString}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again" data-product-id="${matchingProduct.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
        </div>
`;
    });
  });
  
  document.querySelector('.js-order-grid').innerHTML = ordersHTML;

  
  function renderCartQuantity() {
    const cartQuantity = calculateCartQuantity();
      document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    };
    
    renderCartQuantity();

  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
     const {productId} = button.dataset;
     addToCart(productId, 1);
     renderCartQuantity();
    });
  })
};















