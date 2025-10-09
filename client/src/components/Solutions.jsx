import React from 'react'

const Solutions = ({solutions}) => {
  return (
    <div className='section-container'>
        <div className='section-header'>
            <h3 className='section-subheading'>Our Solutions</h3>
            <h2 className='section-mainheading'>Tailored Solutions for Your Business</h2>
        </div>
        <div className='section-content flex justify-center items-center flex-wrap gap-6'>
            {
                solutions.map((solution, index) => (
                    <div className={`relative ${index % 4 === 1 || index % 4 === 2 ? 'w-[calc(45%-1.5rem)]' : 'w-[calc(55%-1.5rem)]'} h-[250px] overflow-hidden pt-5 bg-[#37e0622b] border-2 border-dark-primary rounded-2xl flex flex-col justify-center gap-3 px-8 text-gray-200`} key={solution.title}>
                        <div className='absolute -top-4 -left-9 text-8xl isolate opacity-15'>{"0" + (index+1)}</div>
                        <h3 className='font-bold text-2xl'>{solution.title}</h3>
                        <p className='text-gray-400 '>{solution.description}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Solutions
