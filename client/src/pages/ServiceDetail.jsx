import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import InnerBanner from '../components/InnerBanner';
import Solutions from '../components/Solutions';
import Process from '../components/Process';
import Steps from '../components/Steps';
import FAQs from '../components/FAQs';
import Testimonials from '../components/Testimonials';
import Skills from '../components/Skills';
import { useGetServiceByIdQuery } from '../redux/api/serviceApi';
import WhatICanBuild from '../components/WhatICanBuild';

const ServiceDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetServiceByIdQuery(id);

  console.log(data)

  return (
    <div>
      <InnerBanner title={data?.service?.title || ""}
      />
      {
        isLoading && (
          <p>Loading...</p>
        )}
      {isError && (
        <p>Error: {error}</p>
      )}
      {
        (!isError && !isLoading) &&
        (
          <>
            <WhatICanBuild solutions={data?.service?.solutions || []} />
            <Solutions solutions={data?.service?.solutions || []} />
            <Process processes={data?.service?.howItWorks || []} />
            <Skills serviceType={data?.service?.title || ""} />
            {/* <Testimonials /> */}
            <FAQs />
          </>
        )
      }
    </div>
  )
}

export default ServiceDetail
