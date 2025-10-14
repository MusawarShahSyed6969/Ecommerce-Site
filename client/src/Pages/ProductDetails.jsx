import React from 'react'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import ProductDetailsRow from '../Layout/ProductPage/ProductDetailsRow'

const ProductDetails = () => {
  return (
    <div>
        <div>
            <Navbar/>
        </div>

        {/* MAIN DIV */}
        <div className='min-h-screen flex  flex-col '>
            
            {/* FIRDT ROW */}
        <div>
              <ProductDetailsRow/>
        </div>


        </div>


        <div>
            <Footer/>
        </div>
    </div>
  )
}

export default ProductDetails