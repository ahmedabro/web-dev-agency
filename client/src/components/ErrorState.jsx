import React from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

const ErrorState = ({
  message = "Something went wrong while loading this content.",
  onRetry,
}) => {
  return (
    <div className="min-h-[300px] w-full flex items-center justify-center px-6">
      <div className="text-center max-w-md">

        {/* Icon */}
        <div className="
          mx-auto mb-6
          w-16 h-16
          rounded-full
          flex items-center justify-center
          border border-red-400/20
          bg-red-400/5
        ">
          <FiAlertTriangle className="text-2xl text-red-400" />
        </div>

        {/* Heading */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
          Something went wrong
        </h3>

        {/* Message */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          {message}
        </p>

        {/* Retry */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="
              inline-flex items-center gap-2
              px-5 py-2.5
              rounded-full
              border border-white/10
              bg-white/5
              text-sm text-white
              hover:border-[#37e062]/40
              hover:text-[#37e062]
              transition-all duration-300
            "
          >
            <FiRefreshCw size={15} />
            Try again
          </button>
        )}

      </div>
    </div>
  );
};

export default ErrorState;