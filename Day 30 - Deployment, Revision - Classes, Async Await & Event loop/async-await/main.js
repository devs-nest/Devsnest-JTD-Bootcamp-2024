let moneyBorrowed = 10_000;

function returnMoney() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve(8_000);
            // reject(new Error("I'm not going to return your money"))
        }, 3000); // represents two days
    });
}


function checkMoneyStatus() {
    let outcome;
    returnMoney().then(result => {
        outcome = result
        console.log(outcome);

    }
    )
    let abc = "test";
    console.log(outcome);

}



checkMoneyStatus();

// async function checkMoneyStatusAsync() {
//     let outcome = await returnMoney()
//     if (outcome > moneyBorrowed) {
//         console.log("depositing extra money to bank");

//     } else if (outcome < moneyBorrowed) {
//         throw new Error("Less amount returned");
//     }
//     let abc = "test";
//     console.log(outcome);

// }

// try {
//     await checkMoneyStatusAsync();
// } catch (error) {
//     console.error(error);

// }