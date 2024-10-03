import react, { useEffect, useState } from 'react';

const pizzaToppings = [
    {
        id: 1,
        topping: "Borocolli"
    },
    {
        id: 2,
        topping: "GreenPepper"
    },
    {
        id: 3,
        topping: "Margherita"
    },
    {
        id: 4,
        topping: "Jalapino"
    }
];

// export default function PizzaToppings(){

//     console.log("PizzaToppings is being created or rendered.");

//     const [toppings, setToppings] = useState(pizzaToppings);

//     function removeTopping(item){
//         setToppings(toppings.filter(i => i != item));
//     }

//     return (
//         <ul>
//             {
//                 toppings.map((item, index) =>{
//                     return (
//                         <li key={item.id}>
//                             <label htmlFor="item.topping">{item.topping}</label>
//                             <input type="text" name={item.topping} id={item.id} defaultValue={item.topping} />
//                             <button onClick={() => removeTopping(item)}>X</button>
//                         </li>
//                     )
//                 })
//             }
//         </ul>
//     )
// }

function shuffle(originalArray) {
    const shuffledArray = [...originalArray];
    for (let index = 0; index < shuffledArray.length; index++) {
        const shuffledIndex = getRandomIndex(0, index + 1);

        [shuffledArray[index], shuffledArray[shuffledIndex]] = [shuffledArray[shuffledIndex], shuffledArray[index]];
    }

    return shuffledArray;
}

function getRandomIndex(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export default function PizzaToppings() {

    console.log("PizzaToppings is being created or rendered.");

    const [toppings, setToppings] = useState(pizzaToppings);

    useEffect(() =>{
        const interval = setInterval(() =>{
            setToppings(shuffle(toppings));
        }, 2000);

        return clearInterval(interval);
    })

    return (
        <ul>
            {
                toppings.map((item, index) => {
                    return (
                        <li key={item.id}>
                            <input type="text" name={item.topping} id={item.id} value={item.topping} />
                        </li>
                    )
                })
            }
        </ul>
    )
}