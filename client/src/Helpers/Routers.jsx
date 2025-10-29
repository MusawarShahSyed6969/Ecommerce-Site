import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/HomePage";
import ShopPage from "../Pages/ShopPage";
import ProductDetails from "../Pages/ProductDetails";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import CartCheckout from "../Pages/CartCheckout";
import Contact from "../Pages/Contact";
import DashboardUser from "../Pages/DashboardUser";
import AboutusPage from "../Pages/AboutusPage";
import Success from "../Components/Success";
import Cancel from "../Components/Cancel";
import OrderPage from "../Pages/OrderPage";


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
    {
        path:'/orderpage',
        element:<OrderPage/>
    },
    {
        path:'/about',
        element:<AboutusPage/>
    },
    {
        path:'/success',
        element:<Success/>
    },
    {
        path:'/cancel',
        element:<Cancel/>
    },



    
])

