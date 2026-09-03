import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FiLayers,
  FiBarChart2,
  FiShoppingCart,
  FiLayout,
  FiArrowUpRight,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const builds = [
  {
    number: "01",
    title: "SaaS Applications",
    description:
      "Scalable web applications with intuitive interfaces, robust functionality, and the architecture to grow.",
    icon: FiLayers,
  },
  {
    number: "02",
    title: "Dashboards & Admin",
    description:
      "Powerful dashboards that turn complex data and operations into simple, usable experiences.",
    icon: FiBarChart2,
  },
  {
    number: "03",
    title: "E-Commerce Platforms",
    description:
      "Fast and responsive storefronts with product management, payments, and seamless customer experiences.",
    icon: FiShoppingCart,
  },
  {
    number: "04",
    title: "Websites & Landing Pages",
    description:
      "High-converting websites and landing pages built around your brand, goals, and audience.",
    icon: FiLayout,
  },
];

const WhatICanBuild = ({solutions}) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean);

      if (!cards.length) return;

      // Initial state
      gsap.set(cards, {
        opacity: 0,
        y: 80,
      });

      // Entrance animation
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Hover animations
      cards.forEach((card) => {
        const number = card.querySelector(".build-number");
        const icon = card.querySelector(".build-icon");
        const arrow = card.querySelector(".build-arrow");
        const glow = card.querySelector(".build-glow");

        const enter = () => {
          gsap.to(card, {
            y: -8,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(number, {
            y: -8,
            opacity: 0.12,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(icon, {
            rotate: 8,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(arrow, {
            x: 5,
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(glow, {
            opacity: 1,
            duration: 0.3,
          });
        };

        const leave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(number, {
            y: 0,
            opacity: 0.05,
            duration: 0.3,
          });

          gsap.to(icon, {
            rotate: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(arrow, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(glow, {
            opacity: 0,
            duration: 0.3,
          });
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
      });
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      className="section-container"
    >
      {/* HEADER */}
      <div className="mb-10 md:mb-12">
        <span className="section-subheading">
          What I Can Build
        </span>

        <h2 className="section-mainheading max-w-2xl">
          From ideas to digital products that work.
        </h2>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {builds.map((build, index) => {
          const Icon = build.icon;

          return (
            <article
              key={build.number}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="
                group
                relative
                min-h-[340px]
                md:min-h-[360px]
                rounded-3xl
                border border-white/10
                bg-[#161616]
                p-6
                md:p-7
                overflow-hidden
                cursor-pointer
              "
            >
              {/* GLOW */}
              <div
                className="
                  build-glow
                  pointer-events-none
                  absolute
                  -top-24
                  -right-24
                  w-48
                  h-48
                  rounded-full
                  bg-[#37e062]/10
                  blur-3xl
                  opacity-0
                "
              />

              {/* NUMBER */}
              <span
                className="
                  build-number
                  absolute
                  -right-2
                  -top-5
                  text-[100px]
                  md:text-[110px]
                  font-black
                  leading-none
                  text-white/[0.05]
                  select-none
                  pointer-events-none
                "
              >
                {build.number}
              </span>

              {/* ICON */}
              <div
                className="
                  build-icon
                  relative
                  z-10
                  w-12
                  h-12
                  rounded-xl
                  border border-white/10
                  bg-white/[0.03]
                  flex
                  items-center
                  justify-center
                  text-dark-primary
                  mb-14
                "
              >
                <Icon size={22} />
              </div>

              {/* CONTENT */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-3">
                  {build.title}
                </h3>

                <p className="text-sm leading-relaxed text-gray-400">
                  {build.description}
                </p>
              </div>

              {/* ARROW */}
              {/* <div
                className="
                  build-arrow
                  absolute
                  bottom-6
                  right-6
                  w-10
                  h-10
                  rounded-full
                  border border-white/10
                  flex
                  items-center
                  justify-center
                  text-gray-400
                  group-hover:text-dark-primary
                  group-hover:border-dark-primary/40
                  transition-colors
                "
              >
                <FiArrowUpRight size={18} />
              </div> */}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default WhatICanBuild;