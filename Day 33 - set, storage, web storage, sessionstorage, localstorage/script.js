let attendenceSet = new Set();

attendenceSet.add("Anitha");
attendenceSet.add("Lokesh");
attendenceSet.add("Lohisha");

console.log(attendenceSet);
console.log(attendenceSet.has("Lohisha"));

const obj = {name: "Subodh"};

attendenceSet.add(obj);

for(person of attendenceSet){
    if(typeof person === 'object'){
        console.log(person.name);
    } else {
        console.log(person);
    }
}

let fruitBasket = new Set(["apples", "oranges", "bananas"]); 

////////////

// sessionStorage.clear();
document.addEventListener('DOMContentLoaded', (event) =>{
    const visitorNameTextbox = document.getElementById("visitorName");
    const btnEnterExpo = document.querySelector('#btnEnterExpo');
    const btnMahindraShop = document.querySelector('#btnMahindraShop');
    const lblMahindraShop = document.querySelector('#lblMahindraShop');
    const btnTataShop = document.querySelector('#btnTataShop');
    const lblTataShop = document.querySelector('#lblTataShop');
    const btnSuzukiShop = document.querySelector('#btnSuzukiShop');
    const lblSuzukiShop = document.querySelector('#lblSuzukiShop');


    const visitorName = localStorage.getItem('visitorName');
    if(visitorName){
        visitorNameTextbox.value = visitorName;
        enableShops();
    } else {
        visitorNameTextbox.value = '';
    }

    btnEnterExpo.addEventListener('click', (event) =>{
        //console.log(event);
        //console.log(visitorNameTextbox.value);

        resetLabels();
        localStorage.setItem("visitorName", visitorNameTextbox.value);
        enableShops();
    });

    btnMahindraShop.addEventListener('click', (event) =>{
        const visitorName = localStorage.getItem("visitorName");
        if(visitorName){
            lblMahindraShop.innerText = `Hi ${visitorName}, welcome to Mahindra Shop!`;
        } else {
            lblMahindraShop.innerText = 'Welcome! unknown.';
        }
    });

    btnTataShop.addEventListener('click', (event) =>{
        const visitorName = localStorage.getItem("visitorName");
        if(visitorName){
            lblTataShop.innerText = `Hi ${visitorName}, welcome to Tata Shop!`;
        } else {
            lblTataShop.innerText = 'Welcome! unknown.';
        }
    });

    btnSuzukiShop.addEventListener('click', (event) =>{
        const visitorName = localStorage.getItem("visitorName");
        if(visitorName){
            lblSuzukiShop.innerText = `Hi ${visitorName}, welcome to Suzuki Shop!`;
        } else {
            lblSuzukiShop.innerText = 'Welcome! unknown.';
        }
    });

    function resetLabels(){
        lblMahindraShop.innerText = '';
    }

    function enableShops(){
        btnMahindraShop.removeAttribute('disabled');
        btnTataShop.removeAttribute('disabled');
        btnSuzukiShop.removeAttribute('disabled');
    }
});