import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const COMMUNICATION_OPTIONS = [
  { name: "Minimum Purchase Required.", id: 1 },
  { name: "2 offers cannot be clubbed.", id: 2 },
  { name: "Reward cannot be exchanged for cash.", id: 3 },
  { name: "Reward redeemable in-store only.", id: 4 },
  { name: "Additional T&C apply.", id: 5 },
];

const TermsConditions = ({
  formData,
  handlecontactChange,
  maildata,
  handleInputChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([
    "2 offers cannot be clubbed.",
    "Reward cannot be exchanged for cash.",
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [minimumAmount, setMinimumAmount] = useState("");
  const contentRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleOption = (option) => {
    const newOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((o) => o !== option)
      : [...selectedOptions, option];

    setSelectedOptions(newOptions);

    if (option === "Minimum Purchase Required.") {
      setIsModalOpen(true);
    }

    const updatedDescription = newOptions.join("\n");
    handleInputChange("terms", updatedDescription);
  };

  const handleMinimumAmount = (e) => {
    const { value } = e.target;
    setMinimumAmount(value);

    const updatedOptions = [
      ...selectedOptions.filter(
        (option) => !option.startsWith("Minimum Purchase Required")
      ),
      `Minimum Purchase Required - $${value}`,
    ];

    setSelectedOptions(updatedOptions);

    const updatedDescription = updatedOptions.join("\n");
    handleInputChange("terms", updatedDescription);
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto max-h-full p-2 sm:p-4">
    <div className="w-full font-sans max-w-5xl mx-auto px-2 sm:px-4">
      <div className="flex flex-col items-start mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Terms & Conditions
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
          Please select the terms and conditions for your campaign
        </p>
      </div>
      <div>
        <label
          htmlFor="terms"
          className="block text-base sm:text-lg font-semibold text-gray-700 mb-2"
        >
          Description
        </label>
        <textarea
          id="terms"
          name="terms"
          value={maildata.terms}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg sm:rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base transition duration-150 ease-in-out"
          placeholder="Enter campaign Terms & Conditions"
          rows="4"
        />
      </div>
    </div>

    <div className="px-2 sm:px-4 pb-4">
      <div
        onClick={toggleDropdown}
        className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between items-center cursor-pointer sm:hidden"
      >
        <span className="text-sm sm:text-base">
          {isDropdownOpen ? "Hide Details" : "View More"}
        </span>
        {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      <div
        ref={contentRef}
        className={`mt-4 ${isDropdownOpen ? "block" : "hidden"} sm:block`}
      >
        <CommunicationOptionsContainer
          selectedOptions={selectedOptions}
          toggleOption={toggleOption}
        />
      </div>
    </div>

    {/* Small Card Modal for Minimum Amount */}
    {isModalOpen && (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Enter Minimum Amount
          </h3>
          <input
            type="number"
            value={minimumAmount}
            onChange={handleMinimumAmount}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Minimum Amount"
          />
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    )}
  </div>
  );
};

// const CommunicationOptionsContainer = ({ selectedOptions, toggleOption }) => (
//   <div className="border p-2 sm:p-2 flex flex-col items-center justify-center mx-auto max-w-full termsbox rounded-lg">
//     {COMMUNICATION_OPTIONS.map(({ name, id }) => (
//       <CommunicationOption
//         key={id}
//         name={name}
//         selected={selectedOptions.includes(name)}
//         onChange={toggleOption}
//       />
//     ))}
//   </div>
// );

// const CommunicationOption = ({ name, selected, onChange }) => (
//   <div
//     className="flex items-center justify-start cursor-pointer w-full text-sm sm:text-base p-2 mb-2"
//     onClick={() => onChange(name)}
//   >
//     <span
//       className={`relative shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full border ${
//         selected ? "border-indigo-500 bg-indigo-500" : "border-gray-300 bg-white"
//       }`}
//     >
//       {selected && (
//         <span className="absolute inset-0 flex items-center justify-center">
//           <span className="w-2 h-2 bg-white rounded-full"></span>
//         </span>
//       )}
//     </span>
//     <span
//       className={`font-medium leading-tight ml-2 ${
//         selected ? "text-indigo-500" : "text-gray-500"
//       }`}
//     >
//       {name}
//     </span>
//   </div>
// );

const CommunicationOptionsContainer = ({ selectedOptions, toggleOption }) => (
  <div className="border p-2 flex flex-col items-start justify-center mx-auto max-w-full rounded-lg">
    {COMMUNICATION_OPTIONS.map(({ name, id }) => (
      <CommunicationOption
        key={id}
        name={name}
        selected={selectedOptions.includes(name)}
        onChange={toggleOption}
      />
    ))}
  </div>
);

const CommunicationOption = ({ name, selected, onChange }) => (
  <div
    className="flex items-center justify-start cursor-pointer w-full text-xs sm:text-sm p-1 mb-1"
    onClick={() => onChange(name)}
  >
    <span
      className={`relative shrink-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full border ${
        selected ? "border-indigo-500 bg-indigo-500" : "border-gray-300 bg-white"
      }`}
    >
      {selected && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
        </span>
      )}
    </span>
    <span
      className={`font-medium leading-tight ml-2 ${
        selected ? "text-indigo-500" : "text-gray-500"
      }`}
    >
      {name}
    </span>
  </div>
);


export default TermsConditions;
