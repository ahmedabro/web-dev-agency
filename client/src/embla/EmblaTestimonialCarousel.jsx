import React, { useEffect } from 'react'
import { DotButton, useDotButton } from './EmblaCarouselDotButtons'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useAutoplay } from './EmblaCarouselAutoplay'
import { FaQuoteLeft, FaStar } from "react-icons/fa6";

const EmblaTestimonialCarousel = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000, stopOnMouseEnter: true, stopOnInteraction: false })
  ])

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()) // Access API
    }
  }, [emblaApi])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item, index) => (
            <div className="embla__slide" key={index}>
              <div className='flex flex-col sm:flex-row items-center gap-15'>
                <div className='sm:w-2/5'>
                  <img src={item.picture} alt={item.author} className='w-full rounded-full rounded-br-none' />
                </div>
                <div className='sm:w-3/5 relative'>
                  <div className='text-7xl md:text-9xl text-dark-primary absolute -top-9 -left-0 md:-top-20 md:-left-5 -z-10 opacity-25'>
                    <FaQuoteLeft />
                  </div>
                  <p className='md:text-xl text-gray-300 font-medium mb-8'>{item.text}</p>
                  <div className='flex items-center gap-1 mb-8'>
                    {[...Array(Math.floor(item.rating))].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm md:text-lg" />
                    ))}
                  </div>
                  <div className='pl-5 border-l-2 border-dark-primary'>
                    <h4 className='text-base md:text-lg font-semibold mb-2'>{item.author}</h4>
                    <h5 className='text-xs md:text-sm text-gray-400'>{item.designation}, {item.company}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots flex gap-3 justify-center mt-10">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected w-3 h-3 border-2 border-dark-primary rounded-full' : ' w-3 h-3 border-2 border-dark-primary rounded-full opacity-25'
              )}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default EmblaTestimonialCarousel
