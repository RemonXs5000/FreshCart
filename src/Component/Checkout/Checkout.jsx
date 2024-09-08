import axios from 'axios';
import { useFormik } from 'formik'
import React, { useEffect , useState , useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import  *  as Yup from 'yup'
import { CartContext } from '../../Context/CartContext';
import { useQuery } from '@tanstack/react-query';



export default function Checkout() {


  let navigate =useNavigate();
  let {CheckoutCart , getUserCart } = useContext(CartContext)

//   get UserCart To get accuss for the CartID
  const { data :cartID ,isLoading} = useQuery({
    queryKey:["getUserCartCount"],
    queryFn:getUserCart,
    select:(data)=> data.data.cartId
  });




  function validationSchema(){
    let Schema = Yup.object({
      details : Yup.string().required(),
      phone : Yup.string().required("phone is Required").matches(/^01[0125]{1}[0-9]{8}$/ ,"Enter Egyptian Number"),
      city : Yup.string().required("City is Required")
    });
    return Schema ; 
  }

 async function HandleCheckout(cart,url){
     let {data} =  await CheckoutCart(cart,url,formik.values);
     if(data.status =="success"){
      window.location.href = data.session.url ; 
     }
  }



  let formik = useFormik({
    initialValues:{
      details:"",
      phone:"",
      city:"" 
    },
    validationSchema
    ,
    onSubmit:()=>HandleCheckout(cartID ,"http://localhost:5173/")
})



  return (
  <>
  <div className='w-1/2 mx-auto my-10'>
    <div className='text-center my-8'> 
      <h2 className='text-4xl text-[#4FA74F] font-bold'>Fill Up Order Info</h2>
    </div>

   <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
 
  <div className="relative z-0 w-full mb-5 group">
    <input type="text" name="details" id="details" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-green-500 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">details</label>
    {formik.errors.details && formik.touched.details ?<div className="p-4 my-4 text-sm text-slate-700 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-blue-400" role="alert">{formik.errors.details}</div> : null}
  </div>
  
  <div className="relative z-0 w-full mb-5 group">
    <input type="tel" name="phone" id="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-green-500 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone</label>
    {formik.errors.phone && formik.touched.phone ?<div className="p-4 my-4 text-sm text-slate-700 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-blue-400" role="alert">{formik.errors.phone}</div> : null}
  </div>
 
  <div className="relative z-0 w-full mb-5 group">
    <input type="text" name="city" id="city" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-green-500 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city</label>
    {formik.errors.city && formik.touched.city ?<div className="p-4 my-4 text-sm text-slate-700 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-blue-400" role="alert">{formik.errors.city}</div> : null}
  </div>
 
  <button type='submit' className='bg-emerald-700 py-3 px-4 text-white font-semibold rounded-md hover:bg-[#4FA74F]' >Checkout</button>
</form>

  </div>
  </>
  )
}
