import React from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";

const CartDrawer = ({setisDrawerOpen}) => {


    const CartDrawerCart = () => {
        return (
            <div style={{ paddingTop: 20 }} className='flex gap-5 p-5 justify-evenly '>

                <div className='flex gap-5'>
                    <img className='w-20 h-20' src="https://gameforce.pk/wp-content/uploads/2024/11/ps5-pro-digital-edition-playstation-5-pro-2tb-price-in-pakistan-gameforcepk-3-1.webp" alt="Product" />

                    <div className=''>
                        <p>Product Name</p>
                        <p>Quantity: 1</p>
                        <p>Price: $100</p>
                    </div>
                </div>



                <button> <IoCloseCircleOutline className='w-8 h-8' /> </button>

            </div>
        )
    }

    return (
        <div className='bg-bg-secondary flex flex-col absolute top-0 right-0 z-50 h-screen w-80'>

            <div style={{ padding: 6 }} className='flex justify-between items-center p-5 border-b-2 border-gray-50'>
                <p className='text-2xl font-light '> Shopping Cart</p>
                <button onClick={() => setisDrawerOpen(false)} className='cursor-pointer'> <IoCloseCircleOutline className='w-8 h-8' />  </button>
            </div>

            <div className='mt-5 overflow-y-auto flex flex-col gap-5 h-full'>
                <CartDrawerCart />
                <CartDrawerCart />
                <CartDrawerCart />
                <CartDrawerCart />
                <CartDrawerCart />
                <CartDrawerCart />
                <CartDrawerCart />
                <CartDrawerCart />
                <CartDrawerCart />
            </div>

            <div className='mt-auto p-5 border-t-2 border-gray-50'>
                <p className='text-xl font-light'> Total: $300 </p>
                <button className='w-full bg-green-600 text-white p-2 mt-2 rounded-md'> View Cart </button>
                <button className='w-full bg-green-600 text-white p-2 mt-2 rounded-md'> Checkout </button>
            </div>

        </div>
    )
}

export default CartDrawer