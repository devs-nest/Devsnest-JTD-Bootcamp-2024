import React, { useRef } from 'react'
import './gallery.css'

export default function Gallery() {
   const galleryRef = useRef(null);
   const index = useRef(0);

function onNextClicked(){
    const imageList = galleryRef.current.querySelectorAll(".image");
    index.current = index.current + 1 >= imageList.length ? 0 : index.current + 1;
    imageList[index.current].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline:"center"
    });
}

  return (
   <section>
    <h1>Gallery</h1>
    <button onClick={onNextClicked}>Next</button>
    <ul ref={galleryRef} className='gallery'>
        <li className='image' ><img src="https://httpstatusdogs.com/img/201.jpg" alt="" /></li>
        <li className='image'><img src="https://httpstatusdogs.com/img/100.jpg" alt="" /></li>
        <li className='image'><img src="https://httpstatusdogs.com/img/202.jpg" alt="" srcset="" /></li>
    </ul>
   </section>
  )
}
