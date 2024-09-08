import React, { useContext, useEffect , useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import HashLoader  from "react-spinners/HashLoader";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import EmptyCart from "../../assets/empty-cart.png"

export default function Cart() {

  let queryClient = useQueryClient();
  // Used a Query To Get the UserCart Then Changed Its name to usercart when destructuring 
  // queryFn getUserCart Was Imported From the CartContext
  let {getUserCart ,removeProduct, updateProductCount , clearCart} =useContext(CartContext);
  // const [cart, setusercart] = useState(second)


  const { data :usercart ,isLoading} = useQuery({
    queryKey:["getUserCart"],
    queryFn:getUserCart,
    select:(data)=> data.data.data,
  });

  const {mutate:deleteitem} = useMutation({
    mutationFn : (productId)=>removeProduct(productId),
    onSuccess : async ()=>{
      toast.promise(queryClient.invalidateQueries(["getUserCart"]),{
        loading: 'Removing from Cart',
     success: <b>Removed Successfully</b>,
     error: <b>Something Went Wrong Try again Later</b>,})
    }
  })

  // const {mutate:updateCount} = useMutation({
  //   mutationFn : (productId,count)=>updateProductCount(productId,count),
  //   onSuccess : async ()=>{
  //     toast.promise(queryClient.invalidateQueries(["getUserCart"]),{
  //       loading: 'updating Cart',
  //    success: <b>Cart Updated Successfully</b>,
  //    error: <b>Something Went Wrong Try again Later</b>,})
  //   }
  // })

  const {mutate:clearUserCart} = useMutation({
    mutationFn : ()=>clearCart(),
    onSuccess : async ()=>{
      toast.promise(queryClient.invalidateQueries(["getUserCart"]),{
        loading: 'Clearing Cart',
     success: <b>Cart Is Emply Enjoy Shopping</b>,
     error: <b>Something Went Wrong Try again Later</b>,})
    }
  })

  function HandleProductDelete(productId){
    deleteitem(productId)
  }

  
 async function HandleProductUpdate(productId,count){
    await  updateProductCount(productId,count)
    toast.success("Cart Updated")
    queryClient.invalidateQueries(["getUserCart"])
  
  }

  function HandleCartClear(){
    clearUserCart();
  }

  // show a Loading Screen While Retriving The Data 
  if(isLoading){
    return <div className='flex justify-center items-center  h-[100vh] '> 
      <HashLoader/>
  </div>
}

  if(usercart.products.length == 0){
    return <div className='flex flex-col justify-center items-center  bg-red-50 w-[80%] mx-auto'> 
      <h3 className='text-2xl font-bold p-5 text-slate-700'>Looks Like your Cart Is Empty</h3>
      <img src={EmptyCart} alt="" />
</div>
  }

  return (
   <>
  <div className='w-[85%] mx-auto my-5 flex justify-between items-center'>
    <div>
      <h2 className='text-4xl text-emerald-600 font-bold uppercase my-2'>Your Cart</h2>
      <h4 className='text-lg text-slate-500 font-semibold'>Total Cart Price <span className='font-bold text-emerald-500'>{usercart?.totalCartPrice}</span> EGP</h4>
    </div>
    <div className='flex items-center gap-2'>
      <Link to={"/checkout"}>
       <span  className='py-3 px-5 cursor-pointer hover:bg-emerald-900 bg-emerald-700 text-white font-semibold rounded-lg'>Checkout</span>
      </Link>
       <span onClick={HandleCartClear} className='py-3 px-5 cursor-pointer hover:bg-red-800 bg-red-600 text-white font-semibold rounded-lg'>Empty Cart</span>
     </div>
   </div>
<div className="relative overflow-x-auto shadow-md w-[90%] mx-auto mt-7  sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
    {usercart.products.map((product)=>  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product?.product.imageCover}  alt={product?.product.title}   className="w-16 md:w-32 max-w-full max-h-full" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
           {product?.product.title}  
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>{HandleProductUpdate(product.product.id,product.count -1 )}}  className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
            <span>{product.count}</span>
            </div>
            <button onClick={()=>{HandleProductUpdate(product.product.id,product.count + 1)}} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
           {product?.price}  
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>HandleProductDelete(product.product.id)}   className="font-medium py-2 px-2 bg-red-700 text-white rounded-md dark:text-red-500 cursor-pointer  ">Remove</span>
        </td>
      </tr>)}
     
    </tbody>
  </table>
</div>


   </>
  )
}
