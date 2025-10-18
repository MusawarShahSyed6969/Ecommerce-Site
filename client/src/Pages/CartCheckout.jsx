import React, { useState } from 'react'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import { CiShoppingCart } from "react-icons/ci";
import CartCard from '../Layout/CartPage/CartCard';


const CartCheckout = () => {
    const [isEmpty, setisEmpty] = useState(false)

    const EmptyCardMenu = () =>
    {
        return(
            <div>
                <div className='border-t-2 border-btn-primary-hover w-full'></div>

                    <div className='flex gap-3 items-center justify-center'>
                          <CiShoppingCart color='1E90FF' className='w-7 h-7'/>

                    <p>Your cart is currently empty.</p>
                    </div>
            </div>
        )
    }
    return (
        <div className='min-h-screen flex flex-col  justify-between '>

            <div>
                <Navbar />
            </div>

            <div className='min-h-screen flex flex-col justify-start items-start ' style={{padding:24}}>

                <div className='bg-bg-secondary w-full flex flex-col gap-4' style={{padding:24}}>
                    <h1 className='text-4xl font-extrabold'>Cart</h1>

                    { isEmpty ? <EmptyCardMenu/> : <CartCard/>}

                </div>

            </div>

            <div className=''>
                <Footer />
            </div>

        </div>
    )
}

export default CartCheckout