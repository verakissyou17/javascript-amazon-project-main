export let cart;

loadFromStorage();

export function loadFromStorage () {
  cart = JSON.parse(localStorage.getItem('cart')) 
  || [];
};

export function addToCart (productId, quantity) {
    let matchingItem;

    cart.forEach((cartItem) => {
     if(productId === cartItem.productId) {
         matchingItem = cartItem;
     }
    });

    if(matchingItem) {
     matchingItem.quantity += quantity;
    } else {
     cart.push({
         productId, 
         quantity,
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
    if(!matchingItem) return;

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  };
