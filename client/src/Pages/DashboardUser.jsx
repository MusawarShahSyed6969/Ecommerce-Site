// ...existing code...
import React, { useState, useEffect } from 'react'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import ProfileSetting from '../Layout/Dashboard/ProfileSetting'
import ProfileSecurity from '../Layout/Dashboard/ProfileSecurity'
import DashboardOrders from '../Layout/Dashboard/DashboardOrders'
import DashboardBilling from '../Layout/Dashboard/DasboardBilling'
import DashboardWishlist from '../Layout/Dashboard/DashboardWishlist'
import DashboardSupport from '../Layout/Dashboard/DashboardSupport'
import AddProductPage from '../Pages/Admin/AddProductPage'

import { IoCloseCircleOutline } from "react-icons/io5";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useNavigate } from 'react-router'


const DashboardUser = () => {
  const navigate = useNavigate()
  
    const Tabs = [
        { name: "Profile" }, { name: "Security" }, { name: "Orders" },  { name: "Support" }
    ]


    const [CurrentTab, setCurrentTab] = useState("Profile")
    const [ShowMenu, setShowMenu] = useState(false)

    // ensure mobile-only toggle state — when viewport >= md, force menu state to "visible via css"
    useEffect(() => {
      const mq = window.matchMedia('(min-width: 768px)') // Tailwind md breakpoint
      const onChange = (e) => {
        if (e.matches) {
          // on medium+ screens we don't need the mobile toggle state (avoid overlay/animation issues)
          setShowMenu(false)
        }
      }
      // set initial
      if (mq.matches) setShowMenu(false)
      mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange)
      return () => {
        mq.removeEventListener ? mq.removeEventListener('change', onChange) : mq.removeListener(onChange)
      }
    }, [])

    return (
        <div>

            <div> <Navbar /> </div>


            <div className='flex flex-col md:flex-row  items-center justify-center gap-4' style={{ padding: 24 }}>
                {/* LEFT MENU: keep in DOM to allow transitions (don't use `hidden` on mobile) 
                    On md+ the menu is always visible via responsive CSS (no state required) */}
                <div
                  className={`transition-all duration-300 ease-in-out transform overflow-hidden
                    md:opacity-100 md:translate-y-0 md:max-h-screen md:pointer-events-auto md:block
                    ${ShowMenu ? "opacity-100 -translate-y-5 max-h-screen pointer-events-auto" : "opacity-0 translate-y-0 max-h-0 pointer-events-none"}`}
                  aria-hidden={!ShowMenu && window.innerWidth < 768}
                >
                    <div className='md:min-h-screen flex flex-col gap-6  justify-start items-center ' >

                        <div>
                            {Tabs.map((item) => {
                                return (
                                    <div className=' h-full flex min-w-full gap-6 justify-center items-center ' key={item.name}>
                                        <div>
                                            <button
                                              className={` ${CurrentTab == item.name ? "bg-btn-primary" : ""} rounded-2xl  hover:bg-btn-primary`}
                                              style={{ padding: 8 }}
                                              onClick={() => setCurrentTab(item.name)}
                                            >
                                              {item.name}
                                            </button>
                                        </div>

                                    </div>
                                )
                            })}

                        </div>

                       <div className='md:hidden'>
                         {ShowMenu  && <IoCloseCircleOutline onClick={() => setShowMenu(false)} className='h-6 w-6' />}
                       </div>



                    </div>
                </div>

                <div className='md:hidden'>
                   {ShowMenu ? null : <IoMdArrowDropdownCircle onClick={()=> setShowMenu(true)} className='w-8 h-8'/>}
                </div>

                {/* MAIN CONTENT */}
                <div className='flex place-self-start bg-bg-secondary w-full min-h-screen'  >

                    {CurrentTab == "Profile" ? <ProfileSetting /> : null}
                    {CurrentTab == "Security" ? <ProfileSecurity /> : null}
                    {CurrentTab == "Orders" ? <DashboardOrders /> : null}
                    
                    {/* {CurrentTab == "Billing" ? <DashboardBilling /> : null} */}
                    {/* {CurrentTab == "Wishlist" ? <DashboardWishlist /> : null} */}
                    {CurrentTab == "Support" ? <DashboardSupport /> : null}

                </div>
              
            </div>


            <div> <Footer /> </div>
        </div>
    )
}

export default DashboardUser
// ...existing code...