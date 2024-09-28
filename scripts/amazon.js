import { addToCart, calculateCartQuantity} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';

renderPage();

async function renderPage() {
    try {
        await loadProducts();
    } catch (error) {
        throw new Error(`Unespected error.Plese try again later.${error}`);
    }
    renderProductsGrid();
}

function renderProductsGrid () {
    let productsHTML = '';

    products.forEach((product) => {
      productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
            <img class="product-image"
                src="${product.image}" alt="${product.name}">
            </div>
    
            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>
    
            <div class="product-rating-container">
            <img class="product-rating-stars"
                src="${product.getStarsUrl()}" alt="rating-stars">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
            </div>
    
            <div class="product-price">
            ${product.getPrice()}
            </div>
    
            <div class="product-quantity-container">
            <label for="quantity-${product.id}">Quantity:</label>
            <select id="quantity-${product.id}" class="js-quantity-selector-${product.id}">
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
            </div>
    
            ${product.extraInfoHTML()}
    
            <div class="product-spacer"></div>
    
            <div class="added-to-cart js-added-${product.id}">
            <img src="images/icons/checkmark.png" alt="checkmark-icon">
            Added
            </div> 
    
            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
            </button>
        </div>
        `;  
    });
    
    document.querySelector(".js-products-grid").innerHTML = productsHTML;
    renderCartQuantity();
    
    function displayAddedItem (productId) {
        clearTimeout();
        document.querySelector(`.js-added-${productId}`).classList.add('added');
    
        setTimeout(() => {
            document.querySelector(`.js-added-${productId}`).classList.remove('added');
        }, 2000);
    };

    function renderCartQuantity() {
        const cartQuantity = calculateCartQuantity();
          document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
        };
        
        renderCartQuantity();
      
    document.querySelectorAll('.js-add-to-cart')
        .forEach((button) => {
            button.addEventListener('click', () => {
               const { productId } = button.dataset;
               const selectorQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
               const quantity = Number(selectorQuantity.value);
               addToCart(productId, quantity);
               renderCartQuantity();
               displayAddedItem(productId);
            });
    });
}


