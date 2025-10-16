import React from 'react'
import EmblaTestimonialCarousel from '../embla/EmblaTestimonialCarousel'

const testimonials = [
  {
    id: 1,
    text: "I have been using this service for months and it has exceeded my expectations. The team is professional and efficient. When I needed support, they were there to help. Highly recommend!",
    author: "John Doe",
    designation: "CEO",
    company: "ABC Corp",
    picture: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5
  },
  {
    id: 2,
    text: "Absolutely fantastic! Highly recommend.",
    author: "Jane Smith",
    designation: "CTO",
    company: "XYZ Inc",
    picture: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5
  },
  {
    id: 3,
    text: "A game changer for our business.",
    author: "Bob Johnson",
    designation: "Manager",
    company: "123 LLC",
    picture: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 4
  }
]

const Testimonials = () => {
  return (
    <div className='section-container'>
        <div className='section-header w-full !m-4'>
        <h3 className='section-subheading justify-center m-auto'>Testimonials</h3>
        <h2 className='section-mainheading !text-center !w-full mb-8'>What Our Clients Say</h2>
        <p className='text-center text-gray-400 max-w-2xl m-auto'>Here are some of the testimonials from our satisfied clients. We take pride in delivering exceptional service and results.</p>
      </div>
      <div className='px-[6%] sm:px-[8%] md:px-[12%] relative'>
        <EmblaTestimonialCarousel slides={testimonials} options={{ loop: false }} />
      </div>
    </div>
  )
}

export default Testimonials
