function createDOMNodes() {
    const para = document.createElement('p');
    para.id = "first-para";
    para.textContent = 'this is the first para';

    document.body.appendChild(para);

    const hobbies = ["coding", 'singing', 'painting'];
    const listOfHobbies = document.createElement("ul");
    let htmlString = "";
    for (let hobby of hobbies) {
        htmlString += "<li>" + hobby + " </li>";
    }
    console.log(htmlString);
    listOfHobbies.innerHTML = htmlString;
    // listOfHobbies.innerText = htmlString;
    document.body.appendChild(listOfHobbies);
}

createDOMNodes();

function getNodes() {
    // getElementById
    const para = document.getElementById("first-para");
    para.style.background = "yellow";

    // gets all the elements with the matching tag name
    const listOfHobbies = document.getElementsByTagName("ul")[0];
    console.log(listOfHobbies)

    // children property contains all the child element of a tag
    const children = listOfHobbies.children;
    for (let child of children) {
        // class list is a property which allows you to manipulate classes on an element
        child.classList.add("royal-blue")
    }

    // query selector returns the first element which matches the rule
    const result = document.querySelector('ul > li');
    result.style.background = "royalblue";
    console.log((result));
    // query selector all returns all the elements which match the
    //specified rule
    const listItems = document.querySelectorAll("ul > li");
    for (let item of listItems) {
        item.style.background = "coral";
    }

    // getElementsByClassName returns all the elements which match the specified classname
    console.log(document.getElementsByClassName("royal-blue"))

    console.log(document.querySelectorAll(".royal-blue"))
    console.log(document.querySelectorAll("#first-para"))

}

getNodes();