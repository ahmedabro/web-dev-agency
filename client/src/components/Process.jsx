import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Steps from "./Steps";

const Process = ({ processes }) => {

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
        </div>
      </div>
    </div>
  );
};

export default Process;