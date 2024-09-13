export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {
 cart =  [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
},{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
}];
};

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
         quantity: value,
         deliveryOptionId: '1'
        });
    }
    saveToStorage();
};

function saveToStorage () {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export function removeFromCart (productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    saveToStorage();
};

export function calculateCartQuantity() {
    let cartQuantity = 0;
  
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
  
    return cartQuantity;
  }

  export function updateQuantity(productId, newQuantity) {
    let matchingItem;
    
    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.quantity = newQuantity;
    saveToStorage();
  };

  export function updateDeliveryOption (productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
     if(productId === cartItem.productId) {
         matchingItem = cartItem;
     }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  };