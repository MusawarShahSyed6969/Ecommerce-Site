import React from 'react'

const AuthenticatedUser = () => {
   
    return (
        <div style={{ padding: 8 }} className="
           absolute left-1/2 top-full 
           -translate-x-1/2 
           mt-3 
           w-auto
           bg-white shadow-xl rounded-xl 
           p-8  gap-x-12 gap-y-2 cursor-pointer
           z-50 
         ">

            <button>Dashboard</button>
            <button>Logout</button>
        </div>
    )
}

const UnAuthenticatedUser = () => {
    return (
        <div>UserDrowDown</div>
    )
}


const UserDropDown = () => {
     const [isAuth , setisAuth] = React.useState(true);
  return (
   <div>
    {isAuth ? <AuthenticatedUser /> : <UnAuthenticatedUser /> }
   </div>
  )
}

export default UserDropDown
