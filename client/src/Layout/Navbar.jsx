import React, { useState } from 'react'
import { FiInstagram } from "react-icons/fi";
import { FaXTwitter, FaCartShopping } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { FiYoutube } from "react-icons/fi";
import { NavLink } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";



const Navbar = () => {

  const [isMenuOpen ,setisMenuOpen] = useState(false)
  return (
    <div className="">

    

      

        {/* Navbar on top of BG */}
        <div className="relative z-10 flex h-20 items-center justify-around ">
          <div>
            <img src="" alt="LOGO" />
          </div>

          <div  className="flex gap-5 items-center text-2xl  ">
            <NavLink className="hover:text-green-500 hidden md:block" to={"/"}>Home</NavLink>
            <NavLink className="hover:text-green-500 hidden md:block" to={"/"}>Shop</NavLink>
            <NavLink className="hover:text-green-500 hidden md:block" to={"/"}>About</NavLink>
            <NavLink className="hover:text-green-500 hidden md:block" to={"/"}>Contact</NavLink>

            <NavLink className=" hidden md:block " to={"/"}> <FiInstagram/> </NavLink>
            <NavLink className=" hidden md:block " to={"/"}> <FaXTwitter/> </NavLink>
            <NavLink className=" hidden md:block " to={"/"}> <CiFacebook/> </NavLink>
            <NavLink className=" hidden md:block " to={"/"}> <FiYoutube/> </NavLink>
            <NavLink className=" hidden md:block " to={"/"}> <FaCartShopping/> </NavLink>

            <button onClick={() => setisMenuOpen(!isMenuOpen)} className='block md:hidden' >  <GiHamburgerMenu/>  </button>
          </div>


          
        </div>

        {isMenuOpen ? (
          <HamburgerModal/>
        ): null}

        {/* Hero Content */}
        {/* <div className="relative z-10 flex flex-1 items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Hero Section</h1>
        </div> */}
        
     

      {/* Section 2 */}
      {/* <div className="h-screen bg-white flex items-center justify-center">
        <h1 className="text-4xl text-black">Section 2 Content</h1>
      </div> */}

    </div>
  )
}



const HamburgerModal = () =>{
  return(
    <div  className="flex flex-col gap-5 items-center text-2xl bg-black  p-24 md:hidden">

           <div className='flex flex-col gap-3'>
           <NavLink className="hover:text-green-500 " to={"/"}>Home</NavLink>
            <NavLink className="hover:text-green-500 " to={"/"}>Shop</NavLink>
            <NavLink className="hover:text-green-500 " to={"/"}>About</NavLink>
            <NavLink className="hover:text-green-500 " to={"/"}>Contact</NavLink>
           </div>

            <div className='flex gap-3 '>
            <NavLink className="  " to={"/"}> <FiInstagram/> </NavLink>
            <NavLink className="  " to={"/"}> <FaXTwitter/> </NavLink>
            <NavLink className="  " to={"/"}> <CiFacebook/> </NavLink>
            <NavLink className="  " to={"/"}> <FiYoutube/> </NavLink>
            <NavLink className="  " to={"/"}> <FaCartShopping/> </NavLink>

           

            </div>
    </div>
  )
}

export default Navbar
