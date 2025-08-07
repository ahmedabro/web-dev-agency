import React from 'react'
import bannerImage from '../assets/images/banner2-cropped.gif'
import { Link, NavLink } from 'react-router'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";

const Banner = () => {
  return (
    <div className='relative overflow-hidden w-full h-screen flex items-center px-15 bg-dark-secondary isolate'>
        <div className='w-1/2 h-full self-start flex flex-col justify-between pt-30'>
            <div className='flex flex-col gap-4'>
              <h3 className='font-bold text-2xl'>Hey, I'm a Full Stack Developer</h3>
              <h1 className='space-grotesk-bold text-dark-primary text-7xl font-bold'>AHMED FAROOQ</h1>
              <p>
              I craft fast, scalable, and user-friendly web applications with modern JavaScript frameworks — combining React on the frontend with robust server-side solutions using Node.js.
              </p>
              <div className='flex gap-3'>
                <NavLink to="contact" className='bg-dark-primary text-dark-background rounded-full hover:bg-dark-textColor transition duration-300 ease-in-out w-50 font-bold text-center py-3'>Contact Me</NavLink>
                <NavLink to="contact" className='bg-dark-secondary text-dark-primary border rounded-full hover:bg-dark-textColor transition duration-300 ease-in-out w-50 font-bold text-center py-3'>Download Resume</NavLink>
              </div>
            </div>
            <div className='flex items-center gap-4 pb-5'>
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
