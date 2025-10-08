import React from 'react'
import Navbar from '../Layout/Navbar'

import BG2 from "../../public/images/spidermanBG.jpg"
import Iridescence from '../Components/Animated/Ridescence'
import TextType from '../Components/Animated/TextType'

const HomePage = () => {
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-x-hidden">
      {/* NAVBAR */}
      <Navbar />

      {/* Background */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-screen h-screen -z-10 bg-cover bg-center bg-bg-dark"
      // style={{ backgroundImage: `url(${BG2})` }}
      >
        <Iridescence
          color={[1, 0, 1]}
          mouseReact={false}
          amplitude={0.1}
          speed={1.0}
        />

      </div>

      {/* HERO */}
      <div className="flex grow flex-col items-center text-center gap-2 relative justify-center">
        <p className="text-3xl font-light text-text-secondary">Welcome to Gamers Place</p>

        <h1 className="text-4xl md:text-6xl -4xl font-bold text-text-primary">
          Discover the Beauty <span className="text-accent-cyan">Gaming</span>
          <br /> at Your Fingertips
        </h1>
        <button className="text-2xl w-48 rounded-3xl h-12 cursor-pointer bg-btn-primary hover:bg-btn-primary-hover transition-all duration-300 ease-in-out">
          Shop now
        </button>
      </div>
    </div>

  )
}

export default HomePage