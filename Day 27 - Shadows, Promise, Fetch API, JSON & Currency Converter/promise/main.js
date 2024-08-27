let moneyBorrowed = 10_000;
const moneyReceived = (amount) => {

    if (amount > 0) {
        console.log(`Extra money - ${amount} deposited in the bank`);
    } else {
        console.log(`Received the full amount - ${moneyBorrowed}`);

    }


}
let promise = new Promise((resolve, reject) => {

    setTimeout(() => {
        resolve(8_000);
        // reject(new Error("I'm not going to return your money"))
    }, 3000); // represents two days
});

console.log(promise);
// then represents successful outcome - 
// callback function will be called when promise is resolved
promise.then((outcome) => {
    return new Promise((resolve, reject) => {
        if (outcome > moneyBorrowed) {
            resolve(outcome - moneyBorrowed);
        } else if (outcome < moneyBorrowed) {
            reject(new Error("Oh wait, this is not the full amount!"))
        } else {
            resolve(0)
        }
    })

}).then(moneyReceived).catch((error) => {
    // represents unsucessful outcome 
    // this function will be called when promise is rejected
    // or if there is an error
    console.error(error);
}).finally(() => {
    console.log("Finally fn - this function is always called");

})



let anotherPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 2000);
})

function successfullOutcome(data) {
    console.log(data);

}

function unSuccessfullOutcome(error) {
    console.error(error);

}

// anotherPromise.then(successfullOutcome).catch(unSuccessfullOutcome)
anotherPromise.then(successfullOutcome, unSuccessfullOutcome)


// promise - represents the outcome of an operation
//  that will be completed in the future

// callback functions - functions which we do not called. They are called automatically
// when certain criteria is met

// document.addEventListener("click",()=>{
// example of callback function
// })


// states of a promise

// 1. pending - Hasn't fulfilled or rejected yet. Outcome is not known yet.
// 2. fulfilled - this is the state when the promise is successful.
// 3. rejected - The action related to the promise failed.
// 4. settled - The promise has been fulfilled or rejected. The outcome is known.

// Application of promise

// API - external function which is written somewhere else and you 
// call it from your code/program

// API endpoint - remote functions that you call

// fetch api - provided by the browser which allows you to call external functions
// by providing an address 

const resultPromise = fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json");


resultPromise.then(outcome => {
    // response
    console.log(outcome);
    // convert this response into a javascript object
    const result = outcome.json();

    // promise - when this promise is resolved it will give us the data as a javascript object
    result.then(res => {
        console.log(res);

    })

})

// JSON 

// Javascript 
// Object
// Notation

// it’s quite similar to the object in javascript.

// but there are a few differences - it’s a string whose structure resembles an object in javascript

// since it’s quite common - we have built in methods in js -

//  ** JSON.stringify ** - converts JS object into JSON

//     ** JSON.parse ** - converts JSON to object in JS

