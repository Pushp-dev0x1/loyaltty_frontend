import React from "react";

function CampaignOption({ text, imageSrc, selected, onChange }) {
  const borderClass = selected ? "border-[#040869]" : "border-solid";
  const checkboxClass = selected
    ? "bg-[#040869] border-[#040869]"
    : "border-solid";

  return (
    <div
      onClick={onChange}
      className={`flex flex-wrap gap-2 sm:gap-3 md:gap-5 justify-between items-center p-2 sm:p-3 px-3 sm:px-4 md:px-6 mt-2 sm:mt-3 md:mt-4 w-full text-sm sm:text-base leading-6 sm:leading-8 md:leading-10 text-gray-500 border ${borderClass} rounded-full sm:rounded-[100px]`}
    >
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {/* Circle checkbox */}
        <div
          className={`flex shrink-0 rounded-full border ${borderClass} h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 xl:h-[47px] xl:w-[47px] p-[2px] sm:p-[3px] md:p-[4px] bg-white`}
        >
          <div className={`rounded-full ${checkboxClass} h-full w-full`} />
        </div>
        {/* Text */}
        <div className="basis-auto text-gray-800 text-xs sm:text-sm md:text-base">{text}</div>
      </div>
      {/* Image */}
      <img
        loading="lazy"
        src={imageSrc}
        alt=""
        className="object-contain shrink-0 aspect-square w-6 sm:w-8 md:w-10 max-xl:w-[32px]"
      />
    </div>
  );
}

export default CampaignOption;
