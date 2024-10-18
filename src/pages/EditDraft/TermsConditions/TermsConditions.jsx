import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const COMMUNICATION_OPTIONS = [
  { name: "Minimum Purchase Required." },
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

  const [show_Minimumquantity, setshow_Minimumquantity] = useState(false);

  useEffect(() => {
    if (isDropdownOpen && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isDropdownOpen]);

  const toggleOption = (option) => {
    const newOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((o) => o !== option)
      : [...selectedOptions, option];

    if (newOptions.includes("Minimum Purchase Required.")) {
      setshow_Minimumquantity(true); // Option is added
    } else {
      setshow_Minimumquantity(false); // Option is removed
    }

    // Update the selectedOptions state
    setSelectedOptions(newOptions);

    // Update the description with the new options
    const updatedDescription = newOptions.join("\n");
    handleInputChange("terms", updatedDescription);
  };

  const [minimum_Amount, setminimum_Amount] = useState("");
  const handleMinimumAmount = (e) => {
    const { value } = e.target;
    setminimum_Amount(value);

    // Create a message for the minimum amount
    const minimumAmountMessage = `Minimum Purchase Required - $${value}`;

    // Update options based on whether "Minimum Purchase Required." is included
    let newOptions = selectedOptions.filter(
      (option) => !option.startsWith("Minimum Purchase Required")
    );

    if (value) {
      newOptions = [
        ...newOptions,
        "Minimum Purchase Required.",
        minimumAmountMessage,
      ];
    }

    // Set the updated options
    setSelectedOptions(newOptions);

    // Update the description with the new options
    const updatedDescription = newOptions.join("\n");
    handleInputChange("terms", updatedDescription);
  };

  return (
    <>
      <div
        className="flex-1 flex flex-col overflow-y-auto max-h-full scrollbar-none p-2 sm:p-4"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="w-full font-sans max-w-5xl mx-auto px-2 sm:px-4">
          <div className="flex flex-col items-start mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Terms & Conditions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
              Please select the terms and conditions for your campaign
            </p>
          </div>
          <div className="">
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
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg sm:rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base transition duration-150 ease-in-out"
              placeholder="Enter campaign Terms & Conditions"
              rows="4"
            />
          </div>
        </div>

        {/* Mobile and Desktop layout */}
        <div className="px-2 sm:px-4 pb-4">
          <div
            onClick={toggleDropdown}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between items-center cursor-pointer sm:hidden"
          >
            <span className="text-sm sm:text-base">
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
            className={`mt-4 ${isDropdownOpen ? "block" : "hidden"} sm:block`}
          >
            <CommunicationOptionsContainer
              selectedOptions={selectedOptions}
              toggleOption={toggleOption}
            />
          </div>
          {show_Minimumquantity && (
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
              <div className="flex-1 mb-4">
                <label
                  htmlFor="minimum_amount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Minimum Amount
                </label>
                <div className="relative">
                  <input
                    id="minimum_amount"
                    name="minimum_amount"
                    value={minimum_Amount}
                    type="number"
                    onChange={handleMinimumAmount}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg sm:rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                    placeholder="Minimum Amount"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const CommunicationOptionsContainer = ({ selectedOptions, toggleOption }) => (
  <div className="border p-3 sm:p-4 flex flex-col items-center justify-center mx-auto max-w-full termsbox rounded-lg">
    {COMMUNICATION_OPTIONS.map(({ name }) => (
      <CommunicationOption
        key={name}
        name={name}
        selected={selectedOptions.includes(name)}
        onChange={toggleOption}
        className="text-sm sm:text-base p-2 mb-2"
      />
    ))}
  </div>
);

const CommunicationOption = ({ name, selected, onChange }) => (
  <div
    className={`flex items-center justify-start cursor-pointer w-full text-sm sm:text-base p-2 mb-2`}
    onClick={() => onChange(name)}
  >
    <span
      className={`relative shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full border ${
        selected
          ? "border-indigo-950 bg-indigo-950"
          : "border-gray-300 bg-white"
      }`}
      aria-hidden="true"
    >
      {selected && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></span>
        </span>
      )}
    </span>
    <span
      className={`font-medium leading-tight ml-3 ${
        selected ? "text-indigo-950" : "text-gray-500"
      }`}
    >
      {name}
    </span>
  </div>
);

export default TermsConditions;
