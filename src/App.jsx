import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import Layout from './Component/Layouts/Layout';
import Home from './Component/Home/Home';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Categories from './Component/Categories/Categories';
import Cart from './Component/Cart/Cart';
import WishList from './Component/WishList/WishList';
import Notfound from './Component/Notfound/Notfound';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword';
import Checkout from './Component/Checkout/Checkout';
import RouteGuard from './Component/RouteGuard/RouteGuard';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import CodeVerification from './Component/CodeVerification/CodeVerification';
import Brands from './Component/Categories/Brands/Brands';

// Context providers
import UserContextProvider from './Context/UserContext';
import CartContextProvider from './Context/CartContext';
import WishListContextProvider from './Context/WishlistContext'; 
// ReactQuery & Toaster
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Resetpassword from './Component/Resetpassword/Resetpassword';




const queryClient = new QueryClient()


let route = createBrowserRouter([
  {path:'/' , element:<Layout/>, children:[
    {index:true , element:<RouteGuard> <Home/> </RouteGuard>},
    {path:"/home" , element:<RouteGuard> <Home/> </RouteGuard>},
    {path:"categories" , element:<RouteGuard> <Categories/> </RouteGuard>},
    {path:"cart" , element:<RouteGuard> <Cart/> </RouteGuard>},
    {path:"wishlist" , element:<RouteGuard> <WishList/> </RouteGuard>},
    {path:"brands" , element:<RouteGuard> <Brands/> </RouteGuard>},
    {path:"productdetails/:id/:category" , element:<RouteGuard> <ProductDetails/> </RouteGuard>},
    {path:"checkout" , element:<RouteGuard> <Checkout/> </RouteGuard>},
    {path:"login" , element:<Login/>},
    {path:"register" , element:<Register/>},
    {path:"*" , element:<Notfound/>},
    {path:"forgetpassword" , element:<ForgetPassword/>},
    {path:"code Verify" , element:<CodeVerification/>},
    {path:"resetPassword" , element:<Resetpassword/>},

  ]}
])


function App() {
  return <QueryClientProvider client={queryClient}>
           <UserContextProvider> 
            <WishListContextProvider>
              <CartContextProvider>
                <RouterProvider router={route}></RouterProvider>
                  <Toaster/>
              </CartContextProvider>          
            </WishListContextProvider>
          </UserContextProvider>
        </QueryClientProvider>

}

export default App
