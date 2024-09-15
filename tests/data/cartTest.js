import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

/*
Best Practice: Test each condition of an if-statement
Test Coverage = how much of the code is being tested(Try to maximize test coverage)
*/

describe("test suite: addToCart", () => {
  let quantitySelector;
  let quantity;
  const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

  beforeEach(() => {
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

    spyOn(localStorage, "setItem");

    loadFromStorage();
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("adds new product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    addToCart(productId);

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(quantity);
  });

  it("adds products to existing product in the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId,
        quantity,
        deliveryOptionId: '1'
    }]);
    });
    addToCart(productId);

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(quantity);
  });
});
