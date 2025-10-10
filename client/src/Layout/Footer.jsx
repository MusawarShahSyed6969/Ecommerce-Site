import React from 'react'
import { FiInstagram } from "react-icons/fi";
import { FaXTwitter, FaCartShopping } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { FiYoutube } from "react-icons/fi";
import { NavLink } from 'react-router'

import ps5_Controller from "../../public/images/ps5_Controller-2.png"

const Footer = () => {
    return (
        <div className='bg-btn-primary flex-col flex justify-around items-center  gap-8' style={{ padding: 20 }}>

            <div className='flex justify-around items-center w-full md:flex-row flex-col gap-4 '>
                <img src={ps5_Controller} alt="LOGO" className='hidden md:block w-28 h-28 cursor-pointer'/>

                <div className='flex gap-5 items-center'>
                    <NavLink className="text-navbar-text hover:text-black hidden md:block" to="/">Home</NavLink>
                    <NavLink className="text-navbar-text hover:text-black hidden md:block" to="/">Shop</NavLink>
                    <NavLink className="text-navbar-text hover:text-black hidden md:block" to="/">About</NavLink>
                    <NavLink className="text-navbar-text hover:text-black hidden md:block" to="/">Contact</NavLink>
                </div>

                <div className='flex gap-5 items-center ' >
                    <NavLink className="hidden md:block invert" to="/"> <FiInstagram /> </NavLink>
                    <NavLink className="hidden md:block invert" to="/"> <FaXTwitter /> </NavLink>
                    <NavLink className="hidden md:block invert" to="/"> <CiFacebook /> </NavLink>
                    <NavLink className="hidden md:block invert" to="/"> <FiYoutube /> </NavLink>
                </div>
            </div>

        <div  className='w-full' style={{borderBottom: "1px solid white", paddingTop:10}} >

        </div>

            <div>
                <p className='text-white'>© 2025 MUSAWAR SHAH SYED. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer