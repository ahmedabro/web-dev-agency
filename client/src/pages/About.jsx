import React from 'react'
import InnerBanner from '../components/InnerBanner'
import AboutMe from '../components/AboutMe'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Testimonials from '../components/Testimonials'
import { MdEmail, MdPhone } from 'react-icons/md'
import Stats from '../components/Stats'

const About = () => {
  return (
    <div>
      <InnerBanner title="About Me" />
      <AboutMe>
        <p>
              From responsive frontend interfaces to robust backend systems, I deliver end-to-end solutions that prioritize performance, security, and reliability. Whether you’re launching a new product or improving an existing one, my goal is to build software that creates real value and stands the test of time.
            </p>
        <ul className='flex flex-col gap-8 mt-8'>
          <li className='flex items-center gap-4'>
            <span className='bg-dark-primary w-12 h-12 flex items-center justify-center rounded-full'><MdEmail className='text-dark-surface text-2xl' /></span>
            <div className='flex flex-col gap-1'>
              <span className='text-sm font-light'>Email me</span>
              <a href={`mailto:${import.meta.env.VITE_EMAIL_ADDRESS}`} className='font-bold text-xl'>{import.meta.env.VITE_EMAIL_ADDRESS}</a>
            </div>
          </li>
          <li className='flex items-center gap-4'>
            <span className='bg-dark-primary w-12 h-12 flex items-center justify-center rounded-full'><MdPhone className='text-dark-surface text-2xl' /></span>
            <div className='flex flex-col gap-1'>
              <span className='text-sm font-light'>Make a call</span>
              <a href={`tel:${import.meta.env.VITE_PHONE_NUMBER}`} className='font-bold text-xl'>{import.meta.env.VITE_PHONE_NUMBER}</a>
            </div>
          </li>
        </ul>
      </AboutMe>
      <Stats />
      <Skills />
      <Experience />
      {/* <Testimonials /> */}
    </div>
  )
}

export default About
