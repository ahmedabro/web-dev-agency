import React from 'react'
import InnerBanner from '../components/InnerBanner'
import ContactComponent from '../components/Contact'

const Contact = () => {
  return (
    <div>
      <InnerBanner title="Contact Us" breadcrumb={[{ title: "Home", url: "/" }, { title: "Contact" }]} />
      <ContactComponent />
    </div>
  )
}

export default Contact
