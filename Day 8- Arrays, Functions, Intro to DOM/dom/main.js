const para = document.getElementById("first-para")
para.style.color = "red";

// create elements using javscript

let newParagraph = document.createElement("p");
newParagraph.id = "new-para-id";
newParagraph.textContent = "content of this para";
newParagraph.className = "blue"
document.body.appendChild(newParagraph);
console.log(newParagraph)