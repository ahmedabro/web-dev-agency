import React from 'react'
import { MdEmail, MdPhoneInTalk } from "react-icons/md";
import { BsCalendarPlusFill } from "react-icons/bs";
import ContactForm from './ContactForm';

const Contact = () => {

  return (
    <div className='contact-section section-container'>
      
      <div className='flex items-start'>
        <div className='w-[45%] sticky top-[140px]'>
            <div className='section-header'>
                <h3 className='section-subheading'>Estimate Your Project</h3>
                <h2 className='section-mainheading !w-full'>Get in touch</h2>
            </div>
            <div className='flex flex-col gap-4'>
                <a href={`mailto:${import.meta.env.VITE_EMAIL_ADDRESS}`} className='flex items-center gap-3 px-5 py-3 w-[80%] rounded-lg bg-transparent border border-transparent transition duration-300 ease-in-out hover:bg-[#37e0622b] hover:border-dark-primary'><MdEmail className='text-dark-primary text-xl' /> <span>{import.meta.env.VITE_EMAIL_ADDRESS}</span></a>
                <a href={`tel:${import.meta.env.VITE_PHONE_NUMBER}`} className='flex items-center gap-3 px-5 py-3 w-[80%] rounded-lg bg-transparent border border-transparent transition duration-300 ease-in-out hover:bg-[#37e0622b] hover:border-dark-primary'><MdPhoneInTalk className='text-dark-primary text-xl' /> <span>{import.meta.env.VITE_PHONE_NUMBER}</span></a>
                <a href={`#`} className='flex items-center gap-3 px-5 py-3 w-[80%] rounded-lg bg-transparent border border-transparent transition duration-300 ease-in-out hover:bg-[#37e0622b] hover:border-dark-primary'><BsCalendarPlusFill className='text-dark-primary text-xl' /> <span>Book a Meeting</span></a>
            </div>
        </div>
        <div className='w-[55%] bg-dark-surface shadow-custom border border-dark-primary rounded-lg'>
            <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default Contact
