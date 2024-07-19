let numbers = [1, 3, 5, 7, 10];
let sum = 0;
for (let index = 0; index < numbers.length; index++) {
    // numbers[0]// first
    // numbers[1]// second item
    sum += numbers[index];
    console.log({ sum, index });
}
console.log("final sum is " + sum);