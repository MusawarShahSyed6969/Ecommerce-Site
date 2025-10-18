import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/HomePage";
import ShopPage from "../Pages/ShopPage";
import ProductDetails from "../Pages/ProductDetails";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import CartCheckout from "../Pages/CartCheckout";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<HomePage/>
    },
    {
        path:'/shop',
        element:<ShopPage/>
    },
    {
        path:'/productdetails/:id',
        element:<ProductDetails/>
    },
    {
        path:'/login',
        element:<LoginPage/>
    },
    {
        path:'/signup',
        element:<SignupPage/>
    },
    {
        path:'/cartcheckout',
        element:<CartCheckout/>
    },



    
])

