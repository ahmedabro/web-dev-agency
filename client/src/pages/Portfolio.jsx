import React from 'react'
import InnerBanner from '../components/InnerBanner'
import PortfolioComponent from '../components/Portfolio'
import Testimonials from '../components/Testimonials'
import Skills from '../components/Skills'
import FAQs from '../components/FAQs'

const Portfolio = () => {
  return (
    <div>
      <InnerBanner title="My Portfolio" />
      <PortfolioComponent />
      <Skills />
      {/* <Testimonials /> */}
      <FAQs />
    </div>
  )
}

export default Portfolio
