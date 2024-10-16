import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ScratchCard = ({ title, description }) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link className="block w-full" onClick={handleClick}>
      <div className="w-full max-w-[171.84px] h-[54.18px] sm:max-w-[350px] sm:h-[110px] mx-auto bg-gradient-to-br from-[#F5F5F5] to-[#E0E0E0] border border-black sm:border-2 sm:border-[#040869] rounded-2xl sm:rounded-2xl shadow-md flex items-center justify-between p-2 sm:p-6 relative overflow-hidden hover:scale-105 hover:shadow-lg transition-all duration-300">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-[#040869]">
            <path d="M50 0 C60 30 70 40 100 50 C70 60 60 70 50 100 C40 70 30 60 0 50 C30 40 40 30 50 0" />
          </svg>
        </div>

        {/* Content */}
        <div className="flex flex-row items-center gap-1 sm:gap-3 z-10 w-full">
          <div className="flex flex-col flex-grow">
            <h2 className="text-xs sm:text-xl md:text-2xl font-bold text-[#040869] leading-tight truncate">{title}</h2>
            <span className="text-[#040869] text-[10px] sm:text-sm font-medium mt-0.5 sm:mt-1 line-clamp-1">{description}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ScratchCard;