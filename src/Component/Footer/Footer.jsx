import React, { useEffect , useState } from 'react'
import store from "../../assets/Store.png"
import paymentParteners from "../../assets/payment.png"



export default function Footer() {
  return (
    <>
  <div className='py-9 bg-slate-100 sticky top-0 flex flex-col items-center gap-10'>
      <div className='w-[95%] mx-auto'>
        <h4 className='text-2xl text-slate-800 mb-2 font-semibold '>Get the FreshCart App </h4>
        <p className='text-[15px] text-slate-500'>We will send you a link,open it on your phone and Share the App with your Friends</p>
      </div>
      <div className='flex w-[95%] mx-auto justify-between' >
        <input type="text" className='border rounded-lg w-[85%]' placeholder='Email' />
        <button className='py-2 px-8 bg-[#429e1e] rounded-md text-white text-font-semibold'>Share App Link</button>
      </div>
      <div className='flex justify-between w-[90%] '>
        <div className='w-1/5'>
          
            <img  src={paymentParteners} alt="Payment gateways"/>
        </div>
        <div className='w-1/5'>
          
            <img src={store} alt="Payment gateways"/>
        </div>
      </div>
  </div>
    </>
  )
}