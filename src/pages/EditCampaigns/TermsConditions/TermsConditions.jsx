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
  const [selectedOptions, setSelectedOptions] = useState([  "2 offers cannot be clubbed.","Reward cannot be exchanged for cash."]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const contentRef = useRef(null);

  console.log("main form data number", formData)
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleInputChange(name, value)
    // setFormData((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [show_Minimumquantity, setshow_Minimumquantity] = useState(false)

  useEffect(() => {
    if (isDropdownOpen && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isDropdownOpen]);

  const toggleOption = (option) => {
    if(option == "Min purchase required." && selectedOptions.includes(option)){

    }
    let newOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((o) => o !== option)
      : [...selectedOptions, option];

      if (newOptions.includes("Min purchase required.")) {
        setshow_Minimumquantity(true);  // Option is added
      } else {
         newOptions = newOptions.filter((o) => o !== option && !o.includes("Minimum Purchase Required"));
      
        setshow_Minimumquantity(false);  // Option is removed
      }
    
    // Update the selectedOptions state
    setSelectedOptions(newOptions);

    // Update the description with the new options
    const updatedDescription = newOptions.join('\n');
    handleInputChange("terms", updatedDescription)
    // setFormData({
    //   ...formData,
    //   description: updatedDescription,
    // });
  };

const [minimum_Amount, setminimum_Amount] = useState('0')
const handleMinimumAmount = (e) => {
  const { value } = e.target;
  

  console.log(selectedOptions, "selected one");

  // Create a message for the minimum amount
  const minimumAmountMessage = `Minimum Purchase Required - $${value}`;

  // Determine if "Min purchase required." is already in selectedOptions
  const minPurchaseRequired = `Minimum Purchase Required - $${minimum_Amount}`;
  const hasMinPurchaseRequired = selectedOptions.includes(minPurchaseRequired);

  // Update options based on whether "Min purchase required." is included
  let newOptions;

  if (hasMinPurchaseRequired) {
    // If it's already included, update the existing minimum amount message or keep other options
    newOptions = selectedOptions.map(option => 
      option === `Minimum Purchase Required - $${minimum_Amount}` 
        ? minimumAmountMessage // Update the existing message
        : option
    );
  } else {
    // If it's not included, add it and the message
    newOptions = [...selectedOptions,  minimumAmountMessage];
  }

  // Set the updated options
  setSelectedOptions(newOptions);
  setminimum_Amount(value);
  // Update the description with the new options
  const updatedDescription = newOptions.join('\n');
  handleInputChange("terms", updatedDescription);
};

  return (
    <>
      <div className="flex-1 flex flex-col overflow-y-auto max-h-full scrollbar-none p-2" style={{ scrollbarWidth: "none" }}>
        <div className="w-full font-sans max-w-5xl mx-auto px-1 md:px-0">
       
          <div className="flex flex-col items-start mb-2 md:mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Terms & Conditions
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">
              Please select the terms and conditions for your campaign
            </p>
          </div>
          <div className="mb-1 md:mb-1">
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
              className="w-full px-2 md:px-4 py-1 md:py-2 bg-white border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base md:text-base transition duration-150 ease-in-out"
              placeholder="Enter campaign Terms & Conditions"
              rows="4"
            />
          </div>
        </div>

        {/* Mobile and Desktop layout */}
        <div className="px-0 md:px-0">
          <div
            onClick={toggleDropdown}
            className="md:hidden w-full px-2 md:px-3 py-1 md:py-2 bg-gray-100 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between items-center cursor-pointer"
          >
            <span className="text-base md:text-sm">{isDropdownOpen ? "Hide Details" : "View More"}</span>
            {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          <div
            ref={contentRef}
            className={` ${isDropdownOpen ? 'block' : 'hidden'} md:block`}
          >
            <CommunicationOptionsContainer
              selectedOptions={selectedOptions}
              toggleOption={toggleOption}
            />
          </div>
          {show_Minimumquantity ? 
          
          <div className="flex space-x-4">
          <div className="flex-1">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Minimum Amount
          </label>
          <div className="relative">
            <input
              
              id="title"
              name="title"
              value={minimum_Amount}
               type="number"
              onChange={handleMinimumAmount}
              className="w-full px-5 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Minimum Amount "
            />
           
          </div>
          </div>
          <div className="flex-1"></div>
        </div>

        :null}
        </div>
      </div>
    </>
  );
};

const CommunicationOptionsContainer = ({ selectedOptions, toggleOption }) => (
  <div className=" border p-2 md:p-4 flex flex-col items-center justify-center mx-auto max-w-full termsbox" >
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
    className={`flex items-center justify-start cursor-pointer w-full text-sm p-1 mb-1 md:text-base md:p-2 md:mb-2`}
    onClick={() => onChange(name)}
  >
    <span
      className={`relative shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full border ${
        selected ? "border-indigo-950 bg-indigo-950" : "border-gray-300 bg-white"
      }`}
      aria-hidden="true"
    >
      {selected && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-1.5 h-1.5 md:w-1.5 md:h-1.5 bg-white rounded-full"></span>
        </span>
      )}
    </span>
    <span className={`font-medium leading-tight  ml-3  ${
      selected ? "text-indigo-950" : "text-gray-500"
    }`}>
      {name}
    </span>
    
  </div>
);

export default TermsConditions;
