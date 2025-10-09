import React from 'react'
import bannerImage from '../assets/images/banner2-cropped.gif'
import { motion } from 'framer-motion'
import { Link } from 'react-router'

const InnerBanner = (props) => {
  return (
    <div className='section-container w-full h-[550px] relative flex items-center bg-dark-secondary overflow-hidden isolate mb-20'>
        <div className='w-3/5'>
              
              <motion.h1 
                className='space-grotesk-bold text-dark-primary text-7xl font-bold uppercase'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100, damping: 10 }}
              >
                {props.title || "Page Title"}
                </motion.h1>

                {props.breadcrumb && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, type: 'spring', stiffness: 100, damping: 10 }}
                    className='space-grotesk-regular text-white text-lg mt-8'
                  >
                    {props.breadcrumb.map((item, index) => (
                      <span key={index}>
                        {item.url ? (
                          <Link to={item.url} className='hover:underline'>{item.title}</Link>
                        ) : (
                          <span>{item.title}</span>
                        )}
                        {index < props.breadcrumb.length - 1 && " > "}
                      </span>
                    ))}
                  </motion.p>
                )}


        </div>
        <div className='w-2/5 self-end'>
            <img src={bannerImage} alt="" className='w-full' />
        </div>


        <div className='absolute left-0 right-0 bottom-0 m-auto w-[500px] rounded-full -z-10 box-shaddow overflow-visible'></div>

      
    </div>
  )
}

export default InnerBanner
