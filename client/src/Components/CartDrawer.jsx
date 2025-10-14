import React from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";


const CartDrawer = ({setisDrawerOpen,isDrawerOpen}) => {


    const CartDrawerCart = ({title,quantity,price,image}) => {
        return (
            <div style={{ paddingTop: 20 }} className='flex gap-5 p-5 justify-evenly '>

                <div className='flex gap-5'>
                    <img className='w-20 h-20' src={image} alt="Product" />

                    <div className=''>
                        <p>{title}</p>
                        <p>Quantity: {quantity}</p>
                        <p>Price: { price}</p>
                    </div>
                </div>



                <button className='cursor-pointer'> <IoIosClose className='w-8 h-8' /> </button>

            </div>
        )
    }

    return (
        <div className={`bg-bg-secondary flex flex-col transition-all ease-in duration-300 fixed top-0 right-0 z-50 h-full min-h-screen w-80 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>

            <div style={{ padding: 6 }} className='flex justify-between items-center p-5 border-b-2 border-gray-50'>
                <p className='text-2xl font-light '> Shopping Cart</p>
                <button onClick={() => setisDrawerOpen(false)} className='cursor-pointer'> <IoCloseCircleOutline className='w-8 h-8' />  </button>
            </div>

            <div className='mt-5 overflow-y-auto flex flex-col gap-5 h-full'>
                <CartDrawerCart title={"PS5"} quantity={1} price={250} image={"https://gameforce.pk/wp-content/uploads/2024/11/ps5-pro-digital-edition-playstation-5-pro-2tb-price-in-pakistan-gameforcepk-3-1.webp"}/>
               
            </div>

            <div className='mt-auto p-5 border-t-2 border-gray-50'>
               <div className='flex justify-between'>
                <p className='text-5x1'>Subtotal: </p>
                 <p className='text-2xl '> Total: $300 </p>
               </div>

                <div className='flex flex-col gap-1'>
                     <button className='w-full cursor-pointer  bg-btn-primary text-white h-8 p-2 mt-2 rounded-md'> View Cart </button>
                <button className='w-full cursor-pointer  bg-btn-primary text-white h-8 p-2 mt-2 rounded-md'> Checkout </button>
                </div>
               
            </div>

        </div>
    )
}

export default CartDrawer