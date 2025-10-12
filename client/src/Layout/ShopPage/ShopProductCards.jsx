import React from 'react'

const ProductCard = () => {
    return (
        <div className='bg-white flex  flex-col gap-4 p-4 rounded-lg shadow-md cursor-pointer' style={{padding:16}}>
                <img src="https://gameforce.pk/wp-content/uploads/2024/11/ps5-pro-digital-edition-playstation-5-pro-2tb-price-in-pakistan-gameforcepk-3-1.webp" alt="IMG" />

                <div>
                    <h2>Product Name</h2>
                    <p>By Apple</p>
                </div>

                <div className='flex justify-between'>
                    <span>$999</span>
                    <p>Ratings</p>
                </div>
        </div>
    )
}
const ShopProductCards = () => {
  return (
    <div className=' flex flex-col  gap-6 ' style={{padding:32}}>

        <div style={{padding:12}} className=' bg-bg-secondary h-14 items-center flex flex-col gap-2 justify-between px-4 rounded-t-lg md:flex-row' >
            <p className='text-muted'> <span className='font-semibold text-black' >Showing</span> : 1-10 products of 11 products</p>
        </div>


        <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center items-center' >
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
    </div>
  )
}

export default ShopProductCards