// import React, { useState, useRef, useEffect } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";

// const AboutCampaign = ({ formData, handleInputChange,rewardtype }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const contentRef = useRef(null);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   useEffect(() => {
//     if (isDropdownOpen && contentRef.current) {
//       contentRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [isDropdownOpen]);

//   return (
//     <>
//       <div
//         className="flex-1 flex flex-col space-y-2 md:space-y-6 overflow-y-auto max-h-full"
//         style={{ scrollbarWidth: "none" }}
//       >
//         <h2 className="text-lg md:text-2xl font-extrabold tracking-tighter">
//           What is the Campaign about?
//         </h2>
//         <p className="text-sm md:text-lg leading-relaxed text-gray-600">
//           Fill in the details to create your campaign
//         </p>

//         {/* Title */}
//         <div className="mb-2 md:mb-4">
//           <label
//             htmlFor="title"
//             className="text-xs md:text-sm font-semibold text-gray-700"
//           >
//             Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             className="w-full px-2 md:px-4 py-1 md:py-2 mt-1 md:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
//             placeholder="Enter Title"
//           />
//         </div>

//         {/* Description */}
//         <div className="mb-2 md:mb-6">
//           <label
//             htmlFor="description"
//             className="block text-xs md:text-sm font-semibold text-gray-700"
//           >
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             className="w-full px-2 md:px-4 py-1 md:py-2 mt-1 md:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
//             placeholder="Enter campaign description"
//             rows="2"
//           />
//         </div>

//         {/* Mobile and Desktop layout */}
//         <div>
//           <div 
//             onClick={toggleDropdown}
//             className="md:hidden w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between items-center cursor-pointer"
//           >
//             <span className="text-sm">{isDropdownOpen ? "Hide Details" : "View More"}</span>
//             {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//           </div>
//           <div 
//             ref={contentRef}
//             className={`mt-2 md:mt-4 space-y-2 md:space-y-6 ${isDropdownOpen ? 'block' : 'hidden'} md:block`}
//           >
//             {/* Discount */}
//             <div className="grid grid-cols-2 gap-2 md:gap-6">
//             <div className="mb-2 md:mb-6">
//   <label
//     htmlFor="discount"
//     className="block text-xs md:text-sm font-semibold text-gray-700"
//   >
//     How much {rewardtype === "amount" ? "$" : "%"} discount?
//   </label>
//   <div className="flex items-center mt-1 md:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">
//     <span className="inline-block px-2 py-1 md:py-2 text-gray-700 bg-white border-r border-gray-300">
//       {rewardtype === "amount" ? "$" : "%"}
//     </span>
//     <input
//       type="number"
//       id="discount"
//       name="discount"
//       value={formData.discount}
//       onChange={handleInputChange}
//       className="w-full px-2 md:px-4 py-1 md:py-2 text-sm md:text-base bg-gray-100 border-none rounded-lg focus:border-transparent focus:ring-0"
//       placeholder="Enter discount"
//     />
//   </div>
// </div>

//             {rewardtype === "amount" ?   <div className="mb-2 md:mb-6">
//                 <label
//                   htmlFor="discountValue"
//                   className="block text-xs md:text-sm font-semibold text-gray-700"
//                 >
//                   Minimum Value for discount (Optional)
//                 </label>
//                 <input
//                   type="number"
//                   id="discountValue"
//                   name="discountValue"
//                   value={formData.discountValue}
//                   onChange={handleInputChange}
//                   className="w-full px-2 md:px-4 py-1 md:py-2 mt-1 md:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
//                   placeholder="Enter minimum value "
//                 />
//               </div>:null}
//             </div>


//             {/* Headline (Auto created)​ & When does it expire?​ */}
//             <div className="grid grid-cols-2 gap-2 md:gap-6">
//               <div className="mb-2 md:mb-6">
//                 <label
//                   htmlFor="headline"
//                   className="block text-xs md:text-sm font-semibold text-gray-700"
//                 >
//                   Headline (Auto created)
//                 </label>
//                 <input
//                   type="text"
//                   id="headline"
//                   name="headline"
//                   disabled={true}
//                   className="w-full px-2 md:px-4 py-1 md:py-2 mt-1 md:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
//                   placeholder={`Enjoy Discount of $${formData.discount}`}
//                 />
//               </div>
//               <div className="mb-2 md:mb-6">
//                 <label
//                   htmlFor="expiry"
//                   className="block text-xs md:text-sm font-semibold text-gray-700"
//                 >
//                   When does it expire?
//                 </label>
//                 <input
//                   type="date"
//                   id="expiry"
//                   name="expiry"
//                   value={formData.expiry}
//                   onChange={handleInputChange}
//                   className="w-full px-2 md:px-4 py-1 md:py-2 mt-1 md:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AboutCampaign;


import React, { useState } from "react";
import { Calendar } from "lucide-react";

const CampaignForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount: 0,
    expiry: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDiscountChange = (increment) => {
    setFormData((prevState) => ({
      ...prevState,
      discount: Math.max(0, prevState.discount + increment),
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-1">What is the Campaign about?</h2>
      <p className="text-sm text-gray-600 mb-6">
        Fill in the details to create your campaign
      </p>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Janmasthmi Sale"
            />
            <span className="absolute right-3 bottom-2 text-xs text-gray-400">
              *50 Max word limit
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Template for promoting Krishna sales"
            ></textarea>
            <span className="absolute right-3 bottom-2 text-xs text-gray-400">
              *50 Max word limit
            </span>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="discount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              How Much % Discount?
            </label>
            <div className="flex">
              <button
                onClick={() => handleDiscountChange(-1)}
                className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
              >
                -
              </button>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 border-t border-b border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-center"
              />
              <button
                onClick={() => handleDiscountChange(1)}
                className="px-3 py-2 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex-1">
            <label
              htmlFor="expiry"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              When does it expire?
            </label>
            <div className="relative">
              <input
                type="date"
                id="expiry"
                name="expiry"
                value={formData.expiry}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Calendar
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;