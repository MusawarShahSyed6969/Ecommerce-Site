import React from 'react'


const FlashsaleCard = () => {
  return (
    <div className='relative flex justify-center items-center overflow-hidden  min-h-96 h-auto m-10 rounded-lg bg-gradient-to-r from-btn-primary via-black to-btn-primary-hover ' > 

        {/* <img className='absolute -z-50' src={BG} alt="" /> */}

        <div className='flex flex-col justify-center  items-center text-center gap-5 p-10 m-10 rounded-lg'>
          
          <div className=' flex flex-col gap-5 md:w-3/5'>
              <h2 className='text-2xl text-white md:text-5xl'>Flash Sale: Up to <span className='text-accent-cyan'>50%</span>Off On Select Items!</h2>
            <p className='text-muted'>Don’t miss out on our flash sale event! For a limited time, enjoy up to 50% off on a selection of our best-selling products.</p>

          </div>
            <button className='border-2 border-btn-primary w-28 h-10 text-white p-2 rounded-md cursor-pointer hover:bg-btn-primary '>Shop Now</button>
        </div>
    </div>
  )
}

export default FlashsaleCard