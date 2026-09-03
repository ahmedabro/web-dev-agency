import React from 'react'
import { useGetServicesQuery } from '../redux/api/serviceApi'
import { GiCheckMark } from "react-icons/gi"
import { Link } from 'react-router'
import Loader from './Loader'
import ErrorState from './ErrorState'

const Services = () => {
    const { data, isLoading, isError, error, refetch } = useGetServicesQuery()
    const services = data?.services || []

    return (
        <section className='section-container'>
            {
                isLoading ? (
                    <Loader />
                ) : isError ? (
                    <ErrorState 
                        message={error?.message || "Failed to load Services."}
                        onRetry={refetch}
                    />
                ) : (
                    services.map((service, index) => (
                        <div key={service.id}>
                            <div className='lg:grid lg:grid-cols-2 gap-15'>
                                <div className={`${index % 2 === 1 ? "col-start-2" : "col-start-1"} mb-10 lg:mb-0`}>
                                    <img src={service.image} alt={service.title} className='w-full rounded-3xl outline-1 outline-gray-800' />
                                </div>
                                <div className={index % 2 === 1 ? "col-start-1 row-start-1" : "col-start-2"}>
                                    <div className='mb-10'>
                                        <h2 className="section-mainheading mb-5">{service.title}</h2>
                                        <p>
                                            {service.description}
                                        </p>
                                    </div>
                                    <div className='mb-10'>
                                        <h3 className='text-dark-primary font-light uppercase tracking-widest [word-spacing:5px] mb-4'>Key Benefits</h3>
                                        <ul className='flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-4'>
                                            {service.benefits.map((benefit, index) => (
                                                <li key={index} className='flex items-baseline gap-3 text-sm!'><GiCheckMark className='text-dark-primary' /> {benefit.title}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className='mb-10'>
                                        <h3 className='text-dark-primary font-light uppercase tracking-widest [word-spacing:5px] mb-4'>How It Works</h3>
                                        <ul className='grid sm:grid-cols-2 gap-px border bg-white/20 border-white/20 rounded-2xl overflow-hidden'>
                                            {
                                                service.howItWorks.map((process, index) => (
                                                    <li key={index} className='p-5 bg-black/70'>
                                                        <div className='text-white/50 text-sm! mb-2'>0{index + 1}</div>
                                                        <h4 className='text-xl font-bold text-white mb-2'>{process.title}</h4>
                                                        <p className='text-sm!'>{process.description}</p>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div className='mb-10'>
                                        <h3 className='text-dark-primary font-light uppercase tracking-widest [word-spacing:5px] mb-4'>Deliverables</h3>
                                        <ul className='flex flex-wrap gap-3'>
                                            {
                                                service.deliverables.map((item, index) => (
                                                    <li key={index} className="bg-dark-background text-dark-textColor border-[0.5px] border-gray-600 px-5 py-1 rounded-full text-xs! font-light">
                                                        {item}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <Link to={"/contact"} className='theme-button'>Start a project</Link>
                                </div>
                            </div>
                            {index !== services.length - 1
                                && (
                                    <div className='seperator border-b border-white/15 my-15 md:my-20'></div>
                                )
                            }
                        </div>
                    ))
                )
            }

        </section>
    )
}

export default Services