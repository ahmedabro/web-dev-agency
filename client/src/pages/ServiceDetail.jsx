import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import InnerBanner from '../components/InnerBanner';
import Solutions from '../components/Solutions';
import Process from '../components/Process';
import Steps from '../components/Steps';
import FAQs from '../components/FAQs';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import Skills from '../components/Skills';
import { useGetServiceByIdQuery } from '../redux/api/serviceApi';

const ServiceDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetServiceByIdQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error}</p>;

  console.log(data)

  return (
    <div>
        <InnerBanner title={data?.service?.title || ""} 
        />
        <Solutions solutions={data?.service?.solutions || []} />
        <Process processes={data?.service?.howItWorks || []} />
        <Skills serviceType={data?.service?.title || ""} />
        <Testimonials />
        <FAQs />
        <CTASection />
    </div>
  )
}

export default ServiceDetail
