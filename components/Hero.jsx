'use client';

import {useTypewriter, Cursor} from 'react-simple-typewriter';

import CarSearchForm from "@/components/CarSearchForm"
import GoogleIcon from "@/components/icons/GoogleIcon"

const Hero = () => {
  const [text] = useTypewriter({
    words: ['MongoDB', 'Tailwind', 'Next.js'],
    loop: {}
  })

  return (
    <section className="bg-black pt-10 md:pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-wide sm:text-5xl md:text-6xl text-black mb-6 [text-shadow:1px_0_0_white,-1px_0_0_white,0_1px_0_white,0_-1px_0_white]">
          Next Cars
        </h1>
        <p className="text-sm md:text-3xl text-white">
          Full-stack pet project built using <span className='text-base md:text-3xl font-bold bg-gradient-to-r from-[#ff0000] to-[#ffff00] bg-clip-text text-transparent'>{text}</span><Cursor />
        </p>
      </div>
      <CarSearchForm />
    </div>
  </section>
  )
}

export default Hero;