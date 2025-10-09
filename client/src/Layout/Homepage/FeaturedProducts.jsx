import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
export const FeaturedProducts = () => {

    const FeaturedCard = ({ title, para, price, img, rating }) => {



        const ShowRating = ({ rating }) => (
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    star <= rating
                        ? <FaStar key={star} color="#ffc107" />
                        : star - 0.5 <= rating
                            ? <FaStarHalfAlt key={star} color="#ffc107" />
                            : <FaRegStar key={star} color="#ffc107" />
                ))}
            </div>
        );

        return (
            <div className=''>
                <button className='cursor-pointer'>
                    <img className='w-52 h-52' src={img} alt="PRODUCT" />
                </button>

                <div className='flex flex-col items-start gap-2'>
                    <ShowRating rating={rating} />
                    <button className='text-1xl font-black cursor-pointer'>{title}</button>
                    <p className='text-muted'>{para}</p>
                    <p className=''>{price}</p>
                </div>


            </div>
        )
    }

    return (
       <div style={{paddingTop:23}} className=''>
         <div className='flex flex-col justify-center items-center w-full min-h-96 h-auto gap-8 '>

            <div>
                <h3 className='text-4xl font-extrabold border-b-2 border-green-100'>Featured Products</h3>
            </div>


            <div className='flex flex-col justify-evenly items-center w-full  md:flex-row'>
                <FeaturedCard title="XBOX 360" para="Best Gaming Console of old ERA" price="120$" img="https://gamestop.com.pk/cdn/shop/products/1-78_4ac9bdb4-0049-485f-8b47-78262754d6e5.jpg?v=1741689822&width=1946" rating={3.5} />
                <FeaturedCard title="PS5" para="Best Gaming Console of today ERA" price="500$" img="https://gameforce.pk/wp-content/uploads/2024/11/ps5-pro-digital-edition-playstation-5-pro-2tb-price-in-pakistan-gameforcepk-3-1.webp" rating={5} />
                <FeaturedCard title="PS4 Pro" para="Budget Gaming Console" price="300$" img="https://gameforce.pk/wp-content/uploads/2024/02/sony-playstation-4-ps4-pro-1tb-price-in-pakistan-pre-owned.webp" rating={4.5} />
            </div>



        </div>
       </div>
    )
}
