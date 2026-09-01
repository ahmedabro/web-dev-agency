import React from 'react'
import InnerBanner from '../components/InnerBanner'
import AllServices from '../components/Services'
import CTASection from '../components/CTASection'

const Services = () => {
  return (
    <div>
      <InnerBanner title="Services" />
      <AllServices />
      <CTASection />
    </div>
  )
}

export default Services
