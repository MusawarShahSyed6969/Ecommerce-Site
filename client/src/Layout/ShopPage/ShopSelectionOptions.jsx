import React, { useState } from 'react'
import { LuSearch } from "react-icons/lu";
import FilterCards from './FilterCards';



const ShopSelectionOptions = () => {
  return (
   <div  className="hidden md:block" >
     <div className='flex flex-col gap-8 justify-center items-center' style={{paddingTop:32}}>

       <div className='flex w-full h-full justify-center items-center' >
            <input type="text" placeholder='Enter Product Name' className='border-2 border-gray-200' style={{padding:"10px 20px",borderRight:0}}/>
            <button className='bg-btn-primary-hover text-white rounded-r-md h-full' style={{padding:"13px 20px"}}  ><LuSearch  size={20} /></button>
       </div>

         <div>
           <div className='flex gap-4 ' >
                    <p className='text-muted' >Category:</p>
                    <select className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-btn-primary' >
                        <option value="relevance">All</option>
                        <option value="price-low-high">Sony</option>
                        <option value="price-high-low">Nvidia</option>
                        <option value="newest">AMD</option>
                    </select>
                </div>
        </div>

        <div>
            <FilterCards name={"Price"}/>
        </div>

        <div>
           <FilterCards name={"Ratings"}/>
        </div>

      
      
       
    </div>
   </div>
  )
}

export default ShopSelectionOptions