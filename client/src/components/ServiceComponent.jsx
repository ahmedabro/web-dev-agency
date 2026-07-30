import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router';
import { MdArrowOutward } from "react-icons/md";
import { IoMdAdd } from "react-icons/io"
import { useGetServicesQuery } from '../redux/api/serviceApi';


const ServiceComponent = () => {

  const { data, isLoading, isError, error } = useGetServicesQuery();

  const [activeService, setActiveService] = useState(null);

  const services = data?.services || [];


  useEffect(() => {
    if (services.length > 0) {
      setActiveService(services[0].id);
    }
  }, [services]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error}</p>;


  return (
    <div className='section-container secondary-gradient pb-30'>
      <div className='section-header w-full'>
        <h3 className='section-subheading justify-center m-auto'>Services</h3>
        <h2 className='section-mainheading !text-center !sm:w-[50%] mx-auto mb-8'>Web Solutions Built for Your Goals</h2>
        <p className='text-center text-gray-400 max-w-2xl m-auto md:mb-16'>
          Whether you need a polished frontend, a powerful backend, or a complete web application, I deliver solutions designed to meet your goals and grow with your business.
        </p>
      </div>

      <div className='w-full flex items-start md:gap-10 lg:gap-20 xl:gap-25'>
        <div className='w-full md:w-1/2 relative'>
          {services.map((service, index) => (
            <div
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className="relative cursor-pointer px-2 py-6 border-b border-gray-700"
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
                <h3 className={`font-bold text-lg md:text-xl text-white`}>
                  {service.title}
                </h3>
                  <IoMdAdd className={`text-gray-400 font-medium text-xl md:text-2xl transition-all duration-300 ${activeService === service.id && '-rotate-45'}`}  />
                </div>

                <AnimatePresence>
                  {activeService === service.id && (
                    <motion.div
                    key={service.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mb-0 md:pr-8 xl:pr-12 leading-7"
                    >
                    <p
                      
                    >
                      {service.description}
                    </p>
                    
                      <NavLink to={`/services/${service.id}`} className={`text-dark-primary font-light border-b mt-4 inline-flex items-center gap-2`}>Learn More <MdArrowOutward className='text-base xl:text-xl group-hover:rotate-45' /></NavLink>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        <div className='hidden md:w-1/2 md:block'>
        <AnimatePresence mode="wait">
      {activeService && (
        <motion.div className={``}>
          <motion.img
          key={activeService}
          src={services.find(s => s.id === activeService)?.image}
          loading='lazy'
          alt="Service Preview"
          initial={{ opacity: 0, x: 500 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 70 }}
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
