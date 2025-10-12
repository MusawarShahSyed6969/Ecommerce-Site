import React from 'react'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import ShopSelectionOptions from '../Layout/ShopPage/ShopSelectionOptions'
import ShopProductCards from '../Layout/ShopPage/ShopProductCards'

const ShopPage = () => {
  return (
   <div className="flex flex-col min-h-screen bg-gray-50 overflow-x-hidden" >
  {/* Navbar */}
  <Navbar />

  {/* Main Section */}
  <div className="flex justify-center w-full py-8">
    {/* Page Container */}
    <div className="flex w-[90%] max-w-7xl gap-6 md:flex-row flex-col ">
      {/* Left Sidebar (Filters) */}
      <div className="w-1/4">
        <ShopSelectionOptions />
      </div>

      {/* Right Section (Products) */}
      <div className="flex-1">
        <ShopProductCards />
      </div>
    </div>
  </div>

  {/* Footer */}
  <Footer />
</div>

  )
}

export default ShopPage