import React, { useState, useEffect } from "react";
import { useGetUsersByMerchantQuery } from "../../../store/services/userService";

const TargetCustomers = ({ selectedUsers, setSelectedUsers }) => {
  const [view, setView] = useState("all");
  const { data: userdata, isLoading: isblogsloading } = useGetUsersByMerchantQuery('66b2858654354cd7467e5e7c');
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const dummyTags = [
    { id: 1, tagName: "#Loyalltymembers", tagCount: "12" },
    { id: 2, tagName: "#testers", tagCount: "9" },
    { id: 3, tagName: "#dailycustoms", tagCount: "2" },
    { id: 4, tagName: "#royals", tagCount: "42" },
    { id: 5, tagName: "#welcomenew", tagCount: "69" },
    { id: 6, tagName: "#Kumarrajesh", tagCount: "13" },
    { id: 7, tagName: "#Rajeshkumar", tagCount: "10" },
  ];

  const dummyGroups = [
    { id: 1, groupName: "Loyalltymembers", groupCount: "12" },
    { id: 2, groupName: "testers", groupCount: "9" },
    { id: 3, groupName: "dailycustoms", groupCount: "2" },
    { id: 4, groupName: "royals", groupCount: "42" },
    { id: 5, groupName: "welcomenew", groupCount: "69" },
    { id: 6, groupName: "Kumarrajesh", groupCount: "13" },
    { id: 7, groupName: "Rajeshkumar", groupCount: "10" },
  ];

  const handleSelectUser = (userId) => {
    setSelectedUsers(userId);
  };

  const renderUserList = () => (
    <div className="space-y-2">
      {userdata?.map((user) => (
        <div
          key={user._id}
          className="flex items-center justify-between py-2 border-b last:border-b-0"
        >
          <div className={isMobile ? "w-3/4" : ""}>
            <p className="font-semibold text-[#040869] text-sm md:text-base">{user.username}</p>
            <p className="text-xs md:text-sm text-gray-600">{user.phoneNumber}</p>
          </div>
          <div
            className="w-10 h-5 md:w-12 md:h-6 bg-gray-300 rounded-full p-1 cursor-pointer"
            onClick={() => handleSelectUser(user._id)}
          >
            <div
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                selectedUsers.includes(user._id)
                  ? "bg-[#040869] translate-x-5 md:translate-x-6"
                  : "bg-white"
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderTagsList = () => (
    <div className="space-y-2">
      {dummyTags.map((tag) => (
        <div
          key={tag.id}
          className="flex items-center justify-between py-2 border-b last:border-b-0"
        >
          <div className={isMobile ? "w-3/4" : ""}>
            <p className="font-semibold text-[#040869] text-sm md:text-base">{tag.tagName}</p>
            <p className="text-xs md:text-sm text-gray-600">{tag.tagCount}</p>
          </div>
          <div
            className="w-10 h-5 md:w-12 md:h-6 bg-gray-300 rounded-full p-1 cursor-pointer"
            onClick={() => handleSelectUser(tag.id)}
          >
            <div
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                selectedUsers.includes(tag.id)
                  ? "bg-[#040869] translate-x-5 md:translate-x-6"
                  : "bg-white"
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderGroupsList = () => (
    <div className="space-y-2">
      {dummyGroups.map((group) => (
        <div
          key={group.id}
          className="flex items-center justify-between py-2 border-b last:border-b-0"
        >
          <div className={isMobile ? "w-3/4" : ""}>
            <p className="font-semibold text-[#040869] text-sm md:text-base">{group.groupName}</p>
            <p className="text-xs md:text-sm text-gray-600">{group.groupCount}</p>
          </div>
          <div
            className="w-10 h-5 md:w-12 md:h-6 bg-gray-300 rounded-full p-1 cursor-pointer"
            onClick={() => handleSelectUser(group.id)}
          >
            <div
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                selectedUsers.includes(group.id)
                  ? "bg-[#040869] translate-x-5 md:translate-x-6"
                  : "bg-white"
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="flex-1 flex flex-col space-y-4 md:space-y-6 overflow-y-auto max-h-full" style={{ scrollbarWidth: "none" }}>
        <div className="w-full h-full px-4 md:px-0">
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tighter">
            How do you want to send the Campaign?
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-gray-600">
            Fill in the details to create your campaign
          </p>
          <div className="flex mb-4 md:mb-6 bg-gray-200 rounded-full p-1 md:p-2 text-xs md:text-base">
            <button
              onClick={() => {
                setView("all");
              }}
              className={`flex-1 py-1 md:py-2 px-2 md:px-4 rounded-full ${
                view === "all" ? "bg-[#040869] text-white" : ""
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                setView("groups");
              }}
              className={`flex-1 py-1 md:py-2 px-2 md:px-4 rounded-full ${
                view === "groups" ? "bg-[#040869] text-white" : ""
              }`}
            >
              Groups
            </button>
            <button
              onClick={() => {
                setView("tags");
              }}
              className={`flex-1 py-1 md:py-2 px-2 md:px-4 rounded-full ${
                view === "tags" ? "bg-[#040869] text-white" : ""
              }`}
            >
              Tags
            </button>
            <button
              onClick={() => {
                setView("individual");
              }}
              className={`flex-1 py-1 md:py-2 px-2 md:px-4 rounded-full ${
                view === "individual" ? "bg-[#040869] text-white" : ""
              }`}
            >
              Individual
            </button>
          </div>
          {view === "all" && renderUserList()}
          {view === "individual" && renderUserList()}
          {view === "tags" && renderTagsList()}
          {view === "groups" && renderGroupsList()}
        </div>
      </div>
    </>
  );
};

export default TargetCustomers;
