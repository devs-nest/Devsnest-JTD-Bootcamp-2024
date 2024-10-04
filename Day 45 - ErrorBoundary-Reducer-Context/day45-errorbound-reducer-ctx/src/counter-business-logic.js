export default function commonCounterReducer(state, action) {
    if (action === "increase") {
        return state + 1;
    } else if(action === "decrease") {
        return state - 1
    } else {
        return state;
    }
}