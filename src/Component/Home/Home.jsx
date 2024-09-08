import React, { useEffect , useState } from 'react'
import RecentProducts from './../RecentProducts/RecentProducts';
import CategorySlider from '../CategorySlider/CategorySlider';

export default function Home() {
  return (
    <>
    <CategorySlider/>
    <RecentProducts/>
    </>
  )
}
