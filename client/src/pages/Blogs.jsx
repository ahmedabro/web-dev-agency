import React from 'react'
import InnerBanner from '../components/InnerBanner'
import BlogsComponent from '../components/Blogs'
import CTASection from '../components/CTASection'

const Blogs = () => {
  return (
    <div>
      <InnerBanner title="Blogs" />
      <BlogsComponent />
      <CTASection />
    </div>
  )
}

export default Blogs
