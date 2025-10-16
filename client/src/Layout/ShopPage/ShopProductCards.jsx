import React, { use, useState } from 'react'

import { FaFilter } from "react-icons/fa6";

import { useNavigate } from 'react-router';
import ProductCard from './ProductCard';
import ShopFilterMobile from './ShopFilterMobile';



const ShopProductCards = () => {
    const [ResponsiveFilterMenu,setResponsiveFilterMenu] = useState(false)

    const ProductSortby = () => {
        return (
            <div style={{ padding: 12 }} className=' bg-bg-secondary h-auto  flex flex-col gap-4 justify-between px-4 rounded-t-lg md:flex-row' >

                <div className='hidden md:block'>
                    <p className='text-muted'> <span className='font-semibold text-black' >Showing</span> : 1-10 products of 11 products</p>
                </div>

                <div className='flex  justify-evenly'>
                    <div className='flex gap-4 ' >
                        <p className='text-muted hidden md:block' >Sort by:</p>
                        <select className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-btn-primary' >
                            <option value="relevance">Relevance</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                            <option value="newest">Newest Arrivals</option>
                        </select>
                    </div>

                    <div className='md:hidden'>
                        <FaFilter onClick={() => setResponsiveFilterMenu(!ResponsiveFilterMenu)}/>

                           
                    </div>
                </div>

                <div>
                     <ShopFilterMobile ResponsiveFilterMenu={ResponsiveFilterMenu} setResponsiveFilterMenu={setResponsiveFilterMenu}/>
                </div>

            </div>

        )
    }

    return (
        <div className=' flex flex-col  gap-6 ' style={{ padding: 32 }}>

            <ProductSortby />

            <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center items-center' >
                <ProductCard />
                <ProductCard IsonSale={true} />
                <ProductCard isoutofStock={true} />
                <ProductCard />
                <ProductCard isoutofStock={true} IsonSale={true} />
            </div>
        </div>
    )
}

export default ShopProductCards