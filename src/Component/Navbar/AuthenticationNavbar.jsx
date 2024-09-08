import React from 'react'
import { useState , useEffect } from 'react';
import { NavLink } from 'react-router-dom';






export default function AuthenticationNavbar() {
  return (
    
    <>
    
<nav className="bg-[#f8f9fa] py-3">
    <div className='container  w-[85%] mx-auto flex justify-between items-center'>
      <div className='logo flex gap-2 items-center'>
      <i className="fa-solid fa-cart-shopping text-4xl text-[#4FA74F]"></i>
      <h2 className='text-2xl font-semibold text-slate-900'>Fresh Cart</h2>
      </div>

  
      <ul className='flex gap-4 items-center font-bold text-slate-600'>
      <li><NavLink to={"/register"}>Register</NavLink></li>
      <li><NavLink to={"/login"}>Login</NavLink></li>
      </ul>
    </div>
</nav>


    </>
  )
}


