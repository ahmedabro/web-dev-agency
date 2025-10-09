import React from 'react'
import { MdOutlineCalendarToday } from "react-icons/md";

const experience = [
    {
        id: 1,
        role: "Software Developer",
        company: "Workstream Automation",
        type: "Full-time",
        duration: "Jan 2020 - Present",
        responsibilities: [
            "Developed and maintained code for in-house and client websites primarily using HTML, CSS, Sass, JavaScript, and React.",
        ]
    },
    {
        id: 2,
        role: "Exexutive Frontend Developer",
        company: "ProByte",
        type: "Full-time",
        duration: "Jun 2019 - Dec 2019",
        responsibilities: [
            "Assisted in the development of client websites and web applications using modern web technologies.",
        ]
    },
    {
        id: 3,
        role: "Associate MEAN Stack Developer",
        company: "Nukes Lab",
        type: "Internship",
        duration: "Jan 2018 - May 2019",
        responsibilities: [
            "Collaborated with designers and senior developers to create responsive and user-friendly web applications.",
        ]
    }
]

const Experience = () => {
  return (
    <div className='section-container h-full bg-dark-secondary py-25'>
        
        <div className='section-header'>
        <h3 className='section-subheading'>Teams I Worked With</h3>
        <h2 className='section-mainheading'>My Professional Experiences</h2>
      </div>


      <div className='border-l-2 border-gray-700 pl-20 flex flex-col gap-5'>
        {experience.map((exp) => (
          <div key={exp.id} className='bg-black px-12 py-10 relative flex flex-col justify-center'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-2xl font-bold mb-2'>{exp.role}</h3>
                    <div className='flex items-center gap-2'>
                        <span className='text-gray-400'>{exp.company}</span> <span className='w-2 h-2 block bg-white rounded-full'></span> <span className='text-gray-400'>{exp.type}</span>
                    </div>
                </div>
                <div className='flex items-center gap-2 text-lg'>
                    <MdOutlineCalendarToday className='text-dark-primary text-2xl' /> <span className='text-gray-300 text-sm'>{exp.duration}</span>
                </div>
            </div>
            


            <div className='absolute w-8 h-8 flex justify-center items-center border-2 border-dark-primary rounded-full -left-24 bg-dark-surface'><span className='bg-dark-primary rounded-full w-3 h-3'></span></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Experience
