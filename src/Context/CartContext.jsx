import axios from 'axios';
import  { createContext } from 'react';

export let CartContext = createContext();


export default function CartContextProvider(props){

    let headers ={
        token : localStorage.getItem("userToken")
    }



    function getUserCart(){
      return  axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
            headers
        })
    }

    function addProductToCart(productID){
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
            productId: productID 
        },{
            headers
        }).then((response)=>response)
        .catch((error )=>error)
    }

    function removeProduct(productID){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`,{
            headers
        })
        .then((response)=>response)
        .catch((error)=>error)
    }

    function updateProductCount(productID,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`,{
            count : count
        },{
            headers
        }).then((response)=>response)
        .catch((error)=>error)
    }

    function  clearCart(){
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
            headers
        }).then((response)=>response)
        .catch((error)=>error)
    }


    function CheckoutCart(cartID,url,orderInfo){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=${url}`,{
            shippingAddress : orderInfo
        },{
            headers
        }).then((response)=>response).catch((error)=>error)
    }

    return <CartContext.Provider value={{getUserCart , addProductToCart ,removeProduct , updateProductCount , clearCart ,CheckoutCart}}>
        {props.children}
    </CartContext.Provider>
}