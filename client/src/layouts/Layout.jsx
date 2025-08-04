import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'
import ThemeToggler from '../components/ThemeToggler'

const Layout = () => {
  return (
    <div>
      <Navbar />
      {/* <ThemeToggler /> */}
        <main>
            {/* The main content will be rendered here */}
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Layout
