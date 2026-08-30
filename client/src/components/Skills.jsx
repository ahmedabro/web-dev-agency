import React, { useRef } from "react";
import { useGetSkillsQuery } from "../redux/api/skillsApi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SkillCard from "./SkillCard";

gsap.registerPlugin(ScrollTrigger);

const Skills = ({ serviceType }) => {
  const { data, isLoading, isError, error } = useGetSkillsQuery();
  const skills = data?.technologies || [];

  const sectionRef = useRef(null);
  
  const cardsRef = useRef([]);
  cardsRef.current = [];

  useGSAP(
    () => {
      if (!skills.length) return;

      const cards = cardsRef.current.filter(Boolean);
      if (cards.length !== skills.length) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const STACK_OFFSET = 30;
        const ACTIVE_BG = "#17251c";
        const INACTIVE_BG = "#212121";
        const ACTIVE_BORDER = "#37e062";
        const INACTIVE_BORDER = "rgba(255, 255, 255, 0.1)";
        const ACTIVE_SHADOW = "0 0 35px rgba(55, 224, 98, 0.18)";
        const INACTIVE_SHADOW = "0 0 0px rgba(255, 255, 255, 0)";

        const getScale = (index) => 0.90 + index * 0.05;

        cards.forEach((card, index) => {
          if (index === 0) return;
          gsap.set(card, {
            y: 450 + index * STACK_OFFSET,
            scale: 0.8,
          });
        });

        if (cards[0]) {
          gsap.set(cards[0], {
            y: 0,
            scale: 1,
            borderColor: ACTIVE_BORDER,
            boxShadow: ACTIVE_SHADOW,
            backgroundColor: ACTIVE_BG,
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 10%",
            end: `+=${cards.length * 700}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 10,
          },
        });

        cards.forEach((card, index) => {
          if (index === 0) return;

          tl.to(
            cards[index - 1],
            {
              scale: getScale(index - 1),
              borderColor: INACTIVE_BORDER,
              boxShadow: INACTIVE_SHADOW,
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
      });

      mm.add("(max-width: 1023px)", () => {
        cards.forEach((card) => {
          if (!card) return;
          gsap.fromTo(
            card,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                once: true,
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
      dependencies: [skills.length],
      revertOnUpdate: true,
    }
  );

  return (
    /* STABLE OUTER WRAPPER */
    <div className="skills-outer-wrapper w-full">
      <section
        ref={sectionRef}
        className="skills-section min-h-screen h-auto"
      >
        <div className="section-container min-h-screen h-auto">
          {isLoading && (
            <div className="min-h-screen flex items-center justify-center">
              <p className="text-gray-400">Loading skills...</p>
            </div>
          )}

          {isError && (
            <div className="min-h-screen flex items-center justify-center">
              <p className="text-red-400">
                Error: {error?.message || "Failed to load skills"}
              </p>
            </div>
          )}

          {!isLoading && !isError && skills.length > 0 && (
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="h-fit">
                <span className="section-subheading">Tech Stack</span>
                <h2 className="section-mainheading">Tools Behind the Build</h2>
                <p className="text-gray-400 max-w-lg">
                  I use modern technologies and proven tools to build fast,
                  scalable, and maintainable web applications.
                </p>
              </div>

              <div className="skills-cards relative lg:min-h-[500px] flex flex-col gap-5 lg:block">
                {skills.map((card, index) => (
                  <SkillCard
                    key={card.category}
                    cardsRef={cardsRef}
                    card={card}
                    cardIndex={index}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Skills;