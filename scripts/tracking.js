import { orders } from '../data/orders.js';
import { getProduct, loadProducts } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { calculateCartQuantity } from '../data/cart.js';

renderPage();

async function renderPage() {
  try {
    await loadProducts();
  } catch (error) {
    throw new Error(`Unespected error.Plese try again later.${error}`);
  }
  renderTrackingPage();
}

function renderTrackingPage() {
  let trackingHTML = '';

  orders.forEach((order) => {
    order.products.forEach((product) => {
      const url = new URL(window.location.href);
      const param1 = url.searchParams.get('orderId');
      const param2 = url.searchParams.get('productId');

      if (param1 === order.id && param2 === product.productId) {
        const matchingProduct = getProduct(product.productId);
        const deliveryDate = dayjs(product.estimatedDeliveryTime);
        const orderTime = dayjs(order.orderTime);
        const currentTime = dayjs();
        const deliveryDateString = deliveryDate.format('MMMM, D');
        const firstTime = currentTime.subtract(orderTime);
        const secondTime = deliveryDate.subtract(orderTime);
        const percent = Math.round((firstTime / secondTime) * 100);

        trackingHTML += `
        <a class="back-to-orders-link link-primary" href="orders.html">
     View all orders
   </a>

   <div class="delivery-date">
     Arriving on ${deliveryDateString}
   </div>

   <div class="product-info">
    ${matchingProduct.name}
   </div>

   <div class="product-info">
     Quantity: ${product.quantity}
   </div>

   <img class="product-image" src="${matchingProduct.image}" alt="${matchingProduct.name}">

   <div class="progress-labels-container">
     <div class="progress-label js-progress-label-${percent}">
       Preparing ${percent <= 49 ? `${percent}%` : ''}
     </div>
     <div class="progress-label js-progress-label-${percent}">
       Shipped ${percent >= 50 && percent <= 99 ? `${percent}%` : ''}
     </div>
     <div class="progress-label js-progress-label-${percent}">
       Delivered ${percent === 100 ? `Delivered` : ''}
     </div>
   </div>

   <div class="progress-bar-container">
     <div class="progress-bar js-progress-bar" data-percent="${percent}"></div>
   </div>
`;
      }
    });
  });
  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;

  function renderCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }

  renderCartQuantity();

  function calculateProgressBar () {
    const progressBar = document.querySelector('.js-progress-bar');
    const { percent } = progressBar.dataset;
    progressBar.style.width = `${percent}%`;
  
    if(percent <= 49) {
      document.querySelector(`.js-progress-label-${percent}`).classList.add('current-status');
    } else if(percent >= 50 && percent <= 99) {
      document.querySelector(`.js-progress-label-${percent}`).classList.add('current-status');
    } else if(percent > 100) {
      document.querySelector(`.js-progress-label-${percent}`).classList.add('current-status');
    }
  }
 calculateProgressBar();
}
