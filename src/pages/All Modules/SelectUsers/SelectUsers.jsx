import React, { useState } from "react";

const SelectUsers = () => {
  //   const navigate = useNavigate();
  const [view, setView] = useState("individual");
  const [selectedDates, setSelectedDates] = useState([
    "12/02/2034",
    "23/02/2034",
    "10/03/2034",
    "12/03/2034",
  ]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const buttons = ["Creative", "Whatsapp", "SMS", "Email"];

  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (buttonName) => {
    setActiveButton(buttonName === activeButton ? null : buttonName);
  };
  const [selectedOptions, setSelectedOptions] = useState([]);

  //   const handleBackClick = () => navigate("/WhatsappModule");
  //   const handleContinueClick = () => navigate("/summary");

  const dummyUsers = [
    { id: 1, name: "Rajesh Kumar", phone: "+91 92xxxxxxxx" },
    { id: 2, name: "Rajesh Kumar", phone: "+91 92xxxxxxxx" },
    { id: 3, name: "Rajesh Kumar", phone: "+91 92xxxxxxxx" },
    { id: 4, name: "Rajesh Kumar", phone: "+91 92xxxxxxxx" },
    { id: 5, name: "Rajesh Kumar", phone: "+91 92xxxxxxxx" },
    { id: 6, name: "Rajesh Kumar", phone: "+91 92xxxxxxxx" },
    { id: 7, name: "Rajesh Kumar", phone: "+91 92xxxxxxxx" },
  ];

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
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const renderUserList = () => (
    <div className="space-y-2">
      {dummyUsers.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between py-2 border-b last:border-b-0"
        >
          <div>
            <p className="font-semibold text-[#040869]">{user.name}</p>
            <p className="text-sm text-gray-600">{user.phone}</p>
          </div>
          <div
            className="w-12 h-6 bg-gray-300 rounded-full p-1 cursor-pointer"
            onClick={() => handleSelectUser(user.id)}
          >
            <div
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                selectedUsers.includes(user.id)
                  ? "bg-[#040869] translate-x-6"
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
          <div>
            <p className="font-semibold text-[#040869]">{tag.tagName}</p>
            <p className="text-sm text-gray-600">{tag.tagCount}</p>
          </div>
          <div
            className="w-12 h-6 bg-gray-300 rounded-full p-1 cursor-pointer"
            onClick={() => handleSelectUser(tag.id)}
          >
            <div
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                selectedUsers.includes(tag.id)
                  ? "bg-[#040869] translate-x-6"
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
          <div>
            <p className="font-semibold text-[#040869]">{group.groupName}</p>
            <p className="text-sm text-gray-600">{group.groupCount}</p>
          </div>
          <div
            className="w-12 h-6 bg-gray-300 rounded-full p-1 cursor-pointer"
            onClick={() => handleSelectUser(group.id)}
          >
            <div
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                selectedUsers.includes(group.id)
                  ? "bg-[#040869] translate-x-6"
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
      <div className="flex-1 flex flex-col space-y-6 overflow-y-auto max-h-full">
        <div className="w-full h-full">
          <h2 className="text-2xl font-extrabold tracking-tighter">
            How do you want to send the Campaign?
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Fill in the details to create your campaign
          </p>
          <div className="flex mb-6 bg-gray-200 rounded-full p-2">
            <button
              onClick={() => {
                setView("individual");
              }}
              className={`flex-1 py-2 px-4 rounded-full ${
                view === "individual" ? "bg-[#040869] text-white" : ""
              }`}
            >
              Individual
            </button>
            <button
              onClick={() => {
                setView("tags");
              }}
              className={`flex-1 py-2 px-4 rounded-full ${
                view === "tags" ? "bg-[#040869] text-white" : ""
              }`}
            >
              Tags
            </button>
            <button
              onClick={() => {
                setView("groups");
              }}
              className={`flex-1 py-2 px-4 rounded-full ${
                view === "groups" ? "bg-[#040869] text-white" : ""
              }`}
            >
              Groups
            </button>
          </div>
          {view === "individual" && renderUserList()}
          {view === "tags" && renderTagsList()}
          {view === "groups" && renderGroupsList()}
        </div>
      </div>
    </>
  );
};

export default SelectUsers;
