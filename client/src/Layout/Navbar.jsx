import React, { useState } from 'react'
import { FiInstagram } from "react-icons/fi";
import { FaXTwitter, FaCartShopping } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { FiYoutube } from "react-icons/fi";
import { NavLink } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);

  return (
    <div className="">
      {/* Navbar */}
      <div className="relative z-10 flex h-20 items-center justify-around bg-navbar">
        <div>
          <img src="" alt="LOGO" />
        </div>

        <div className="flex gap-5 items-center text-2xl">
          <NavLink className="text-navbar-text hover:text-navbar-hover hidden md:block" to={"/"}>Home</NavLink>
          <NavLink className="text-navbar-text hover:text-navbar-hover hidden md:block" to={"/"}>Shop</NavLink>
          <NavLink className="text-navbar-text hover:text-navbar-hover hidden md:block" to={"/"}>About</NavLink>
          <NavLink className="text-navbar-text hover:text-navbar-hover hidden md:block" to={"/"}>Contact</NavLink>

          <NavLink className="hidden md:block" to={"/"}> <FiInstagram /> </NavLink>
          <NavLink className="hidden md:block" to={"/"}> <FaXTwitter /> </NavLink>
          <NavLink className="hidden md:block" to={"/"}> <CiFacebook /> </NavLink>
          <NavLink className="hidden md:block" to={"/"}> <FiYoutube /> </NavLink>
          <NavLink className="hidden md:block" to={"/"}> <FaCartShopping /> </NavLink>

          <button
            onClick={() => setisMenuOpen(!isMenuOpen)}
            className="block md:hidden"
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </div>

      {/* Animated Hamburger Menu */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden transform ${
          isMenuOpen
            ? "max-h-96 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-5"
        }`}
      >
        <HamburgerModal />
      </div>
    </div>
  );
};

const HamburgerModal = () => {
  return (
    <div style={{paddingLeft:"5px"}} className=" flex flex-col gap-5 items-center text-1xl  bg-bg-secondary p-10 text-white md:hidden">
      <div className="flex flex-col gap-3 text-start w-full">
        <NavLink className="text-white hover:text-green-500  py-2 " to={"/"}>Home</NavLink>
        <NavLink className="text-white hover:text-green-500  py-2 " to={"/"}>Shop</NavLink>
        <NavLink className="text-white hover:text-green-500  py-2 " to={"/"}>About</NavLink>
        <NavLink className="text-white hover:text-green-500  py-2 " to={"/"}>Contact</NavLink>
      </div>

      <div className="flex gap-5 text-2xl justify-center  w-full">
        <NavLink to={"/"}> <FiInstagram /> </NavLink>
        <NavLink to={"/"}> <FaXTwitter /> </NavLink>
        <NavLink to={"/"}> <CiFacebook /> </NavLink>
        <NavLink to={"/"}> <FiYoutube /> </NavLink>
        <NavLink to={"/"}> <FaCartShopping /> </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
