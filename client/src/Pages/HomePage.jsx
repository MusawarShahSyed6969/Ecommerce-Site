import React, { useState } from 'react';
import Navbar from '../Layout/Navbar';


import { SomeFeatures } from '../Layout/Homepage/SomeFeatures';
import HeroContent from '../Layout/Homepage/HeroContent';
import { FeaturedProducts } from '../Layout/Homepage/FeaturedProducts';
import CartDrawer from '../Components/CartDrawer';
import FlashsaleCard from '../Layout/Homepage/FlashsaleCard';
import FeatuedCategory from '../Layout/Homepage/FeatuedCategory';
import CustomerReview from '../Layout/Homepage/CustomerReview';
import Footer from '../Layout/Footer';

const HomePage = () => {
 // const [isDrawerOpen, setisDrawerOpen] = useState(false);

  return (
    <div className="overflow-x-hidden">
      <div className="relative flex flex-col justify-center h-screen">
        {/* ✅ Navbar (fixed prop syntax) */}
        <Navbar />

        {/* ✅ Drawer shows conditionally */}
        {/* {isDrawerOpen && <CartDrawer setisDrawerOpen={setisDrawerOpen}  />} */}
        {/* <CartDrawer isDrawerOpen={isDrawerOpen} setisDrawerOpen={setisDrawerOpen} /> */}
        {/* <CartDrawer /> */}


        {/* Background */}
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 w-screen h-screen -z-10 bg-cover bg-center"
        >
          {/* Optional Iridescence */}
        </div>

        {/* Hero section */}
        <HeroContent />
      </div>

      {/* Features section */}
      <div>
        <SomeFeatures />
      </div>

      <div>
        <FeaturedProducts />
      </div>

      <div>
        <FlashsaleCard/>
      </div>

   <div>
    <FeatuedCategory/>
   </div>

   <div>
    <CustomerReview/>
   </div>

   <div>
    <FlashsaleCard/>
   </div>

   <div>
    <Footer/>
   </div>
    </div>
  );
};

export default HomePage;
