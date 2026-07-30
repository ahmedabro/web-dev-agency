import React, { useRef } from 'react'
import { NavLink, useLocation } from 'react-router'
import { MdArrowOutward } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi"
import { motion, useInView } from 'framer-motion'
import Stats from './Stats';

const items = [
  "Responsive & User-Centric Interfaces",
  "Scalable & Secure Architecture",
  "Clean, Maintainable Code",
  "End-to-End Web Solutions",
  "Long-Term Technical Support",
]

const AboutMe = ({children}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-500px 0px', }); 

  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className='section-container'>
      <div className='section-header'>
        <h3 className='section-subheading'>About Me</h3>
        <h2 className='section-mainheading'>Driven by Quality. Focused on Results.</h2>
      </div>
      <div className='w-full flex flex-col sm:flex-row items-center sm:gap-8 lg:gap-20'>
        <motion.div 
          className='sm:w-[35%] flex justify-center items-center green-bg overlay'
          ref={ref}
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <img src={"https://res.cloudinary.com/dvmmkvu4o/image/upload/f_auto,q_auto/v1762855132/person2_fwviow.png"} loading='lazy' alt="Ahmed Farooq" className='max-w-[500px] sm:max-w-none sm:w-full' />
        </motion.div>
        <div className='sm:w-[65%] mt-10 sm:mt-0 flex flex-col gap-8'>
            <p>
              I combine technical expertise with a problem-solving mindset to build modern web applications that are efficient, scalable, and designed to support long-term business success. Every project is developed with a focus on clean architecture, intuitive user experiences, and maintainable code that can grow alongside your business.
            </p>

            
             
            {children}

            <h3 className='text-white text-xl font-semibold mt-3'>Here’s what I bring to every project:</h3>
            <ul>
              {
                items.map((item, index) => (
                <li key={index} className='flex items-center gap-3 mb-2 text-sm md:text-base xl:text-lg'><GiCheckMark className='text-dark-primary text-lg' /> {item}</li>                
                ))
              }
            </ul>
            {/* {
            location.pathname === "/" && <Stats />
            } */}
            {location.pathname === "/" && (
              <NavLink to="about" className={`group theme-button`}>Learn More <MdArrowOutward className='text-base xl:text-xl group-hover:rotate-45 transition-rotate duration-300 ease-in-out' /></NavLink>
            )}
        </div>
      </div>
    </div>
  )
}

export default AboutMe
