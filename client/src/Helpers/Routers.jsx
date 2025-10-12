import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/HomePage";
import ShopPage from "../Pages/ShopPage";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<HomePage/>
    },
    {
        path:'/shop',
        element:<ShopPage/>
    }
])

