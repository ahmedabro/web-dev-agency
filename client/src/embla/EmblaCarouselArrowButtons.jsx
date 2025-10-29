import React, { useCallback, useEffect, useState } from 'react'
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

export const PrevButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="embla__button embla__button--prev sm:absolute sm:left-0 sm:top-1/2 sm:-translate-y-1/2 text-3xl sm:text-4xl lg:text-5xl text-dark-primary"
      type="button"
      {...restProps}
    >
      <FaCircleChevronLeft />
      {children}
    </button>
  )
}

export const NextButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="embla__button embla__button--next sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 text-3xl sm:text-4xl lg:text-5xl text-dark-primary"
      type="button"
      {...restProps}
    >
      <FaCircleChevronRight  />
      {children}
    </button>
  )
}
