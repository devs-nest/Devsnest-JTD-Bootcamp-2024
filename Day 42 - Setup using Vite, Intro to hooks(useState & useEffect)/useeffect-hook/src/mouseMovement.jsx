import { useState , useEffect} from "react";
export default function MouseMovement() {  

    const [cords, setCords] = useState({});

    useEffect(() => {

        function onMouseMove(event) {
            console.log(event.clientX, event.clientY)
            console.log(event);
            
    
            setCords({x: event.clientX, y: event.clientY})
        }
        window.addEventListener('mousemove', onMouseMove)
    
      return () => {

        // clean up function 
        // this function is optional
        console.log( "%c cleanup function called ", "color: green");
        

        window.removeEventListener('mousemove', onMouseMove)
      }
    }, [])
    
    

    return <article>
        asdfasd
        x: {cords.x}, y:{cords.y}
    </article>

}