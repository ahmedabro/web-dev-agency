import React from 'react'
import bannerImage from '../assets/images/banner2.gif'
import Banner from '../components/Banner'
import AboutMe from '../components/AboutMe'
import ServiceComponent from '../components/ServiceComponent'
import Portfolio from '../components/Portfolio'

const Home = () => {
  return (
    <div>
      <Banner />
      <AboutMe />
      <ServiceComponent />
      <Portfolio />
      <div className='h-screen'>

      </div>
    </div>
  )
}

export default Home
