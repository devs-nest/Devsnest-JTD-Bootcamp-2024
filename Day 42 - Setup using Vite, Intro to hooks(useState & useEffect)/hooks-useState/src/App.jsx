
// ui = fn(state);
// state = certain data 
// the ui react component will update the ui
// hooks
// hook will not return jsx
import { useState } from "react";
function App() {
  // let text = ""
  let sometext = "abc"
  const [text, setText] = useState("");

  console.log({text});
  
// accepts an initial value which is assigned to the state variable
// returns an array 
// array[0] - state variable
// array[1] - fn which is used to update the state variable
  // useState => [text, fn()]
  // fn - used to update the state of the variable


  function onInputChange(event) {
    console.log(event.target.value)
    setText(event.target.value);
    // text = event.target.value;
    console.log({text});
    sometext = Math.random()
    
  }

  return  <div>
    <input type="text" onChange={onInputChange}/>
    {text}
    </div>
}

export default App
