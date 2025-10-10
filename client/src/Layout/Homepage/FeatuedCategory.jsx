import React from 'react'

const CategoryCard = ({ img, CatergoryName }) => {
    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            <div>
                <img className='w-52 h-52 cursor-pointer' src={img} alt="PNGG" />
            </div>

            <p className='text-2xl'>{CatergoryName}</p>
        </div>
    )
}
const FeatuedCategory = () => {
    return (
        <div className='flex flex-col justify-center items-center gap-8' style={{ paddingTop: 30, paddingBottom: 100 }}>

            <div>
                <h1 className='font-bold border-b-2 border-green-100 text-4xl'>Our Categories</h1>
            </div>


            <div className='flex flex-col justify-evenly items-center gap-8 md:flex-row' >
                <CategoryCard CatergoryName={"Headset"} img={"https://www.webex.com/content/dam/www/us/en/images/devices/headsets/cisco-headset-720-series/headset-L1.png"} />
                <CategoryCard CatergoryName={"Console"} img={"https://gameforce.pk/wp-content/uploads/2024/11/ps5-pro-digital-edition-playstation-5-pro-2tb-price-in-pakistan-gameforcepk-3-1.webp"} />
                <CategoryCard CatergoryName={"LCD"} img={"https://images.philips.com/is/image/philipsconsumer/b9803f34eb74494582e9b014012a3fa6?$pnglarge$&wid=1250"} />
                <CategoryCard CatergoryName={"Laptop"} img={"https://img.freepik.com/premium-vector/modern-laptop-mockup-with-blank-screen-vector-illustration_1253202-12453.jpg?semt=ais_hybrid&w=740&q=80"} />
            </div>




        </div>
    )
}

export default FeatuedCategory