import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/HomePage";
import ShopPage from "../Pages/ShopPage";
import ProductDetails from "../Pages/ProductDetails";


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
    }
])

