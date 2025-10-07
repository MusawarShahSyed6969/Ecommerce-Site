import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/HomePage";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<HomePage/>
    }
])

