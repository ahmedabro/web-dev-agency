import React from 'react'
import { MdOutlineCalendarToday } from "react-icons/md";
import { useGetExperiencesQuery } from '../redux/api/experienceApi';

const Experience = () => {
  const { data, isLoading, isError, error } = useGetExperiencesQuery();

  const experiences = data?.experiences || [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching experiences</div>;

  return (
    <div className='section-container h-full bg-dark-secondary py-25'>
        
        <div className='section-header'>
        <h3 className='section-subheading'>Teams I Worked With</h3>
        <h2 className='section-mainheading'>My Professional Experiences</h2>
      </div>


      <div className='border-l-2 border-gray-700 pl-8 md:pl-12 xl:pl-20 flex flex-col gap-5'>
        {experiences.map((exp) => (
          <div key={exp._id} className='bg-black px-6 py-5 md:px-8 md:py-8 xl:px-12 xl:py-10 relative flex flex-col justify-center'>
            <div className='sm:flex items-center justify-between'>
                <div>
                    <h3 className='text-lg sm:text-xl xl:text-2xl font-bold mb-2'>{exp.role}</h3>
                    <div className='flex items-center gap-2 mb-5 sm:mb-0'>
                        <span className='text-gray-400 text-xs sm:text-sm xl:text-base'>{exp.company}</span> <span className='w-2 h-2 block bg-white rounded-full'></span> <span className='text-gray-400 text-xs sm:text-sm xl:text-base'>{exp.type}</span>
                    </div>
                </div>
                <div className='flex items-center gap-2 text-lg'>
                    <MdOutlineCalendarToday className='text-dark-primary text-lg sm:text-xl md:text-2xl' /> 
                    <span className='text-gray-300 text-xs xl:text-sm'>
                      {new Date(exp.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })} - {exp.isCurrent ? "Present" : new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                    </span>
                </div>
            </div>
            


            <div className='absolute w-6 h-6 md:w-8 md:h-8 flex justify-center items-center border-2 border-dark-primary rounded-full -left-11 md:-left-16 xl:-left-24 bg-dark-surface'><span className='bg-dark-primary rounded-full w-2 h-2 md:w-3 md:h-3'></span></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Experience
