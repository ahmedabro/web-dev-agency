import React from 'react'
import HireImage from '../assets/images/hire2.jpg'
import { Link } from 'react-router'
import { MdArrowOutward } from 'react-icons/md'

const CTASection = () => {
  return (
    <div className='h-[600px] relative w-full flex items-center'>
      <div className='w-[55%] h-full'>
        <img src={HireImage} alt='Hire Us' className='w-full h-full object-cover object-top shadow-lg opacity-40 brightness-90' />
      </div>
      <div className='work_together w-[70%] absolute right-0 h-full bg-dark-primary text-dark-surface flex flex-col justify-center items-center text-center' style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 20% 100%, 0 50%)' }}>
        <div className='max-w-[600px] ml-[5%]'>
          <h2 className='text-6xl font-black mb-4'>Let’s Work Together</h2>
      <p className='mb-8 text-lg'>Your next project deserves more than just code — it needs thoughtful design, seamless functionality, and reliable execution. Ready to turn your vision into a reality? Let’s make it happen. </p>
      <Link to="/contact" className='theme-button group text-white bg-dark-surface mx-auto isolate'>Hire Me <MdArrowOutward className='text-xl group-hover:rotate-45 transition-rotate duration-300 ease-in-out' /></Link>
        </div>
      </div>
    </div>
  )
}

export default CTASection
