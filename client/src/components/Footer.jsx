import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { LuArrowUpRight } from "react-icons/lu";
import { Link } from 'react-router';
import { navLinks } from './Navbar';
import { IoIosSend } from "react-icons/io";

const Footer = () => {
  const quickLinks = navLinks.filter(link => !link.subLinks);
  const services = navLinks.find(link => link.name === 'Services')?.subLinks || [];
  return (
    <section className=''>
      <div className='bg-dark-secondary section-container !mb-0'>
      <div className='flex justify-center gap-10 py-15'>
        <div className='w-[32%]'>
        <h1 className='text-2xl font-bold mb-4'>About Me</h1>
        <p className='text-gray-400 mb-10'>With a passion for creating stunning and functional websites, I am a dedicated web developer.</p>
        <div className='flex items-center gap-4 pb-8'>
                      <a href={import.meta.env.VITE_FACEBOOK_URL} target='_blank' className='flex justify-center items-center w-8 h-8 bg-dark-surface rounded-full hover:bg-dark-primary hover:text-dark-background hover:scale-125'><FaFacebookF /></a>
                      <a href={import.meta.env.VITE_TWITTER_URL} target='_blank' className='flex justify-center items-center w-8 h-8 bg-dark-surface rounded-full hover:bg-dark-primary hover:text-dark-background hover:scale-125'><FaXTwitter /></a>
                      <a href={import.meta.env.VITE_LINKEDIN_URL} target='_blank' className='flex justify-center items-center w-8 h-8 bg-dark-surface rounded-full hover:bg-dark-primary hover:text-dark-background hover:scale-125'><FaLinkedinIn /></a>
                      <a href={import.meta.env.VITE_GITHUB_URL} target='_blank' className='flex justify-center items-center w-8 h-8 bg-dark-surface rounded-full hover:bg-dark-primary hover:text-dark-background hover:scale-125'><FaGithub /></a>
                    </div>
        </div>
        <div className='w-[18%]'>
          <h1 className='text-2xl font-bold mb-4'>Quick Links</h1>
          <ul className='text-gray-400 flex flex-col gap-3'>
            {
              quickLinks.map(link => (
                <li key={link.name}><Link className='hover:text-dark-primary transition duration-300 ease-in-out cursor-pointer' to={link.path}>{link.name}</Link></li>
              ))
            }
          </ul>
        </div>
        <div className='w-[18%]'>
          <h1 className='text-2xl font-bold mb-4'>Services</h1>
          <ul className='text-gray-400 flex flex-col gap-3'>
            {
              services.map(link => (
                <li key={link.name}><Link className='hover:text-dark-primary transition duration-300 ease-in-out cursor-pointer' to={`services/${link.path}`}>{link.name}</Link></li>
              ))
            }
          </ul>
        </div>
        <div className='w-[32%]'>
          <h1 className='text-2xl font-bold mb-4'>Newsletter</h1>
          <p className='text-gray-400 mb-8'>Get occasional tips, project updates, and web dev insights — straight to your inbox.</p>
          <form className='relative flex items-center justify-end'>
            <input type="email" placeholder='Enter your email' className='py-4 pl-2 pr-12 border-b-2 border-gray-600 w-full' />
            <button title="Subscribe" aria-label="Subscribe to newsletter" className='absolute right-2 w-10 h-10 flex justify-center items-center bg-dark-primary text-dark-background rounded-full'><IoIosSend /></button>
          </form>
        </div>
      </div>
    </div>
    <div className='bg-dark-surface text-gray-400 text-center py-4'>
      <p>© 2025 Ahmed Farooq. All rights reserved.</p>
    </div>
      </section>
  )
}

export default Footer
