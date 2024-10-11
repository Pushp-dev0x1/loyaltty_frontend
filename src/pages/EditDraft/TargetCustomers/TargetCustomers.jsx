// import React, { useState, useEffect } from "react";
// import { useGetUsersByMerchantQuery } from "../../../store/services/userService";
// import { useNavigate, useLocation } from "react-router-dom";
// import { PlusCircle } from "lucide-react"; // Import the PlusCircle icon

// const TargetCustomers = ({ selectedUsers, setSelectedUsers }) => {
//   const [view, setView] = useState("all");
//   // const { data: userdata, isLoading: isblogsloading } = useGetUsersByMerchantQuery('66b2858654354cd7467e5e7c');
//   const { data: userdata } = useGetUsersByMerchantQuery('66b2858654354cd7467e5e7c');
//   const [isMobile, setIsMobile] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     if (userdata) {
//       setUsers(userdata);
//     }
//   }, [userdata]);

//   useEffect(() => {
//     if (location.state?.users) {
//       setUsers(prevUsers => [...prevUsers, ...location.state.users]);
//     }
//   }, [location.state]);

//   // Check if the screen is mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // const dummyTags = [
//   //   { id: 1, tagName: "#Loyalltymembers", tagCount: "12" },
//   //   { id: 2, tagName: "#testers", tagCount: "9" },
//   //   { id: 3, tagName: "#dailycustoms", tagCount: "2" },
//   //   { id: 4, tagName: "#royals", tagCount: "42" },
//   //   { id: 5, tagName: "#welcomenew", tagCount: "69" },
//   //   { id: 6, tagName: "#Kumarrajesh", tagCount: "13" },
//   //   { id: 7, tagName: "#Rajeshkumar", tagCount: "10" },
//   // ];

//   const dummyTags = [
//     {
//       id: 1,
//       groupName: "#new_users",
//       groupUsers: users.filter(user => user.mail?.endsWith("@loyaltty.com")),
//     },
//     {
//       id: 2,
//       groupName: "#devs_team",
//       groupUsers: users.filter(user => ["kunal@loyaltty.com", "yadavpushp69@gmail.com"].includes(user.mail)),
//     },
//     {
//       id: 3,
//       groupName: "#techylord",
//       groupUsers: users.filter(user => user.mail === "mba.rajatbansal@gmail.com"),
//     },
//     {
//       id: 4,
//       groupName: "#admins",
//       groupUsers: users.filter(user => ["ranajit@loyaltty.com", "bamadev@gmail.com", "mba.rajatbansal@gmail.com"].includes(user.mail)),
//     },
//   ];

//   // const dummyGroups = [
//   //   { id: 1, groupName: "Loyalltymembers", groupCount: "12" },
//   //   { id: 2, groupName: "testers", groupCount: "9" },
//   //   { id: 3, groupName: "dailycustoms", groupCount: "2" },
//   //   { id: 4, groupName: "royals", groupCount: "42" },
//   //   { id: 5, groupName: "welcomenew", groupCount: "69" },
//   //   { id: 6, groupName: "Kumarrajesh", groupCount: "13" },
//   //   { id: 7, groupName: "Rajeshkumar", groupCount: "10" },
//   // ];

//   const dummyGroups = [
//     {
//       id: 1,
//       groupName: "Loyalty Members",
//       groupUsers: users.filter(user => user.mail?.endsWith("@loyaltty.com")),
//     },
//     {
//       id: 2,
//       groupName: "Developers",
//       groupUsers: users.filter(user => ["kunal@loyaltty.com", "yadavpushp69@gmail.com"].includes(user.mail)),
//     },
//     {
//       id: 3,
//       groupName: "Tech Head",
//       groupUsers: users.filter(user => user.mail === "mba.rajatbansal@gmail.com"),
//     },
//     {
//       id: 4,
//       groupName: "Owners",
//       groupUsers: users.filter(user => ["ranajit@loyaltty.com", "bamadev@gmail.com", "mba.rajatbansal@gmail.com"].includes(user.mail)),
//     },
//   ];

//   // const handleSelectUser = (userId) => {
//   //   setSelectedUsers(userId);
//   // };

//   const handleSelectUser = (userId) => {
//     const updatedSelectedUsers = selectedUsers.includes(userId)
//       ? selectedUsers.filter((id) => id !== userId)
//       : [...selectedUsers, userId];

//     setSelectedUsers(updatedSelectedUsers);
//   };
//   const handleGroupSelection = (group) => {
//     const groupUserIds = group.groupUsers.map((user) => user._id);
//     const allUsersSelected = groupUserIds.every((userId) => selectedUsers.includes(userId));
//     const updatedSelectedUsers = allUsersSelected
//       ? selectedUsers.filter((userId) => !groupUserIds.includes(userId))
//       : [...new Set([...selectedUsers, ...groupUserIds])];

//     setSelectedUsers(updatedSelectedUsers);
//   };

//   const handleTagSelection = (group) => {
//     const groupUserIds = group.groupUsers.map((user) => user._id);
//     const allUsersSelected = groupUserIds.every((userId) => selectedUsers.includes(userId));
//     const updatedSelectedUsers = allUsersSelected
//       ? selectedUsers.filter((userId) => !groupUserIds.includes(userId))
//       : [...new Set([...selectedUsers, ...groupUserIds])];

//     setSelectedUsers(updatedSelectedUsers);
//   };


//   const handleAddUsers = () => {
//     navigate('/addUsers', { state: { users } });
//   };

//   // const renderUserList = () => (
//   //   <div className="space-y-2">
//   //     {users.map((user) => (
//   //       <div
//   //         key={user._id}
//   //         className="flex items-center justify-between py-2 border-b last:border-b-0"
//   //       >
//   //         <div className={isMobile ? "w-3/4" : ""}>
//   //           <p className="font-semibold text-[#040869] text-sm md:text-base">{user.username}</p>
//   //           <p className="text-xs md:text-sm text-gray-600">{user.phoneNumber || user.email}</p>
//   //         </div>
//   //         <div
//   //           className="w-10 h-5 md:w-12 md:h-6 bg-gray-300 rounded-full p-1 cursor-pointer"
//   //           onClick={() => handleSelectUser(user._id)}
//   //         >
//   //           <div
//   //             className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
//   //               selectedUsers.includes(user._id)
//   //                 ? "bg-[#040869] translate-x-5 md:translate-x-6"
//   //                 : "bg-white"
//   //             }`}
//   //           />
//   //         </div>
//   //       </div>
//   //     ))}
//   //   </div>
//   // );

//   const renderUserList = () => (
//     <div className="space-y-2">
//       {users.map(user => (
//         <div
//           key={user._id}
//           className="flex items-center justify-between py-2 border-b last:border-b-0"
//         >
//           <div className={isMobile ? "w-3/4" : ""}>
//             <p className="font-semibold text-[#040869] text-sm md:text-base">{user.username}</p>
//             <p className="text-xs md:text-sm text-gray-600">{user.phoneNumber}</p>

//           </div>
//           <div
//             className="w-10 h-5 md:w-12 md:h-6 bg-gray-300 rounded-full p-1 cursor-pointer"
//             onClick={() => handleSelectUser(user._id)}
//           >
//             <div
//               className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${selectedUsers.includes(user._id)
//                 ? "bg-[#040869] translate-x-5 md:translate-x-6"
//                 : "bg-white"
//                 }`}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   const renderTagsList = () => (
//     <div className="space-y-2">
//       {dummyTags.map(group => {
//         const groupUserIds = group.groupUsers.map(user => user._id);
//         const allUsersSelected = groupUserIds.every(userId => selectedUsers.includes(userId));

//         return (
//           <div
//             key={group.id}
//             className="flex items-center justify-between py-2 border-b last:border-b-0"
//           >
//             <div className={isMobile ? "w-3/4" : ""}>
//               <p className="font-semibold text-[#040869] text-sm md:text-base">{group.groupName}</p>
//               <p className="text-xs md:text-sm text-gray-600">{group.groupUsers.length} members</p>
//             </div>
//             <div
//               className="w-10 h-5 md:w-12 md:h-6 bg-gray-300 rounded-full p-1 cursor-pointer"
//               onClick={() => handleTagSelection(group)}
//             >
//               <div
//                 className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${allUsersSelected
//                   ? "bg-[#040869] translate-x-5 md:translate-x-6"
//                   : "bg-white"
//                   }`}
//               />
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );

//   // const renderTagsList = () => (
//   //   <div className="space-y-2">
//   //     {dummyTags.map((tag) => (
//   //       <div
//   //         key={tag.id}
//   //         className="flex items-center justify-between py-2 border-b last:border-b-0"
//   //       >
//   //         <div className={isMobile ? "w-3/4" : ""}>
//   //           <p className="font-semibold text-[#040869] text-sm md:text-base">{tag.tagName}</p>
//   //           <p className="text-xs md:text-sm text-gray-600">{tag.tagCount}</p>
//   //         </div>
//   //         <div
//   //           className="w-10 h-5 md:w-12 md:h-6 bg-gray-300 rounded-full p-1 cursor-pointer"
//   //           onClick={() => handleSelectUser(tag.id)}
//   //         >
//   //           <div
//   //             className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
//   //               selectedUsers.includes(tag.id)
//   //                 ? "bg-[#040869] translate-x-5 md:translate-x-6"
//   //                 : "bg-white"
//   //             }`}
//   //           />
//   //         </div>
//   //       </div>
//   //     ))}
//   //   </div>
//   // );

//   // const renderGroupsList = () => (
//   //   <div className="space-y-2">
//   //     {dummyGroups.map((group) => (
//   //       <div
//   //         key={group.id}
//   //         className="flex items-center justify-between py-2 border-b last:border-b-0"
//   //       >
//   //         <div className={isMobile ? "w-3/4" : ""}>
//   //           <p className="font-semibold text-[#040869] text-sm md:text-base">{group.groupName}</p>
//   //           <p className="text-xs md:text-sm text-gray-600">{group.groupCount}</p>
//   //         </div>
//   //         <div
//   //           className="w-10 h-5 md:w-12 md:h-6 bg-gray-300 rounded-full p-1 cursor-pointer"
//   //           onClick={() => handleSelectUser(group.id)}
//   //         >
//   //           <div
//   //             className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
//   //               selectedUsers.includes(group.id)
//   //                 ? "bg-[#040869] translate-x-5 md:translate-x-6"
//   //                 : "bg-white"
//   //             }`}
//   //           />
//   //         </div>
//   //       </div>
//   //     ))}
//   //   </div>
//   // );

//   const renderGroupsList = () => (
//     <div className="space-y-2">
//       {dummyGroups.map(group => {
//         const groupUserIds = group.groupUsers.map(user => user._id);
//         const allUsersSelected = groupUserIds.every(userId => selectedUsers.includes(userId));

//         return (
//           <div
//             key={group.id}
//             className="flex items-center justify-between py-2 border-b last:border-b-0"
//           >
//             <div className={isMobile ? "w-3/4" : ""}>
//               <p className="font-semibold text-[#040869] text-sm md:text-base">{group.groupName}</p>
//               <p className="text-xs md:text-sm text-gray-600">{group.groupUsers.length} members</p>
//             </div>
//             <div
//               className="w-10 h-5 md:w-12 md:h-6 bg-gray-300 rounded-full p-1 cursor-pointer"
//               onClick={() => handleGroupSelection(group)}
//             >
//               <div
//                 className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${allUsersSelected
//                   ? "bg-[#040869] translate-x-5 md:translate-x-6"
//                   : "bg-white"
//                   }`}
//               />
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );

//   return (
//     // <>
//     //   <div className="flex-1 flex flex-col space-y-4 md:space-y-6 overflow-y-auto max-h-full" style={{ scrollbarWidth: "none" }}>
//     //     <div className="w-full h-full px-4 md:px-0">
//     //       <h2 className="text-xl md:text-2xl font-extrabold tracking-tighter">
//     //         How do you want to send the Campaign?
//     //       </h2>
//     //       <p className="text-base md:text-lg leading-relaxed text-gray-600">
//     //         Fill in the details to create your campaign
//     //       </p>
//     //       <div className="flex mb-4 md:mb-6 bg-gray-200 rounded-full p-1 md:p-2 text-xs md:text-base">
//     //         <button
//     //           onClick={() => {
//     //             setView("all");
//     //           }}
//     //           className={`flex-1 py-1 md:py-2 px-2 md:px-4 rounded-full ${
//     //             view === "all" ? "bg-[#040869] text-white" : ""
//     //           }`}
//     //         >
//     //           All
//     //         </button>
//     //         <button
//     //           onClick={() => {
//     //             setView("groups");
//     //           }}
//     //           className={`flex-1 py-1 md:py-2 px-2 md:px-4 rounded-full ${
//     //             view === "groups" ? "bg-[#040869] text-white" : ""
//     //           }`}
//     //         >
//     //           Groups
//     //         </button>
//     //         <button
//     //           onClick={() => {
//     //             setView("tags");
//     //           }}
//     //           className={`flex-1 py-1 md:py-2 px-2 md:px-4 rounded-full ${
//     //             view === "tags" ? "bg-[#040869] text-white" : ""
//     //           }`}
//     //         >
//     //           Tags
//     //         </button>
//     //         <button
//     //           onClick={() => {
//     //             setView("individual");
//     //           }}
//     //           className={`flex-1 py-1 md:py-2 px-2 md:px-4 rounded-full ${
//     //             view === "individual" ? "bg-[#040869] text-white" : ""
//     //           }`}
//     //         >
//     //           Individual
//     //         </button>
//     //       </div>
//     //       <div className="flex justify-center mb-4">
//     //         <button
//     //           onClick={handleAddUsers}
//     //           className="px-4 py-2 bg-[#040869] text-white rounded-full hover:bg-[#030657] transition-colors duration-300 text-sm md:text-base font-semibold flex items-center"
//     //         >
//     //           <PlusCircle className="mr-2" size={20} /> Add Users
//     //         </button>
//     //       </div>
//     //       {view === "all" && renderUserList()}
//     //       {view === "individual" && renderUserList()}
//     //       {view === "tags" && renderTagsList()}
//     //       {view === "groups" && renderGroupsList()}
//     //     </div>
//     //   </div>
//     // </>

//     <>
//       <div className="flex-1 flex flex-col space-y-4 md:space-y-6 overflow-y-auto max-h-full" style={{ scrollbarWidth: "none" }}>
//         <div className="w-full h-full px-4 md:px-0">

//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0 mb-2 md:mb-2">
//             <div className="flex flex-col w-full md:w-2/3">
//               <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#040869] mb-2">
//                 How do you want to send the Campaign?
//               </h2>
//               {/* <p className="text-sm md:text-base leading-relaxed text-gray-600">
//                 Fill in the details to create your personalized campaign
//               </p> */}
//             </div>
//             <div className="w-full md:w-auto">
//               <button
//                 onClick={handleAddUsers}
//                 className="w-full md:w-auto px-6 py-3 bg-[#040869] text-white rounded-full hover:bg-[#030657] transition-all duration-300 text-sm md:text-base font-semibold flex items-center justify-center md:justify-start shadow-md hover:shadow-lg"
//               >
//                 <PlusCircle className="mr-2" size={20} />
//                 <span>Add Users</span>
//               </button>
//             </div>
//           </div>

//           <div className="flex mb-4 md:mb-6 bg-gray-200 rounded-full p-1 md:p-2 text-xs md:text-base">
//             <button
//               onClick={() => {
//                 setView("all");
//               }}
//               className={`flex-1 py-1 md:py-2 px-2 md:px-4 rounded-full ${view === "all" ? "bg-[#040869] text-white" : ""
//                 }`}
//             >
//               All
//             </button>
//             <button
//               onClick={() => {
//                 setView("groups");
//               }}
//               className={`flex-1 py-1 md:py-2 px-2 md:px-4 rounded-full ${view === "groups" ? "bg-[#040869] text-white" : ""
//                 }`}
//             >
//               Groups
//             </button>
//             <button
//               onClick={() => {
//                 setView("tags");
//               }}
//               className={`flex-1 py-1 md:py-2 px-2 md:px-4 rounded-full ${view === "tags" ? "bg-[#040869] text-white" : ""
//                 }`}
//             >
//               Tags
//             </button>
//             {/* <button
//               onClick={() => {
//                 setView("individual");
//               }}
//               className={`flex-1 py-1 md:py-2 px-2 md:px-4 rounded-full ${
//                 view === "individual" ? "bg-[#040869] text-white" : ""
//               }`}
//             >
//               Individual
//             </button> */}
//           </div>
//           <div className="flex justify-center items-center space-x-4">
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="selectAll"
//                 className="mr-2 form-checkbox text-[#040869] border-[#040869] rounded focus:ring-[#040869]"
//               // onChange={handleSelectAll}
//               />
//               <label htmlFor="selectAll" className="text-sm md:text-base">Select All</label>
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="individual"
//                 className="mr-2 form-checkbox text-[#040869] border-[#040869] rounded focus:ring-[#040869]"
//               // onChange={handleIndividualSelect}
//               />
//               <label htmlFor="individual" className="text-sm md:text-base">Individual</label>
//             </div>
//           </div>
//           {view === "all" && renderUserList()}
//           {/* {view === "individual" && renderUserList()} */}
//           {view === "tags" && renderTagsList()}
//           {view === "groups" && renderGroupsList()}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TargetCustomers;



import React, { useState, useEffect } from "react";
import { useGetUsersByMerchantQuery } from "../../../store/services/userService";
import { useNavigate, useLocation } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const TargetCustomers = ({ selectedUsers, setSelectedUsers }) => {
  const [view, setView] = useState("all");
  const { data: userdata } = useGetUsersByMerchantQuery(
    "66b2858654354cd7467e5e7c"
  );
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (userdata) {
      setUsers(userdata);
    }
  }, [userdata]);
  useEffect(() => {
    if (users) {
      handleSelectAll();
    }
  }, [users]);

  useEffect(() => {
    if (location.state?.users) {
      setUsers((prevUsers) => [...prevUsers, ...location.state.users]);
    }
  }, [location.state]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleSelectAll = () => {
    const allUserIds = users.map((user) => user._id);
    const areAllSelected = allUserIds.every((userId) =>
      selectedUsers.includes(userId)
    );

    if (areAllSelected) {
      // If all users are selected, deselect all
      setSelectedUsers([]);
    } else {
      // If not all users are selected, select all
      setSelectedUsers(allUserIds);
    }

    // Update the checkbox state based on selection
    setSelectAllChecked(!areAllSelected);
  };

  const dummyTags = [
    {
      id: 1,
      groupName: "#new_users",
      groupUsers: users.filter((user) => user.mail?.endsWith("@loyaltty.com")),
    },
    {
      id: 2,
      groupName: "#devs_team",
      groupUsers: users.filter((user) =>
        ["kunal@loyaltty.com", "yadavpushp69@gmail.com"].includes(user.mail)
      ),
    },
    {
      id: 3,
      groupName: "#techylord",
      groupUsers: users.filter(
        (user) => user.mail === "mba.rajatbansal@gmail.com"
      ),
    },
    {
      id: 4,
      groupName: "#admins",
      groupUsers: users.filter((user) =>
        [
          "ranajit@loyaltty.com",
          "bamadev@gmail.com",
          "mba.rajatbansal@gmail.com",
        ].includes(user.mail)
      ),
    },
  ];
  const dummyGroups = [
    {
      id: 1,
      groupName: "Loyalty Members",
      groupUsers: users.filter((user) => user.mail?.endsWith("@loyaltty.com")),
    },
    {
      id: 2,
      groupName: "Developers",
      groupUsers: users.filter((user) =>
        ["kunal@loyaltty.com", "yadavpushp69@gmail.com"].includes(user.mail)
      ),
    },
    {
      id: 3,
      groupName: "Tech Head",
      groupUsers: users.filter(
        (user) => user.mail === "mba.rajatbansal@gmail.com"
      ),
    },
    {
      id: 4,
      groupName: "Owners",
      groupUsers: users.filter((user) =>
        [
          "ranajit@loyaltty.com",
          "bamadev@gmail.com",
          "mba.rajatbansal@gmail.com",
        ].includes(user.mail)
      ),
    },
  ];

  const handleSelectUser = (userId) => {
    const updatedSelectedUsers = selectedUsers.includes(userId)
      ? selectedUsers.filter((id) => id !== userId)
      : [...selectedUsers, userId];

    setSelectedUsers(updatedSelectedUsers);
  };
  const handleGroupSelection = (group) => {
    const groupUserIds = group.groupUsers.map((user) => user._id);
    const allUsersSelected = groupUserIds.every((userId) =>
      selectedUsers.includes(userId)
    );
    const updatedSelectedUsers = allUsersSelected
      ? selectedUsers.filter((userId) => !groupUserIds.includes(userId))
      : [...new Set([...selectedUsers, ...groupUserIds])];

    setSelectedUsers(updatedSelectedUsers);
  };

  const handleTagSelection = (group) => {
    const groupUserIds = group.groupUsers.map((user) => user._id);
    const allUsersSelected = groupUserIds.every((userId) =>
      selectedUsers.includes(userId)
    );
    const updatedSelectedUsers = allUsersSelected
      ? selectedUsers.filter((userId) => !groupUserIds.includes(userId))
      : [...new Set([...selectedUsers, ...groupUserIds])];

    setSelectedUsers(updatedSelectedUsers);
  };

  const handleAddUsers = () => {
    navigate("/addUsers", { state: { users } });
  };

  const renderUserList = () => (
    <div className="space-y-2">
      {users.map((user) => (
        <div
          key={user._id}
          className="flex items-center justify-between py-2 border-b last:border-b-0"
        >
          <div className={isMobile ? "w-3/4" : ""}>
            <p className="font-semibold text-[#040869] text-sm md:text-base">
              {user.username}
            </p>
            <p className="text-xs md:text-sm text-gray-600">
              {user.phoneNumber}
            </p>
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
      {dummyTags.map((group) => {
        const groupUserIds = group.groupUsers.map((user) => user._id);
        const allUsersSelected = groupUserIds.every((userId) =>
          selectedUsers.includes(userId)
        );

        return (
          <div
            key={group.id}
            className="flex items-center justify-between py-2 border-b last:border-b-0"
          >
            <div className={isMobile ? "w-3/4" : ""}>
              <p className="font-semibold text-[#040869] text-sm md:text-base">
                {group.groupName}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                {group.groupUsers.length} members
              </p>
            </div>
            <div
              className="w-10 h-5 md:w-12 md:h-6 bg-gray-300 rounded-full p-1 cursor-pointer"
              onClick={() => handleTagSelection(group)}
            >
              <div
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                  allUsersSelected
                    ? "bg-[#040869] translate-x-5 md:translate-x-6"
                    : "bg-white"
                }`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
  const renderGroupsList = () => (
    <div className="space-y-2">
      {dummyGroups.map((group) => {
        const groupUserIds = group.groupUsers.map((user) => user._id);
        const allUsersSelected = groupUserIds.every((userId) =>
          selectedUsers.includes(userId)
        );

        return (
          <div
            key={group.id}
            className="flex items-center justify-between py-2 border-b last:border-b-0"
          >
            <div className={isMobile ? "w-3/4" : ""}>
              <p className="font-semibold text-[#040869] text-sm md:text-base">
                {group.groupName}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                {group.groupUsers.length} members
              </p>
            </div>
            <div
              className="w-10 h-5 md:w-12 md:h-6 bg-gray-300 rounded-full p-1 cursor-pointer"
              onClick={() => handleGroupSelection(group)}
            >
              <div
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                  allUsersSelected
                    ? "bg-[#040869] translate-x-5 md:translate-x-6"
                    : "bg-white"
                }`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <div
        className="flex-1 flex flex-col space-y-4 md:space-y-6 overflow-y-auto max-h-full"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="w-full h-full px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0 mb-2 md:mb-2">
            <div className="flex flex-col w-full md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#040869] mb-2">
                How do you want to send the Campaign?
              </h2>
              {/* <p className="text-sm md:text-base leading-relaxed text-gray-600">
                Fill in the details to create your personalized campaign
              </p> */}
            </div>
            <div className="w-full md:w-auto">
              <button
                onClick={handleAddUsers}
                className="w-full md:w-auto px-6 py-3 bg-[#040869] text-white rounded-full hover:bg-[#030657] transition-all duration-300 text-sm md:text-base font-semibold flex items-center justify-center md:justify-start shadow-md hover:shadow-lg"
              >
                <PlusCircle className="mr-2" size={20} />
                <span>Add Users</span>
              </button>
            </div>
          </div>

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
            {/* <button
              onClick={() => {
                setView("individual");
              }}
              className={`flex-1 py-1 md:py-2 px-2 md:px-4 rounded-full ${
                view === "individual" ? "bg-[#040869] text-white" : ""
              }`}
            >
              Individual
            </button> */}
          </div>
          <div className="flex justify-center items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="selectAll"
                className="mr-2"
                checked={selectAllChecked}
                onChange={handleSelectAll}
              />
              <label htmlFor="selectAll" className="text-sm md:text-base">
                Select All
              </label>
            </div>
            {/* <div className="flex items-center">
              <input
                type="checkbox"
                id="individual"
                className="mr-2"
                // onChange={handleIndividualSelect}
              />
              <label htmlFor="individual" className="text-sm md:text-base">Individual</label>
            </div> */}
          </div>
          {view === "all" && renderUserList()}
          {/* {view === "individual" && renderUserList()} */}
          {view === "tags" && renderTagsList()}
          {view === "groups" && renderGroupsList()}
        </div>
      </div>
    </>
  );
};

export default TargetCustomers;
