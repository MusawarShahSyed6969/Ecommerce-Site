import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import {router} from './Helpers/Routers.jsx'

import { Provider } from 'react-redux';
import store from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>

      <ToastContainer
      position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"/>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
