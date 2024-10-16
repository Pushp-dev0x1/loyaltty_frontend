import React from "react";

function ProgressIndicator({ currentStep, totalSteps, onbackpress }) {
  return (
    <div className="flex flex-col self-stretch w-full">
      <div className="flex flex-row justify-between items-center">
        <div
          onClick={() => onbackpress()}
          className="flex items-center self-stretch text-gray-500"
        >
          <button className="text-left text-sm sm:text-base md:text-xl">
            &lt; Back
          </button>
        </div>
        <div className="text-sm sm:text-base md:text-xl text-gray-500">
          {currentStep} of {totalSteps} steps
        </div>
      </div>
      <div className="flex flex-wrap gap-1 sm:gap-2 items-center mt-2 sm:mt-4 md:mt-8">
        {[...Array(totalSteps)].map((_, index) => (
          <div
            key={index}
            className={`flex-grow h-2 sm:h-3 md:h-3.5 rounded-full ${
              index <= currentStep - 1 ? "bg-[#040869]" : "bg-gray-200"
            }`}
            style={{ minWidth: '10%', maxWidth: '100%' }}
          />
        ))}
      </div>
    </div>
  );
}

export default ProgressIndicator;
