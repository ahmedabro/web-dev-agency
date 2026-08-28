import React, { useRef } from "react";
import { useGetExperiencesQuery } from "../redux/api/experienceApi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const { data, isLoading, isError, error } =
    useGetExperiencesQuery();

  const experiences = data?.experiences || [];

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const pointsRef = useRef([]);
  const cardsRef = useRef([]);


  useGSAP(
    () => {
      if (!experiences.length) return;

      const section = sectionRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;
      const points = pointsRef.current.filter(Boolean);
      const cards = cardsRef.current.filter(Boolean);


      const mm = gsap.matchMedia()

      mm.add("(min-width: 1024px)", () => {

        if (!section || !track || !progress) return;

      // -----------------------------------------
      // Calculate horizontal scroll distance
      // -----------------------------------------

      const getScrollAmount = () => {
        return Math.max(
          track.scrollWidth - window.innerWidth,
          0
        );
      };

      // -----------------------------------------
      // Initial card states
      // -----------------------------------------

      // const cards = gsap.utils.toArray(
      //   ".experience-card",
      //   section
      // );

      gsap.set(cards, {
        opacity: 0,
        x: 280,
      });

      if (cards[0]) {
        gsap.set(cards[0], {
          opacity: 1,
          x: 0,
        });
      }

      // -----------------------------------------
      // Main horizontal timeline
      // -----------------------------------------

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: "top -20%",

          end: () => `+=${getScrollAmount()}`,

          scrub: 2,

          pin: true,

          anticipatePin: 1,

          invalidateOnRefresh: true,

          refreshPriority: 0,

          onUpdate: (self) => {
            const progressValue = self.progress;

            // -----------------------------------
            // Progress line
            // -----------------------------------

            gsap.set(progress, {
              scaleX: progressValue,
            });

            // -----------------------------------
            // Active points
            // -----------------------------------

            points.forEach((point, index) => {
              const pointProgress =
                index / points.length;

              const isActive =
                progressValue > pointProgress;

              gsap.to(point, {
                scale: isActive ? 1.3 : 1,

                backgroundColor: isActive
                  ? "#37e062"
                  : "#212121",

                borderColor: isActive
                  ? "#37e062"
                  : "rgba(255,255,255,0.2)",

                duration: 0.2,

                overwrite: true,
              });
            });
          },
        },
      });

      // -----------------------------------------
      // Horizontal movement
      // -----------------------------------------

      tl.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      // -----------------------------------------
      // Card entrance animations
      // -----------------------------------------

      cards.forEach((card, index) => {
        if (index === 0) return;

        gsap.to(card, {
          opacity: 1,
          x: 0,

          scrollTrigger: {
            trigger: card,

            containerAnimation: tl,

            start: "left 80%",

            end: "left 40%",

            scrub: true,

            invalidateOnRefresh: true,
          },
        });
      });
      })

      mm.add("(max-width: 1023px)", () => {
        console.log("🔥 EXPERIENCE MOBILE GSAP RUNNING");
        console.log("cards:", cards);
        console.log("scrollY:", window.scrollY);
      
              cards.forEach((card, index) => {

                console.log(
                  `Card ${index}`,
                  card.getBoundingClientRect().top,
                  card.getBoundingClientRect().bottom
                );

                gsap.set(card,
                  {
                    opacity: 0,
                    y: 100,
                  })

                gsap.to(card, {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  // stagger: 0.15,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    once: true,
                  }
                }
              )
              })
      
            })
      

      

    },
    {
      scope: sectionRef,

      dependencies: [experiences.length],

      revertOnUpdate: true,
    }
  );

  return (
    <section
      ref={sectionRef}
      className="experience-section overflow-hidden bg-dark-background"
    >
      <div className="flex flex-col justify-center">

        {/* -------------------------------- */}
        {/* LOADING */}
        {/* -------------------------------- */}

        {isLoading && (
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-400">
              Loading experiences...
            </p>
          </div>
        )}

        {/* -------------------------------- */}
        {/* ERROR */}
        {/* -------------------------------- */}

        {isError && (
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-red-400">
              {error?.message || "Error fetching experiences"}
            </p>
          </div>
        )}

        {/* -------------------------------- */}
        {/* CONTENT */}
        {/* -------------------------------- */}

        {!isLoading &&
          !isError &&
          experiences.length > 0 && (
            <>
              {/* HEADER */}

              <div className="section-container lg:mb-40!">

                <span className="section-subheading">
                  Experience
                </span>

                <h2 className="section-mainheading">
                  Where I've Worked
                </h2>

                <p className="text-gray-400 max-w-xl">
                  A timeline of my professional journey,
                  responsibilities, and the experiences that
                  shaped how I build digital products.
                </p>

              </div>

              {/* TIMELINE */}

              <div className="relative w-full">

                {/* LINE */}

                <div className="lg:absolute left-0 right-0 top-0 h-[2px] bg-white/10 hidden lg:block">

                  <div
                    ref={progressRef}
                    className="
                      lg:absolute
                      lg:left-0
                      lg:top-0
                      lg:h-full
                      lg:w-full
                      lg:origin-left
                      bg-dark-primary
                    "
                    style={{
                      transform: "scaleX(0)",
                    }}
                  />

                </div>

                {/* HORIZONTAL TRACK */}

                <div
                  ref={trackRef}
                  className="
                    flex
                    flex-wrap
                    flex-col
                    gap-5
                    lg:flex-nowrap
                    lg:flex-row
                    lg:gap-16
                    lg:pl-[10vw]
                    lg:pr-[10vw]
                    section-container
                    lg:w-max!
                    lg:mb-0!
                  "
                >

                  {experiences.map(
                    (experience, index) => (

                      <article
                        key={`${experience.company}-${index}`}
                        ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                        className="
                          experience-card
                          relative
                          w-full
                          md:w-full
                          lg:w-[700px]
                          xl:w-[900px]
                          2xl:w-[900px]
                          lg:pt-12
                        "
                      >

                        {/* POINT */}

                        <div
                          ref={(el) => {
                            pointsRef.current[index] = el;
                          }}
                          className="
                            absolute
                            top-[-7px]
                            left-0
                            w-4
                            h-4
                            rounded-full
                            border-2
                            border-white/20
                            bg-[#212121]
                            z-10
                            hidden
                            lg:block
                          "
                        />

                        {/* CARD */}

                        <div
                          className="
                            rounded-3xl
                            border
                            border-white/10
                            bg-[#212121]
                            p-7
                            md:p-9
                            min-h-[360px]
                            relative
                            overflow-hidden
                          "
                        >

                          {/* Background number */}

                          <span
                            className="
                              absolute
                              right-5
                              top-0
                              text-[100px]
                              md:text-[140px]
                              font-black
                              text-white/[0.025]
                              leading-none
                              pointer-events-none
                            "
                          >
                            0{index + 1}
                          </span>

                          {/* DATE */}

                          <div className="flex items-center gap-3 mb-6">

                            <span className="text-dark-primary text-sm font-bold">
                              {new Date(
                                experience.startDate
                              ).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                }
                              )}
                            </span>

                            <span className="w-8 h-px bg-white/20" />

                            <span className="text-gray-500 text-sm">
                              {experience.isCurrent === false
                                ? new Date(
                                    experience.endDate
                                  ).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                    }
                                  )
                                : "Present"}
                            </span>

                          </div>

                          {/* ROLE */}

                          <h3 className="
                            text-2xl
                            md:text-3xl
                            font-bold
                            text-white
                            mb-2
                          ">
                            {experience.role}
                          </h3>

                          {/* COMPANY */}

                          <div className="
                            flex
                            flex-wrap
                            items-center
                            gap-3
                            mb-8
                          ">

                            <span className="text-dark-primary font-semibold">
                              {experience.company}
                            </span>

                            <span className="
                              w-1
                              h-1
                              rounded-full
                              bg-gray-500
                            " />

                            <span className="text-gray-400 text-sm">
                              {experience.type}
                            </span>

                            <span className="
                              w-1
                              h-1
                              rounded-full
                              bg-gray-500
                            " />

                            <span className="text-gray-400 text-sm">
                              {experience.location}
                            </span>

                          </div>

                          {/* RESPONSIBILITIES */}

                          <ul className="space-y-3">

                            {experience.responsibilities?.map(
                              (
                                responsibility,
                                responsibilityIndex
                              ) => (

                                <li
                                  key={responsibilityIndex}
                                  className="
                                    flex
                                    gap-3
                                    text-gray-400
                                    leading-relaxed
                                    text-base!
                                  "
                                >

                                  <span className="
                                    text-dark-primary
                                  ">
                                    →
                                  </span>

                                  <span>
                                    {responsibility}
                                  </span>

                                </li>

                              )
                            )}

                          </ul>

                        </div>

                      </article>

                    )
                  )}

                </div>

              </div>

              {/* SCROLL HINT */}

              <div className="
                section-container
                mt-10
                lg:flex
                justify-between
                items-center
                hidden
              ">

                <span className="
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  text-gray-500
                ">
                  Scroll to explore
                </span>

                <span className="
                  text-dark-primary
                  text-sm
                ">
                  {experiences.length} Experiences
                </span>

              </div>
            </>
          )}

      </div>
    </section>
  );
};

export default Experience;