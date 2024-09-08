import React, { useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { useQuery } from '@tanstack/react-query';





export default function Navbar() {
  let {UserToken , setUserToken} =useContext(UserContext)
  let navigate = useNavigate();

  let {getUserCart} = useContext(CartContext)
  
  function logOut(){
    localStorage.removeItem("userToken")
    setUserToken(null)
    navigate("/login")
  }

//   get UserCart To get accuss for the CartID
  const { data :ItemCount } = useQuery({
    queryKey:["getUserCart"],
    queryFn:getUserCart,
    select:(data)=> data.data.numOfCartItems
  });









  return (   
    <>  
<nav className="bg-[#f8f9fa] py-3 sticky top-0 z-50">
    <div className='container  w-[85%] mx-auto flex justify-between items-center'>
      <div className='logo flex gap-2 items-center'>
      <i className="fa-solid fa-cart-shopping text-4xl text-[#4FA74F]"></i>
      <h2 className='text-2xl font-semibold text-slate-900'>Fresh Cart</h2>
      </div>

      <ul className='flex items-center gap-3 cursor-pointer font-semibold'>
        {UserToken !== null ?<>
          <li><NavLink to={""}>Home</NavLink></li>
       <li><NavLink to={"products"}>Products</NavLink></li>
       <li><NavLink to={"wishList"}>WishList</NavLink></li>
       <li><NavLink to={"categories"}>Categories</NavLink></li>
       <li><NavLink to={"brands"}>Brands</NavLink></li>
       </> : null }
     
      </ul>

      <ul className='flex gap-4 items-center'>
        {UserToken != null ? <>
          <li className='relative'><NavLink to={"cart"}><i className="fa-solid fa-cart-shopping text-xl"></i></NavLink>
          <div className='absolute top-[-7px] right-[-10px] text-white font-semibold rounded-xl px-2 py-1 bg-red-600 text-[10px] '>{ItemCount}</div>
          </li>
          <li><span  onClick={logOut} className='cursor-pointer font-bold'>Logout</span></li>
        </> : null}
      
      {UserToken === null ? <>
      
        <li><NavLink to={"/register"}>Register</NavLink></li>
        <li><NavLink to={"/login"}>Login</NavLink></li>
        </> : null }
     
      </ul>
    </div>
</nav>
    </>
  )
}


