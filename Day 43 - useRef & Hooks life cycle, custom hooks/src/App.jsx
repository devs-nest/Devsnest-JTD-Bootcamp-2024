import { useEffect, useRef, useState } from 'react'
import './App.css'
import DemoCounter from './counter';

function App() {
  console.log("%c App: render start", "color: hotpink");
  const [showCounter, setShowCounter] = useState(() => {
    console.log("%c App: useState", "color:coral");
    return false;
  });

  useEffect(() => {
    console.log("%c App: useEffect no deps called", "color:green");

    return () => {
      console.log("%c App: useEffect no deps clean up", "color:red");
    };
  });
  useEffect(() => {
    console.log("%c App: useEffect empty deps called", "color:green");

    return () => {
      console.log("%c App: useEffect empty deps clean up", "color:red");
    };
  }, []);
  useEffect(() => {
    console.log("%c App: useEffect with deps called", "color:green");

    return () => {
      console.log("%c App: useEffect with deps clean up", "color:red");
    };
  }, [setShowCounter]);
  

  return (
    <div className="App">
      <fieldset style={{ marginBottom: "16px" }}>
        <label htmlFor="showCounter">Show Counter</label>
        <input type="checkbox" name="showCounter" id="showCounter" onChange={(e) => setShowCounter(e.target.checked)} />
      </fieldset>
     
      {showCounter && <DemoCounter />}
    </div>
  )
}

export default App
