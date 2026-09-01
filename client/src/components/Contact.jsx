import React from 'react'
import { MdEmail, MdPhoneInTalk } from "react-icons/md";
import { BsCalendarPlusFill } from "react-icons/bs";
import ContactForm from './ContactForm';

const Contact = () => {

  return (
    <section className='contact-section section-container'>

      <div className='flex flex-col lg:flex-row items-start'>
        <div className='lg:w-[45%] lg:sticky lg:top-[140px] mb-15 lg:mb-0'>
          <div className='section-header mb-5!'>
            <h3 className='section-subheading'>Estimate Your Project</h3>
            <h2 className='section-mainheading !w-full'>Get in touch</h2>
          </div>
          <div className='flex flex-col gap-4'>
            <a href={`mailto:${import.meta.env.VITE_EMAIL_ADDRESS}`} className='flex items-center gap-3 px-5 py-3 lg:w-[80%] rounded-lg bg-transparent border border-transparent transition duration-300 ease-in-out hover:bg-[#37e0622b] hover:border-dark-primary'><MdEmail className='text-dark-primary text-xl' /> <span>{import.meta.env.VITE_EMAIL_ADDRESS}</span></a>
            <a href={`tel:${import.meta.env.VITE_PHONE_NUMBER}`} className='flex items-center gap-3 px-5 py-3 lg:w-[80%] rounded-lg bg-transparent border border-transparent transition duration-300 ease-in-out hover:bg-[#37e0622b] hover:border-dark-primary'><MdPhoneInTalk className='text-dark-primary text-xl' /> <span>{import.meta.env.VITE_PHONE_NUMBER}</span></a>
            <a href={`#`} className='flex items-center gap-3 px-5 py-3 lg:w-[80%] rounded-lg bg-transparent border border-transparent transition duration-300 ease-in-out hover:bg-[#37e0622b] hover:border-dark-primary'><BsCalendarPlusFill className='text-dark-primary text-xl' /> <span>Book a Meeting</span></a>
          </div>
        </div>
        <div className='lg:w-[55%] bg-dark-surface border border-white/20 rounded-lg'>
          <ContactForm />
        </div>
      </div>
      <div className='mt-20'>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14467.93498270972!2d67.12986705!3d24.966667649999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1788290101713!5m2!1sen!2s"
          className="w-full h-[350px] md:h-[450px] rounded-2xl border-0 brightness-75 contrast-125"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </section>
  )
}

export default Contact
