import React, { useEffect , useState } from 'react'
import notFoundpage from "../../assets/error.svg"




export default function Notfound() {
  return (
  <div className='justify-center items-center flex my-3'>
    <img src={notFoundpage} alt="Not Found Page" />
  </div>
  )
}
