import React, {createContext, useEffect, useState} from 'react'
import axios from 'axios';


export let WishListContext = createContext(0);


export default function WishListContextProvider(props){
    let headers ={
        token : localStorage.getItem("userToken")
    }


    function getUserWishList(){
        return  axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
              headers
          })
      }
  
      function addProductToWishList(productID){
          return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{
              productId: productID 
          },{
              headers
          }).then((response)=>response)
          .catch((error )=>error)
      }
  
      function removeWishlistProduct(productID){
          return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productID}`,{
              headers
          })
      }




return <WishListContext.Provider value={{getUserWishList,addProductToWishList,removeWishlistProduct}}>
    {props.children}
</WishListContext.Provider> 
}