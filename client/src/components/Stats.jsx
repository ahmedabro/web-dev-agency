import React from 'react'
import { useLocation } from 'react-router'
import ExpIcon from '../assets/images/exp-icon.png'
import ClientIcon from '../assets/images/client-icon.png'
import ProjectsIcon from '../assets/images/projects-icon.png'

const stats = [
    { id: 1, icon: ExpIcon, number: '6+', label: 'Years of Experience' },
    { id: 2, icon: ProjectsIcon, number: '100+', label: 'Projects Completed' },
    { id: 3, icon: ClientIcon, number: '45+', label: 'Satisfied Clients' },
]

const Stats = () => {

  return (
    <div className='section-container !px-0 py-0 bg-dark-secondary'>
        <div className='flex flex-col sm:flex-row items-center justify-center rounded-lg shadow-lg overflow-hidden'>

              {
                stats.map((stat, index) => (
                    <div className={`relative md:w-1/3 flex flex-col p-10 justify-center items-center rounded-lg group hover:bg-dark-primary transition-all duration-500 ease-in-out ${index !== stats.length - 1 &&
                    'sm:before:absolute sm:before:top-1/2 sm:before:right-0 sm:before:h-20 sm:before:border-r-2 sm:before:border-gray-500 sm:before:-translate-y-1/2'}`} key={stat.id}>
                <img src={stat.icon} className='w-12 h-12 sm:w-10 sm:h-10 md:w-15 md:h-15 mb-6 sm:mb-5 lg:mb-8 brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-500 ease-in-out' alt="" />
                <h5 className='font-bold text-dark-primary text-4xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 group-hover:text-dark-surface transition-all duration-500 ease-in-out'>{stat.number}</h5>
                <h6 className='font-medium text-center text-lg sm:text-base md:text-lg group-hover:text-dark-surface transition-all duration-500 ease-in-out'>{stat.label}</h6>
              </div>
                ))
              }
            </div> 
    </div> 
  )
}

export default Stats
