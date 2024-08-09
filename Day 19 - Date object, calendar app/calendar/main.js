document.addEventListener("DOMContentLoaded", function () {


    const months = ["January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ]

    const totalDaysOfTheWeek = 6 // numbering starts from 0 t0 6  = 7 days
    const today = new Date();
    today.setDate(16);
    const currentMonthIndex = today.getMonth(); // 0 - 11
    document.getElementById("current-month").textContent = months[currentMonthIndex];
    document.getElementById("full-date").textContent = today.toDateString();

    // what was the day of the week(Mon or Tue....Sun) on the 1st date of that month
    const firstDayOfTheMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    console.log(firstDayOfTheMonth);

    // which day of the week was the last date on.
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDay();
    // how many days are there in the current month
    const numberOfDaysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    console.log(numberOfDaysInMonth);

    let daysHTML = "";

    const daysElement = document.querySelector(".days");

    // loop for prinitng empty dates
    for (let index = 0; index < firstDayOfTheMonth; index++) {
        daysHTML += "<p class=\"date\">" + "</p>"
    }


    // loop for printing the dates
    for (let date = 1; date <= numberOfDaysInMonth; date++) {
        if (today.getDate() === date) {

            daysHTML += "<p class=\"date today\">" + date + "</p>"
        } else {
            daysHTML += "<p class=\"date\">" + date + "</p>"
        }
    }

    // to print empty dates in case the last day of the month doesn't fall on 
    // saturday
    if (lastDay < totalDaysOfTheWeek) {
        console.log(lastDay)
        for (let index = lastDay; index < totalDaysOfTheWeek; index++) {
            daysHTML += "<p class=\"date\">" + "</p>"
        }
    }



    console.log(daysHTML);
    daysElement.innerHTML = daysHTML;

})