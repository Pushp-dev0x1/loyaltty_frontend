import React, { useState } from "react";
import { Calendar, ChevronLeft } from "lucide-react";

const CampaignForm = ({
  formData,
  handleInputChange,
  handlecontactChange,
  rewardtype,
}) => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800">
        What is the Campaign about?
      </h2>
      <p className="text-base text-gray-600 mt-1 mb-4 md:mt-2 md:mb-5">
        Fill in the details to create your campaign
      </p>

      <div className="space-y-4 md:space-y-6">
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
              className="w-full px-4 md:px-5 py-1 md:py-3 text-base border border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
              className="w-full px-3 md:px-5 py-1 md:py-3 text-base border border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Template for promoting Krishna sales"
            />
            <span className="absolute right-3 -bottom-4 text-xs text-gray-400">
              {formData.description.length}/ 50
            </span>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center space-x-4">
          <div className="flex-1">
            <label
              htmlFor="discount"
              className="block text-xs md:text-sm font-medium text-gray-700 mb-1"
            >
              How Much {rewardtype === "amount" ? "$" : "%"} Discount?
            </label>
            <div className="flex px-3 md:px-4 py-1 md:py-1 border border-gray-300 rounded-full shadow-sm items-center">
              <button
                onClick={() =>
                  handleInputChange({
                    target: {
                      name: "discount",
                      value: Math.max(1, Number(formData.discount) - 1),
                    },
                  })
                }
                className="h-[30px] w-[30px] md:h-[34px] md:w-[34px] px-2 md:px-3 py-1 md:py-2 flex items-center justify-center border border-gray-300 rounded-full bg-gray-50 hover:bg-gray-100 text-sm md:text-base"
              >
                -
              </button>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                className="w-full focus:ring-indigo-500 focus:border-indigo-500 text-center hide-number-spinner text-sm md:text-base mx-2"
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
                className="h-[30px] w-[30px] md:h-[34px] md:w-[34px] px-2 md:px-3 py-1 md:py-2 flex items-center justify-center border border-gray-300 rounded-full bg-gray-50 hover:bg-gray-100 text-sm md:text-base"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex-1">
            <label
              htmlFor="expiry"
              className="block text-xs md:text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row space-x-4">
          <div className="flex-1">
            <label
              htmlFor="contactno"
              className="block text-xs md:text-sm font-medium text-gray-700 mb-1"
            >
              Contact No
            </label>
            <div className="relative">
              <input
                type="tel"
                id="contactno"
                name="contactno"
                value={formData.contactno}
                onChange={handlecontactChange}
                className="w-full px-3 md:px-5 py-1 md:py-2 text-sm md:text-base border border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter contact no."
              />
            </div>
          </div>

          <div className="flex-1">
            <label
              htmlFor="dealvalue"
              className="block text-xs md:text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 md:px-5 py-1 md:py-2 text-sm md:text-base border border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter deal value"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;
