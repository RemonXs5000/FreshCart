import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

export default function CategorySlider() {
    const [categories, setCategories] = useState([]);
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 1750,
        pauseOnHover: true
      };



    function getCategories(){
        axios.get("https://ecommerce.routemisr.com/api/v1/categories").then(({data})=>{
            setCategories(data.data)
        })
    }

    useEffect(()=>{
        getCategories();
      },[])



  return (
    <div className='flex flex-col items-center'>
        <h2 className='text-[25px] text-[#3c853c]  font-bold px-3 mt-3 w-[90%]'>Divcover Popular Categories</h2>
        <Slider {...settings} className='w-[90%] mx-auto  py-5 gap-5 rounded-xl'>
        {categories.map((category)=>
        <div className='rounded-xl' >
            <img  className='h-[250px] w-full' src={category.image} alt= {category.name} />
        </div>
        )}
        </Slider> 
    </div>
  )
}
