import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect , useState } from 'react'
import { Link } from 'react-router-dom'
import { HashLoader } from 'react-spinners'


export default function Brands() {
 
    function getBrands(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
      }
    
    
      const {data:Brands ,isLoading} = useQuery({
        queryKey : ["getBrands"],
        queryFn : getBrands,
        select :(data) => data.data.data
      })
    
    
    
    
    
    //   if(isLoading){
    //     return <div className='flex justify-center items-center  h-[100vh] '> 
    //         <HashLoader/>
    //     </div>
    //   }
    
    
      return (
        <>
      
      <div className='row w-[90%] mx-auto mb-6'> 
        {Brands.map((brand)=>
          <div className='w-1/5 py-2 px-5 my-2 '>
        <Link to={`/home`}>
            <div className='product rounded-md'>  
            <img className='w-full  overflow-hidden ' src={brand.image}/>
            <h5 className='font-bold text-[#4FA74F] text-center text-[30px]'>{brand.name}</h5>
            <button className='btn w-full '>Browse Products</button>
            </div>
        </Link>
        </div>
        )}
      </div> 
        </>
      )
}
