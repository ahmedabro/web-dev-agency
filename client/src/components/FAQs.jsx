import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { MdAdd } from "react-icons/md";

const faqs = [
    {
        id: 1,
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy on all items."
    },
    {
        id: 2,
        question: "How long does shipping take?",
        answer: "Shipping usually takes 5-7 business days."
    },
    {
        id: 3,
        question: "Do you offer international shipping?",
        answer: "Yes, we ship to over 100 countries worldwide."
    }
]

const FAQs = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange =
    (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <div className='section-container faq-section !w-[80%] m-auto'>
      <div className='section-header'>
        <h3 className='section-subheading justify-center m-auto'>FAQs</h3>
        <h2 className='section-mainheading text-center !w-full'>Frequently Asked Questions</h2>
      </div>
      <div className='mt-10'>
        {faqs.map(faq => (
            <Accordion expanded={expanded === faq.id} onChange={handleChange(faq.id)} key={faq.id}>
          <AccordionSummary expandIcon={<MdAdd className='text-2xl' />}>
            <h4 className='font-semibold text-[20px]'>{faq.question}</h4>
          </AccordionSummary>
          <AccordionDetails>
            <p className='text-lg'>{faq.answer}</p>
          </AccordionDetails>
        </Accordion>
        ))}
      </div>
    </div>
  )
}


export default FAQs
