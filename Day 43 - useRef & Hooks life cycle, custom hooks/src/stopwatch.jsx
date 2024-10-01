import React, { useRef, useState } from 'react'

export default function StopWatch() {

    let secondsElapsed =0;
    const intervalRef = useRef(0);
    const startTime = useRef(null);
    const [now, setNow] = useState(null);
   function start(){
        if(!startTime.current){
            startTime.current = Date.now();
        }
      
       intervalRef.current = setInterval(()=>{
           setNow(Date.now());
       },10)
   } 

   function stop(){
    clearInterval(intervalRef.current);
   }
   secondsElapsed = (now - startTime.current)/1000;

  return (
    <>
    <h2>
      {secondsElapsed}
    </h2>
    <button onClick={stop}>Stop</button>
    <button onClick={start}>Start</button>
    </>
  )
}
