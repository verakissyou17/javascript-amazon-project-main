// const date = new Date();
// console.log(date);
// console.log(date.toLocaleTimeString());

// function logThis() {
//   console.log(this);
// }
// logThis();
// logThis.call('hello');

// //Arrow functions do not change the value of this
// const object3 = {
//   method: () => {
//     console.log(this);
//   }
// }

// object3.method();
// object3.method.call('hello2');

// //This is useful to not accidentally change the value of this
// console.log(this);
// [1, 2, 3].forEach(() => {
//   console.log(this);
// })