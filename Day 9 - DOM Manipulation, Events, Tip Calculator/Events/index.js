// event listerner function or event handler
function changeColor(event) {
    console.log(event);
    console.log("change color was called");
    const box = document.querySelector(".box");
    box.style.background = "palevioletred";

}

document.querySelector("button").onclick = function onButtonClick() {
    console.log("button was clicked")
}




document.querySelector("#stop-color-change").addEventListener("click", function stopListening() {

    document.querySelector("button").removeEventListener('click', changeColor)
})

document.querySelector("#start-color-change").addEventListener("click", function () {
    // recommended by making use addEventLister
    document.querySelector("button").addEventListener("click", changeColor)
})

const nameInput = document.getElementById("name");

nameInput.addEventListener("keydown", function (event) {
    console.log(event.type, event.key);
    if (event.key == "0") {
        // event.preventDefault();
    }
});
nameInput.addEventListener("keypress", function (event) {
    console.log(event.type, event.key);
    if (event.key == "0") {
        event.preventDefault();
    }
});
nameInput.addEventListener("keyup", function (event) {
    console.log(event.type, event.key);
    if (event.key == "0") {
    }
});

nameInput.addEventListener("blur", function (event
) {

    document.querySelector("#entered-name").textContent = event.target.value;
})





