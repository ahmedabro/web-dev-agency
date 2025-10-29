import React, { useRef } from 'react'
import PersonImage from '../assets/images/person2.png'
import { NavLink, useLocation } from 'react-router'
import { MdArrowOutward } from "react-icons/md";
import { motion, useInView } from 'framer-motion'
import Stats from './Stats';

const AboutMe = ({children}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-500px 0px', }); 

  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className='section-container'>
      <div className='section-header'>
        <h3 className='section-subheading'>About Me</h3>
        <h2 className='section-mainheading'>Passion for Full Stack Development</h2>
      </div>
      <div className='w-full flex flex-col sm:flex-row items-center sm:gap-8 lg:gap-20'>
        <motion.div 
          className='sm:w-[35%] flex justify-center items-center green-bg overlay'
          ref={ref}
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <img src={PersonImage} alt="Ahmed Farooq" className='max-w-[500px] sm:max-w-none sm:w-full' />
        </motion.div>
        <div className='sm:w-[65%] mt-10 sm:mt-0 flex flex-col gap-8'>
            <p>
            My journey began with a simple yet powerful idea: to revolutionise the digital landscape through innovative solutions and exceptional creativity. 
            </p>
            <p>
            Driven by a passion for design and technology, I set out to create unique digital experiences that make an impact in online.
            </p>
            {children}
            {/* {
            location.pathname === "/" && <Stats />
            } */}
            {location.pathname === "/" && (
              <NavLink to="about" className={`group theme-button`}>ABOUT ME <MdArrowOutward className='text-base xl:text-xl group-hover:rotate-45 transition-rotate duration-300 ease-in-out' /></NavLink>
            )}
        </div>
      </div>
    </div>
  )
}

export default AboutMe
