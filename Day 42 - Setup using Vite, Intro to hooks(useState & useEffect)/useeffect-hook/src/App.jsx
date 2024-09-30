import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const API_URL = "https://official-joke-api.appspot.com/jokes/programming/random";

const numberToTextMap = new Map([
  [5, "five"],[10,  "ten"],[15, "fifteen"],[25, "twenty five"]
])
 function App() {

 
  const [joke, setJoke] = useState("");
  const [count, setCount] = useState(0)

  async function getJoke(count) {
    console.log("get joke called");
    
    fetch(`${API_URL}`)
  const result = await fetch(count?`https://official-joke-api.appspot.com/jokes/programming/${count}`:`${API_URL}`);
  // console.log(await result.json());
  
  const [data] = await result.json();
  console.log(data.name);
  setJoke({setup: data.setup, punchline: data.punchline});
 }
 


 useEffect(()=>{
  console.log("use effect called");
  
  getJoke();
 },[])

 useEffect(()=>{
  if(count>0){

    getJoke(numberToTextMap.get(count))
  }
 },[count])

  return (
    <article>
      <header>
      <h2>Ramdom joke</h2>
      </header>
      <p>{joke.setup}</p>
      <p>Ans: {joke.punchline}</p>
      <footer>
        <button onClick={getJoke}>
          Get a new joke
        </button>
        <button onClick={()=>{
          setCount(count+5)
        }}>Update count</button>
      </footer>
    </article>
  )
}

export default App
