import React from 'react'
import InnerBanner from '../components/InnerBanner'
import AboutMe from '../components/AboutMe'
import CTASection from '../components/CTASection'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Testimonials from '../components/Testimonials'
import { MdEmail, MdPhone } from 'react-icons/md'
import Stats from '../components/Stats'

const About = () => {
  return (
    <div>
      <InnerBanner title="About Me" breadcrumb={[{ title: "Home", url: "/" }, { title: "About" }]} />
      <AboutMe>
        <p>
        With a strong foundation in both front-end and back-end technologies, I bring a holistic approach to web development. From crafting intuitive user interfaces to building robust server-side applications, I am dedicated to delivering solutions that exceed expectations.
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
      <Testimonials />
      <CTASection />
    </div>
  )
}

export default About
