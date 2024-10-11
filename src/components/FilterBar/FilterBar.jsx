import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FilterBar = ({selectedfilter,setselectedfilter}) => {
  const scrollContainerRef = useRef(null);

  const filters = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/aa696b5643b37b2a14079498688d2e9fead761ee2fa2ab7a6cc1a31542de9114?placeholderIfAbsent=true&apiKey=416251b402e2495eab402c9d5ac956ab", label: "$ discount",id: "amount", },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0e456a74cb5ccc326f033c6058058273d59e8d5e779378d55a8f9f0a220489ec?placeholderIfAbsent=true&apiKey=416251b402e2495eab402c9d5ac956ab", label: "% discount",id: "percent", },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ce38a763d023d283ddc9786bc5fd1f19e99724148da0c9ee05605ecdbe6f923a?placeholderIfAbsent=true&apiKey=416251b402e2495eab402c9d5ac956ab", label: "Free Item",id: "freeItem", },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ee6f21fad3b3caa6795cec66f794f17b0d1d68efe208287f9a9ecc9eb62344eb?placeholderIfAbsent=true&apiKey=416251b402e2495eab402c9d5ac956ab", label: "Buy 1 Get 1",id: "buyOneGetOne", },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8aa6590e1b2c7cb1050770b54d35717539f4e501c0b8a358f09e0eb27f2f2c6b?placeholderIfAbsent=true&apiKey=416251b402e2495eab402c9d5ac956ab", label: "No Discount",id: "nodiscount", },
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  console.log(selectedfilter)

  return (
    <div className="relative w-half max-w-full mt-8">
      <nav className="flex justify-center items-center py-4 px-4 text-base font-semibold leading-normal text-gray-800 bg-white rounded-xl border border-solid border-zinc-200 overflow-x-auto scrollbar-hide">
        {/* <button onClick={() => scroll('left')} className="absolute left-2 z-10 bg-white rounded-full p-1 shadow-md">
          <ChevronLeft size={24} />
        </button> */}
        <div ref={scrollContainerRef} className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto scrollbar-hide">
          <button onClick={() => setselectedfilter("All")} className={`flex-shrink-0 px-4 sm:px-6 py-2  whitespace-nowrap rounded-lg ${selectedfilter === 'All' ? 'text-white bg-blue-900':""} `}>
            All
          </button>
          <span className="text-zinc-200">|</span>
          {filters.map((filter, index) => (
            <>
            <button key={index} onClick={() => setselectedfilter(filter)} className={`flex-shrink-0 flex gap-2 sm:gap-3 items-center px-4 sm:px-6 rounded-lg  py-2 whitespace-nowrap ${selectedfilter.id === filter.id ? 'bg-blue-900 text-white':"text-black"}`}>
              <img
                loading="lazy"
                src={filter.icon}
                alt=""
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
              />
              <span>{filter.label}</span>
              
            </button>
          {index != filters.length-1 ? <span className="text-zinc-200">|</span>:null}
          </>
          ))}
        </div>
        {/* <button onClick={() => scroll('right')} className="absolute right-2 z-10 bg-white rounded-full p-1 shadow-md">
          <ChevronRight size={24} />
        </button> */}
      </nav>
    </div>
  );
};

export default FilterBar;
