document.addEventListener("DOMContentLoaded", function () {
    const hoursHand = document.querySelector(".hour");
    const minutesHand = document.querySelector(".minute");
    const secondsHand = document.querySelector(".second");

    function setTime() {

        const now = new Date();
        const seconds = now.getSeconds();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        const secondsInDegrees = (seconds / 60) * 360;
        const minutesInDegrees = (minutes / 60) * 360;
        const hoursInDegrees = (hours / 12) * 360;

        secondsHand.style.transform = "rotate(" + secondsInDegrees + "deg)";
        minutesHand.style.transform = "rotate(" + minutesInDegrees + "deg)";
        hoursHand.style.transform = "rotate(" + hoursInDegrees + "deg)";
    }
    // 1000ms = 1s
    setTime();
    setInterval(setTime, 1000);
})