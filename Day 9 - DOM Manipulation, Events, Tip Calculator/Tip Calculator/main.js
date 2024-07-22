
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("intro").textContent = "Tip Calculator"

    const button = document.getElementById("calculate")

    button.addEventListener("click", function () {
        const billAmount = document.getElementById("bill-amount").valueAsNumber;
        const tipPercentage = document.getElementById("percentage").valueAsNumber;

        if (tipPercentage && billAmount) {

            const percentageAmount = (billAmount * tipPercentage) / 100;
            console.log(percentageAmount)
            const tipAmountLabel = document.getElementById("tip-amount");
            tipAmountLabel.textContent = "Tip Amount:₹" + percentageAmount;

            const totalAmount = document.getElementById("total");
            totalAmount.textContent = "Total Amount:₹" + (percentageAmount + billAmount);
        } else {
            alert("Please enter bill amount and tip percentage")
        }
    })
})
