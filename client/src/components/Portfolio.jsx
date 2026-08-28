import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import { MdArrowOutward } from "react-icons/md";
import { useLocation } from 'react-router';
import { useGetProjectsQuery } from '../redux/api/projectApi';
import { gsap } from "gsap";
import ProjectCard from './ProjectCard';


const Portfolio = () => {
  const imageRefs = useRef([]);

  const location = useLocation();
  const { data, isLoading, isError, error } = useGetProjectsQuery()

  const portfolioItems = data?.projects || [];

  const tabs = [...new Set(portfolioItems?.map(item => item?.category))];
  tabs.unshift("All Works");
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleMouseEnter = (index) => {
  const img = imageRefs.current[index];

  if (!img) return;

  const container = img.parentElement;

  // Wait until image is loaded
  if (!img.complete) return;

  const distance = Math.max(
    img.scrollHeight - container.clientHeight,
    0
  );

  gsap.killTweensOf(img);

  gsap.to(img, {
    y: -distance,
    duration: 2,
    ease: "none",
  });
};

const handleMouseLeave = (index) => {
  const img = imageRefs.current[index];

  if (!img) return;

  gsap.killTweensOf(img);

  gsap.to(img, {
    y: 0,
    duration: 2,
    ease: "none",
  });
};

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error}</p>;

  return (
    <div className="section-container overflow-visible">
      <div className="section-header md:flex items-end border-b border-gray-600 pb-[15px]">
        <div className="w-full mb-5 md:mb-0 md:w-1/2">
          <h3 className="section-subheading">Portfolio</h3>
          <h2 className="section-mainheading w-full!">Selected Work & Projects</h2>
        </div>
        <div className="w-full md:w-1/2">
          <p className='text-gray-400 m-auto'>While I’ve contributed to commercial products during my professional experience, I’m unable to share those applications publicly due to confidentiality agreements. The projects below are personal and learning-based, created to demonstrate my technical skills, development practices, and problem-solving approach.</p>
        </div>
      </div>

      <div className="md:flex gap-6 items-start">
        {
          location.pathname === '/portfolio' && (
            <div className="md:w-1/4 md:sticky md:top-[140px]">
              <ul className="rounded-lg flex flex-wrap gap-4 md:block mb-8 md:mb-0">
                {tabs.map((tab) => (
                  <li
                    key={tab}
                    className={`cursor-pointer text-sm md:text-base border border-dark-primary md:border-none md:mb-4 px-3 py-2 rounded-md transition-colors ${activeTab === tab ? 'bg-dark-primary text-black font-bold' : 'text-gray-400 hover:text-white'
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
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {portfolioItems
                .filter((item) => activeTab === 'All Works' || item.category === activeTab)
                .map((item, index) => (
                  <ProjectCard key={index} item={item} index={index} />
                ))}
            </div>
          </div>
        )
          :
          (<div className='w-full'>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {portfolioItems
                .filter((item, index) => index < 5) // Show only first 6 items
                .map((item, index) => (
                  <ProjectCard key={index} item={item} index={index} />
                ))}
            </div>
          </div>)
        }

      </div>
      <div className='flex justify-center mt-5 md:mt-20'>
        {location.pathname === '/' && (
          <NavLink className="theme-button group" to="portfolio">
            All Projects <MdArrowOutward className='text-base xl:text-xl group-hover:rotate-45 transition-rotate duration-300 ease-in-out' />
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Portfolio;