import React from 'react'

const SkillCard = ({cardsRef, card, cardIndex}) => {
  return (
    <div
                ref={(el) => {
                  cardsRef.current[cardIndex] = el;
                }}
                key={card.category}
                className="
    skill-card
    relative
    lg:absolute
    lg:top-0
    lg:left-0
    w-full
    lg:h-full
    rounded-2xl
    border
    border-white/10
    bg-[#212121]
    overflow-hidden
    p-6
    md:p-8
    xl:p-10
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
                        {String(cardIndex + 1).padStart(2, "0")} / Technology
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">

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
                      0{cardIndex + 1}
                    </span>

                  </div>

                </div>
              </div>
  )
}

export default SkillCard