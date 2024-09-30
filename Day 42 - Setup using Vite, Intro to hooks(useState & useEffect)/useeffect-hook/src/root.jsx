import React from 'react'
import MouseMovement from './mouseMovement'

export default function Root() {
    const [show, setShow] = React.useState(true)
    function toggle() {
        setShow(!show)
    }
  return (
    <>
    {show? <MouseMovement /> :"mouse movent is hidden"}
    <button onClick={toggle}>Toggle</button>
    </>
  )
}
