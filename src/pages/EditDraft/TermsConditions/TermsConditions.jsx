// import React, { useState, useRef, useEffect } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";

// const COMMUNICATION_OPTIONS = [
//   { name: "Min purchase required." },
//   { name: "2 offers cannot be clubbed." },
//   { name: "Reward cannot be exchanged for cash." },
//   { name: "Reward redeemable in-store only." },
//   { name: "Additional T&C apply." },
// ];

// const TermsConditions = ({ formData, handlecontactChange, maildata, handleInputChange }) => {
//   const [isEnabled, setIsEnabled] = useState(true);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const contentRef = useRef(null);

//   console.log("main form data number", formData)
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     handleInputChange(name, value)
//     // setFormData((prevState) => ({
//     //   ...prevState,
//     //   [name]: value,
//     // }));
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   useEffect(() => {
//     if (isDropdownOpen && contentRef.current) {
//       contentRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [isDropdownOpen]);

//   const toggleOption = (option) => {
//     const newOptions = selectedOptions.includes(option)
//       ? selectedOptions.filter((o) => o !== option)
//       : [...selectedOptions, option];

//     // Update the selectedOptions state
//     setSelectedOptions(newOptions);

//     // Update the description with the new options
//     const updatedDescription = newOptions.join('\n');
//     handleInputChange("terms", updatedDescription)
//     // setFormData({
//     //   ...formData,
//     //   description: updatedDescription,
//     // });
//   };

//   return (
//     <>
//       <div className="flex-1 flex flex-col space-y-2 md:space-y-4 overflow-y-auto max-h-full scrollbar-none" style={{ scrollbarWidth: "none" }}>
//         <div className="w-full font-sans max-w-5xl mx-auto px-2 md:px-0">
//           <div className="flex flex-col items-start mb-2 md:mb-4">
//             <h2 className="text-xl md:text-2xl font-bold text-gray-800">
//               Contact Number
//             </h2>
//             <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">
//               This will be included in your Campaign link, SMS, WhatsApp & Email
//             </p>
//           </div>
//           <div className="mb-2 md:mb-4">
//             <input
//               type="number"
//               id="contactno"
//               name="contactno"
//               value={formData.contactno}
//               onChange={handlecontactChange}
//               className="w-full px-2 md:px-3 py-1 md:py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base md:text-base transition duration-150 ease-in-out"
//               placeholder="Enter contact number"
//             />
//           </div>
//           <div className="flex flex-col items-start mb-2 md:mb-4">
//             <h2 className="text-xl md:text-2xl font-bold text-gray-800">
//               Terms & Conditions
//             </h2>
//             <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">
//               Please select the terms and conditions for your campaign
//             </p>
//           </div>
//           <div className="mb-2 md:mb-4">
//             <label
//               htmlFor="terms"
//               className="block text-base md:text-base font-semibold text-gray-700 mb-1 md:mb-2"
//             >
//               Description
//             </label>
//             <textarea
//               id="terms"
//               name="terms"
//               value={maildata.terms}
//               onChange={handleChange}
//               className="w-full px-2 md:px-3 py-1 md:py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base md:text-base transition duration-150 ease-in-out"
//               placeholder="Enter campaign Terms & Conditions"
//               rows="4"
//             />
//           </div>
//         </div>

//         {/* Mobile and Desktop layout */}
//         <div className="px-2 md:px-0">
//           <div
//             onClick={toggleDropdown}
//             className="md:hidden w-full px-2 md:px-3 py-1 md:py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between items-center cursor-pointer"
//           >
//             <span className="text-base md:text-sm">{isDropdownOpen ? "Hide Details" : "View More"}</span>
//             {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//           </div>
//           <div
//             ref={contentRef}
//             className={`mt-2 md:mt-4 space-y-2 md:space-y-4 ${isDropdownOpen ? 'block' : 'hidden'} md:block`}
//           >
//             <CommunicationOptionsContainer
//               selectedOptions={selectedOptions}
//               toggleOption={toggleOption}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// const CommunicationOptionsContainer = ({ selectedOptions, toggleOption }) => (
//   <div className="bg-blue-50 rounded-xl p-2 md:p-4 flex flex-col items-center justify-center mx-auto max-w-full">
//     {COMMUNICATION_OPTIONS.map(({ name }) => (
//       <CommunicationOption
//         key={name}
//         name={name}
//         selected={selectedOptions.includes(name)}
//         onChange={toggleOption}
//         className="text-base md:text-base p-1 md:p-2 mb-1 md:mb-2"
//       />
//     ))}
//   </div>
// );

// const CommunicationOption = ({ name, selected, onChange }) => (
//   <div
//     className={`flex items-center justify-between cursor-pointer w-full ${
//       selected ? "activetermsFilter" : "termsfilter bg-white"
//     } text-sm p-1 mb-1 md:text-base md:p-2 md:mb-2`}
//     onClick={() => onChange(name)}
//   >
//     <span className="font-medium leading-tight text-indigo-950">
//       {name}
//     </span>
//     <span
//       className={`relative shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full border ${
//         selected ? "border-indigo-950 bg-indigo-950" : "border-gray-300 bg-white"
//       }`}
//       aria-hidden="true"
//     >
//       {selected && (
//         <span className="absolute inset-0 flex items-center justify-center">
//           <span className="w-1.5 h-1.5 md:w-1.5 md:h-1.5 bg-white rounded-full"></span>
//         </span>
//       )}
//     </span>
//   </div>
// );

// export default TermsConditions;

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const COMMUNICATION_OPTIONS = [
  { name: "Min purchase required." },
  { name: "2 offers cannot be clubbed." },
  { name: "Reward cannot be exchanged for cash." },
  { name: "Reward redeemable in-store only." },
  { name: "Additional T&C apply." },
];

const TermsConditions = ({
  formData,
  handlecontactChange,
  maildata,
  handleInputChange,
}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([
    "2 offers cannot be clubbed.",
    "Reward cannot be exchanged for cash.",
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const contentRef = useRef(null);

  console.log("main form data number", formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleInputChange(name, value);
    // setFormData((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (isDropdownOpen && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isDropdownOpen]);

  const toggleOption = (option) => {
    const newOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((o) => o !== option)
      : [...selectedOptions, option];

    // Update the selectedOptions state
    setSelectedOptions(newOptions);

    // Update the description with the new options
    const updatedDescription = newOptions.join("\n");
    handleInputChange("terms", updatedDescription);
    // setFormData({
    //   ...formData,
    //   description: updatedDescription,
    // });
  };

  return (
    <>
      <div
        className="flex-1 flex flex-col space-y-2 md:space-y-4 overflow-y-auto max-h-full scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="w-full font-sans max-w-5xl mx-auto px-2 md:px-0">
          <div className="flex flex-col items-start mb-2 md:mb-4">
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
          </div>
          <div className="flex flex-col items-start mb-2 md:mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Terms & Conditions
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">
              Please select the terms and conditions for your campaign
            </p>
          </div>
          <div className="mb-2 md:mb-4">
            <label
              htmlFor="terms"
              className="block text-base md:text-base font-semibold text-gray-700 mb-1 md:mb-2"
            >
              Description
            </label>
            <textarea
              id="terms"
              name="terms"
              value={maildata.terms}
              onChange={handleChange}
              className="w-full px-2 md:px-3 py-1 md:py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base md:text-base transition duration-150 ease-in-out"
              placeholder="Enter campaign Terms & Conditions"
              rows="4"
            />
          </div>
        </div>

        {/* Mobile and Desktop layout */}
        <div className="px-2 md:px-0">
          <div
            onClick={toggleDropdown}
            className="md:hidden w-full px-2 md:px-3 py-1 md:py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between items-center cursor-pointer"
          >
            <span className="text-base md:text-sm">
              {isDropdownOpen ? "Hide Details" : "View More"}
            </span>
            {isDropdownOpen ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div>
          <div
            ref={contentRef}
            className={`mt-2 md:mt-4 space-y-2 md:space-y-4 ${
              isDropdownOpen ? "block" : "hidden"
            } md:block`}
          >
            <CommunicationOptionsContainer
              selectedOptions={selectedOptions}
              toggleOption={toggleOption}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const CommunicationOptionsContainer = ({ selectedOptions, toggleOption }) => (
  <div className="bg-blue-50 rounded-xl p-2 md:p-4 flex flex-col items-center justify-center mx-auto max-w-full">
    {COMMUNICATION_OPTIONS.map(({ name }) => (
      <CommunicationOption
        key={name}
        name={name}
        selected={selectedOptions.includes(name)}
        onChange={toggleOption}
        className="text-base md:text-base p-1 md:p-2 mb-1 md:mb-2"
      />
    ))}
  </div>
);

const CommunicationOption = ({ name, selected, onChange }) => (
  <div
    className={`flex items-center justify-between cursor-pointer w-full ${
      selected ? "activetermsFilter" : "termsfilter bg-white"
    } text-sm p-1 mb-1 md:text-base md:p-2 md:mb-2`}
    onClick={() => onChange(name)}
  >
    <span className="font-medium leading-tight text-indigo-950">{name}</span>
    <span
      className={`relative shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full border ${
        selected
          ? "border-indigo-950 bg-indigo-950"
          : "border-gray-300 bg-white"
      }`}
      aria-hidden="true"
    >
      {selected && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-1.5 h-1.5 md:w-1.5 md:h-1.5 bg-white rounded-full"></span>
        </span>
      )}
    </span>
  </div>
);

export default TermsConditions;
