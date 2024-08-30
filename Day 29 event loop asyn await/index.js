// Array.prototype.reduce

const arr = [1, 2, 3, 4, 5];

const initialValue = 0;
const result = arr.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);

// first iteration
// accumulator = initialValue // 0
// currentValue = 1
// accumulator + currentValue = 1

// second iteration
// 1
// 2
// 1 + 2 = 3

// third iteration
// 3
// 3
// 3 + 3 = 6

//

const add = function (accumulator, currentValue) {
    return accumulator + currentValue;
}

const arr1 = [1, 2, 3, 4, 5];

const result1 = arr1.reduce(add, 100);

//


// static fields and private fields

class Car {
    // fields
    // methods

    #thisIsAPrivateField = "Has four wheels";

    static hasGearbox = true;
    constructor(brandName, engineCapacity) {

    }

    static someDefaultFunctionality() {
        return `This car has a gearbox = ${Car.hasGearbox}`;
    }

    get accessPrivateField() {
        return this.#thisIsAPrivateField;
    }
}


// Car.someDefaultFunctionality();
const carObj = new Car("Mahindara", "1.5L");


// Object.keys

const person = {
    firstName: "Subodh",
    secondName: "Sant",
    occupation: "self employed"
}

const personProperties = Object.keys(person);

personProperties.forEach((key, index) => {
    console.log(key, person[key]);
});

Object.entries(person);

console.log(Object.values(person));

//person.phoneNumber = 1212487348;

Object.defineProperty(person, "phoneNumber", { enumerable: false, value: 1234, writable: false });


const map1 = new Map();

map1.set(1, 0);
map1.set(2, "Two");
map1.set(3, "true");


//

    console.log("Subodh");

    console.log("Subodh1");
    console.log("Subodh1");
    console.log("Subodh1");

    function a(){
        console.log("a");

        b();
    }
    function b (){
        console.log(b);
    }

    a();                            

    // stack

    console.log("1Subodh");

    setTimeout(() =>{
        console.log("2students")
    }, 2000);

    console.log("3sant");



