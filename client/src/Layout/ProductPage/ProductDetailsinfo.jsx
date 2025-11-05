import React, { useEffect } from 'react'
import ProductDetailReviews from './ProductDetailReviews';
import { fetchReviews} from '../../redux/slices/reviewSlice'
import { useDispatch, useSelector } from 'react-redux';


const ProductDetailsinfo = ({product, loading, error}) => {

        const { reviews,total,reviewError, success,reviewLoading} = useSelector((state) => state.reviews)

    const dispatch = useDispatch()
    const productId = window.location.pathname.split('/').pop()
   useEffect(() => {

   

        if (productId) {
            dispatch(fetchReviews({productId,limit:7}))
        }
    }, [dispatch, productId])

    // const dispatch = useDispatch()


    const TabManager = () => {
        return (
            <div className='border-t-2 border-gray-300  '>
                <div className='flex gap-6 text-btn-primary text-lg '>
                    <button className={`${activeTab == "description" && "border-t-2"} border-border-dark `} onClick={() => setActiveTab("description")} >Description</button>
                    <button className={`${activeTab == "review" && "border-t-2"} border-border-dark`} onClick={() => setActiveTab("review")} >Reviews ({total})</button>
                </div>
            </div>
        )
    }
    const [activeTab, setActiveTab] = React.useState('description');
    return (
       
        <div>
            <TabManager/>

            <div className='max-w-screen min-h-64 h-auto mx-auto my-10 p-6 bg-bg-secondary rounded-lg shadow-md' style={{ padding: 24 }}>
                {activeTab === 'description' && (
                    <div className='text-wrap w-auto leading-snug text-gray-700'>
                        <h2 className='text-2xl font-bold mb-4'>Product Description</h2>
                        <p>
                           {product ? product.long_description : <p>Error in Description</p>}
                        </p>
                       
                    </div>
                )}
                {activeTab === 'review' && <ProductDetailReviews reviews={reviews} total={total} reviewError={reviewError} success={success} reviewLoading={reviewLoading}/>  }
            </div>
        </div>
    
       
    )
}

export default ProductDetailsinfo