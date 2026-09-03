import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router';
import { MdExpandMore, MdMenu } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { MdArrowOutward } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import useNavLinks from '../hooks/useNavLinks';


const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [activeMenu, setActiveMenu] = useState(null);

  const navLinks = useNavLinks()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <nav
      className={`navbar absolute z-50 h-20 flex items-center justify-between section-container transition-all duration-500 ease-in-out ${scrolled ? 'fixed bg-dark-background/60 backdrop-blur-2xl scale-90 rounded-full' : 'bg-transparent'
        }`}
    >
      {/* <Link to="/" className="!text-2xl !md:text-3xl font-bold text-white md:w-1/4">
        <span className="text-dark-primary text-2xl">&lt;</span>
        A.F Dev
        <span className="text-dark-primary text-2xl">/&gt;</span>
      </Link> */}

      <Link to="/" className='lg:w-1/4'>
        <img src="/images/logo.png" alt="A.F Dev" className='w-30 lg:w-35' />
      </Link>

      <motion.div className='h-auto! hidden lg:block lg:w-2/4'>
        <ul className="flex items-center justify-center gap-10">

          {navLinks.slice(0, navLinks.length - 1).map((link) => {

            const hasSubLinks = link.subLinks?.length > 0;

            return (

              <li

                key={link.name}

                className="relative"

                onMouseEnter={() => hasSubLinks && setActiveMenu(link.name)}

                onMouseLeave={() => hasSubLinks && setActiveMenu(null)}

              >

                {!hasSubLinks ? (

                  <NavLink

                    to={link.path}

                    className={({ isActive }) =>

                      `text-base! transition-colors duration-300 hover:text-dark-primary ${isActive ? "text-dark-primary" : ""

                      }`

                    }

                  >

                    {link.name}

                  </NavLink>

                ) : (

                  <>

                    {/* Main Link */}

                    <div className="flex items-center gap-1 cursor-pointer">

                      <NavLink

                        to={link.path}

                        className="text-base! transition-colors duration-300 hover:text-dark-primary"

                      >

                        {link.name}

                      </NavLink>

                      <motion.span

                        animate={{

                          rotate: activeMenu === link.name ? 180 : 0,

                        }}

                        transition={{

                          duration: 0.2,

                        }}

                      >

                        <FiChevronDown size={16} />

                      </motion.span>

                    </div>

                    {/* Dropdown */}

                    <AnimatePresence>

                      {activeMenu === link.name && (

                        <motion.ul

                          initial={{ opacity: 0, y: -10 }}

                          animate={{ opacity: 1, y: 0 }}

                          exit={{ opacity: 0, y: -10 }}

                          transition={{ duration: 0.2 }}

                          className="

                    absolute

                    top-full

                    left-0

                    mt-4

                    w-60

                    rounded-xl

                    border

                    border-white/10

                    bg-[#212121]

                    p-2

                    shadow-lg

                    z-50

                  "

                        >

                          {link.subLinks.map((sublink) => (

                            <li key={sublink.name}>

                              <NavLink

                                to={`/services/${sublink.path}`}

                                className="

                          flex

                          items-center

                          justify-between

                          rounded-lg

                          px-4

                          py-3

                          text-sm!

                          text-gray-400

                          transition-all

                          duration-200

                          hover:bg-white/5

                          hover:text-dark-primary

                        "

                              >

                                {sublink.name}
                                <MdArrowOutward />

                              </NavLink>

                            </li>

                          ))}

                        </motion.ul>

                      )}

                    </AnimatePresence>

                  </>

                )}

              </li>

            );

          })}

        </ul>
      </motion.div>

      <motion.div className="hidden lg:flex justify-end lg:w-1/4">
        <NavLink to="/contact" className='theme-button-green !w-auto !h-auto px-8 py-3 sm:px-10 md:px-12'>Contact</NavLink>
      </motion.div>

      {/* Animated container */}
      <motion.div
        initial={{ height: "3rem", borderRadius: "2rem", top: "50%", translateY: "-50%" }}
        animate={
          showMenu
            ? { height: "auto", borderRadius: "0.5rem", top: "1rem", translateY: "0%" }
            : { height: "3rem", borderRadius: "2rem", top: "50%", translateY: "-50%" }
        }
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute right-4 sm:right-6 lg:right-16 xl:right-32 z-10 w-37 sm:w-45 lg:w-50 xl:w-55 overflow-hidden bg-white block lg:hidden"
      >
        {/* Toggle button */}
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className={`text-dark-background w-full h-12 flex justify-between items-center font-bold md:text-base !text-sm !xl:text-lg px-3 lg:px-4 transition-colors duration-500 ease-in-out ${showMenu ? 'hover:bg-dark-textColor' : 'hover:bg-dark-primary'
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
                          expandIcon={<FiChevronDown />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                          className='!text-xs !xl:text-base font-medium'
                        >
                          <Link to={link.path}>{link.name}</Link>
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
    </nav>
  );
};

export default Navbar;