// import React, { useState } from "react";

// const SummaryEdit = ({formData,handleInputChange}) => {

  
//   return (
//     <>
//       <div
//         className="flex-1 flex flex-col space-y-2 sm:space-y-6 overflow-y-auto max-h-full"
//         style={{ scrollbarWidth: "none" }}
//       >
       

//         {/* Title */}
//         <div className="mb-1 sm:mb-2">
//           <label
//             htmlFor="title"
//             className="text-sm font-semibold text-gray-700"
//           >
//             Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             className="w-full px-2 sm:px-4 py-1 sm:py-2 mt-1 sm:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
//             placeholder="Enter Title"
//           />
//         </div>

//         {/* Description */}
//         <div className="mb-2 sm:mb-6">
//           <label
//             htmlFor="description"
//             className="block text-sm font-semibold text-gray-700"
//           >
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             className="w-full px-2 sm:px-4 py-1 sm:py-2 mt-1 sm:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
//             placeholder="Enter campaign description"
//             rows="3"
//           />
//         </div>

//         {/* Discount */}
//         <div className="grid grid-cols-1 gap-2 sm:gap-6">
//           <div className="mb-2 sm:mb-6">
//             <label
//               htmlFor="discount"
//               className="block text-sm font-semibold text-gray-700"
//             >
//               How much $ discount? ​
//             </label>
//             <input
//               type="number"
//               id="discount"
//               name="discount"
//               value={formData.discount}
//               onChange={handleInputChange}
//               className="w-full px-2 sm:px-4 py-1 sm:py-2 mt-1 sm:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
//               placeholder={`Enter discount %`}
//             />
//           </div>
//           <div className="mb-2 sm:mb-6">
//             <label
//               htmlFor="discountValue"
//               className="block text-sm font-semibold text-gray-700"
//             >
//               What's the Deal Value?​
//             </label>
//             <input
//               type="number"
//               id="discountValue"
//               name="discountValue"
//               value={formData.discountValue}
//               onChange={handleInputChange}
//               className="w-full px-2 sm:px-4 py-1 sm:py-2 mt-1 sm:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
//               placeholder={`Enter discount %`}
//             />
//           </div>
//         </div>

//         {/* Headline (Auto created)​ & When does it expire?​ */}
//         <div className="grid grid-cols-1 gap-2 sm:gap-6">
//         <div className="mb-2 sm:mb-6">
//             <label
//               htmlFor="headline"
//               className="block text-sm font-semibold text-gray-700"
//             >
//               Headline (Auto created) ​
//             </label>
//             <input
//               type="text"
//               id="headline"
//               name="headline"
//               disabled={true}
//               className="w-full px-2 sm:px-4 py-1 sm:py-2 mt-1 sm:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
//               placeholder={`Enjoy Discount of $${formData.discount}`}
//             />
//           </div>
//           <div className="mb-2 sm:mb-6">
//             <label
//               htmlFor="expiry"
//               className="block text-sm font-semibold text-gray-700"
//             >
//               When does it expire?
//             </label>
//             <input
//               type="date"
//               id="expiry"
//               name="expiry"
//               value={formData.expiry}
//               onChange={handleInputChange}
//               className="w-full px-2 sm:px-4 py-1 sm:py-2 mt-1 sm:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SummaryEdit;


import React, { useState } from "react";

const SummaryEdit = ({ formData, handleInputChange }) => {
  return (
    <>
      <div
        className="flex-1 flex flex-col space-y-2 sm:space-y-6 overflow-y-auto max-h-full"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Title */}
        <div className="mb-1 sm:mb-2">
          <label
            htmlFor="title"
            className="text-sm font-semibold text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-2 sm:px-4 py-1 sm:py-2 mt-1 sm:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
            placeholder="Enter Title"
          />
        </div>

        {/* Description */}
        <div className="mb-2 sm:mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-2 sm:px-4 py-1 sm:py-2 mt-1 sm:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
            placeholder="Enter campaign description"
            rows="3"
          />
        </div>

        {/* Discount */}
        <div className="grid grid-cols-1 gap-2 sm:gap-6">
          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="discount"
              className="block text-sm font-semibold text-gray-700"
            >
              How much $ discount? ​
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              className="w-full px-2 sm:px-4 py-1 sm:py-2 mt-1 sm:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
              placeholder={`Enter discount %`}
            />
          </div>
          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="discountValue"
              className="block text-sm font-semibold text-gray-700"
            >
              What's the Deal Value?​
            </label>
            <input
              type="number"
              id="discountValue"
              name="discountValue"
              value={formData.discountValue}
              onChange={handleInputChange}
              className="w-full px-2 sm:px-4 py-1 sm:py-2 mt-1 sm:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
              placeholder={`Enter discount %`}
            />
          </div>
        </div>

        {/* Headline (Auto created)​ & When does it expire?​ */}
        <div className="grid grid-cols-1 gap-2 sm:gap-6">
          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="headline"
              className="block text-sm font-semibold text-gray-700"
            >
              Headline (Auto created) ​
            </label>
            <input
              type="text"
              id="headline"
              name="headline"
              disabled={true}
              className="w-full px-2 sm:px-4 py-1 sm:py-2 mt-1 sm:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
              placeholder={`Enjoy Discount of $${formData.discount}`}
            />
          </div>
          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="expiry"
              className="block text-sm font-semibold text-gray-700"
            >
              When does it expire?
            </label>
            <input
              type="date"
              id="expiry"
              name="expiry"
              value={formData.expiry}
              onChange={handleInputChange}
              className="w-full px-2 sm:px-4 py-1 sm:py-2 mt-1 sm:mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryEdit;
