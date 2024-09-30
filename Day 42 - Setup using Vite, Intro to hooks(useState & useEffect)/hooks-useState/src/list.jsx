
import { useState } from "react";
function getList(){
    const items = [];
    for(let index =0; index<50;index++){
        items.push(index);
    }

    console.log("getList called",{items})
    
    return items;
}

export function List(){

    // initializer syntax
    //correct const [items, setItems] = useState(()=>getList());
    
    //correct
    const [items, setItems] = useState(getList);
    
    // wrong way
    // const [items, setItems] = useState(getList());

    return <>
    <ul>
        {items.map(item=> <li>{item}</li>)}
    </ul>
    <button onClick={()=> setItems([...items, items.at(-1)+1])}>Add item</button>
    </>
}