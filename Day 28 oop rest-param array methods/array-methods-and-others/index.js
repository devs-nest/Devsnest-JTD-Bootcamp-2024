// Rest Params

function addingNNumbers(...args) {
    let result = null;

    if (Array.isArray(args)) {
        args.forEach(
            (x) => {
                //result = Number.isNaN(+(result + x)) ? result : +result + x;

                // make sure to use only numbers to add
                if (Number.isNaN(+(result + x))) {
                    result = result;
                } else {    // adding x 
                    result = +result + x;
                }
            }
        );
    }

    return result;
}

add(10, 20, 30, 40, 50);



// Array methods.

// Array.from:-
// one of the static methods on Array constructor function which helps return a new array which is a 
// shallow copy of source.

Array.from([1, 2, 3]);
Array.from("Subodh");

function a(num1, num2) {
    console.log(arguments);
    console.log(arguments[0]);
    return Array.from(arguments);
}



// Array.prototype.find-
// instance method that helps find a specific item in the source array with the help of given predicate condition.
// And returns undefined, if it is not able to find.

const arr = [1, 2, 4, 6, 8, 10, 15];

arr.find((i) => i === 6);


// Array.prototype.filter
// An instance method that helps run a function for each item of source array so as to find specific portion and 
// return that as a shallow copied array.

const filteredResult = arr.filter(function (item, index) {
    if (item % 2 === 0) {
        return item;
    }
});


// Array.prototype.map-

// instance method that helps us invoke our function for every item in the array and returns a new array
// containing returning value from the function that is given.


arr.map((i) => i * 10);


// Array.prototype.some-

    // instance method that helps us test our condition within the function, if any item matches then it returns
    // true.

    arr.some((i) => {
        console.log(i);   
        return i === 8
    });


// Array.prototype.every-
    // instance method that checks the predicate condition with all values and returns as soon as it find 
    // a value corresponding to false as per predicate condition or goes till the end of array.
    arr.every((i) => {
        console.log(i);   
        return i === 8
    })




