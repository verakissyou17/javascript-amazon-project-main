import {formatCurrency} from '../../scripts/utils/money.js';
//Test suite for formatCurrency
console.log(' test suite: formatCurrency');
//Test case 1 - Basic case
console.log('converts cents into dollars');
if (formatCurrency(2095) === '20.95') {
    console.log('Passed');
} else {
    console.log('Failed');
};

//Test case 2 - Edge case
console.log('works with 0');
if (formatCurrency(0) === '0.00') {
    console.log('Passed');
} else {
    console.log('Failed');
};

//Test case 3 - Edge case
console.log('rounds up to the nearest cent');
if (formatCurrency(2000.5) === '20.01') {
    console.log('Passed');
} else {
    console.log('Failed');
};

//Test case 4 - Edge case
console.log('rounds down to the nearest cent');
if (formatCurrency(2000.04) === '20.00') {
    console.log('Passed');
} else {
    console.log('Failed');
};

