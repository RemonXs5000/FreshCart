import React, { useEffect , useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'





export default function Layout() {
  return (
    <>
    <Navbar/>
    <div className='my-9' >
      <Outlet/>
    </div>
    <Footer/>
    </>
  )
}
