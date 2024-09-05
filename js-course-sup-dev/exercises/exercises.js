import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {isWeekend} from './isWeekend.js';

const foodCost = 5 + 2 * 3 + 9;
console.log(`Cost of food: $${foodCost}`);
const foodTax = foodCost * 0.1;
console.log(`Tax: $${foodTax}`);
const totalCost = foodTax + foodCost;
console.log(`Total cost: $${totalCost}`);

function convertToFahrenheit(celsius) {
  const fahrenheit = (celsius * 9) / 5 + 32;
  return fahrenheit;
}

function convertToCelsius(fahrenheit) {
  const celsius = ((fahrenheit - 32) * 5) / 9;
  return celsius;
}

function convertTemperature(degrees, unit) {
  const fahrenheit = convertToFahrenheit(degrees);
  const celsius = convertToCelsius(degrees);
  return unit === "C" ? celsius : fahrenheit;
}

const fahrenheit = convertTemperature(25, "F");
console.log({fahrenheit});
const celsius = convertTemperature(86, "C");
console.log({celsius});

function convertLength(length, from, to) {
  let result = "";
  if (from !== "km" && from !== "miles" && from !== "ft") {
    result = `Invalid unit: ${from}`;
  } else if (from === "miles" && to === "km") {
    result = length * 1.6;
  } else if (from === "km" && to === "miles") {
    result = length / 1.6;
  } else if (from === "miles" && to === "ft") {
    result = length * 5280;
  } else if (from === "km" && to === "ft") {
    result = length * 3281;
  } else if (from === to) {
    result = length;
  }

  return result;
}

const km = convertLength(50, "miles", "km");
console.log({ km });
const miles = convertLength(32, "km", "miles");
console.log({ miles });
const length = convertLength(50, "km", "km");
console.log({ length });
const km2 = convertLength(5, "miles", "km");
console.log({ km2 });
const feets = convertLength(5, "miles", "ft");
console.log({ feets });
const feets2 = convertLength(5, "km", "ft");
console.log({ feets2 });
const lbs = convertLength(5, "lbs", "lbs");
console.log({ lbs });

const basketball = {
  name: "basketball",
  price: 2095,
};
console.log(basketball);
basketball.price += 500;
console.log(basketball);
basketball["delivery-time"] = "3 days";
console.log(basketball);

const product1 = {
  name: "juice",
  price: 10,
};

const product2 = {
  name: "fruit",
  price: 5,
};

function comparePrice(product1, product2) {
  if (product1.price < product2.price) {
    return product1;
  } else {
    return product2;
  }
}
const lowerPrice = comparePrice(product1, product2);
console.log(lowerPrice);

function isSameProduct(product1, product2) {
  return product1.name === product2.name && product1.price === product2.price;
}

console.log(isSameProduct(product1, product2));
console.log("Good Morning!".toLowerCase());
console.log("test".repeat(2));

const jsTest = document.querySelector(".js-test");
const jsGaming = document.querySelector(".js-gaming");

function toggleTestButton() {
  if (!jsTest.classList.contains("is-toggled")) {
    jsTest.classList.add("is-toggled");
  } else {
    jsTest.classList.remove("is-toggled");
  }
}

function toggleGamingButton() {
  if (!jsGaming.classList.contains("is-toggled")) {
    jsGaming.classList.add("is-toggled");
  } else {
    jsGaming.classList.remove("is-toggled");
  }
}

jsTest.addEventListener("click", toggleTestButton);
jsGaming.addEventListener("click", toggleGamingButton);

const btn1 = document.querySelector(".btn-1");
const btn2 = document.querySelector(".btn-2");
const btn3 = document.querySelector(".btn-3");


function turnOffPreviousButton() {
  const previousButton = document.querySelector(".toggle");
  if (previousButton) {
    previousButton.classList.remove("toggle");
  }
};
function toggleButton(selector) {
  const button = document.querySelector(selector);
  if (!button.classList.contains("toggle")) {
    // Before turning this button ON, check if there's
    // already a button that's turned ON and turn it OFF.
    turnOffPreviousButton();

    button.classList.add("toggle");
  } else {
    button.classList.remove("toggle");
  }
};

btn1.addEventListener("click", () => toggleButton(".btn-1"));
btn2.addEventListener("click", () => toggleButton(".btn-2"));
btn3.addEventListener("click", () => toggleButton(".btn-3"));

const numbers1 = [1, 2, 3, 4, 5];
console.log("Numbers1: ", numbers1);

function arraySwap(array) {
  // const firstElement = array[0];
  // const lastElement = array[array.length - 1];
  // array[0] = lastElement;
  // array[array.length - 1] = firstElement;
  // return array;
  return [...array].reverse(); // ES6 spread operator and reverse method
}

console.log("Array swaped: ", arraySwap(numbers1));

function addOne(numbers) {
  // let newArr = [];

  // for (let i = 0; i < numbers.length; i++) {
  //   newArr.push((numbers[i] += 1));
  // }
  // return newArr;
  return numbers.map((item) => item + 1); // ES6 map method
}

console.log("Added one: ", addOne(numbers1));

console.log("Numbers1: ", numbers1);

function addThree(arr, num) {
  // let newArr = [];
  // for (let i = 0; i < arr.length; i++) {
  //   newArr.push(arr[i] + num);
  // }
  // return newArr;
  return arr.map((item) => item + num);
}

console.log("Added 3: ", addThree(numbers1, 3));

function addNum(arr1, arr2) {
  // let newArr = [];
  // for (let i = 0; i < arr1.length; i++) {
  //   newArr.push(arr1[i] + arr2[i]);
  // }
  // return newArr;
  return arr1.map((item, index) => item + arr2[index]); // ES6 map method with index
}

console.log("Added arr1[i] + arr2[i]: ", addNum([1, 2, 3], [3, 4, 5]));

function countPositive(nums) {
  let count = 0;
  // for (let i = 0; i < nums.length; i++) {
  //   if (nums[i] > 0) {
  //     count++;
  //   }
  // }
  nums.forEach((num) => {
    if (num > 0) {
      count++;
    }
  });
  return count;
}

console.log("Positive numbers: ", countPositive([1, -2, 3, -5, 7, 10]));

function minMax(nums) {
  let min = null;
  let max = null;
  for (let i = 0; i < nums.length; i++) {
    if (min === null || min < nums[i]) {
      min = nums[i];
    }

    if (max === null || max > nums[i]) {
      max = nums[i];
    }
  }

  return { min, max };
}

console.log("Min and max: ", minMax([1, -3, 5]));
console.log("Min and max: ", minMax([]));
console.log("Min and max: ", minMax([3, 3]));

const words = ["hello", "world", "search", "good", "search", "word"];
console.log('Words: ', words);

function countWords(words) {
  let result = {};
  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    // result[word] adds/accesses a property using whatever is saved inside the 'word' variable.
    //we cann't use bracket notation, if the property doesn't exist
    // If word = word[i], result[word] will do result[word[i]]
    // If word = 'search', result[word] will do result['search']

    if (!result[word]) {
      result[word] = 1;
    } else {
      result[word]++;
    }
  }

  return result;
};

console.log("Word count: ", countWords(words));

  for (let i = 0; i < words.length; i++) {
    if (words[i] === "search") {
    console.log({i});
    } 
    console.log(-1);
  };

const colors = ["green", "red", "blue", "red", "green", "red", "blue", "red"];
console.log('Colors: ', colors);

function findIndexOfColors(array, word) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === word) {
      return i;
    }
  }
  return -1;
};

console.log("Index of search: ", findIndexOfColors(colors, "yellow"));
console.log("Index of search: ", findIndexOfColors(colors, "red"));

function findIndex(colors, color) {
  for (let i = 0; i < colors.length; i++) {
    if (colors[i] === color) {
      return i;
    }
  }
  return -1;
}

console.log('Find index: ', findIndex(colors, "green"));

function unique(arr) {
  // const result = [];

  // for (let i = 0; i < arr.length; i++) {
  //   if (findIndex(result, arr[i]) === -1) {
  //     result.push(arr[i]);
  //   }
  // }
  // return result;
  const result = arr.filter((element, index) => {
    return arr.indexOf(element) === index;
  });

  return result;
}

console.log("Unique colors: ", unique(colors));

const foods = ["egg", "apple", "popcorn", "egg", "icecream", "egg", "ham", 'egg'];
console.log('Foods: ', foods);

function removeEgg(foods) {
  // const result = [];
  // let eggs = 0;
  // for (let i = 0; i < foods.length; i++) {
  //   if (foods[i] === "egg" && eggs < foods.length - 1) {
  //     eggs++;
  //     continue;
  //   } else {
  //     result.push(foods[i]);
  //   }
  // }
  // return result;
  return foods.filter(food => food !== 'egg');  
};

console.log("Without eggs: ", removeEgg(foods));

function removeTheFirstTwoEggs(arr) {
  let eggs = 0;
  // const result = [];
  // for (let i = 0; i < arr.length; i++) {
  //   if (arr[i] === "egg" && eggs < 2) {
  //     eggs++;
  //     continue;
  //   }
  //   result.push(arr[i]);
  // }
  // return result;

  return arr.filter(food => {
    if (food === 'egg' && eggs < 2) {
     eggs++;
     return false; 
    }

    return true;
  });
};

console.log("Remove the first 2 eggs: ", removeTheFirstTwoEggs(foods));

function removeTheLastTwoEggs(arr) {
  let eggs = 0;
  // const newArr = arr.slice().reverse();
  // const result = [];
  // for (let i = 0; i < newArr.length; i++) {
  //   if (newArr[i] === "egg" && eggs < 2) {
  //     eggs++;
  //     continue;
  //   }
  //   result.push(newArr[i]);
  // }
  // return result.reverse();

  return arr.reverse().filter(food => {
    if (food === 'egg' && eggs < 2) {
     eggs++;
     return false; 
    }

    return true;
  }).reverse();
};

console.log("Remove the last 2 eggs: ", removeTheLastTwoEggs(foods));

//FizzBuzz

// for (let i = 0; i <= 20; i++) {
//   if (i % 3 === 0 && i % 5 === 0) {
//     console.log("FizzBuzz");
//   } else if (i % 3 === 0) {
//     console.log("Fizz");
//   } else if (i % 5 === 0) {
//     console.log("Buzz");
//   } else {
//     console.log(i);
//   }
// }

const numbers = [5, 3, 8, 2, 1, 4, 3, 5];
console.log('Numbers: ', numbers);

function removeDuplicates1(arr) {
  // Filter out duplicate elements
  const result = arr.filter((element, index) => {
    return arr.indexOf(element) === index;
  });

  return result;
}

console.log("Remove duplicates: ", removeDuplicates1(numbers));

function removeDuplicatesWithSet(arr) {
  // Create a new Set object from the array
  const uniqueSet = new Set(arr);

  // Convert the Set back to an array
  const result = Array.from(uniqueSet);

  return result;
}

console.log("Set Object use: ", removeDuplicatesWithSet(numbers));

function reduceAndRemoveduplicates1(arr) {
  const result = [...arr].reduce((uniqueArr, element) => {
    if (findIndex(uniqueArr, element) === -1) {
      uniqueArr.push(element);
    }
    return uniqueArr;
  }, []);

  return result;
}

console.log(
  "Reduce Method: ",
  reduceAndRemoveduplicates1([1, 2, 3, 1, 5, 2, "banana", "apple", "banana"])
);

function reduceAndRemoveduplicates(arr) {
  const uniqueSet = arr.reduce((uniqueSet, element) => {
    uniqueSet.add(element);
    return uniqueSet;
  }, new Set());

  const result = Array.from(uniqueSet);

  return result;
}

console.log(
  "Reduce Method with Set onbject: ",
  reduceAndRemoveduplicates([1, 2, 3, 1, 5, 2, "banana", "apple", "banana"]) 
);

function func3(arr) {
  const result = arr.filter((element, index) => {
    return arr.indexOf(element) === index;
  });
  return result;
}

console.log(
  "Filter Method and indexOf(): ",
  func3([1, 2, 3, 1, 5, 2, "banana", "apple", "banana"])
);

const func1 = function () {
  console.log("anonymus function");
};

func1();

const object1 = {
  num: 2,
  fun: function () {
    console.log("function inside object");
  },
};

object1.fun();

function run(param) {
  param();
}
run(function () {
  console.log("callback");
});

const add = function (num1, num2) {
  console.log(num1 + num2);
};

add(2, 3);
add(5, 3);

function runTwice(param) {
  param ("12b-first callback");
  param("12b-second callback");
}

runTwice(function (message) {
  console.log(message);
});

function changeText() {
  btn1.textContent = "Loading....";
  setTimeout(() => {
    btn1.textContent = "Finished!";
  }, 2000);
}

btn1.addEventListener("mouseover", changeText);
btn1.addEventListener("mouseout", () => {
  btn1.textContent = "Button 1";
});

document.querySelector(".add-to-cart").addEventListener("click", () => {
  const p = document.createElement("p");
  p.innerHTML = "Added";
  document.body.append(p);

  setTimeout(() => {
    p.innerHTML = "";
  }, 2000);

  clearTimeout();
});

let messages = 2;

setInterval(() => {
  if (document.title === "Exercises") {
    document.title = `(${messages}) New messages`;
  } else {
    document.title = "Exercises";
  }
}, 1000);

btn2.addEventListener("click", () => {
  if (messages >= 10) {
    alert("Inbox full");
    messages = 10;
  } else {
    messages++;
  }
});
btn3.addEventListener("click", () => {
  if (messages <= 0) {
    alert("No more messages");
    messages = 0;
  } else {
    messages--;
  }
});

const multiply = (num1, num2) => console.log(num1 * num2);
 multiply(1, 2);
 multiply(3, 2);

console.log(colors.indexOf('red') === 1);

const today = dayjs().format('MMMM D');
const monthForward = dayjs().add(1, 'months').format('MMMM D');
const monthBackward = dayjs().subtract(1, 'months').format('MMMM D');
const dayOfWeek = dayjs().format('dddd');
console.log({today}, {monthForward}, {monthBackward});
console.log(dayOfWeek);


console.log(isWeekend(dayOfWeek));
console.log(isWeekend(dayjs().add(3, 'days').format('dddd')));
console.log(isWeekend(dayjs().subtract(3, 'days').format('dddd')));