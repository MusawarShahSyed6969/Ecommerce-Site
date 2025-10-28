import React, { useEffect, useState } from 'react'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import { CiShoppingCart } from "react-icons/ci";
import CartCard from '../Layout/CartPage/CartCard';

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { removeFromCart } from "../redux/slices/cartSlice";


const CartCheckout = () => {
      const navigate = useNavigate();
      const dispatch = useDispatch();
    
      // 🧠 Get cart data from Redux
      const { cartItems, subtotal } = useSelector((state) => state.cart);
    const [isEmpty, setisEmpty] = useState()


    useEffect(() => {

        cartItems.length > 0 ? setisEmpty(false) : setisEmpty(true)
      console.log(cartItems);
      
    }, [])
    

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