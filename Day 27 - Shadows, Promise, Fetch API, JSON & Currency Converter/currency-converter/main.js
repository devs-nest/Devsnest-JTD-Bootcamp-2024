document.addEventListener("DOMContentLoaded", () => {


    const convertButton = document.getElementById("convert");
    convertButton.addEventListener("click", convertCurrency)
    let currencyInfo;

    function getListOfCurrencies() {
        return fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json").then(res => res.json())
    }



    function buildCurrencyOptions() {

        let listOfCurrencies;
        getListOfCurrencies().then(result => {
            listOfCurrencies = result
            console.log(listOfCurrencies);
            let fromCurrency = document.getElementById("fromCurrency");
            let toCurrency = document.getElementById("toCurrency");

            for (let key in listOfCurrencies) {
                let fromCurrencyOption = document.createElement("option");
                fromCurrencyOption.id = `${key}_from`;
                fromCurrencyOption.value = key;
                fromCurrencyOption.textContent = listOfCurrencies[key];
                fromCurrency.appendChild(fromCurrencyOption);
                let toCurrencyOption = document.createElement("option");
                toCurrencyOption.id = `${key}_to`;
                toCurrencyOption.value = key;
                toCurrencyOption.textContent = listOfCurrencies[key];
                toCurrency.appendChild(toCurrencyOption);
            }

        });
        console.log(listOfCurrencies);




    }

    function loadCurrencyValues() {
        fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json")
            .then(res => res.json())
            .then(data => currencyInfo = data);
    }

    function convertCurrency() {
        let fromCurrency = document.getElementById("fromCurrency");
        let toCurrency = document.getElementById("toCurrency");

        const selectedFromCurrency = fromCurrency.value;
        const selectedToCurrency = toCurrency.value;

        if (selectedFromCurrency && selectedToCurrency) {
            let { eur } = currencyInfo;
            let convertedAmount = eur[selectedToCurrency] / eur[selectedFromCurrency];
            let result = document.getElementById("result");
            let amountToConvert = document.getElementById("amount").valueAsNumber;
            result.value = (amountToConvert * convertedAmount).toFixed(2);
            console.log(currencyInfo, selectedFromCurrency, selectedToCurrency);

        }


    }
    convertButton.addEventListener("click", () => {

    })

    loadCurrencyValues();
    buildCurrencyOptions();

})