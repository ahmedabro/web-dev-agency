import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const StepItem = ({ index, scrollYProgress, totalSteps, process }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Subscribe to scroll updates
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const start = index / totalSteps;
      const end = (index + 1) / totalSteps;

      // If scroll progress has reached this step
      if (value > start) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, index, totalSteps]);

  return (
    <div className="h-40 relative pl-15">
      {/* <motion.div
        animate={{
          backgroundColor: isActive ? "#22c55e" : "transparent",
          scale: isActive ? 1.5 : 1,
        }}
        transition={{
          backgroundColor: { duration: 0.1 },
          scale: { type: "spring", stiffness: 300, damping: 15 },
        }}
        className="w-6 h-6 rounded-full border-2 border-green-500 origin-center"
      /> */}
      <motion.div
      animate={{
          borderColor: isActive ? "#37e062" : "#4a5565",
          scale: isActive ? 1.5 : 1,
        }}
        transition={{
          borderColor: { duration: 0.1 },
          scale: { type: "spring", stiffness: 300, damping: 15 },
        }}
       className={`absolute w-6 h-6 flex justify-center items-center border-2 box-border rounded-full -left-3 top-0 bg-dark-background`}>
        <span className={`${isActive ? 'bg-dark-primary' : 'bg-gray-600'} rounded-full w-3 h-3`}></span>
        </motion.div>
      <div className={`${isActive ? 'opacity-100 scale-100' : 'opacity-10 scale-75'} transition-all duration-500 ease-in-out`}>
        <h3 className="text-gray-200 font-bold text-3xl mb-4 ">{process.title}</h3>
        <p className="text-gray-200 font-light">{process.description}</p>
      </div>
    </div>
  );
};

const Steps = ({ processes }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["center end", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const easedHeight = useSpring(lineHeight, {
    stiffness: 160,  // Higher → faster reaction
    damping: 18,     // Lower → less bounce/lag
    mass: 0.8,       // Small tweak for quick responsiveness
  });

  return (
    <div className="relative flex mt-15">
      <div ref={containerRef} className="absolute top-0 -left-0 w-[3px] bg-gray-600 h-full">
        </div>
        {/* Animated progress line */}
        <motion.div
          style={{ height: easedHeight }}
          className="absolute top-0 -left-0 w-[3px] bg-green-500"
        />

        {/* Steps */}
        <div className="flex flex-col w-full h-full relative">
          {processes.map((process, index) => (
            <StepItem
              key={index}
              index={index}
              scrollYProgress={scrollYProgress}
              totalSteps={processes.length}
              process={process}
            />
          ))}
        </div>
      
    </div>
  );
};

export default Steps;
