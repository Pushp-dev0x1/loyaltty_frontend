import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiClock, FiCalendar, FiDollarSign } from "react-icons/fi";

const CampaignCard = ({ campaignData }) => {
  const navigate = useNavigate();

  const handleShowDetails = () => {
    navigate(`/schedule/${campaignData._id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          badge: "bg-green-500",
          border: "border-green-500",
        };
      case 2:
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
          badge: "bg-blue-500",
          border: "border-blue-500",
        };
      case 3:
        return {
          bg: "bg-orange-100",
          text: "text-orange-800",
          badge: "bg-orange-500",
          border: "border-orange-500",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          badge: "bg-gray-500",
          border: "border-gray-500",
        };
    }
  };

  const statusColors = getStatusColor(campaignData.status);

  return (
    <div
      className={`${statusColors.bg} ${statusColors.border} border-2 rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md relative flex flex-col justify-between`}
      style={{
        height: "286px",
        borderRadius: "23px",
      }}
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h2
              className={`text-3xl font-bold text-black truncate`}
            >
              {campaignData.title}
            </h2>
            <span className={`inline-flex items-center justify-center w-10 h-10 border-2 rounded-full bg-white ${statusColors.text} text-xl font-semibold`}>
              %
            </span>
          </div>
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-lg text-gray-700">
              <FiClock className="mr-3 text-2xl" />
              <span>{campaignData.time}</span>
            </div>
            <div className="flex items-center text-lg text-gray-700">
              <FiDollarSign className="mr-3 text-2xl" />
              <span>${campaignData.amount}</span>
            </div>
          </div>
          <div className="flex items-center text-lg text-gray-700 mb-6">
            <FiCalendar className="mr-3 text-2xl" />
            <span>{campaignData.date}</span>
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center">
            <button
              onClick={handleShowDetails}
              className={`${statusColors.text} text-xl font-semibold underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${
                statusColors.badge.split("-")[1]
              }-300 hover:opacity-80 transition-opacity duration-300`}
            >
              Show Details
            </button>
            <span
              className={`px-10 py-4 rounded-full text-md font-bold text-white ${statusColors.badge}`}
            >
              {campaignData.status === 1 ? "Excellent" : campaignData.status === 2 ? "Well" : campaignData.status === 3 ? "Average" : campaignData.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Schedules = ({ data }) => {
  const [filter, setFilter] = useState("My Filter");

  return (
    <div className="p-4">
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border rounded-lg"
        >
          <option value="all">All Campaigns</option>
          <option value="active">Active Campaigns</option>
          <option value="completed">Completed Campaigns</option>
          <option value="upcoming">Upcoming Campaigns</option>
          <option value="draft">Draft Campaigns</option>
          <option value="paused">Paused Campaigns</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.map((campaign, index) => (
          <CampaignCard key={index} campaignData={campaign} />
        ))}
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((campaign, index) => (
          <div key={index} className="w-full">
            <CampaignCard campaignData={campaign} />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Schedules;
