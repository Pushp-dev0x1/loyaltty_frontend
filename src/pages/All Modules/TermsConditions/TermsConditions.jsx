import React, { useState } from "react";

const COMMUNICATION_OPTIONS = [
  { name: "Min purchase required." },
  { name: "2 offers cannot be clubbed." },
  { name: "Reward cannot be exchanged for cash." },
  { name: "Reward redeemable in-store only." },
  { name: "Additional T&C apply." },
];

const TermsConditions = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [formData, setFormData] = useState({
    shopName: "",
    discount: "",
    shopAddress: "",
    scheduleTime: "",
    recurringDays: "",
  });
  const [isChecked, setIsChecked] = useState(false);
//   const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (buttonName) => {
    setActiveButton(buttonName === activeButton ? null : buttonName);
  };

  const buttons = ["Creative", "Whatsapp", "SMS", "Email"];

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

//   const handleBackClick = () => {
//     navigate("/selectplat");
//   };

//   const handleContinueClick = () => {
//     navigate("/selectusers");
//   };

  const toggleOption = (name) => {
    setSelectedOptions((prev) =>
      prev.includes(name)
        ? prev.filter((option) => option !== name)
        : [...prev, name]
    );
  };

  return (
    <>
      <div className="flex-1 flex flex-col space-y-6 overflow-y-auto max-h-full">
        <h2 className="text-2xl font-extrabold tracking-tighter">
          Terms & Conditions
        </h2>
        <p className="text-lg leading-relaxed text-gray-600">
          Please select the terms and conditions for your campaign
        </p>

        <div className="mb-1">
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
            className="w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter campaign description"
            rows="3"
          />
        </div>

        <CommunicationOptionsContainer
          selectedOptions={selectedOptions}
          toggleOption={toggleOption}
        />

        <label htmlFor="percentage" className="text-md text-gray-700">
          Reward Type
        </label>
        <div className="flex items-center gap-6 mt-4">
          <span className={` ${!isChecked ? "font-bold" : ""}`}>Amount</span>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={isChecked}
                onChange={handleToggle}
              />
              <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
              <div
                className={`absolute left-1 top-1 bg-[#040869] w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
                  isChecked ? "transform translate-x-6" : ""
                }`}
              ></div>
            </div>
          </label>
          <span className={` ${isChecked ? "font-bold" : ""}`}>Percentage</span>
        </div>

        <input
          type="number"
          id="discountValue"
          name="discountValue"
          value={formData.discountValue}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder={`Enter discount ${isChecked ? "percentage" : "amount"}`}
        />
      </div>
    </>
  );
};

const CommunicationOptionsContainer = ({ selectedOptions, toggleOption }) => (
  <div className="bg-gray-50 rounded-xl p-2">
    {COMMUNICATION_OPTIONS.map(({ name }) => (
      <CommunicationOption
        key={name}
        name={name}
        selected={selectedOptions.includes(name)}
        onChange={toggleOption}
      />
    ))}
  </div>
);

const CommunicationOption = ({ name, selected, onChange }) => (
  <div
    className={`flex items-center justify-between cursor-pointer mb-2 ${
      selected ? "activetermsFilter" : "termsfilter"
    }`}
    onClick={() => onChange(name)}
  >
    <span className="text-lg font-medium leading-tight text-indigo-950">
      {name}
    </span>
    <span
      className={`relative shrink-0 w-6 h-6 rounded-full border-2 ${
        selected ? "border-[#040869] bg-[#040869]" : "border-gray-300"
      }`}
      aria-hidden="true"
    >
      {selected && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
        </span>
      )}
    </span>
  </div>
);

export default TermsConditions;
