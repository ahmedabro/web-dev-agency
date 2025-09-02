import React from 'react'
import bannerImage from '../assets/images/banner2-cropped.gif'
import { Link, NavLink } from 'react-router'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { motion } from 'framer-motion'

const Banner = () => {
  return (
    <div className='section-container relative overflow-hidden h-screen flex items-center bg-dark-secondary isolate'>
        <div className='w-1/2 h-full self-start flex flex-col justify-between pt-32'>
            <div className='flex flex-col gap-4'>
              <motion.h3 
                className='font-bold text-2xl'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 100, damping: 10 }}
              >
                Hey, I'm a Full Stack Developer
              </motion.h3>
              <motion.h1 
                className='space-grotesk-bold text-dark-primary text-8xl font-bold w-[900px]'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100, damping: 10 }}
              >
                AHMED FAROOQ
                </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, type: 'spring', stiffness: 100, damping: 10 }}
              >
              I craft fast, scalable, and user-friendly web applications with modern JavaScript frameworks — combining React on the frontend with robust server-side solutions using Node.js.
              </motion.p>
              <div className='flex gap-3'>
                <motion.div 
                  className='w-50'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9, type: 'spring', stiffness: 200, damping: 5 }}
                >
                  <NavLink to="contact" className='bg-dark-primary text-dark-background rounded-full hover:bg-dark-textColor transition duration-500 ease-in-out w-full block font-bold text-center py-3'><span>Contact Me</span></NavLink>
                </motion.div>
                <motion.div 
                  className='w-50'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2, type: 'spring', stiffness: 200, damping: 5 }}
                >
                  <NavLink to="contact" className='bg-dark-secondary text-dark-primary border rounded-full hover:bg-dark-textColor transition duration-500 ease-in-out w-full block font-bold text-center py-3'>Download Resume</NavLink>
                </motion.div>
              </div>
            </div>
            <div className='flex items-center gap-4 pb-8'>
              <a href="" target='_blank' className='flex justify-center items-center w-10 h-10 border-2 border-white rounded-full hover:bg-dark-primary hover:text-dark-background hover:scale-125'><FaFacebookF /></a>
              <a href="" target='_blank' className='flex justify-center items-center w-10 h-10 border-2 border-white rounded-full hover:bg-dark-primary hover:text-dark-background hover:scale-125'><FaXTwitter /></a>
              <a href="" target='_blank' className='flex justify-center items-center w-10 h-10 border-2 border-white rounded-full hover:bg-dark-primary hover:text-dark-background hover:scale-125'><FaLinkedinIn /></a>
              <a href="" target='_blank' className='flex justify-center items-center w-10 h-10 border-2 border-white rounded-full hover:bg-dark-primary hover:text-dark-background hover:scale-125'><FaGithub /></a>
            </div>
        </div>
        <div className='w-1/2 self-end'>
            <img src={bannerImage} alt="" className='w-full' />
        </div>
        <div className='absolute left-0 right-0 bottom-0 m-auto w-[500px] rounded-full -z-10 box-shaddow overflow-visible'></div>
    </div>
  )
}

export default Banner
