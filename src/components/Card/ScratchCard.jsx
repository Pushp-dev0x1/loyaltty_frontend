import React from "react";
import { Cloud } from "lucide-react";
import { Link } from "react-router-dom";

const ScratchCard = ({ title, description }) => {
  // Function to scroll to top when navigating
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Link  className="block" >
        <div className="w-48 h-28 sm:w-64 sm:h-28 bg-gradient-to-br 
        relative rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
          {/* from-[#b4e0e5] to-[#8ecfd6]  */}
          {/* Decorative element */}
          <div className="absolute top-2 right-2 w-16 h-16 sm:w-24 sm:h-24 opacity-50">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#040869]">
              <path d="M50 0 C60 30 70 40 100 50 C70 60 60 70 50 100 C40 70 30 60 0 50 C30 40 40 30 50 0" />
            </svg>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-3">
            <h2 className="text-xl sm:text-xl font-bold text-[#040869] leading-tight">{title}</h2>
            <div className="flex items-center  bg-transparent bg-opacity-80 p-2 sm:p-2 rounded-lg">
              <Cloud size={20} className="text-[#040869] mr-2 sm:mr-3 flex-shrink-0" />
              <span className="text-[#040869] text-xs sm:text-sm font-medium">{description}</span>
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#040869] bg-opacity-0 transition-opacity duration-300 hover:bg-opacity-10"></div>
        </div>
      </Link>
    </>
  );
};

export default ScratchCard;
