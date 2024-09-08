import React from 'react'
import { Outlet } from 'react-router-dom';
import Footer from './../Footer/Footer';
import AuthenticationNavbar from './../Navbar/AuthenticationNavbar';

export default function AuthenticationLayout() {
  return (
   <>
    <AuthenticationNavbar/>
   <div>
    <Outlet/>
   </div>
    <Footer/>
   </>
  )
}
