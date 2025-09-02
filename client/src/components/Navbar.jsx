import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  console.log(scrolled)
  return (
    <div className={`fixed z-50 h-20 flex items-center justify-between section-container ${scrolled ? 'bg-dark-background' : 'bg-transparent'}`}>
        <h1 className='text-3xl font-bold'><span className='text-dark-primary text-2xl'>&lt;</span>A.F Dev<span  className='text-dark-primary text-2xl'>/&gt;</span></h1>
        <div className={`absolute right-4 sm:right-15 z-10 min-w-35 sm:min-w-45 overflow-hidden bg-dark-textColor transition-all duration-300 ease-in-out ${showMenu ? 'h-70 rounded-lg top-4' : 'h-12 rounded-4xl top-[50%] bottom-[50%] translate-y-[-50%]'}`}>
          <button onClick={() => setShowMenu(!showMenu)} className={`text-dark-background w-full h-12 flex justify-between items-center font-bold text-lg px-4 transition-colors duration-500 ease-in-out ${showMenu ? 'hover:bg-dark-textColor' : 'hover:bg-dark-primary'}`}>Menu <MdMenu className='text-xl' /></button>
          <nav className={`absolute flex-col text-dark-background w-full h-5/6 z-10 ${showMenu ? 'flex' : 'hidden'}`}>
              <NavLink to="/" className={`w-full h-1/5 flex items-center px-4`} onClick={() => setShowMenu(false)}>Home</NavLink>
              <NavLink to="about" className={`w-full h-1/5 flex items-center px-4`} onClick={() => setShowMenu(false)}>About</NavLink>
              <NavLink to="services" className={`w-full h-1/5 flex items-center px-4`} onClick={() => setShowMenu(false)}>Services</NavLink>
              <NavLink to="projects" className={`w-full h-1/5 flex items-center px-4`} onClick={() => setShowMenu(false)}>Projects</NavLink>
              <NavLink to="contact" className={`w-full h-1/5 flex items-center px-4`} onClick={() => setShowMenu(false)}>Contact Us</NavLink>
          </nav>
        </div>
    </div>
  );
};

export default Navbar;  