import React, { useRef } from 'react'
import PersonImage from '../assets/images/person2.png'
import { NavLink } from 'react-router'
import { MdArrowOutward } from "react-icons/md";
import { motion, useInView } from 'framer-motion'

const AboutMe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-500px 0px', }); 
  return (
    <div className='section-container'>
      <div className='section-header'>
        <h3 className='section-subheading'>About Me</h3>
        <h2 className='section-mainheading'>Passion for Full Stack Development</h2>
      </div>
      <div className='w-full flex items-center gap-25'>
        <motion.div 
          className='w-[30%] flex justify-center items-center green-bg overlay'
          ref={ref}
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <img src={PersonImage} alt="Ahmed Farooq" className='w-full' />
        </motion.div>
        <div className='w-[70%] flex flex-col gap-8'>
            <p>
            My journey began with a simple yet powerful idea: to revolutionise the digital landscape through innovative solutions and exceptional creativity. 
            </p>
            <p>
            Driven by a passion for design and technology, I set out to create unique digital experiences that make an impact in online.
            </p>
            <div className='flex items-center justify-center mt-10 mb-10'>
              <div className='flex-1/3 px-8 pl-0 border-r-2 border-gray-500'>
                <h5 className='font-bold text-dark-primary text-5xl mb-2'>6+</h5>
                <h6 className='font-medium text-xl'>Years of Experience</h6>
              </div>
              <div className='flex-1/3 px-8 border-r-2 border-gray-500'>
                <h5 className='font-bold text-dark-primary text-5xl mb-2'>100+</h5>
                <h6 className='font-medium text-xl'>Projects Completed</h6>
              </div>
              <div className='flex-1/3 px-8'>
                <h5 className='font-bold text-dark-primary text-5xl mb-2'>45+</h5>
                <h6 className='font-medium text-xl'>Satisfied Clients</h6>
              </div>
            </div>
            <NavLink to="about" className={`group theme-button`}>ABOUT ME <MdArrowOutward className='text-2xl group-hover:rotate-45' /></NavLink>
        </div>
      </div>
    </div>
  )
}

export default AboutMe
