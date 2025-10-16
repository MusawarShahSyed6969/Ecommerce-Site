import React from 'react'
import { FaStar } from 'react-icons/fa';
import { RiSecurePaymentFill } from "react-icons/ri";



const ProductDetailsRow = () => {

    const MetaInfo =    ({isOnSale,isOutOfStock}) => {
        return(
              <div className='flex justify-between items-center'>
                
               {isOnSale &&  <div className=' bg-btn-primary text-white px-2 py-1 rounded-md text-sm' style={{ padding: 4 }} >20% OFF</div>}
                {isOutOfStock && <div className=' bg-btn-danger text-white px-2 py-1 rounded-md text-sm' style={{ padding: 4 }}    >Out of Stock</div>}

               
            </div>
        )
    } 
    return (
        <div className='flex flex-col justify-evenly items-center  gap-10 md:flex-row' style={{ padding: 35 }}>
            <img className='w-96 h-96' src="https://gameforce.pk/wp-content/uploads/2024/11/ps5-pro-digital-edition-playstation-5-pro-2tb-price-in-pakistan-gameforcepk-3-1.webp" alt="IMG" />

            <div className='flex flex-col gap-6 justify-between bg-bg-secondary min-h-96 w-auto p-6 rounded-lg shadow-md leading-loose' style={{ padding: 24 }}>

                <div className='max-w-screen flex flex-col gap-3'>

                    {/* <div>
                        <p className='text-sm text-gray-500'>Home / Electronics / Consoles</p>
                    </div> */}
                        
                        <MetaInfo isOnSale={true} isOutOfStock={true}/>

                    <p className='text-btn-primary '>Sony</p>
                    
                    <div className='flex flex-col justify-between md:items-center md:flex-row' style={{padding:4}}>
                        <h1 className='text-2xl font-bold md:text-3xl '>Playstation 5</h1>
                        <div className='flex items-center gap-1 text-yellow-500'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <span className='text-muted text-sm'>(120 Reviews)</span>
                        </div>
                    </div>

                    <p className='text-gray-700 font-semibold text-2xl'>$500 <span className='text-muted text-xl'>& Free Shipping</span></p>
                    <p className='text-wrap w-auto leading-snug'> Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. </p>
                </div>

                <div className='flex gap-6'>
                    < input type="number" min={1} max={10} defaultValue={1} className='border border-gray-300 rounded-md w-20 text-center mr-4' />
                    <button className='bg-btn-primary text-white w-32 h-10 px-4 py-2 rounded-md hover:bg-btn-primary-hover transition-colors duration-300'>Add to Cart</button>
                </div>

                <div className=' border-t-2 border-gray-300 w-full h-full'></div>

                <div className='flex gap-3 text-sm text-gray-600 justify-between'>
                   <div>
                     <p>Category : <span className='text-btn-primary '> Sony </span></p>
                    <p>Tags : <span className='text-btn-primary '> PS5, PlayStation, Console </span></p>
                   </div>

                   <div>
                    <p className='flex items-center gap-2 text-btn-primary'> < RiSecurePaymentFill className='w-6 h-6'/> 100% Secure Payment</p>   
                   </div>
                   
                </div>

            </div>
        </div>
    )
}

export default ProductDetailsRow