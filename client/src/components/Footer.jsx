import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { LuArrowUpRight } from "react-icons/lu";
import { Link } from 'react-router';
import useNavLinks from '../hooks/useNavLinks';
import { IoIosSend } from "react-icons/io";
import axios from 'axios';
import { useState } from 'react';

const Footer = () => {
  const navLinks = useNavLinks();
  const quickLinks = navLinks.filter(link => !link.subLinks);
  const services = navLinks.find(link => link.name === 'Services')?.subLinks || [];

  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    // Handle subscription logic here
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/subscribers/subscribe`, { email: emailInput });
      console.log(response.data);
      alert(response.data.message);
      setEmailInput('');
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  }

  return (
    <section className=''>
      <div className='bg-dark-secondary section-container !mb-0'>
      <div className='flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap justify-center gap-10 py-15'>
        <div className='sm:w-[calc(50%-2.5rem)] lg:w-[32%]'>
        <h1 className='text-2xl font-bold mb-4'>About Me</h1>
        <p className='text-gray-400 mb-10 xl:pr-8'>With a passion for creating stunning and functional websites, I am a dedicated web developer.</p>
        <div className='flex items-center gap-4 pb-8'>
                      <a href={import.meta.env.VITE_FACEBOOK_URL} target='_blank' className='flex justify-center items-center w-8 h-8 bg-dark-surface rounded-full hover:bg-dark-primary hover:text-dark-background hover:scale-125'><FaFacebookF /></a>
                      <a href={import.meta.env.VITE_TWITTER_URL} target='_blank' className='flex justify-center items-center w-8 h-8 bg-dark-surface rounded-full hover:bg-dark-primary hover:text-dark-background hover:scale-125'><FaXTwitter /></a>
                      <a href={import.meta.env.VITE_LINKEDIN_URL} target='_blank' className='flex justify-center items-center w-8 h-8 bg-dark-surface rounded-full hover:bg-dark-primary hover:text-dark-background hover:scale-125'><FaLinkedinIn /></a>
                      <a href={import.meta.env.VITE_GITHUB_URL} target='_blank' className='flex justify-center items-center w-8 h-8 bg-dark-surface rounded-full hover:bg-dark-primary hover:text-dark-background hover:scale-125'><FaGithub /></a>
                    </div>
        </div>
        <div className='sm:w-[calc(50%-2.5rem)] lg:w-[18%]'>
          <h1 className='text-2xl font-bold mb-4'>Quick Links</h1>
          <ul className='text-gray-400 flex flex-col gap-3'>
            {
              quickLinks.map(link => (
                <li key={link.name}><Link className='hover:text-dark-primary transition duration-300 ease-in-out cursor-pointer' to={link.path}>{link.name}</Link></li>
              ))
            }
          </ul>
        </div>
        <div className='sm:w-[calc(50%-2.5rem)] lg:w-[18%]'>
          <h1 className='text-2xl font-bold mb-4'>Services</h1>
          <ul className='text-gray-400 flex flex-col gap-3'>
            {
              services.map(link => (
                <li key={link.name}><Link className='hover:text-dark-primary transition duration-300 ease-in-out cursor-pointer' to={`services/${link.path}`}>{link.name}</Link></li>
              ))
            }
          </ul>
        </div>
        <div className='sm:w-[calc(50%-2.5rem)] lg:w-[32%] xl:pl-8'>
          <h1 className='text-2xl font-bold mb-4'>Newsletter</h1>
          <p className='text-gray-400 mb-8'>Get occasional tips, project updates, and web dev insights — straight to your inbox.</p>
          <form className='relative flex items-center justify-end'>
            <input value={emailInput} onChange={(e) => setEmailInput(e.target.value)} type="email" placeholder='Enter your email' className='py-4 pl-2 pr-12 border-b-2 border-gray-600 w-full' />
            <button onClick={handleSubscribe} title="Subscribe" aria-label="Subscribe to newsletter" className='absolute right-2 w-10 h-10 flex justify-center items-center bg-dark-primary text-dark-background rounded-full cursor-pointer'><IoIosSend /></button>
          </form>
        </div>
      </div>
    </div>
    <div className='section-container !mb-0 bg-dark-surface text-gray-400 text-center py-4'>
      <p>© 2025 Ahmed Farooq. All rights reserved.</p>
    </div>
      </section>
  )
}

export default Footer
