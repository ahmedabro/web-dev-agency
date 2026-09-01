import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'
import ThemeToggler from '../components/ThemeToggler'
import LiveChat from '../components/LiveChat'

const Layout = () => {
  return (
    <div>
      <Navbar />
      {/* <ThemeToggler /> */}
        <main>
            {/* The main content will be rendered here */}
            <Outlet />
        </main>
        <div className='hidden lg:block'>
          <LiveChat />
        </div>
        <Footer />
    </div>
  )
}

export default Layout
