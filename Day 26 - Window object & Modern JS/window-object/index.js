document.addEventListener("DOMContentLoaded", function () {

    window.addEventListener("scroll", (event) => {

        const header = document.querySelector(".main-header");
        const aboutMe = document.getElementById("about-me")
        const endPositionY = aboutMe.offsetTop + aboutMe.offsetHeight;
        console.log(header.offsetHeight, window.scrollY);
        if (window.scrollY > endPositionY) {
            header.style.position = "sticky";
            header.style.top = 0;

        } else {
            header.style.position = "revert";
        }

    })
})