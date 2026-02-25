import React from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router'

const InnerBanner = (props) => {
  const location = useLocation();

  console.log('location:', location);

  const currentPath = location.pathname;

  console.log('current path:', currentPath);

  const breadcrumb = currentPath.split('/')
  const breadcrumbWithoutHomePage = breadcrumb.filter(str => str.trim() !== "");

  console.log('pages', breadcrumbWithoutHomePage);

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

        {breadcrumb && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, type: 'spring', stiffness: 100, damping: 10 }}
            className='space-grotesk-regular text-white text-lg mt-8 flex gap-2 items-center'
          >
            {breadcrumb.map((item, index) => {
              const path = index === 0 ? '/' : `/${breadcrumb.slice(1, index + 1).join('/')}`;

              return (
                <div key={index} className='flex gap-2 items-center'>
                  {index === 0 ? (
                    <Link to="/" className='hover:underline'>Home</Link>
                  ) : (
                    <Link to={path} className={`hover:underline ${index === breadcrumb.length - 1 ? 'text-gray-500' : ''}`}>{item.charAt(0).toUpperCase() + item.slice(1)}</Link>
                  )}

                  {index < breadcrumb.length - 1 && <span>{">"}</span>}
                </div>
              )
            })}
          </motion.div>
        )}


      </div>
      <div className='w-2/5 self-end'>
        <img loading='lazy' src={"https://res.cloudinary.com/dvmmkvu4o/image/upload/f_auto,q_auto/v1762855127/banner2-cropped_jnvi74.gif"} alt="" className='w-full' />
      </div>


      <div className='absolute left-0 right-0 bottom-0 m-auto w-[500px] rounded-full -z-10 box-shaddow overflow-visible'></div>


    </div>
  )
}

export default InnerBanner
