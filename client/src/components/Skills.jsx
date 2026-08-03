import React, { useRef } from 'react'
import { useGetSkillsQuery } from '../redux/api/skillsApi'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Skills = ({ serviceType }) => {
  const { data, isLoading, isError, error } = useGetSkillsQuery();
  const skills = data?.technologies || [];

  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {

    if (!skills.length || !cardsRef.current.length) return;

    const cards = cardsRef.current;

    const STACK_OFFSET = 50;

    const ACTIVE_BG = "#17251c";
    const INACTIVE_BG = "#212121";

    const ACTIVE_BORDER = "#37e062";
    const INACTIVE_BORDER = "rgba(255, 255, 255, 0.1)";

    const ACTIVE_SHADOW = "0 0 35px rgba(55, 224, 98, 0.18)"
    const INACTVE_SHADOW = "0 0 0px rgba(255, 255, 255, 0)"

    const getScale = (index) => {
      return 0.90 + index * 0.05;
    };

    cards.forEach((card, index) => {

      if (index === 0) return;

      gsap.set(card, {
        y: 500 + (index * STACK_OFFSET),
        scale: 0.9,
      });
    });

    gsap.set(cards[0], {
      y: 0,
      scale: 1,
      borderColor: ACTIVE_BORDER,
      boxShadow: ACTIVE_SHADOW,
      backgroundColor: ACTIVE_BG,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 15%",
        end: `+=${cards.length * 700}`,
        scrub: 0.4,
        pin: true,
        anticipatePin: 0.5,
        invalidateOnRefresh: true,
      },
    });

    cards.forEach((card, index) => {

      if (index === 0) return;

      tl.to(
        cards[index - 1],
        {
          scale: getScale(index - 1),
          borderColor: INACTIVE_BORDER,
          boxShadow: INACTVE_SHADOW,
          backgroundColor: INACTIVE_BG,
          duration: 1,
          ease: "none",
        },
        "+=0.15"
      );

      tl.to(
        card,
        {
          y: index * STACK_OFFSET,
          scale: getScale(index),
          borderColor: ACTIVE_BORDER,
          boxShadow: ACTIVE_SHADOW,
          backgroundColor: ACTIVE_BG,
          duration: 1,
          ease: "none",
        },
        "<"
      );

    });


  }, {
    scope: sectionRef,
    dependencies: [skills.length],
    revertOnUpdate: true,
  }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <section className="skills-section min-h-screen" ref={sectionRef}>
      <div className="section-container min-h-screen">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div className="h-fit">
            <span className="section-subheading">
              Tech Stack
            </span>

            <h2 className="section-mainheading">
              Tools Behind the Build
            </h2>

            <p className="text-gray-400 max-w-lg">
              I use modern technologies and proven tools to build
              fast, scalable, and maintainable web applications.
            </p>
          </div>


          {/* RIGHT */}
          <div className="skills-cards relative min-h-[500px]">

            {skills.map((card, index) => (
              <div ref={(el) => { cardsRef.current[index] = el }} key={card.category} className={`skill-card
                  absolute
                  top-0
                  left-0
                  w-full
                  h-full
                  min-h-[500px]
                  rounded-2xl
                  border
                  border-white/10
                  bg-dark-surface
                  flex
                  items-center
                  p-5
                  md:p-5
                  `}>
                <div className='w-full'>
                  <img loading='lazy' src={card.icon} alt="" className='brightness-0 invert w-12 md:w-15 m-auto mb-5' />
                  <h4 className='font-bold text-white/10 text-3xl uppercase tracking-widest mb-6 absolute top-3 left-3'>{card.category}</h4>
                  <div className='flex flex-wrap justify-center gap-4'>
                    {card.items.map((skill) => (
                      <div key={skill.name} className='skill-item mt-5 flex flex-col items-center justify-center'>
                        <div className='group relative border-2 border-gray-600 rounded-full w-15 h-15 overflow-hidden flex flex-col justify-center items-center p-8 hover:scale-125 hover:border-dark-primary transition-all duration-400'>
                          <div dangerouslySetInnerHTML={{ __html: skill.icon }} className='w-7'></div>
                          <div className='skill-name !text-[12px] font-bold absolute -bottom-100 bg-dark-secondary w-full h-full flex justify-center items-center group-hover:bottom-0 transition-all duration-500'><span className='!text-[12px]'>{skill.name}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  )
}

export default Skills
