import React, { useContext,  useState } from 'react'
import { WishListContext } from '../../Context/WishlistContext';
import { CartContext } from '../../Context/CartContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import HashLoader  from "react-spinners/HashLoader";
import toast from 'react-hot-toast';

export default function WishList() {
    let {getUserWishList ,removeWishlistProduct} = useContext(WishListContext) ; 
    let {addProductToCart} = useContext(CartContext);
    let queryClient = useQueryClient();

    let {data:wishList , isLoading} = useQuery({
        queryKey : ["getUserWishlist"],
        queryFn : getUserWishList,
        select :(data)=> data.data.data
    })

    const {mutate:deleteWishListItem} = useMutation({
        mutationFn : (productId)=>removeWishlistProduct(productId),
        onSuccess : async ()=>{
          toast.promise(queryClient.invalidateQueries(["getUserWishlist"]),{
            loading: 'Removing from WishList',
         success: <b>Removed Successfully</b>,
         error: <b>Something Went Wrong Try again Later</b>,})
        }
      })

      
      function HandleWishListDelete(productId){
        deleteWishListItem(productId)
      }



    async function addProduct(productID){
        toast.promise( addProductToCart(productID) ,{
          loading: 'Adding to Cart',
       success: <b>Added Successfully</b>,
       error: <b>Something Went Wrong Try again Later</b>,
    })
       HandleWishListDelete(productID)
      }










if(isLoading){
    return <div className='flex justify-center items-center  h-[100vh] '> 
        <HashLoader/>
    </div>
      }
  return (
    <>
    <div className='w-[85%] mx-auto my-5 flex justify-between items-center'>
      <div>
        <h2 className='text-4xl text-emerald-600 font-bold uppercase my-2'>Your WishList</h2>
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
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
      {wishList?.map((product)=>  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="p-4">
            <img src={product?.imageCover}  alt={product?.title}   className="w-16 md:w-32 max-w-full max-h-full" />
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white ">
             {product?.title.split(" ").splice(0,10).join(" ") }
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
             {product?.price} EGP 
          </td>
          <td className="px-6 py-4  items-center justify-center">
            <span onClick={()=>addProduct(product?.id)}   className="font-medium py-2 px-2 bg-green-700 text-white rounded-md dark:text-green-500 cursor-pointer m-4  ">Add To Cart</span>
            <span onClick={()=>HandleWishListDelete(product?.id)} className="font-medium py-2 px-2 bg-red-700 text-white rounded-md dark:text-red-500 cursor-pointer  ">Remove</span>
          </td>
        </tr>)}
       
      </tbody>
    </table>
  </div>
     </>
  )
}
