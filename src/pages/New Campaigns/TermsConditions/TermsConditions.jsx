import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const COMMUNICATION_OPTIONS = [
  { name: "Min purchase required." },
  { name: "2 offers cannot be clubbed." },
  { name: "Reward cannot be exchanged for cash." },
  { name: "Reward redeemable in-store only." },
  { name: "Additional T&C apply." },
];

const TermsConditions = ({ formData, handlecontactChange, maildata, handleInputChange }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const contentRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleInputChange(name, value);
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

    setSelectedOptions(newOptions);

    const updatedDescription = newOptions.join("\n");
    handleInputChange("terms", updatedDescription);
  };

  return (
    <>
      <div className="flex-1 flex flex-col space-y-4 max-h-full overflow-hidden">
        <div className="w-full font-sans max-w-5xl mx-auto px-4">
          <div className="flex flex-col items-start mb-4">
            <h2 className="text-xl font-bold text-gray-800">Contact Number</h2>
            <p className="text-sm text-gray-600 mt-2">
              This will be included in your Campaign link, SMS, WhatsApp & Email
            </p>
          </div>
          <div className="mb-4">
            <input
              type="number"
              id="contactno"
              name="contactno"
              value={formData.contactno}
              onChange={handlecontactChange}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base transition duration-150 ease-in-out"
              placeholder="Enter contact number"
            />
          </div>
          <div className="flex flex-col items-start mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Terms & Conditions</h2>
            <p className="text-sm text-gray-600 mt-1">
              Please select the terms and conditions for your campaign
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="terms"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description.............
            </label>
            <textarea
              id="terms"
              name="terms"
              value={maildata.terms}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-500 focus:border-transparent text-base transition duration-150 ease-in-out"
              placeholder="Enter campaign Terms & Conditions"
              rows="3"
            />
          </div>
        </div>

        {/* Mobile and Desktop layout */}
        <div className="px-2">
          <div
            onClick={toggleDropdown}
            className="md:hidden w-full px-1 py-0 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between items-center cursor-pointer"
          >
            <span className="text-base">
              {isDropdownOpen ? "Hide Details" : "View More"}
            </span>
            {isDropdownOpen ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
          </div>
          <div
            ref={contentRef}
            className={`mt-2 space-y-2 ${isDropdownOpen ? "block" : "hidden"} md:block`}
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
  <div className="bg-blue-50 rounded- p-4 flex flex-col items-center justify-center mx-auto max-w-full">
    {COMMUNICATION_OPTIONS.map(({ name }) => (
      <CommunicationOption
        key={name}
        name={name}
        selected={selectedOptions.includes(name)}
        onChange={toggleOption}
        className="text-base p-2 mb-2"
      />
    ))}
  </div>
);

const CommunicationOption = ({ name, selected, onChange }) => (
  <div
    className={`flex items-center justify-between cursor-pointer w-full ${
      selected ? "activetermsFilter" : "termsfilter bg-white"
    } text-sm p-2 mb-2`}
    onClick={() => onChange(name)}
  >
    <span className="font-medium leading-tight text-indigo-950">{name}</span>
    <span
      className={`relative shrink-0 w-5 h-5 rounded-full border ${
        selected ? "border-indigo-950 bg-indigo-950" : "border-gray-300 bg-white"
      }`}
      aria-hidden="true"
    >
      {selected && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
        </span>
      )}
    </span>
  </div>
);

export default TermsConditions;
