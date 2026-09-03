import React from 'react'
import { Link, NavLink } from 'react-router'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa6";
import { motion } from 'framer-motion'
import { MdArrowOutward } from "react-icons/md";

const Banner = () => {
  return (
    <div id='home' className='section-container mb-0! text-center lg:text-start relative overflow-hidden h-screen flex flex-col md:flex-row items-center justify-end bg-dark-secondary isolate'>
        <div className='md:w-1/2 flex flex-col justify-between mb-10 lg:mb-0'>
            <div className='flex flex-col gap-4'>
              <motion.p 
                className='font-semibold tracking-[0.25em] text-sm md:text-base lg:text-lg'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 100, damping: 10 }}
              >
                FULL STACK WEB DEVELOPER
              </motion.p>
              <motion.h1 
                className='space-grotesk-bold text-dark-primary text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-bold leading-tight tracking-tight text-balance w-full'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100, damping: 10 }}
              >
                Building <span className='text-transparent [-webkit-text-stroke:1px_#FFF]'>Web Applications</span> That Make an <span className='text-transparent [-webkit-text-stroke:1px_#37e062]'>Impact</span>
                </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, type: 'spring', stiffness: 100, damping: 10 }}
                className='text-base
sm:text-lg
md:text-xl
lg:text-xl
xl:text-2xl
leading-6
text-gray-300
font-light
'
              >
                Helping startups and businesses build modern web applications with clean code, intuitive user experiences, and reliable backend systems.
              </motion.p>
              <div className='flex justify-center gap-3 lg:justify-start lg:gap-5 lg:mt-10'>
                <motion.div 
                  // className='w-50'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9, type: 'spring', stiffness: 200, damping: 5 }}
                >
                  <NavLink to="/contact" className='theme-button-green !w-auto !h-auto px-8 py-4 sm:px-10 md:px-12'>Start Your Project </NavLink>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2, type: 'spring', stiffness: 200, damping: 5 }}
                >
                  <NavLink to="/portfolio" className='theme-button !w-auto !h-auto px-8 py-4 sm:px-10 md:px-12'>View My Work</NavLink>
                </motion.div>
              </div>
            </div>
            {/* <div className='flex items-center gap-2 lg:gap-3 xl:gap-4 pb-8 mt-10'>
              <a href={import.meta.env.VITE_FACEBOOK_URL} target='_blank' className='flex justify-center items-center w-8 h-8 md:w-10 md:h-10 text-sm md:text-lg border-1 border-gray-500 bg-dark-surface rounded-full hover:bg-dark-primary hover:text-dark-background hover:scale-125'><FaFacebookF /></a>
              <a href={import.meta.env.VITE_INSTAGRAM_URL} target='_blank' className='flex justify-center items-center w-8 h-8 md:w-10 md:h-10 text-sm md:text-lg border-1 border-gray-500 bg-dark-surface rounded-full hover:bg-dark-primary hover:text-dark-background hover:scale-125'><FaInstagram /></a>
              <a href={import.meta.env.VITE_LINKEDIN_URL} target='_blank' className='flex justify-center items-center w-8 h-8 md:w-10 md:h-10 text-sm md:text-lg border-1 border-gray-500 bg-dark-surface rounded-full hover:bg-dark-primary hover:text-dark-background hover:scale-125'><FaLinkedinIn /></a>
              <a href={import.meta.env.VITE_GITHUB_URL} target='_blank' className='flex justify-center items-center w-8 h-8 md:w-10 md:h-10 text-sm md:text-lg border-1 border-gray-500 bg-dark-surface rounded-full hover:bg-dark-primary hover:text-dark-background hover:scale-125'><FaGithub /></a>
            </div> */}
        </div>
        <div className='md:w-1/2 self-end'>
            <img src={"https://res.cloudinary.com/dvmmkvu4o/image/upload/f_auto,q_auto/v1762855127/banner2-cropped_jnvi74.gif"} loading='lazy' alt="Web Development" className='w-full max-w-100 lg:max-w-180' />
        </div>
        <div className='absolute left-0 right-0 bottom-0 m-auto max-w-100 rounded-full -z-10 box-shaddow overflow-visible'></div>
    </div>
  )
}

export default Banner
