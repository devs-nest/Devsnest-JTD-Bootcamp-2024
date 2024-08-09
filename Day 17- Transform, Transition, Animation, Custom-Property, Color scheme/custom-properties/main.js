document.addEventListener("DOMContentLoaded", function () {

    const button = document.getElementById("toggle-theme")
    button.addEventListener("click", toggleTheme)
    function toggleTheme() {
        if (document.documentElement.classList.contains("blue-theme")) {
            document.documentElement.classList.remove("blue-theme");
        }
        document.documentElement.classList.toggle("dark-theme")
    }

    const buttonBlue = document.getElementById("blue-theme");
    buttonBlue.addEventListener("click", function () {
        if (document.documentElement.classList.contains("dark-theme")) {
            document.documentElement.classList.remove("dark-theme");
        }
        document.documentElement.classList.toggle("blue-theme")
    })
})