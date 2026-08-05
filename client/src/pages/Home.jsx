import React from 'react'
import Banner from '../components/Banner'
import AboutMe from '../components/AboutMe'
import ServiceComponent from '../components/ServiceComponent'
import Portfolio from '../components/Portfolio'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Testimonials from '../components/Testimonials'
import CTASection from '../components/CTASection'
import Blogs from '../components/Blogs'
import Stats from '../components/Stats'
import Strip from '../components/Marquee'

const Home = () => {
  return (
    <div>
      <Banner />
      <Strip />
      <AboutMe />
      <Stats />
      <ServiceComponent />
      <Skills />
      <Experience />
      <Portfolio />
      {/* <Testimonials /> */}
      {/* <Blogs /> */}
      <CTASection />
    </div>
  )
}

export default Home
