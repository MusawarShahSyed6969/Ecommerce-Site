import React, { useState } from 'react';
import { FiInstagram } from "react-icons/fi";
import { FaXTwitter, FaCartShopping } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { FiYoutube } from "react-icons/fi";
import { NavLink } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";

import LOGO from "../../public/images/sindh.png"
import ps5_Controller from "../../public/images/ps5_Controller-2.png"
import DropdownCategory from '../Components/DropdownCategory';
import UserDropDown from '../Components/UserDrowDown';
import CartDrawer from '../Components/CartDrawer';
// const Navbar = ({ setisDrawerOpen }) => {
  const Navbar = () => {

  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [CategoryHover, setCategoryHover] = useState(false);
  const [UserHover, setUserHover] = useState(false);

  const UnderlineAnim =
    `relative text-navbar-text
                       after:content-[''] after:absolute after:left-0 after:bottom-0
                       after:w-0 after:h-[2px] after:bg-btn-primary-hover
                       after:transition-all after:duration-300
                       hover:after:w-full
                       leading-tight pb-[2px] hidden md:block`

  const ToggleDrawer = (e) => {
    e.preventDefault();
    setisDrawerOpen(true);

  };

  return (
    <div>
      {/* Navbar */}
      <div className="relative z-10 flex h-20 items-center justify-around bg-btn-primary">
        <div>
          <img className="w-20 cursor-pointer h-20  rounded-2xl " src={ps5_Controller} alt="LOGO" />
        </div>

        <div className="flex gap-5 items-center text-2xl ">
          <NavLink className={UnderlineAnim} to="/">Home</NavLink>
          <NavLink className={UnderlineAnim} to="/shop">Shop</NavLink>



          <div onMouseEnter={() => setCategoryHover(true)} onMouseLeave={() => setCategoryHover(false)} className="relative">
            <NavLink className={UnderlineAnim} to="/">Brands</NavLink>

            {CategoryHover && <DropdownCategory />}


          </div>

          <NavLink className={UnderlineAnim} to="/">Contact</NavLink>

          {/*  <NavLink className="hidden md:block invert" to="/"> <FaXTwitter /> </NavLink>
          <NavLink className="hidden md:block invert" to="/"> <CiFacebook /> </NavLink>
          <NavLink className="hidden md:block invert" to="/"> <FiYoutube /> </NavLink> */}

          {/* ✅ Fixed here: e will be passed automatically */}

          <div>
            <button onClick={ToggleDrawer} className="hidden cursor-pointer md:block invert hover:invert-0">
              <FaCartShopping />
            </button>

          </div>

          <div onMouseEnter={() => setUserHover(true)} onMouseLeave={() => setUserHover(false)} className="relative">
            <button className='cursor-pointer bg-white rounded-full w-10 h-10 text-center items-center justify-center flex'>
              M
            </button>

            
            {UserHover && <UserDropDown />}
           

          </div>

          {/* <NavLink className="hidden md:block invert" to="/"> <FiInstagram /> </NavLink> */}

          <button
            onClick={() => setisMenuOpen(!isMenuOpen)}
            className="block md:hidden"
          >
            <GiHamburgerMenu className="invert" />
          </button>
        </div>
      </div>

      {/* Animated Hamburger Menu */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden transform ${isMenuOpen
          ? "max-h-96 opacity-100 translate-y-0"
          : "max-h-0 opacity-0 -translate-y-5"
          }`}
      >
        <HamburgerModal setisDrawerOpen={setisDrawerOpen} />
      </div>
     <CartDrawer setisDrawerOpen={setisDrawerOpen} isDrawerOpen={isDrawerOpen} />
    </div>
  );
};

const HamburgerModal = ({ setisDrawerOpen }) => {

  const ToggleDrawer = (e) => {
    e.preventDefault();
    setisDrawerOpen(true);


  };
  return (
    <div
      style={{ paddingLeft: "5px" }}
      className="flex flex-col gap-5 items-center text-1xl bg-bg-secondary p-10 text-white md:hidden"
    >
      <div className="flex flex-col gap-3 text-start w-full">
        <NavLink className="text-black hover:text-green-500 py-2" to="/">Home</NavLink>
        <NavLink className="text-black hover:text-green-500 py-2" to="/">Shop</NavLink>
        <NavLink className="text-black hover:text-green-500 py-2" to="/">About</NavLink>
        <NavLink className="text-black hover:text-green-500 py-2" to="/">Contact</NavLink>
      </div>

      <div className="flex gap-5 text-2xl justify-center w-full">
        <NavLink to="/"> <FiInstagram className="invert " /> </NavLink>
        <NavLink to="/"> <FaXTwitter className="invert " /> </NavLink>
        <NavLink to="/"> <CiFacebook className="invert " /> </NavLink>
        <NavLink to="/"> <FiYoutube className="invert " /> </NavLink>
        <NavLink onClick={ToggleDrawer} to="/"> <FaCartShopping className="invert" /> </NavLink>
      </div>
    </div>
  );
};

export default Navbar;