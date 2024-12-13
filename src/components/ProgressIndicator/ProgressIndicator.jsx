import React from "react";

function ProgressIndicator({ currentStep, totalSteps, onbackpress }) {
  return (
    <div className="flex flex-col w-full">
  {/* Navigation Section */}
  <div className="flex justify-between items-center">
    <button
      onClick={() => onbackpress()}
      className="text-sm sm:text-base md:text-lg text-gray-500"
    >
      &lt; Back
    </button>
    <div className="text-sm sm:text-base md:text-lg text-gray-500">
      {currentStep} of {totalSteps} steps
    </div>
  </div>

  {/* Progress Bar Section */}
  <div className="flex items-center gap-1 sm:gap-2 mt-2">
    {[...Array(totalSteps)].map((_, index) => (
      <div
        key={index}
        className={`flex-grow h-2 sm:h-3 md:h-3.5 rounded-full ${
          index <= currentStep - 1 ? "bg-[#040869]" : "bg-gray-200"
        }`}
        style={{
          minWidth: "8%", // ensures the bar segments shrink well on small screens
          maxWidth: "100%",
        }}
      ></div>
    ))}
  </div>
</div>

  );
}

export default ProgressIndicator;
