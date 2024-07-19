let listOfNumbers = [1, 3, 12, 16, 19, 21, 24, 27, 30];
let evenNumbers = [];
let oddNumbers = [];
for (let index = 0; index < listOfNumbers.length; index++) {
    if (listOfNumbers[index] % 2 == 0) {
        evenNumbers.push(listOfNumbers[index]);
    } else {
        oddNumbers.push(listOfNumbers[index]);
    }
}
console.log("list of numbers", listOfNumbers)
console.log("even numbers", evenNumbers);
console.log("odd numbers", oddNumbers);

// concat

console.log(evenNumbers.concat(oddNumbers));

console.log(listOfNumbers.slice(0, 4))
console.log(listOfNumbers.slice(4, 7))
console.log(listOfNumbers.slice(4, listOfNumbers.length))
console.log(listOfNumbers.slice(-1))


console.log(listOfNumbers.splice(1, 1))
console.log(listOfNumbers);
console.log(listOfNumbers.splice((listOfNumbers.length / 2), 1));
console.log(listOfNumbers);

// for of loop

console.log("for of loop output");
for (let number of listOfNumbers) {
    console.log(number)
}

console.log("for in loop output");
// for in loop
for (let index in listOfNumbers) {
    // console.log(index);
    console.log(index + ":" + listOfNumbers[index])
}