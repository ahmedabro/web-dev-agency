import React from 'react'
import HireImage from '../assets/images/hire2.jpg'
import { Link } from 'react-router'
import { MdArrowOutward } from 'react-icons/md'

const CTASection = () => {
  return (
    <div className='h-full md:h-[450px] xl:h-[600px] relative w-full flex flex-col md:flex-row items-center'>
      <div className='md:w-[55%] w-full h-full'>
        <img src={HireImage} alt='Hire Us' className='w-full md:h-full hidden md:block md:max-h-[450px] xl:max-h-[600px] object-cover object-top shadow-lg opacity-40 brightness-90' />
      </div>
      <div className='work_together md:w-[60%] w-full md:absolute right-0 h-full bg-dark-primary text-dark-surface flex flex-col justify-center items-center text-center md:[clip-path:polygon(20%_0,100%_0,100%_100%,20%_100%,0_50%)]'>
        <div className='max-w-[600px] md:max-w-[300px] md:ml-[6%] xl:max-w-[600px] py-15 px-8 md:px-0 md:py-0'>
          <h2 className='text-3xl md:text-4xl xl:text-6xl font-black mb-4'>Let’s Work Together</h2>
      <p className='mb-8 text-lg'>Your next project deserves more than just code — it needs thoughtful design, seamless functionality, and reliable execution. Ready to turn your vision into a reality? Let’s make it happen. </p>
      <Link to="/contact" className='theme-button group text-white bg-dark-surface mx-auto isolate'>Hire Me <MdArrowOutward className='text-base xl:text-xl group-hover:rotate-45 transition-rotate duration-300 ease-in-out' /></Link>
        </div>
      </div>
    </div>
  )
}

export default CTASection
