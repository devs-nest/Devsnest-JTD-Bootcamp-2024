let num1 = 5;
let num2 = 10;

if (num2 > num1) {
    console.log(num2 + " is greater than " + num1);
} else if (num2 < num1) {
    console.log(num2 + " is less than " + num1);
} else {
    console.log("Both the numbers are equal");
    console.log("this is another statement");
}

num1 = 8;
num2 = 4;

if (num2 > num1) {
    console.log(num2 + " is greater than " + num1);
} else if (num2 < num1) {
    console.log(num2 + " is less than " + num1);
} else {
    console.log("Both the numbers are equal");
    console.log("this is another statement");
}

// functions

// it allows you to resuse the logic in different places

// function definition
// parameters
function compareTwoNumbers(firstNumber, secondNumber) {
    if (firstNumber > secondNumber) {
        console.log(firstNumber + " is greater than " + secondNumber);
    } else if (firstNumber < secondNumber) {
        console.log(firstNumber + " is less than " + secondNumber);
    } else {
        console.log("Both the numbers are equal");
    }
}

// function calling or invocation
// function arguments
compareTwoNumbers(5, 10);
compareTwoNumbers(2, 6);
compareTwoNumbers(8, 4);
compareTwoNumbers(3, 3);

// parameters less function
function printText() {
    console.log("Print this text")
}

// no arguments
printText();
// input
function addTwoNumbers(firstNumber, secondNumber) {
    let sum = firstNumber + secondNumber;
    //output
    return sum;
}

const result = addTwoNumbers(5, 10);
console.log(result)

// anonymous functions
let subtract = function (firstNumber, secondNumber) {
    let difference = firstNumber - secondNumber;
    return difference;
}

// when a function is assigned to a variable it is known as function expression





console.log(subtract(10, 5));

// basic coding convention to follow
// follow camel casing for naming functions, variables
// give meaningful names
// follow proper indentation so that the code is easier to read.
// use extensions like prettier




