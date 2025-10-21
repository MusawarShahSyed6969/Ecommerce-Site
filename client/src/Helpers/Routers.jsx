import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/HomePage";
import ShopPage from "../Pages/ShopPage";
import ProductDetails from "../Pages/ProductDetails";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import CartCheckout from "../Pages/CartCheckout";
import Contact from "../Pages/Contact";
import DashboardUser from "../Pages/DashboardUser";


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
    {
        path:'/contact',
        element:<Contact/>
    },
    {
        path:'/dashboard',
        element:<DashboardUser/>
    },



    
])

