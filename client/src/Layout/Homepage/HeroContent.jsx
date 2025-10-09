import React from 'react'

const HeroContent = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2 relative grow">
              <p className="text-2xl font-light text-black md:2xl">Welcome to Gamers Place</p>
              <h1 className="text-3xl font-bold text-black md:text-6xl">
                Discover the Beauty <span className="text-btn-primary-hover">Gaming</span>
                <br /> at Your Fingertips
              </h1>
              <button className="text-2xl w-48 rounded-3xl h-12 text-white cursor-pointer bg-btn-primary hover:bg-btn-primary-hover transition-all">
                Shop now
              </button>
            </div>
  )
}

export default HeroContent