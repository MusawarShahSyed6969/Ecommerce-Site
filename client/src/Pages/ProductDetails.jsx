import React, { useEffect } from 'react'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import ProductDetailsRow from '../Layout/ProductPage/ProductDetailsRow'
import ProductDetailsinfo from '../Layout/ProductPage/ProductDetailsinfo'

   import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../redux/slices/productSlice";

import { FeaturedProducts } from '../Layout/Homepage/FeaturedProducts';

const ProductDetails = () => {

 


  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (id) dispatch(getProductById(id));
  }, [dispatch, id]);

  return (
    <div>
        <div>
            <Navbar/>
        </div>

        {/* MAIN DIV */}
        <div className='min-h-screen flex  flex-col '>
            
            {/* FIRDT ROW */}
        <div>
              <ProductDetailsRow product={product} loading={loading} error={error}/>
        </div>

        <div>
            <ProductDetailsinfo product={product} loading={loading} error={error}/>
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