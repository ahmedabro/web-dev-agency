import React, { useRef } from 'react'
import { useGetStatsQuery } from '../redux/api/statsApi'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const Stats = () => {
  const { data, isLoading, isError, error } = useGetStatsQuery()
  const stats = data?.stats || []

  const sectionRef = useRef(null)
  const numberRefs = useRef([])
  
  // Reset ref array before render to clear stale elements
  numberRefs.current = []

  useGSAP(
    (context) => {
      if (!stats.length) return

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          numberRefs.current.forEach((element, index) => {
            if (!element || !stats[index]) return
            const counter = { value: 0 }

            // Add tween to useGSAP context so it gets killed on route unmount
            context.add(() => {
              gsap.to(counter, {
                value: Number(stats[index].value),
                duration: 2,
                ease: 'power2.out',
                snap: { value: 1 },
                onUpdate: () => {
                  if (element) element.textContent = Math.round(counter.value)
                },
              })
            })
          })
        },
      })
    },
    {
      scope: sectionRef,
      dependencies: [stats],
    }
  )

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error?.data?.message || 'Something went wrong'}</p>
      ) : (
        <div
          ref={sectionRef}
          className='section-container !px-0 py-0 bg-dark-secondary'
        >
          <div className='flex flex-col sm:flex-row items-center justify-center rounded-lg shadow-lg overflow-hidden'>
            {stats.map((stat, index) => (
              <div
                key={stat._id}
                className={`relative md:w-1/3 flex flex-col p-10 justify-center items-center rounded-lg group hover:bg-dark-primary transition-all duration-750 ease-in-out 
                  ${
                    index !== stats.length - 1 &&
                    'sm:before:absolute sm:before:top-1/2 sm:before:right-0 sm:before:h-30 sm:before:border-r sm:before:border-gray-700 sm:before:-translate-y-1/2'
                  }`}
              >
                <img
                  src={stat.icon}
                  loading='lazy'
                  className='w-12 h-12 sm:w-10 sm:h-10 md:w-15 md:h-15 mb-6 sm:mb-5 lg:mb-8 brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-500 ease-in-out'
                  alt=''
                />

                <h5 className='font-bold text-dark-primary text-4xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 group-hover:text-dark-surface transition-all duration-500 ease-in-out'>
                  <span
                    ref={(el) => {
                      numberRefs.current[index] = el
                    }}
                  >
                    0
                  </span>
                  {stat.sign}
                </h5>

                <h6 className='font-medium text-center text-lg sm:text-base md:text-lg group-hover:text-dark-surface transition-all duration-500 ease-in-out'>
                  {stat.label}
                </h6>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Stats