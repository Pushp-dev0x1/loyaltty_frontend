import React, { useState } from "react";

const AboutCampaign = () => {
  const [formData, setFormData] = useState({
    title: "Jai Hind! Enjoy 20% Off on this Kargil Victory Day!",
    discount: "",
    shopAddress: "",
    scheduleTime: "",
    recurringDays: "",
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="flex-1 flex flex-col space-y-6 overflow-y-auto max-h-full">
        <h2 className="text-2xl font-extrabold tracking-tighter">
          What is the Campaign about?
        </h2>
        <p className="text-lg leading-relaxed text-gray-600">
          Fill in the details to create your campaign
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
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
              className="w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter Title"
            />
          </div>
          <div>
            <label
              htmlFor="contact"
              className="text-sm font-semibold text-gray-700"
            >
              Contact No.
            </label>
            <input
              type="number"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Contact No."
            />
          </div>
        </div>

        <div className="mb-6">
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
            rows="4"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="expiryDate"
            className="block text-sm font-semibold text-gray-700"
          >
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

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
          <span className={` ${isChecked ? "font-bold" : ""}`}>PERCENTAGE</span>
        </div>

        {/* </div> */}
        <input
          type="number"
          id="discountValue"
          name="discountValue"
          value={formData.discountValue}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder={`Enter discount %`}
        />
      </div>
    </>
  );
};

export default AboutCampaign;
