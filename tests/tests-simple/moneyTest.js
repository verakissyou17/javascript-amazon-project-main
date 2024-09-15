import {formatCurrency} from '../../scripts/utils/money.js';

// Test suite for formatCurrency
console.log("test suite: formatCurrency");

//Test 1 - base case
console.log("converts cents to dolllars");
if (formatCurrency(2095) === "20.95") {
  console.log(
    "%cPASSED",
    "color: green; font-style: italic; font-weight: bold; font-size: 18px"
  );
} else {
  console.log(
    "%cFAILED",
    "color: red; font-style: italic; font-weight: bold; font-size: 18px"
  );
}

//Test 2 - edge case
console.log("works with 0");
if (formatCurrency(0) === "0.00") {
  console.log(
    "%cPASSED",
    "color: green; font-style: italic; font-weight: bold; font-size: 18px"
  );
} else {
  console.log(
    "%cFAILED",
    "color: red;font-style: italic; font-weight: bold; font-size: 18px"
  );
}

//Test 3 - edge case
console.log("rounds up to the nearest cent");
if (formatCurrency(2000.5) === "20.01") {
  console.log(
    "%cPASSED",
    "color: green; font-style: italic; font-weight: bold; font-size: 18px"
  );
} else {
  console.log(
    "%cFAILED",
    "color: red; font-style: italic; font-weight: bold; font-size: 18px"
  );
}

//Test 4 - edge case
console.log("rounds down to the nearest cent");
if (formatCurrency(2000.4) === "20.00") {
  console.log(
    "%cPASSED",
    "color: green; font-style: italic; font-weight: bold; font-size: 18px"
  );
} else {
  console.log(
    "%cFAILED",
    "color: red; font-style: italic; font-weight: bold; font-size: 18px"
  );
}

