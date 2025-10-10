import React, { useState } from 'react';
import PortfolioImage from '../assets/images/web.png'
import { NavLink } from 'react-router';
import { MdArrowOutward } from "react-icons/md";
import { useLocation } from 'react-router';

const Portfolio = () => {
  const location = useLocation();
  const portfolioItems = [
    { id: 1, title: 'Project One', category: 'UI/UX Design', description: 'Techzo is a cutting-edge design agency template built to showcase innovation, digital expertise, and a bold creative presence online', tags: ['HTML', 'CSS', 'JavaScript'], image: PortfolioImage },
    { id: 2, title: 'Project Two', category: 'Frontend Development', description: 'Techzo is a cutting-edge design agency template built to showcase innovation, digital expertise, and a bold creative presence online', tags: ['HTML', 'CSS', 'JavaScript'], image: PortfolioImage },
    { id: 3, title: 'Project Three', category: 'Backend Development', description: 'Techzo is a cutting-edge design agency template built to showcase innovation, digital expertise, and a bold creative presence online', tags: ['HTML', 'CSS', 'JavaScript'], image: PortfolioImage },
    { id: 4, title: 'Project Four', category: 'Full Stack Development', description: 'Techzo is a cutting-edge design agency template built to showcase innovation, digital expertise, and a bold creative presence online', tags: ['HTML', 'CSS', 'JavaScript'], image: PortfolioImage },
    { id: 5, title: 'Project Five', category: 'Custom Web Development', description: 'Techzo is a cutting-edge design agency template built to showcase innovation, digital expertise, and a bold creative presence online', tags: ['HTML', 'CSS', 'JavaScript'], image: PortfolioImage },
    { id: 6, title: 'Project Six', category: 'UI/UX Design', description: 'Techzo is a cutting-edge design agency template built to showcase innovation, digital expertise, and a bold creative presence online', tags: ['HTML', 'CSS', 'JavaScript'], image: PortfolioImage },
    { id: 7, title: 'Project Seven', category: 'Frontend Development', description: 'Techzo is a cutting-edge design agency template built to showcase innovation, digital expertise, and a bold creative presence online', tags: ['HTML', 'CSS', 'JavaScript'], image: PortfolioImage },
    { id: 8, title: 'Project Eight', category: 'Backend Development', description: 'Techzo is a cutting-edge design agency template built to showcase innovation, digital expertise, and a bold creative presence online', tags: ['HTML', 'CSS', 'JavaScript'], image: PortfolioImage },
    { id: 9, title: 'Project Nine', category: 'Full Stack Development', description: 'Techzo is a cutting-edge design agency template built to showcase innovation, digital expertise, and a bold creative presence online', tags: ['HTML', 'CSS', 'JavaScript'], image: PortfolioImage },
    { id: 10, title: 'Project Ten', category: 'Custom Web Development', description: 'Techzo is a cutting-edge design agency template built to showcase innovation, digital expertise, and a bold creative presence online', tags: ['HTML', 'CSS', 'JavaScript'], image: PortfolioImage },
  ];

  const tabs = ['All Works', 'UI/UX Design', 'Frontend Development', 'Backend Development', 'Full Stack Development', 'Custom Web Development'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="section-container overflow-visible">
      <div className="section-header md:flex items-center border-b-2 border-gray-600 pb-[15px]">
        <div className="w-full mb-5 md:mb-0 md:w-1/2">
          <h3 className="section-subheading">My Recent Work</h3>
          <h2 className="section-mainheading">Portfolio</h2>
        </div>
        <div className="w-full md:w-1/2">
          <p className='text-gray-400 m-auto'>Whether you’re exploring an upcoming project or have something to say today, Tome templates get you off on the right foot.</p>
        </div>
      </div>

      <div className="md:flex gap-6 items-start">
        {
          location.pathname === '/portfolio' && (
            <div className="md:w-1/4 md:sticky md:top-[140px]">
            <ul className="rounded-lg flex flex-wrap gap-4 md:block">
              {tabs.map((tab) => (
                <li
                  key={tab}
                  className={`cursor-pointer text-sm md:text-base border border-dark-primary md:border-none md:mb-4 px-3 py-2 rounded-md transition-colors ${
                    activeTab === tab ? 'bg-dark-primary text-black font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
        </div>
          )
        }

        {location.pathname === '/portfolio' ? (
<div className="md:w-3/4">
          <div className="grid sm:grid-cols-2 md:gap-6">
            {portfolioItems
              .filter((item) => activeTab === 'All Works' || item.category === activeTab)
              .map((item) => (
                <div key={item.id} className="p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 group">
                    <div className={`w-full h-120 rounded-lg bg-cover bg-top mb-8 transition-background duration-1200 ease-in-out border-2 border-transparent hover:bg-bottom hover:scale-110 hover:border-2 hover:border-dark-primary`} style={{ backgroundImage: `url(${item.image})` }}></div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-400 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="bg-dark-surface text-dark-primary px-4 py-2 rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
        )
        :
        (<div className='w-full'>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {portfolioItems
              .filter((item, index) => index < 5) // Show only first 6 items
              .map((item) => (
                <div key={item.id} className="p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 group">
                    <div className={`w-full h-120 rounded-lg bg-cover bg-top mb-8 transition-background duration-1200 ease-in-out border-2 border-transparent hover:bg-bottom hover:scale-110 hover:border-2 hover:border-dark-primary`} style={{ backgroundImage: `url(${item.image})` }}></div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-400 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="bg-dark-surface text-dark-primary px-4 py-2 rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>)
      }
        
      </div>
      <div className='flex justify-center mt-5 md:mt-20'>
        {location.pathname === '/' && (
          <NavLink className="theme-button group" to="portfolio">
            All Projects <MdArrowOutward className='text-xl group-hover:rotate-45 transition-rotate duration-300 ease-in-out' />
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Portfolio;