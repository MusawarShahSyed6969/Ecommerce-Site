import React from 'react'
import Navbar from '../Layout/Navbar'

import BG2 from "../../public/images/spidermanBG.jpg"

const HomePage = () => {
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-x-hidden">
    {/* NAVBAR */}
    <Navbar />
  
    {/* Background */}
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 w-screen h-screen -z-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${BG2})` }}
    ></div>
  
    {/* HERO */}
    <div className="flex grow flex-col items-center text-center gap-2 relative justify-center">
      <p className="text-3xl font-light">Welcome to Gamers Place</p>
      <h1 className="text-4xl md:text-6xl -4xl font-bold">
        Discover the Beauty <span className="text-green-500">Gaming</span>
        <br /> at Your Fingertips
      </h1>
      <button className="text-2xl w-48 rounded-3xl h-12 bg-green-400 hover:bg-green-800 transition-all duration-300 ease-in-out">
        Shop now
      </button>
    </div>
  </div>
  
  )
}

export default HomePage