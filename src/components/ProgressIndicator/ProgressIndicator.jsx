import React from "react";

function ProgressIndicator({ currentStep, totalSteps, onbackpress }) {
  return (
    <div className="flex flex-col self-stretch">
      <div className="flex flex-row justify-between">
        <div
          onClick={() => onbackpress()}
          className="flex  items-center self-stretch text-2xl font-medium leading-10 text-gray-500"
        >
          <button className="text-left text-base md:text-xl  ">
            &lt; Back
          </button>
        </div>
        <div className="self-end  text-base md:text-xl leading-10 text-gray-500">
          {currentStep} of {totalSteps} steps
        </div>
      </div>
      <div className="flex flex-wrap gap-2 items-center max-md:max-w-full">
        {[...Array(totalSteps)].map((_, index) => (
          <div
            key={index}
            className={`flex shrink-0 mt-4 md:mt-8 h-3.5 rounded-lg w-[36px] md:w-[62px] ${
              index <= currentStep - 1 ? "bg-[#040869]" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ProgressIndicator;
