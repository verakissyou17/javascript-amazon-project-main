export const cart = [];

export function addToCart (productId) {
    const selectorValue = document.querySelector(`.js-quantity-selector-${productId}`).value;
    const value = Number(selectorValue);
    let matchingItem;

    cart.forEach((cartItem) => {
     if(productId === cartItem.productId) {
         matchingItem = cartItem;
     }
    });

    if(matchingItem) {
     matchingItem.quantity += value;
    } else {
     cart.push({
         productId, 
         quantity: value
        });
    }
};