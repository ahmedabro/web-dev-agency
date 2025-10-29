import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router';
import { MdExpandMore, MdMenu } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: 'about' },
  { name: 'Services', path: 'services', subLinks: [
      { name: 'Frontend Development', path: 'frontend-development' },
      { name: 'Backend Development', path: 'backend-development' },
      { name: 'Fullstack Development', path: 'fullstack-development' },
  ]},
  { name: 'Portfolio', path: 'portfolio' },
  { name: 'Blogs', path: 'blogs' },
  { name: 'Contact', path: 'contact' },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`navbar fixed z-50 h-20 flex items-center justify-between section-container ${
        scrolled ? 'bg-dark-background' : 'bg-transparent'
      }`}
    >
      <Link to="/" className="!text-2xl !md:text-3xl font-bold">
        <span className="text-dark-primary text-2xl">&lt;</span>
        A.F Dev
        <span className="text-dark-primary text-2xl">/&gt;</span>
      </Link>

      {/* Animated container */}
      <motion.div
        initial={{ height: "3rem", borderRadius: "2rem", top: "50%", translateY: "-50%" }}
        animate={
          showMenu
            ? { height: "auto", borderRadius: "0.5rem", top: "1rem", translateY: "0%" }
            : { height: "3rem", borderRadius: "2rem", top: "50%", translateY: "-50%" }
        }
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute right-4 sm:right-6 lg:right-16 xl:right-32 z-10 w-37 sm:w-45 lg:w-50 xl:w-55 overflow-hidden bg-dark-textColor"
      >
        {/* Toggle button */}
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className={`text-dark-background w-full h-12 flex justify-between items-center font-bold md:text-base !text-sm !xl:text-lg px-3 lg:px-4 transition-colors duration-500 ease-in-out ${
            showMenu ? 'hover:bg-dark-textColor' : 'hover:bg-dark-primary'
          }`}
        >
          Menu <MdMenu className="text-xl" />
        </button>


        {/* AnimatePresence for smooth fade in/out */}
        <AnimatePresence>
          {showMenu && (
            <motion.nav
              className="flex-col text-dark-background w-full z-10 flex px-2 py-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {
                navLinks.map((link) => {
                  if (!link.subLinks) {
                    return (
                      <NavLink
                        key={link.name}
                        to={link.path}
                         className={({ isActive }) =>
    `${isActive ? 'bg-dark-primary' : ''} w-full flex items-center px-2 lg:px-4 py-2 !text-xs !xl:text-base font-medium transition-all duration-400 ease-in-out hover:bg-green-300 rounded-md`}
                        onClick={() => setShowMenu(false)}
                      >
                        {link.name}
                      </NavLink>
                    );
                  } else {
                    return (
                      <Accordion key={link.name}>
                        <AccordionSummary
                  expandIcon={<MdExpandMore />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className='!text-xs !xl:text-base font-medium'
                >
                  {link.name}
                </AccordionSummary>
                <ul className="bg-gray-200 px-2 lg:py-2">
                  {link.subLinks.map((subLink) => (
                    <li key={subLink.name}>
                      <NavLink
                        to={`services/${subLink.path}`}
                         className={({ isActive }) =>
    `${isActive ? 'bg-dark-primary' : ''} w-full flex items-center px-1 lg:px-4 py-2 !text-xs !xl:text-base font-medium transition-all duration-400 ease-in-out hover:bg-green-300 rounded-md`}
                        onClick={() => setShowMenu(false)}
                      >
                        {subLink.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                      </Accordion>
                    )
                  }
                })
              }
              
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Navbar;