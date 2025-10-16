import React from 'react'
import ProductDetailReviews from './ProductDetailReviews';

const ProductDetailsinfo = () => {

    const TabManager = () => {
        return (
            <div className='border-t-2 border-gray-300  '>
                <div className='flex gap-6 text-btn-primary text-lg '>
                    <button className={`${activeTab == "description" && "border-t-2"} border-border-dark `} onClick={() => setActiveTab("description")} >Description</button>
                    <button className={`${activeTab == "review" && "border-t-2"} border-border-dark`} onClick={() => setActiveTab("review")} >Reviews (10)</button>
                </div>
            </div>
        )
    }
    const [activeTab, setActiveTab] = React.useState('description');
    return (
       
        <div>
            <TabManager/>

            <div className='max-w-screen min-h-screen h-auto mx-auto my-10 p-6 bg-bg-secondary rounded-lg shadow-md' style={{ padding: 24 }}>
                {activeTab === 'description' && (
                    <div className='text-wrap w-auto leading-snug text-gray-700'>
                        <h2 className='text-2xl font-bold mb-4'>Product Description</h2>
                        <p>
                            Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices.
                        </p>
                       
                    </div>
                )}
                {activeTab === 'review' && <ProductDetailReviews/>  }
            </div>
        </div>
    
       
    )
}

export default ProductDetailsinfo