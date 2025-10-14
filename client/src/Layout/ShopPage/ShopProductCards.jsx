import React from 'react'
import { FaCartShopping, FaStar } from 'react-icons/fa6'
import { MdAddShoppingCart } from "react-icons/md";


const ProductCard = ({IsonSale,isoutofStock}) => {
    return (
        <div className='bg-white flex relative  flex-col gap-4 p-4 rounded-lg shadow-md cursor-pointer transition-transform duration-200 hover:scale-105' style={{ padding: 16 }}>

            <div className='flex justify-between items-center'>
                
                {IsonSale && <div className='absolute top-2 left-2 bg-btn-primary text-white px-2 py-1 rounded-md text-sm' style={{ padding: 4 }} >20% OFF</div>}
                {isoutofStock &&  <div className='absolute top-2 right-2 bg-btn-danger text-white px-2 py-1 rounded-md text-sm' style={{ padding: 4 }}    >Out of Stock</div>}

               
            </div>

            <div>
                <img src="https://gameforce.pk/wp-content/uploads/2024/11/ps5-pro-digital-edition-playstation-5-pro-2tb-price-in-pakistan-gameforcepk-3-1.webp" alt="IMG" />
            </div>



            <div>
                <h2 >Product Name</h2>

                <div className='flex justify-between'>
                    <p className='text-muted'>By Apple</p>
                    <MdAddShoppingCart />
                </div>

            </div>

            <div className='flex justify-between'>
                <span>$999</span>

                <div className='flex justify-center items-center gap-1'>
                    <p>5</p>

                    <FaStar color="#ffc107" />
                </div>
            </div>
        </div>
    )
}
const ShopProductCards = () => {
    return (
        <div className=' flex flex-col  gap-6 ' style={{ padding: 32 }}>

            <div style={{ padding: 12 }} className=' bg-bg-secondary h-14 items-center flex flex-col gap-2 justify-between px-4 rounded-t-lg md:flex-row' >
                <p className='text-muted'> <span className='font-semibold text-black' >Showing</span> : 1-10 products of 11 products</p>
            </div>


            <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center items-center' >
                <ProductCard />
                <ProductCard IsonSale={true}/>
                <ProductCard isoutofStock={true}/>
                <ProductCard />
                <ProductCard isoutofStock={true} IsonSale={true}/>
            </div>
        </div>
    )
}

export default ShopProductCards