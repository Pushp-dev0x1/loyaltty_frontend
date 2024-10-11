// import React, { useState, useRef, useEffect } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";

// const AboutCampaign = ({ formData, handleInputChange, rewardtype }) => {
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
//           <div className="relative">
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               className="w-full px-2 md:px-4 py-1 md:py-2 mt-1 md:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
//               placeholder="Enter Title"
//             />
//             <span className="absolute right-2 bottom-1 text-xs text-gray-400">
//               *50 Max word limit
//             </span>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mb-2 md:mb-6">
//           <label
//             htmlFor="description"
//             className="block text-xs md:text-sm font-semibold text-gray-700"
//           >
//             Description
//           </label>
//           <div className="relative">
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               className="w-full px-2 md:px-4 py-1 md:py-2 mt-1 md:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
//               placeholder="Enter campaign description"
//               rows="2"
//             />
//             <span className="absolute right-2 bottom-1 text-xs text-gray-400">
//               *50 Max word limit
//             </span>
//           </div>
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
//             className={`mt-2 md:mt-4 ${isDropdownOpen ? 'block' : 'hidden'} md:block`}
//           >
//             <div className="flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0">
//               {/* Discount */}
//               <div className="md:flex-1">
//                 <label
//                   htmlFor="discount"
//                   className="block text-xs md:text-sm font-semibold text-gray-700 mb-1"
//                 >
//                   How much {rewardtype === "amount" ? "$" : "%"} discount?
//                 </label>
//                 <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">
//                   <button
//                     className="px-2 py-1 md:py-2 text-gray-700 bg-white border-r border-gray-300"
//                     onClick={() => handleInputChange({ target: { name: 'discount', value: Math.max(0, parseInt(formData.discount) - 1) } })}
//                   >
//                     -
//                   </button>
//                   <input
//                     type="number"
//                     id="discount"
//                     name="discount"
//                     value={formData.discount}
//                     onChange={handleInputChange}
//                     className="w-full px-2 md:px-4 py-1 md:py-2 text-sm md:text-base bg-gray-100 border-none rounded-lg focus:border-transparent focus:ring-0 text-center"
//                     placeholder="0"
//                   />
//                   <button
//                     className="px-2 py-1 md:py-2 text-gray-700 bg-white border-l border-gray-300"
//                     onClick={() => handleInputChange({ target: { name: 'discount', value: parseInt(formData.discount) + 1 } })}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {rewardtype === "amount" && (
//                 <div className="md:flex-1">
//                   <label
//                     htmlFor="discountValue"
//                     className="block text-xs md:text-sm font-semibold text-gray-700 mb-1"
//                   >
//                     Minimum Value for discount (Optional)
//                   </label>
//                   <input
//                     type="number"
//                     id="discountValue"
//                     name="discountValue"
//                     value={formData.discountValue}
//                     onChange={handleInputChange}
//                     className="w-full px-2 md:px-4 py-1 md:py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
//                     placeholder="Enter minimum value"
//                   />
//                 </div>
//               )}

//               {/* Headline (Auto created)​ */}
//               <div className="md:flex-1">
//                 <label
//                   htmlFor="headline"
//                   className="block text-xs md:text-sm font-semibold text-gray-700 mb-1"
//                 >
//                   Headline (Auto created)
//                 </label>
//                 <input
//                   type="text"
//                   id="headline"
//                   name="headline"
//                   disabled={true}
//                   className="w-full px-2 md:px-4 py-1 md:py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
//                   placeholder={`Enjoy Discount of ${rewardtype === "amount" ? `$ ${formData.discount}` : `${formData.discount} %`}`}
//                 />
//               </div>

//               {/* When does it expire?​ */}
//               <div className="md:flex-1">
//                 <label
//                   htmlFor="expiry"
//                   className="block text-xs md:text-sm font-semibold text-gray-700 mb-1"
//                 >
//                   When does it expire?
//                 </label>
//                 <input
//                   type="date"
//                   id="expiry"
//                   name="expiry"
//                   value={formData.expiry}
//                   onChange={handleInputChange}
//                   className="w-full px-2 md:px-4 py-1 md:py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
//                   placeholder="DD/MM/YYYY"
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
import { Calendar, ChevronLeft } from "lucide-react";

const CampaignForm = ({
  formData,
  handleInputChange,
  handlecontactChange,
  rewardtype,
}) => {
  return (
    <div className="max-w-2xl mx-auto  bg-white rounded-lg shadow-sm">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800">
        What is the Campaign about?
      </h2>
      <p className="text-sm md:text-base text-gray-600 mt-1 mb-5 md:mt-2">
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
              maxLength={50}
              onChange={handleInputChange}
              className="w-full px-5 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Janmasthmi Sale"
            />
            <span className="absolute right-3 -bottom-4 text-xs text-gray-400">
              {formData.title.length}/50
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
            <input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              maxLength={50}
              className="w-full px-5 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Template for promoting Krishna sales"
            />
            <span className="absolute right-3 -bottom-4 text-xs text-gray-400">
              {formData.description.length}/ 50
            </span>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="discount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              How Much {rewardtype === "amount" ? "$" : "%"} Discount?
            </label>
            <div className="flex px-5 py-2 border border-gray-300 rounded-full shadow-sm items-center">
              <button
                onClick={() =>
                  handleInputChange({
                    target: {
                      name: "discount",
                      value:
                        Number(formData.discount) == 1
                          ? 1
                          : Number(formData.discount) - 1,
                    },
                  })
                }
                className="h-[34px] w-[34px] px-3 py-2 border border-gray-300 rounded-full flex items-center bg-gray-50 hover:bg-gray-100"
              >
                -
              </button>

              {/* <button onClick={() => ('left')} className="bg-white rounded-full p-1 shadow-md">
          <ChevronLeft size={24} />
        </button> */}
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                className="w-full focus:ring-white focus:border-white text-center hide-number-spinner"
              />
              <button
                onClick={() =>
                  handleInputChange({
                    target: {
                      name: "discount",
                      value: Number(formData.discount) + 1,
                    },
                  })
                }
                className="h-[34px] w-[34px] px-3 py-2 border border-gray-300 rounded-full flex items-center bg-gray-50 hover:bg-gray-100"
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
                className="w-full px-5 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contact No
            </label>
            <div className="relative">
              <input
                type="number"
                id="contactno"
                name="contactno"
                value={formData.contactno}
                onChange={handlecontactChange}
                className="w-full px-5 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter contact number"
              />
            </div>
          </div>

          <div className="flex-1">
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Deal Value
            </label>
            <div className="relative">
              <input
                type="number"
                id="dealvalue"
                name="dealvalue"
                value={formData.dealvalue}
                onChange={handleInputChange}
                className="w-full px-5 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter deal value"
              />
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col items-start mb-2 md:mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Contact Number
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">
              This will be included in your Campaign link, SMS, WhatsApp & Email
            </p>
          </div>
          <div className="mb-2 md:mb-4">
            <input
              type="number"
              id="contactno"
              name="contactno"
              value={formData.contactno}
              onChange={handlecontactChange}
              className="w-full px-2 md:px-3 py-1 md:py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base md:text-base transition duration-150 ease-in-out"
              placeholder="Enter contact number"
            />
          </div> */}
      </div>
    </div>
  );
};

export default CampaignForm;
