import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

/*
Best Practice: Test each condition of an if-statement
Test Coverage = how much of the code is being tested(Try to maximize test coverage)
*/

describe("test suite: addToCart", () => {
  const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("adds new product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();
    addToCart(productId);

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(1);
  });

  it("adds products to existing product in the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId,
        quantity: 1,
        deliveryOptionId: '1'
    }]);
    });
    loadFromStorage();
    addToCart(productId);

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(2);
  });
});

//Test suite 2
describe('removeFromCart', () => {
  const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId,
        quantity: 1,
        deliveryOptionId: '1'
    }]);
    });

    loadFromStorage();
  });

  it('removes a product from the cart', () => {
    removeFromCart(productId);
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
  });

  it('removes a product that is not in the cart', () => {
    removeFromCart('');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });
});

describe('updateDeliveryOtion', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('updates the delivery option for a product', () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();

    updateDeliveryOption(productId1, '3');
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(cart[0].productId).toEqual(productId1);
    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: productId1,
      quantity: 1,
      deliveryOptionId: '3'
    }]));
  });

  it('updates the delivery option for a product that is not in the cart', () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();

    updateDeliveryOption('does not exist', '3');
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(cart[0].productId).toEqual(productId1);
    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
