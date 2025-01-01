export const orders = JSON.parse(localStorage.getItem('orders')) || [];


export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
};

function saveToStorage () {
  localStorage.setItem('orders', JSON.stringify(orders));
};


orders.forEach((order) => {
  console.log(order);
  if(orders.length >= 3) {
    orders.pop();
    saveToStorage();
  }
});