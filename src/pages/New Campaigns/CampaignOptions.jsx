import React from "react";

function CampaignOption({ text, imageSrc, selected, onChange }) {
  const borderClass = selected ? "border-[#040869]" : "border-solid";
  const checkboxClass = selected ? "bg-[#040869] border-[#040869]" : "border-solid";

  return (
    <div
      onClick={onChange}
      className={`flex flex-wrap gap-5 justify-between items-center p-3 px-6 mt-4 w-full text-base leading-10 text-gray-500 border ${borderClass} rounded-[100px] max-md:px-4 max-md:py-3 max-md:mt-3 max-md:gap-3`}
    >
      <div className="flex items-center gap-4 max-md:gap-2">
        {/* Circle checkbox */}
        <div
          className={`flex shrink-0 rounded-full border ${borderClass} xl:h-[47px] xl:w-[47px] max-md:h-[28px] max-md:w-[28px] p-[4px] bg-white`}
        >
          <div className={`rounded-full ${checkboxClass} h-full w-full`} />
        </div>
        {/* Text */}
        <div className="basis-auto text-gray-800 max-md:text-sm">{text}</div>
      </div>
      {/* Image */}
      <img
        loading="lazy"
        src={imageSrc}
        alt=""
        className="object-contain shrink-0 aspect-square w-[42px] max-xl:w-[32px] max-md:w-[28px]"
      />
    </div>
  );
}

export default CampaignOption;