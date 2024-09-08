import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";
import HashLoader  from "react-spinners/HashLoader";
import { useQuery } from '@tanstack/react-query';


export default function ProductDetails() {
    let {id , category} = useParams();
    const [RelatedProducts, setRelatedProducts] = useState([])
    let {data , error , isLoading , isError} = useQuery({
        queryKey: ['getProductDetails',id],
        queryFn: ()=>getProductDetails(id)
       })

    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1750,
        pauseOnHover: true
      };
      var Gallary_settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: true
      };

    function getProductDetails(productID){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productID}`)
    }

    function GetRelatedProducts(category){
        let filterData ;
        axios.get("https://ecommerce.routemisr.com/api/v1/products").then(({data})=>{
            let Products = data.data ; 
            let Related  = Products.filter((product)=>product.category.name == category)
            setRelatedProducts(Related)
        })
    }


    useEffect(()=>{
        GetRelatedProducts(category)
    },[,category])

   
  if(isLoading){
    return <div className='flex justify-center items-center h-[100vh] '> 
        <HashLoader/>
    </div>
  }
   
  return (
    <>
    <div className='row justify-center gap-10'>
        <div className='w-1/4 ms-2'>
        <Slider {...Gallary_settings}>
            {data?.data.data.images.map((image)=> <img src={image} alt="" />)}
        </Slider >
        </div>
        <div className='w-2/4   py-20 flex flex-col gap-3  '>
            <h4 className='uppercase text-[#4FA74F] font-semibold '>{data?.data.data.category.name}</h4>
            <h2 className='uppercase text-[30px] text-slate-900 font-bold  '>{data?.data.data.title}</h2>
            <p className='text-[15px]  text-slate-500 font-bold   '>{data?.data.data.description}</p>
            <div className='flex justify-between items-center w-[98%] mx-auto my-3'>
                 <h2 className='text-[25px]  text-[#4FA74F]  font-bold '>{data?.data.data.price} EGP</h2>
                 <h2 className='text-[25px]  text-[#161616]  font-bold ' >{data?.data.data.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></h2>
            </div>
            <button className='btn w-[50%] text-center  '>Add to Cart</button>
        </div>
    </div>

    <div className=' w-[85%] mx-auto mb-5'>
        <h2 className='text-[30px] text-[#3c853c] uppercase font-bold px-3 mb-6 '>Explore Related Products</h2>
        <div>
        <Slider {...settings}>
            {RelatedProducts.map((product)=>
                <div className='w-1/6 py-2 px-5 my-2 '>
                    <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                        <div className='product'>
                        <img className='w-full ' src={product.imageCover}/>
                        <h5 className='font-semibold text-[#4FA74F] text-[13px]'>{product.category.name}</h5>
                        <p className='font-semibold'>{product.title.split(" ").slice(0,2).join(" ")}</p>
                        <div className='my-2 flex justify-between items-center'>
                        <h5 className='font-bold text-[#4FA74F]'>{product.price} EGP</h5>
                        <span className='font-semibold text-slate-500'>{product.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
                        </div>
                        <button className='btn '>Add to Cart</button>
                        </div>
                    </Link>
                </div>
            )}
        </Slider>
        </div>
       
    </div>
    </>
  )
}
