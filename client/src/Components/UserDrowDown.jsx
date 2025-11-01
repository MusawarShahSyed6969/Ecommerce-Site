import React from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice';

const AuthenticatedUser = () => {
  const navigate = useNavigate();
   

const dispatch = useDispatch()
  const HandleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }
   
    return (
        <div style={{ padding: 8 }} className="
           absolute left-1/2 top-full 
           -translate-x-1/2 
           mt-3 
           w-auto
             min-w-40
            flex flex-col 
           bg-white shadow-xl rounded-xl 
           p-8  gap-x-12 gap-y-2 
           z-50 
         ">

            <button onClick={()=> navigate("/admindashboard")} className='cursor-pointer hover:text-btn-primary-hover'>Admin Panel</button>

            <button onClick={()=> navigate("/dashboard")} className='cursor-pointer hover:text-btn-primary-hover'>Dashboard</button>
            <button onClick={()=> HandleLogout()} className='cursor-pointer hover:text-btn-primary-hover'>Log out</button>
        </div>
    )
}

const UnAuthenticatedUser = () => {
      const navigate = useNavigate();
    return (
            <div style={{ padding: 8 }} className="
           absolute left-1/2 top-full 
           -translate-x-1/2 
           mt-3 
           w-auto
             min-w-40
            flex flex-col 
           bg-white shadow-xl rounded-xl 
           p-8  gap-x-12 gap-y-2 
           z-50 
         ">

            <button onClick={()=> navigate("/login")} className='cursor-pointer hover:text-btn-primary-hover'>Login</button>
            <button onClick={()=> navigate("/login")} className='cursor-pointer hover:text-btn-primary-hover'>sign up</button>
        </div>
    )
}


const UserDropDown = () => {
     const [isAuth , setisAuth] = React.useState(true);
      const {userInfo} = useSelector((state) => state.auth)
  return (
   <div>
    {userInfo ? <AuthenticatedUser /> : <UnAuthenticatedUser /> }
   </div>
  )
}

export default UserDropDown
