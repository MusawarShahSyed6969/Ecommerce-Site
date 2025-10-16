import React from 'react'
import { FaStar } from 'react-icons/fa'; // ⭐ added import for stars

const ProductDetailReviews = () => {
    const [isReviewed, setisReviewed] = React.useState(true);

    // ⭐ added states for rating
    const [rating, setRating] = React.useState(0);
    const [hover, setHover] = React.useState(null);

    const ReviewCard = () => {
        return (
            <div className='rounded-md bg-bg-secondary' style={{ marginBottom: 4, padding: 4 }}>
                <div className='flex items-center gap-4'>
                    <div>
                        <img
                            className='h-10 w-10 rounded-full'
                            src="https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2025/03/team-01.jpg"
                            alt="IMG"
                        />
                    </div>
                    <div>
                        <span className='text-lg font-semibold mr-2'>John Doe</span>
                        <span className='text-yellow-500'>★★★★☆</span>
                    </div>
                </div>
                <p className='text-gray-700'>
                    Great product! Really satisfied with the quality and performance.
                </p>
            </div>
        )
    }

    const ReviewCondition = () => {
        return (
            <div>
                {isReviewed ? (
                    <div className='max-w-screen h-auto mx-auto my-10 p-6 rounded-lg' style={{ padding: 24 }}>
                        {/* MAP REVIEWS HERE */}
                        <div className='flex flex-col gap-4'>
                            <h2 className='text-2xl font-bold mb-4'>Customer Reviews</h2>
                            <div className='flex flex-col gap-3'>
                                <ReviewCard />
                                <ReviewCard />
                                <ReviewCard />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='max-w-screen h-auto mx-auto my-10 p-6 rounded-lg' style={{ padding: 24 }}>
                        <h2 className='text-muted mb-4'>
                            There are no reviews yet. Be the first one who give review
                        </h2>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div>
            <ReviewCondition />

            <div className='max-w-screen min-h-screen h-auto mx-auto my-10 p-6  rounded-lg ' style={{ padding: 24 }}>
                <h2 className='text-2xl font-bold mb-4'>Add a Review</h2>

                <form className='flex flex-col gap-4'>

                    {/* ⭐ Added Star Rating Section */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-700 font-semibold'>Rating</label>
                        <div className='flex gap-1'>
                            {[...Array(5)].map((_, index) => {
                                const currentRating = index + 1;
                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setRating(currentRating)}
                                        onMouseEnter={() => setHover(currentRating)}
                                        onMouseLeave={() => setHover(null)}
                                    >
                                        <FaStar
                                            size={28}
                                            className={
                                                currentRating <= (hover || rating)
                                                    ? 'text-yellow-400 transition-colors duration-200'
                                                    : 'text-gray-300 transition-colors duration-200'
                                            }
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-700 font-semibold' htmlFor="name">Name</label>
                        <input
                            className='border border-gray-300 rounded-md p-2'
                            type="text"
                            id="name"
                            name="name"
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-700 font-semibold' htmlFor="email">Email</label>
                        <input
                            className='border border-gray-300 rounded-md p-2'
                            type="email"
                            id="email"
                            name="email"
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-700 font-semibold' htmlFor="review">Review</label>
                        <textarea
                            className='border border-gray-300 rounded-md p-2'
                            id="review"
                            name="review"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <button
                        className='bg-btn-primary text-white w-32 h-10 px-4 py-2 rounded-md hover:bg-btn-primary-hover transition-colors duration-300'
                        type="submit"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ProductDetailReviews
