import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FrontendImage from '../assets/images/frontend.jpg'
import BackendImage from '../assets/images/backend.webp'
import FullstackImage from '../assets/images/fullstack.jpg'
import UIImage from '../assets/images/uiDesign.jpg'
import { NavLink } from 'react-router';
import { MdArrowOutward } from "react-icons/md";
import { services } from '../utilities/services';


const ServiceComponent = () => {
  const [activeService, setActiveService] = useState(services[0].id);

  return (
    <div className='section-container secondary-gradient pb-30'>
      <div className='section-header'>
        <h3 className='section-subheading'>Services</h3>
        <h2 className='section-mainheading'>End-to-End Web Development Services</h2>
      </div>

      <div className='w-full flex items-start gap-25'>
        <div className='w-full md:w-1/2 relative'>
          {services.map((service, index) => (
            <div
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className="relative cursor-pointer px-2 py-6 border-b-2 border-gray-500"
            >
              {activeService === service.id && (
                <motion.div
                  layoutId="activeServiceBackground"
                  className={`absolute inset-0 rounded-md z-0`}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              <div className="relative z-10">
                <div className={`flex justify-between items-center ${activeService === service.id && 'mb-6'}`}>
                <h3 className={`font-bold text-xl text-white`}>
                  {service.title}
                </h3>
                <h4 className='text-gray-400 font-medium text-lg'>({index + 1})</h4>
                </div>

                <AnimatePresence>
                  {activeService === service.id && (
                    <motion.div
                    key={service.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="text-white mb-0 pr-12 text-sm leading-7"
                    >
                    <p
                      
                    >
                      {service.description}
                    </p>
                    
                      <NavLink to={`services/${service.id}`} className={`text-dark-primary text-sm font-bold border-b mt-4 inline-flex items-center gap-2`}>Hire Me <MdArrowOutward className='text-xl group-hover:rotate-45' /></NavLink>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        <div className='hidden md:w-1/2 md:visible'>
        <AnimatePresence mode="wait">
      {activeService && (
        <motion.div className={``}>
          <motion.img
          key={activeService}
          src={services.find(s => s.id === activeService)?.image}
          alt="Service Preview"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ type: 'spring', stiffness: 700, damping: 50 }}
          className="max-w-full max-h-[500px] rounded-lg shadow-lg"
        />
        </motion.div>
      )}
    </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ServiceComponent;
