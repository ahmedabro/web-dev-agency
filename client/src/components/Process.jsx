import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Steps from "./Steps";

const Process = ({ processes }) => {
//   const ref = useRef(null);
//   const [scrollY, setScrollY] = useState(0);

  // Track the scroll position and update scroll progress
//   useEffect(() => {
//     const handleScroll = () => {
//       const element = ref.current;
//       if (element) {
//         // Get the current scroll position
//         const scrollTop = window.scrollY;

//         // Get the top offset of the element and its height
//         const elementTop = element.getBoundingClientRect().top + window.scrollY;
//         const elementHeight = element.offsetHeight;

//         // Calculate the scroll progress relative to the section's position
//         const scrollProgress = (scrollTop + window.innerHeight - elementTop) / elementHeight;

//         // Ensure that the scroll progress is clamped between 0 and 1
//         const progress = Math.min(Math.max(scrollProgress, 0), 1);
//         setScrollY(progress);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

    
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

  
//   const scaleY = scrollY; // Adjust the multiplier to control the speed of the animation

//   console.log(scrollY, scaleY);

  return (
    <div className="section-container">
      <div className="flex relative">
        {/* Left section */}
        <div className="w-1/2 sticky left-0 top-[140px] h-full flex flex-col justify-center">
          <h3 className="section-subheading">Our Process</h3>
          <h2 className="section-mainheading !w-full">How We Work</h2>
        </div>

        {/* Right section with process steps */}
        <div className="w-1/2 relative">
            <Steps processes={processes} />
          {/* <div className="relative pl-15 flex flex-col gap-25">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gray-700 h-full" />

            <motion.div
              className="absolute left-0 top-0 w-[3px] bg-green-500 origin-top transition-all duration-750 delay-125 ease-in-out"
              style={{ height: `${scaleY * 100}%` }} // Animate the green line based on adjusted scaleY
            />

            {processes.map((process, index) => (
              <div className="process-step relative pl-10" key={index}>
                <h3>{process.title}</h3>
                <p>{process.description}</p>

                <div className="absolute top-0 w-8 h-8 flex justify-center items-center border-2 border-green-600 rounded-full -left-19 bg-dark-background">
                  <span className="bg-green-600 rounded-full w-4 h-4"></span>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Process;