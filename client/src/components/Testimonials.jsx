import React from 'react'
import EmblaTestimonialCarousel from '../embla/EmblaTestimonialCarousel'
import { useGetTestimonialsQuery } from '../redux/api/testimonialsApi'

const Testimonials = () => {
  const {data, isLoading, isError, error} = useGetTestimonialsQuery()
  const testimonials = data?.testimonials || []

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error: {error.message}</div>

  return (
    <div className='section-container'>
        <div className='section-header w-full !m-0'>
        <h3 className='section-subheading justify-center m-auto'>Testimonials</h3>
        <h2 className='section-mainheading !text-center !w-full mb-8'>What Our Clients Say</h2>
        <p className='text-center text-gray-400 max-w-2xl m-auto'>Here are some of the testimonials from our satisfied clients. We take pride in delivering exceptional service and results.</p>
      </div>
      <div className='sm:px-[8%] md:px-[12%] relative'>
        <EmblaTestimonialCarousel slides={testimonials} options={{ loop: false }} />
      </div>
    </div>
  )
}

export default Testimonials
