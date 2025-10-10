import React from 'react'
import { FaQuoteLeft } from "react-icons/fa";


const CustomerReview = () => {

    const CustomerReviewCard = () => {
        return (
            <div className='bg-bg-secondary rounded-4xl' style={{ padding: 20, maxWidth: 400, minWidth: 300, height: "auto" }}>


                <div className='flex flex-col justify-between  gap-4'>
                    <div>
                        <FaQuoteLeft />
                        <p>I am absolutely thrilled with the service I received from their company! They were attentive, responsive, and genuinely cared about meeting my needs. I highly recommend them.</p>
                    </div>

                    <div className='flex gap-2 items-center '>
                        <img className='h-8 w-8 rounded-full' src="https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2025/03/team-01.jpg" alt="LOGO" />
                        <h2>John Doe</h2>
                    </div>
                </div>



            </div>
        )
    }


    return (
        <div className='flex flex-col justify-center items-center gap-8 bg-btn-primary-hover md:flex-row' style={{ paddingTop: 30, paddingBottom: 60 }}>
            <div className='flex flex-col justify-between max-h-6/12 h-auto items-center gap-8' style={{ padding: 20 }}>
                <div>
                    <h1 className='text-3xl font-bold text-white'>What Our Customers Say</h1>
                    <p className='text-white '>Discover the reasons why people loves us and become your go-to partner. </p>
                </div>

                <div>

                    <CustomerReviewCard />


                </div>
            </div>

             <div className=' gap-8 flex flex-col '>
                <CustomerReviewCard />
                <CustomerReviewCard />
            </div>
        </div>
    )
}

export default CustomerReview