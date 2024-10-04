import { useReducer } from "react"
import commonCounterReducer from "./counter-business-logic";

function reducer(state, action) {
    if (action === "increase") {
        return state + 1;
    } else if(action === "decrease") {
        return state - 1
    } else {
        return state;
    }
}

export default function CounterReducer() {
    const [count, dispatch] = useReducer(commonCounterReducer, 0);

    function onDecreaseClick() {
        dispatch("decrease");
    }

    function onIncreaseClick() {
        dispatch("increase");
    }

    return (
        <>
            <button onClick={onDecreaseClick}>-</button>
            {count}
            <button onClick={onIncreaseClick}>+</button>
        </>
    )
}