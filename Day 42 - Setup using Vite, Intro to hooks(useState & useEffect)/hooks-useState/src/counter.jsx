import { useState } from "react";
export function Counter() {
    const [count, setCount] = useState(0);

    function incrementCount(){
        // updater function syntax
        // setCount(count+1);
        setCount((prev)=>  prev+1);
        setCount(prev => prev+1);
        setCount(prev => prev+1);
        setCount(prev => prev+1);

    }

    function decrementCount(){
        setCount(count-1);
    }

    return <>
    <button onClick={decrementCount}>-</button>
    {count}
    <button onClick={incrementCount}>+</button>
    </>
    

    
    
}