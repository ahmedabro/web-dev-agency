import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div className='relative h-15 flex items-center justify-between'>
        <h1>Ahmed Farooq</h1>
        <div className={`absolute z-10 right-0 w-45 overflow-hidden bg-dark-textColor transition duration-300 ease-in-out ${showMenu ? 'h-70 rounded-lg top-2' : 'h-12 rounded-4xl top-[50%] bottom-[50%] translate-y-[-50%]'}`}>
          <button onClick={() => setShowMenu(!showMenu)} className={`text-dark-background w-full h-12 flex justify-between items-center px-4 ${showMenu ? 'hover:bg-dark-textColor' : 'hover:bg-dark-primary'}`}>Menu <MdMenu className='text-xl' /></button>
          <nav className={`absolute flex-col text-dark-background w-full h-5/6 z-10 ${showMenu ? 'flex' : 'hidden'}`}>
              <NavLink to="/" className={`w-full h-1/5 flex items-center px-4`} onClick={() => setShowMenu(false)}>Home</NavLink>
              <NavLink to="services" className={`w-full h-1/5 flex items-center px-4`} onClick={() => setShowMenu(false)}>Services</NavLink>
              <NavLink to="about" className={`w-full h-1/5 flex items-center px-4`} onClick={() => setShowMenu(false)}>About</NavLink>
              <NavLink to="projects" className={`w-full h-1/5 flex items-center px-4`} onClick={() => setShowMenu(false)}>Projects</NavLink>
              <NavLink to="contact" className={`w-full h-1/5 flex items-center px-4`} onClick={() => setShowMenu(false)}>Contact Us</NavLink>
          </nav>
        </div>
    </div>
  );
};

export default Navbar;  