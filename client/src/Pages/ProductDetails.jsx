import React from 'react'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import ProductDetailsRow from '../Layout/ProductPage/ProductDetailsRow'
import ProductDetailsinfo from '../Layout/ProductPage/ProductDetailsinfo'

import { FeaturedProducts } from '../Layout/Homepage/FeaturedProducts';

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

        <div>
            <ProductDetailsinfo/>
        </div>

        {/* RELATED PRODUCT HERE  */}

        <FeaturedProducts/>

        </div>


        <div>
            <Footer/>
        </div>
    </div>
  )
}

export default ProductDetails