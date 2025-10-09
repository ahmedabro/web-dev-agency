import React from 'react'
import InnerBanner from '../components/InnerBanner'
import ContactForm from '../components/ContactForm'

const Contact = () => {
  return (
    <div>
      <InnerBanner title="Contact Us" breadcrumb={[{ title: "Home", url: "/" }, { title: "Contact" }]} />
      <ContactForm />
    </div>
  )
}

export default Contact
