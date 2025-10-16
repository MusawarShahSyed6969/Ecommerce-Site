import React from 'react'
import ps5_Controller from "../../images/ps5_Controller-2.png"

const HeroContent = () => {
  return (
    <div className="flex flex-col-reverse  items-center justify-center text-center gap-4 relative grow md:flex-row">
      <div className='flex  flex-col items-center juastify-center gap-4'>
        <p className="text-2xl font-light text-black md:2xl">Welcome to Gamers Place</p>
        <h1 className="text-3xl font-bold text-black md:text-6xl">
          Discover the Beauty <span className="text-btn-primary-hover">Gaming</span>
          <br /> at Your Fingertips
        </h1>
        <button className="text-2xl w-48 rounded-3xl h-12 text-white cursor-pointer bg-btn-primary hover:bg-btn-primary-hover transition-all">
          Shop now
        </button>
      </div>

      <div>
        <img
          className="w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-2xl "
          src={ps5_Controller}
          alt="Controller"
        />
      </div>

    </div>
  )
}

export default HeroContent