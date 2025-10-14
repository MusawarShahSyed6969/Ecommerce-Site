import React from 'react'

const ProductDetailsRow = () => {
    return (
        <div className='flex justify-evenly items-center  gap-10 ' style={{ padding: 35 }}>
            <img className='w-96 h-96' src="https://gameforce.pk/wp-content/uploads/2024/11/ps5-pro-digital-edition-playstation-5-pro-2tb-price-in-pakistan-gameforcepk-3-1.webp" alt="IMG" />

            <div className='flex flex-col justify-between bg-bg-secondary min-h-96 w-3/4 p-6 rounded-lg shadow-md leading-loose' style={{ padding: 24 }}>

                <div>
                    <p className='text-btn-primary '>Sony</p>
                    <h1 className='text-3xl font-bold'>Playstation 5</h1>
                    <p className='text-gray-700 font-semibold text-2xl'>$500 <span className='text-muted text-xl'>& Free Shipping</span></p>
                    <p className='text-wrap max-w-3/4 '> Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. </p>
                </div>

                <div className='flex gap-6'>
                    < input type="number" min={1} max={10} defaultValue={1} className='border border-gray-300 rounded-md w-20 text-center mr-4' />
                    <button className='bg-btn-primary text-white w-32 h-10 px-4 py-2 rounded-md hover:bg-btn-primary-hover transition-colors duration-300'>Add to Cart</button>
                </div>

                <div className=' border-t-2 border-gray-300 w-full h-full'></div>

                <div>
                    <p>Category : <span className='text-btn-primary '> Sony </span></p>
                </div>

            </div>
        </div>
    )
}

export default ProductDetailsRow