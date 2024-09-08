import React from 'react'
import { useState , useEffect , useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import HashLoader  from "react-spinners/HashLoader";
import { CartContext } from '../../Context/CartContext'
import { WishListContext } from '../../Context/WishlistContext';

import toast from 'react-hot-toast';




export default function RecentProducts() {

    const [IsWislist, SetIsWislist] = useState(false)
    let {addProductToCart} = useContext(CartContext)
    let {addProductToWishList} = useContext(WishListContext)

    function getRecentProduct(){
    return axios("https://ecommerce.routemisr.com/api/v1/products")
    }

    // showing a toast While adding Product to cart 
    async function addProduct(productID){
      toast.promise(   addProductToCart(productID) ,{
        loading: 'Adding to Cart',
     success: <b>Added Successfully</b>,
     error: <b>Something Went Wrong Try again Later</b>,})
    }

    async function addWishListItem(productID){
      toast.promise( addProductToWishList(productID) ,{
        loading: 'Adding to WishList',
     success: <b>Added Successfully</b>,
     error: <b>Something Went Wrong Try again Later</b>,})
    }


  // takes an obj that contian queryKey And queryfn
  let {data , error , isLoading , isError} = useQuery({
     queryKey: ['getRecentProducts'],
     queryFn: getRecentProduct 
})


  if(isLoading){
    return <div className='flex justify-center items-center  h-[100vh] '> 
        <HashLoader/>
    </div>
  }

  return (
  <>
  <div className='row w-[98%] mx-auto mb-6'> 
    {data?.data.data.map((product)=>
      <div className='w-1/6 py-2 px-5 my-2  '>
        <div className='product shadow-md rounded-md p-3 relative '>
          <i onClick={
            ()=>{{addWishListItem(product.id)}
            SetIsWislist(!IsWislist)
        }} className={`wishlist fas fa-heart ${IsWislist ? 'text-red-800' : 'text-red-400' } hover:text-red-800  absolute top-7 right-5 text-[30px] hover:cursor-pointer`} ></i>
        <Link to={`productdetails/${product.id}/${product.category.name}`}>
        <img className='w-full ' src={product.imageCover}/>
        <h5 className='font-semibold text-[#4FA74F] text-[13px]'>{product.category.name}</h5>
        <p className='font-semibold'>{product.title.split(" ").slice(0,2).join(" ")}</p>
        <div className='my-2 flex justify-between items-center'>
          <h5 className='font-bold text-[#4FA74F]'>{product.price} EGP</h5>
          <span className='font-semibold text-slate-500'>{product.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
        </div>
        </Link>
        <button onClick={()=>addProduct(product.id) } className='btn w-full'>Add to Cart</button>
        </div>
    </div>
    )}
  </div>
  </>
  )
}

