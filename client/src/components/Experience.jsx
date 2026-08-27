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

  useGSAP(
    () => {
      if (!experiences.length) return;

      const section = sectionRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;
      const points = pointsRef.current.filter(Boolean);

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

      const cards = gsap.utils.toArray(
        ".experience-card",
        section
      );

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

          start: "top 10%",

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
      <div className="h-full flex flex-col justify-center">

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

              <div className="section-container mb-12!">

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

                <div className="absolute left-0 right-0 top-0 h-[2px] bg-white/10">

                  <div
                    ref={progressRef}
                    className="
                      absolute
                      left-0
                      top-0
                      h-full
                      w-full
                      origin-left
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
                    gap-16
                    pl-[10vw]
                    pr-[10vw]
                    w-max
                  "
                >

                  {experiences.map(
                    (experience, index) => (

                      <article
                        key={`${experience.company}-${index}`}
                        className="
                          experience-card
                          relative
                          w-[80vw]
                          md:w-[650px]
                          lg:w-[700px]
                          xl:w-[900px]
                          2xl:w-[900px]
                          pt-12
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
                flex
                justify-between
                items-center
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