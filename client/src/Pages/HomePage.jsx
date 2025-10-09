import React from 'react'
import Navbar from '../Layout/Navbar'

import BG2 from "../../public/images/spidermanBG.jpg"
import Iridescence from '../Components/Animated/Ridescence'

import { SomeFeatures } from '../Layout/Homepage/SomeFeatures';
import HeroContent from '../Layout/Homepage/HeroContent';
import { FeaturedProducts } from '../Layout/Homepage/FeaturedProducts';
import CartDrawer from '../Components/CartDrawer';


const HomePage = () => {
  return (
    <div className='overflow-x-hidden'>
      <div className="relative flex flex-col justify-center h-screen ">
        {/* NAVBAR */}
        <Navbar />

        {/* CART */}
        <CartDrawer/>

        {/* BACKGROUND */}
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 w-screen h-screen -z-10 bg-cover bg-center"
        >
          {/* <Iridescence
            color={[1, 2, 2]}
            mouseReact={true}
            amplitude={0.1}
            speed={1.0}
          /> */}
        </div>

        {/* HERO CONTENT */}
        <HeroContent/>
      </div>

      {/* ✅ Features section below (scrolls normally) */}
    <div>
      <SomeFeatures/>
    </div>


<div className=''>
  <FeaturedProducts />
</div>
    </div>
  )
}

export default HomePage