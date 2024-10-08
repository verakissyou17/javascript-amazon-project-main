import {
    cart,
    removeFromCart,
    calculateCartQuantity,
    updateQuantity,
    updateDeliveryOption
  } from "../../data/cart.js";
  import { getProduct } from "../../data/products.js";
  import { formatCurrency } from "../utils/money.js";
  import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
  import { deliveryOptions,  getDeliveryDate } from "../../data/deliveryOptions.js";
  import { renderPaymentSummary } from "./paymentSummary.js";

  
export function renderOrderSummary () {

let cartSummaryHTML = "";

cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);  

    const dateString = getDeliveryDate(cartItem);

    cartSummaryHTML += 
        `<div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">Delivery date: ${dateString}</div>
            <div class="cart-item-details-grid">
            <img
                class="product-image"
                src="${matchingProduct.image}"
                alt="${matchingProduct.name}"
            />  
            <div class="cart-item-details">
                <div class="product-name js-product-name-${matchingProduct.id}">
                ${matchingProduct.name}
                </div>
                <div class="product-price js-product-price-${matchingProduct.id}">
                ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                <span> Quantity: 
                    <span class="quantity-label js-quantity-label js-quantity-label-${matchingProduct.id}">
                    ${cartItem.quantity}
                    </span> 
                </span>
                <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${matchingProduct.id}">
                    Update
                </span>
                <input type="number" min="0" max="10" class="quantity-input js-quantity-input-${matchingProduct.id}" />
                <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">
                    Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    Delete
                </span>
                </div>
            </div>
    
            <div class="delivery-options">
                <div class="delivery-options-title">Choose a delivery option:</div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
            </div>
        </div>`;
});

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

function renderCartQuantity() {
    const cartQuantity = calculateCartQuantity();

    document.querySelector(
    ".js-return-to-home-link"
    ).innerHTML = `${cartQuantity} items`;
};

renderCartQuantity();

function deliveryOptionsHTML (matchingProduct, cartItem) {
    let html = '';
    
    deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `<div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" 
                data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
        <input
            type="radio"
            class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
            ${isChecked ? ' checked' : ''}
            name="delivery-option-${matchingProduct.id}"/>
        <div>
        <div class="delivery-option-date">
            ${dateString}
        </div>
        <div class="delivery-option-price">
            $${priceString} Shipping
        </div>
        </div>
    </div>
    `;
    });
    return html;
};

document.querySelectorAll(".js-delete-link").forEach((deleteLink) => {
    deleteLink.addEventListener("click", () => {
    const productId = deleteLink.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(
        `.js-cart-item-container-${productId}`
    );
    container.remove();
    renderCartQuantity();
    renderPaymentSummary();
    });
});

document.querySelectorAll(".js-update-quantity").forEach((updateButton) => {
    updateButton.addEventListener("click", () => {
    const productId = updateButton.dataset.productId;

    const container = document.querySelector(
        `.js-cart-item-container-${productId}`
    );
    container.classList.add("is-editing-quantity");
    });
});

document.querySelectorAll(".js-save-link").forEach((saveLink) => {
    saveLink.addEventListener("click", () => {
    const productId = saveLink.dataset.productId;
    const inputValue = document.querySelector(
        `.js-quantity-input-${productId}`
    );
    const newQuantity = Number(inputValue.value);

    if (newQuantity <= 0 || newQuantity >= 10) {
        alert("Quantity must be at least 0 and less than 10");
        return;
    }

    updateQuantity(productId, newQuantity);
    const container = document.querySelector(
        `.js-cart-item-container-${productId}`
    );
    container.classList.remove("is-editing-quantity");
    const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
    );
    quantityLabel.innerHTML = newQuantity;

    renderCartQuantity();
    renderPaymentSummary();
    });
});

document.querySelectorAll(".js-delivery-option").forEach((element) => {
    const {productId, deliveryOptionId} = element.dataset;
    element.addEventListener("click", () => {
    updateDeliveryOption(productId, deliveryOptionId);
    renderOrderSummary();
    renderPaymentSummary();
    });
});  
};
  
  