import React,{useState} from 'react'
import { useNavigate } from 'react-router';
import { MdAddShoppingCart } from "react-icons/md";
import { FaCartShopping, FaStar } from 'react-icons/fa6'

const ProductCard = ({IsonSale,isoutofStock,Name,brand,price,image,rating}) => {
    const navigate = useNavigate();
    return (
        <div  onClick={() => navigate("/productdetails/123")} className='bg-white flex relative  flex-col gap-4 p-4 rounded-lg shadow-md cursor-pointer transition-transform duration-200 hover:scale-105' style={{ padding: 16 }}>

            <div className='flex justify-between items-center'>
                
                {IsonSale && <div className='absolute top-2 left-2 bg-btn-primary text-white px-2 py-1 rounded-md text-sm' style={{ padding: 4 }} >20% OFF</div>}
                {isoutofStock &&  <div className='absolute top-2 right-2 bg-btn-danger text-white px-2 py-1 rounded-md text-sm' style={{ padding: 4 }}    >Out of Stock</div>}

               
            </div>

            <div>
                <img src={image} alt="IMG" />
            </div>



            <div>
                <h2 >{Name}</h2>

                <div className='flex justify-between'>
                    <p className='text-muted'>By {brand}</p>
                    <MdAddShoppingCart />
                </div>

            </div>

            <div className='flex justify-between'>
                <span>${price}</span>

                <div className='flex justify-center items-center gap-1'>
                    <p>{rating}</p>

                    <FaStar color="#ffc107" />
                </div>
            </div>
        </div>
    )
}

export default ProductCard