import React from 'react'
import { useParams } from 'react-router'
import InnerBanner from '../components/InnerBanner';
import { services } from '../utilities/services';
import Solutions from '../components/Solutions';
import Process from '../components/Process';
import Steps from '../components/Steps';
import FAQs from '../components/FAQs';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import Skills from '../components/Skills';

const ServiceDetail = () => {
  const { id } = useParams();
  const service = services.find(service => service.id === id);
  console.log(service)

  return (
    <div>
        <InnerBanner title={service?.title} breadcrumb={
            [
                { title: "Home", url: "/" }, 
                { title: service?.title },
            ]
            } 
        />
        <Solutions solutions={service?.solutions} />
        <Process processes={service?.howItWorks} />
        <Skills serviceType={service?.title} />
        <Testimonials />
        <FAQs />
        <CTASection />
    </div>
  )
}

export default ServiceDetail
