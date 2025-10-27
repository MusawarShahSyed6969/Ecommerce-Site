import React, { useEffect } from 'react'
import { FaStar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReviews, createReview } from '../../redux/slices/reviewSlice'

const ProductDetailReviews = () => {
    const dispatch = useDispatch()
    const { reviews, loading, error, success } = useSelector((state) => state.reviews)

    // ✅ Extract productId directly from URL (no props, no router)
    const productId = window.location.pathname.split('/').pop()

    const [rating, setRating] = React.useState(0)
    const [hover, setHover] = React.useState(null)
    const [comment, setComment] = React.useState('')
    const [isReviewed, setisReviewed] = React.useState(true)

    useEffect(() => {
        if (productId) {
            dispatch(fetchReviews(productId))
        }
    }, [dispatch, productId, success])

    const handleSubmit = (e) => {
        e.preventDefault();
        const rating = 5;


        dispatch(createReview({ productId, rating, comment }));
    };



    // ⭐ Review Card Component
    const ReviewCard = ({ review }) => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)
        return (
            <div className='rounded-md bg-bg-secondary' style={{ marginBottom: 4, padding: 4 }}>
                <div className='flex items-center gap-4'>
                    <div>
                        <img
                            className='h-10 w-10 rounded-full'
                            src='https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2025/03/team-01.jpg'
                            alt='IMG'
                        />
                    </div>
                    <div>
                        <span className='text-lg font-semibold mr-2'>
                            {review.user?.name || 'Anonymous'}
                        </span>
                        <span className='text-yellow-500'>{stars}</span>
                    </div>
                </div>
                <p className='text-gray-700'>{review.comment}</p>
            </div>
        )
    }

    // ⭐ Reviews Section
    const ReviewCondition = () => {
        if (loading) return <p>Loading reviews...</p>
        if (error) return <p className='text-red-500'>Error: {error}</p>

        const hasReviews = reviews && reviews.length > 0
        console.log(reviews);



        return (
            <div className='max-w-screen h-auto mx-auto my-10 p-6 rounded-lg' style={{ padding: 24 }}>
                <h2 className='text-2xl font-bold mb-4'>Customer Reviews</h2>
                {hasReviews ? (
                    <div className='flex flex-col gap-3'>
                        {reviews && reviews.map((review) => (
                            <ReviewCard key={review._id} review={review} />
                        ))}
                    </div>
                ) : (
                    <h2 className='text-muted mb-4'>
                        There are no reviews yet. Be the first one who gives a review.
                    </h2>
                )}
            </div>
        )
    }

    return (
        <div>
            <ReviewCondition />

            <div
                className='max-w-screen min-h-screen h-auto mx-auto my-10 p-6 rounded-lg'
                style={{ padding: 24 }}
            >
                <h2 className='text-2xl font-bold mb-4'>Add a Review</h2>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    {/* ⭐ Rating Section */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-700 font-semibold'>Rating</label>
                        <div className='flex gap-1'>
                            {[...Array(5)].map((_, index) => {
                                const currentRating = index + 1
                                return (
                                    <button
                                        key={index}
                                        type='button'
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
                                )
                            })}
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-700 font-semibold' htmlFor='review'>
                            Review
                        </label>
                        <textarea
                            className='border border-gray-300 rounded-md p-2'
                            id='review'
                            name='review'
                            rows='4'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <button
                        className='bg-btn-primary text-white w-32 h-10 px-4 py-2 rounded-md hover:bg-btn-primary-hover transition-colors duration-300'
                        type='submit'
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ProductDetailReviews
