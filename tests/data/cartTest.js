import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

/*
Best Practice: Test each condition of an if-statement
Test Coverage = how much of the code is being tested(Try to maximize test coverage)
*/

describe("test suite: addToCart", () => {
  let quantitySelector;
  let quantity;
  const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

  beforeEach(() => {
    spyOn(localStorage, "setItem");

    document.querySelector(".js-test-container").innerHTML = `
        <select class="js-quantity-selector-${productId}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
    `;

    quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    quantity = Number(quantitySelector.value);

  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });

  
  it("adds products to existing product in the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId,
        quantity,
        deliveryOptionId: '1'
    }]);
    });

    loadFromStorage();
    addToCart(productId, quantity);

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(2);
  });

  it("adds new product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();
    addToCart(productId, quantity);

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(1);
  });
});

//Test suite 2
describe('test suite: removeFromCart', () => {
  let quantitySelector;
  let quantity;
  const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector(".js-test-container").innerHTML = `
    <select class="js-quantity-selector-${productId}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
    </select>
`;

    quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    quantity = Number(quantitySelector.value);

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId,
        quantity,
        deliveryOptionId: '1'
    }]);
    });

    loadFromStorage();
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
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

//Test suite 3
describe('test suite: updateDeliveryOtion', () => {
  let quantitySelector;
  let quantity;
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

      document.querySelector(".js-test-container").innerHTML = `
      <select class="js-quantity-selector-${productId1}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
      </select>
  `;

    quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId1}`
    );
    quantity = Number(quantitySelector.value);

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it('updates the delivery option for a product', () => {

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

    updateDeliveryOption('does not exist', '3');
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(cart[0].productId).toEqual(productId1);
    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});

