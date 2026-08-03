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

    const STACK_OFFSET = 30;

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
        y: 450 + (index * STACK_OFFSET),
        scale: 0.8,
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
        start: "top 10%",
        end: `+=${cards.length * 700}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
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
              <div
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                key={card.category}
                className="
    skill-card
    absolute
    top-0
    left-0
    w-full
    h-full
    rounded-2xl
    border
    border-white/10
    bg-[#212121]
    overflow-hidden
    p-6
    md:p-10
  "
              >
                {/* Huge background category */}
                {/* <div
                  className="
      absolute
      -top-8
      -right-6
      text-[100px]
      md:text-[150px]
      font-black
      uppercase
      tracking-tighter
      text-white/[0.025]
      leading-none
      pointer-events-none
      select-none
    "
                >
                  {card.category}
                </div> */}

                <div className="relative z-10 h-full flex flex-col justify-between">

                  {/* HEADER */}
                  <div className="flex items-start justify-between mb-3">

                    <div>
                      <span className="text-[#37e062] text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
                        {String(index + 1).padStart(2, "0")} / Technology
                      </span>

                      <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tight mt-2">
                        {card.category}
                      </h4>

                      <p className="text-white/40 text-sm mt-2 max-w-md">
                        {card.description}
                      </p>
                    </div>

                    {/* Category Icon */}
                    <div
                      className="
          hidden sm:flex
          w-14
          h-14
          rounded-xl
          border
          border-white/10
          bg-[#111111]
          items-center
          justify-center
        "
                    >
                      <img
                        loading="lazy"
                        src={card.icon}
                        alt=""
                        className="brightness-0 invert w-7"
                      />
                    </div>

                  </div>


                  {/* DIVIDER */}
                  <div className="w-full h-px bg-white/10 mb-3" />


                  {/* SKILLS */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">

                    {card.items.map((skill, skillIndex) => (

                      <div
                      key={skillIndex}

                        className="

    group

    relative

    rounded-lg

    border

    border-white/10

    bg-[#111111]

    px-3

    py-3

    flex

    items-center

    gap-3

    transition-all

    duration-300

    hover:border-[#37e062]/50

    hover:bg-[#37e062]/10

  "

                      >

                        <div

                          dangerouslySetInnerHTML={{ __html: skill.icon }}

                          className="w-6 h-6 shrink-0"

                        />

                        <span className="

    text-xs

    md:text-sm

    text-white/60

    group-hover:text-[#37e062]

    transition-colors

  ">

                          {skill.name}

                        </span>

                      </div>

                    ))}

                  </div>


                  {/* FOOTER */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">

                    <span className="text-xs text-white/30 uppercase tracking-widest">
                      {card.items.length} Technologies
                    </span>

                    <span className="text-xs text-[#37e062] font-semibold">
                      0{index + 1}
                    </span>

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
