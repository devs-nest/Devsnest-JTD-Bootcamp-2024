// // Nested Scopes


// // global scope

// var a = 3;

// // Declaration
// function foo() { // inner scope
//     var b = 5;
//     console.log(a);
//     console.log(b);

//     function bar() { // innermost scope
//         var c = 7;
//         console.log(a, b, c);
//     }

//     bar();
// }

// console.log(a);
// foo();
// // console.log(b);

// // function Expression
// var expr = function expr() { };

// // Function as Scope
// (function scopeFunc() {
//     var a = 7;
//     console.log("from scopeFunc a is ", a);
// })();   // IIFE



// // Block as Scope
// var b = 8;
// if (true) {
//     var c = 9;
//     console.log(b, c);
// }

// console.log(c);
// // the above one is fake Block Scope
// // just by hitting console.log(c); it will get printed.

// // below one is correct way of Block Scope.
// var d = 8;
// if (true) {
//     let e = 10;
//     const f = e + d;
//     console.log(d, e);
//     console.log(f);
// }

// function someFunc(){
//     if (true) {
//         let e = 10;
//         const f = e + d;
//         console.log(d, e);
//         console.log(f);
//     }

//     console.log(e, f);
// }

//

// Hoisting Example 1
a = 3;
var a = 5;
console.log(a);
//

    // Hoisting makes the above code like this
    var a = undefined;
    a = 3;
    a = 5;
    console.log(a);
//

console.log(b);
var b;

    // Hoisting makes the above code like this
    var b = undefined;
    console.log(b);

hoist1();

function hoist1(){
    console.log("Example Hoist1")
}


// Hoisting Example 2

function showAllFruits(){
    console.log(fruits);
}

function favFruit(fruit){
    console.log("My Fav. fruit is ", fruit);
    var fruit = "Grapes";
    console.log("Again Fav. Fruit is ", fruit);
}

var fruits = ["Banana", "Mango", "Apple"];
favFruit(fruits[0]);

// output is
// My Fav. fruit is  Banana
// VM919:11 Again Fav. Fruit is  Grapes

// After hoisting of favFruit.

function favFruit(fruit){
    var fruit = undefined;
    console.log();
    fruit = "Grapes";
    console.log();
}

favFruit("Banana");

