import React, { useEffect, useState } from 'react'
import { contactFormSchema } from '../utilities/ContactSchema';
import { MdEmail, MdPhoneInTalk } from "react-icons/md";
import { BsCalendarPlusFill } from "react-icons/bs";
import { services } from '../utilities/services';
import { IoIosSend } from "react-icons/io";
import { Form, Formik, Field } from 'formik'

const ContactForm = () => {
    
  return (
    <div className='contact-section section-container'>
      
      <div className='flex'>
        <div className='w-[45%]'>
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
        <div className='w-[55%] bg-dark-surface shadow-custom'>
            <Formik 
                initialValues={{ name: '', email: '', company: '', budget: '', message: '', interestedIn: '' }}
                validationSchema={contactFormSchema}
                onSubmit={(values, { resetForm }) => {
                    // Handle form submission
                    console.log(values);
                    resetForm();
                }}
            >
                {({ errors, touched, values, setFieldValue }) => {
                    const handleServiceClick = (service) => {
                        values.interestedIn === service ? setFieldValue('interestedIn', '') : setFieldValue('interestedIn', service);
                    }
    return (
        <Form className='flex flex-wrap justify-between gap-5 py-10 px-10'>
            <div className='w-full'>
                <label className='' htmlFor="">I'm interested in...</label>
                <div className='flex flex-wrap gap-3 mt-3'>
                        {
                            services && services.map((service, index) => (
                                <span key={service.id} onClick={() => handleServiceClick(service.title)} className={`cursor-pointer text-sm px-6 py-3 rounded-md inline-block border ${values.interestedIn === service.title ? 'bg-dark-primary text-dark-surface font-bold' : 'bg-dark-secondary text-gray-500'} transition duration-300 ease-in-out`}>{service.title}</span>
                            ))
                        }
                        <span onClick={() => handleServiceClick("other")} className={`cursor-pointer text-sm px-6 py-3 rounded-md inline-block border ${values.interestedIn === "other" ? 'bg-dark-primary text-dark-surface font-bold' : 'bg-dark-secondary text-gray-500'} transition duration-300 ease-in-out`}>Other</span>
                    </div>
                </div>
                <div className='w-[calc(50%-10px)]'>
                    <label className='' htmlFor="name">Name <span className='text-dark-primary'>*</span></label>
                    <Field name='name' id='name' type="text" placeholder='Your full name...' className={`${errors.name && touched.name ? 'border-gray-500 focus:border-red-500' : 'border-gray-500 focus:border-dark-primary'}`} />
                    {errors.name && touched.name ? (<div className='text-red-500 text-sm mt-1'>{errors.name}</div>) : null}
                </div>
                <div className='w-[calc(50%-10px)]'>
                    <label className='' htmlFor="email">Email <span className='text-dark-primary'>*</span></label>
                    <Field name='email' id='email' type="email" placeholder='Your email address...' className={`${errors.email && touched.email ? 'border-gray-500 focus:border-red-500' : 'border-gray-500 focus:border-dark-primary'}`} />
                    {errors.email && touched.email ? (<div className='text-red-500 text-sm mt-1'>{errors.email}</div>) : null}
                </div>
                <div className='w-[calc(50%-10px)]'>
                    <label className='' htmlFor="company">Company</label>
                    <Field name='company' id='company' type="text" placeholder='Your company name...' className={`${errors.company && touched.company ? 'border-gray-500 focus:border-red-500' : 'border-gray-500 focus:border-dark-primary'}`} />
                    {errors.company && touched.company ? (<div className='text-red-500 text-sm mt-1'>{errors.company}</div>) : null}
                </div>
                <div className='w-[calc(50%-10px)]'>
                    <label className='' htmlFor="budget">Budget</label>
                    <Field name='budget' id='budget' type="number" inputMode='numeric' min={0} step={5} placeholder='Your budget in USD...' className={`${errors.budget && touched.budget ? 'border-gray-500 focus:border-red-500' : 'border-gray-500 focus:border-dark-primary'}`} />
                    {errors.budget && touched.budget ? (<div className='text-red-500 text-sm mt-1'>{errors.budget}</div>) : null}
                </div>

                <div className='w-full'>
                    <label className='' htmlFor="message">Your Message <span className='text-dark-primary'>*</span></label>
                    <Field as='textarea' name='message' id='message' placeholder='Enter your message here...' rows="5" className={`${errors.message && touched.message ? 'border-gray-500 focus:border-red-500' : 'border-gray-500 focus:border-dark-primary'}`} />
                    {errors.message && touched.message ? (<div className='text-red-500 text-sm mt-1'>{errors.message}</div>) : null}
                </div>
                <button type='submit' className='group mt-4 theme-button !h-fit !w-fit py-4 px-10'>Send Message <IoIosSend className='text-2xl group-hover:rotate-45 transition-rotate duration-300 ease-in-out' /></button>
            </Form>
    )
}}
            </Formik>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
