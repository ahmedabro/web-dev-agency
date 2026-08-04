import React, { useRef } from 'react'
import { MdOutlineCalendarToday } from "react-icons/md";
import { useGetExperiencesQuery } from '../redux/api/experienceApi';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {

  const { data, isLoading, isError, error } = useGetExperiencesQuery();

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
      const points = pointsRef.current;

      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount() + window.innerHeight}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const progressValue = self.progress;

            // Progress line
            gsap.set(progress, {
              scaleX: progressValue,
            });

            // Active experience point
            points.forEach((point, index) => {
              const pointProgress =
                index / Math.max(points.length - 1, 1);

              if (progressValue >= pointProgress) {
                gsap.to(point, {
                  scale: 1.3,
                  backgroundColor: "#37e062",
                  borderColor: "#37e062",
                  duration: 0.2,
                  overwrite: true,
                });
              } else {
                gsap.to(point, {
                  scale: 1,
                  backgroundColor: "#212121",
                  borderColor: "rgba(255,255,255,0.2)",
                  duration: 0.2,
                  overwrite: true,
                });
              }
            });
          },
        },
      });

      tl.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      // Initial card states
      gsap.set(".experience-card", {
        opacity: 0.35,
        x: 80,
      });

      gsap.set(".experience-card:first-child", {
        opacity: 1,
        x: 0,
      });

      // Card animations
      gsap.utils.toArray(".experience-card").forEach((card, index) => {
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
          },
        });
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    {
      scope: sectionRef,
      dependencies: [experiences.length],
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching experiences</div>;

  return (
    <section
      ref={sectionRef}
      className="experience-section h-screen overflow-hidden bg-dark-background"
    >
      <div className="h-full flex flex-col justify-center">

        {/* HEADER */}
        <div className="section-container mb-12">

          <span className="section-subheading">
            Experience
          </span>

          <h2 className="section-mainheading">
            Where I've Worked
          </h2>

          <p className="text-gray-400 max-w-xl">
            A timeline of my professional journey, responsibilities,
            and the experiences that shaped how I build digital products.
          </p>

        </div>

        {/* TIMELINE */}
        <div className="relative w-full">

          {/* LINE */}
          <div className="absolute left-0 right-0 top-0 h-[2px] bg-white/10">

            {/* ACTIVE LINE */}
            <div
              ref={progressRef}
              className="absolute left-0 top-0 h-full w-full origin-left bg-dark-primary"
              style={{ transform: "scaleX(0)" }}
            />

          </div>

          {/* HORIZONTAL TRACK */}
          <div
            ref={trackRef}
            className="flex gap-16 pl-[10vw] pr-[10vw] w-max"
          >

            {experiences.map((experience, index) => (

              <article
                key={`${experience.company}-${index}`}
                className="experience-card relative w-[80vw] md:w-[650px] lg:w-[700px] pt-12"
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
                    transition-colors
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
                      {new Date(experience.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                    </span>

                    <span className="w-8 h-px bg-white/20" />

                    <span className="text-gray-500 text-sm">
                      {experience.isCurrent === false ? new Date(experience.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "Present"}
                    </span>

                  </div>

                  {/* ROLE */}
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                    {experience.role}
                  </h3>

                  {/* COMPANY */}
                  <div className="flex flex-wrap items-center gap-3 mb-8">

                    <span className="text-dark-primary font-semibold">
                      {experience.company}
                    </span>

                    <span className="w-1 h-1 rounded-full bg-gray-500" />

                    <span className="text-gray-400 text-sm">
                      {experience.type}
                    </span>

                    <span className="w-1 h-1 rounded-full bg-gray-500" />

                    <span className="text-gray-400 text-sm">
                      {experience.location}
                    </span>

                  </div>

                  {/* RESPONSIBILITIES */}
                  <ul className="space-y-3">

                    {experience.responsibilities?.map(
                      (responsibility, responsibilityIndex) => (

                        <li
                          key={responsibilityIndex}
                          className="flex gap-3 text-gray-400 leading-relaxed"
                        >
                          <span className="text-dark-primary mt-2">
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

            ))}

          </div>

        </div>

        {/* SCROLL HINT */}
        <div className="section-container mt-10 flex justify-between items-center">

          <span className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Scroll to explore
          </span>

          <span className="text-dark-primary text-sm">
            {experiences.length} Experiences
          </span>

        </div>

      </div>
    </section>
  );
};

export default Experience;