// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";

// const COMMUNICATION_OPTIONS = [
//   { name: "WhatsApp", members: "100+ Templates available" },
//   { name: "SMS", members: "60+ members available" },
//   { name: "Email", members: "20+ members available" },
//   { name: "Messenger", members: "10+ members available" },
// ];

// const SelectPlatform = () => {
//   const navigate = useNavigate();
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const handleBackClick = () => navigate("/select-templates");
//   const handleContinueClick = () => navigate("/WhatsappModule");

//   const toggleOption = (name) => {
//     setSelectedOptions((prev) =>
//       prev.includes(name)
//         ? prev.filter((option) => option !== name)
//         : [...prev, name]
//     );
//   };

//   return (
//     <>
//       <h2 className="text-2xl font-extrabold tracking-tighter">
//         How do you want to send the Campaign?
//       </h2>
//       <p className="text-lg leading-relaxed text-gray-600">
//         Fill in the details to create your campaign
//       </p>
//       <CommunicationOptionsContainer
//         selectedOptions={selectedOptions}
//         toggleOption={toggleOption}
//       />
//     </>
//   );
// };

// const CommunicationOptionsContainer = ({ selectedOptions, toggleOption }) => (
//   <div className="bg-gray-50 rounded-xl p-4 ">
//     {COMMUNICATION_OPTIONS.map(({ name, members }) => (
//       <CommunicationOption
//         key={name}
//         name={name}
//         members={members}
//         selected={selectedOptions.includes(name)}
//         onChange={toggleOption}
//       />
//     ))}
//   </div>
// );

// const CommunicationOption = ({ name, members, selected, onChange }) => (
//   <div
//     className={`flex flex-col w-full ${selected ? "activeFilter" : "filter"}`}
//   >
//     <label className="flex items-start gap-3.5 cursor-pointer">
//       <input
//         type="checkbox"
//         className="sr-only"
//         checked={selected}
//         onChange={() => onChange(name)}
//       />
//       <span
//         className={`relative shrink-0 mt-1 w-6 h-6 rounded-full border-2 ${
//           selected ? "border-[#040869] bg-[#040869]" : "border-gray-300"
//         }`}
//         aria-hidden="true"
//       >
//         {selected && (
//           <span className="absolute inset-0 flex items-center justify-center">
//             <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
//           </span>
//         )}
//       </span>
//       <div className="flex flex-col">
//         <span className="text-lg font-medium leading-tight text-indigo-950">
//           {name}
//         </span>
//         <span className="mt-1 text-sm leading-3 text-slate-500">{members}</span>
//       </div>
//     </label>
//     {/* <div className="mt-4 w-full h-px bg-zinc-200" aria-hidden="true" /> */}
//   </div>
// );

// CommunicationOption.propTypes = {
//   name: PropTypes.string.isRequired,
//   members: PropTypes.string.isRequired,
//   selected: PropTypes.bool,
//   onChange: PropTypes.func.isRequired,
// };

// export default SelectPlatform;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { MessageSquare, Mail, MessagesSquare } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const COMMUNICATION_OPTIONS = [
  { name: "WhatsApp", members: "100+ Templates available", icon: FaWhatsapp },
  { name: "SMS", members: "60+ members available", icon: MessageSquare },
  { name: "Email", members: "20+ members available", icon: Mail },
  { name: "Messenger", members: "10+ members available", icon: MessagesSquare },
];

const SelectPlatform = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleBackClick = () => navigate("/select-templates");
  const handleContinueClick = () => navigate("/WhatsappModule");

  const toggleOption = (name) => {
    setSelectedOptions((prev) =>
      prev.includes(name)
        ? prev.filter((option) => option !== name)
        : [...prev, name]
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 w-full max-w-3xl shadow-lg">
      <h2 className="text-3xl font-extrabold tracking-tight text-indigo-900 mb-4">
        How do you want to send the Campaign?
      </h2>
      <p className="text-lg leading-relaxed text-indigo-700 mb-8">
        Choose your preferred communication channels
      </p>
      <CommunicationOptionsContainer
        selectedOptions={selectedOptions}
        toggleOption={toggleOption}
      />
    </div>
  );
};

const CommunicationOptionsContainer = ({ selectedOptions, toggleOption }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {COMMUNICATION_OPTIONS.map(({ name, members, icon: Icon }) => (
      <CommunicationOption
        key={name}
        name={name}
        members={members}
        Icon={Icon}
        selected={selectedOptions.includes(name)}
        onChange={toggleOption}
      />
    ))}
  </div>
);

const CommunicationOption = ({ name, members, Icon, selected, onChange }) => (
  <div
    className={`flex flex-col p-6 rounded-xl transition-all duration-300 ${
      selected
        ? "bg-indigo-100 border-2 border-indigo-500 shadow-md"
        : "bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-sm"
    }`}
  >
    <label className="flex items-center gap-2 cursor-pointer">
      {/* <input
        type="checkbox"
        className="sr-only"
        checked={selected}
        onChange={() => onChange(name)}
      /> */}
      <span
        className={`flex items-center justify-center w-12 h-12 rounded-full text-2xl ${
          selected
            ? "bg-indigo-500 text-white"
            : "bg-indigo-100 text-indigo-500"
        }`}
      >
        <Icon size={24} />
      </span>
      <div className="flex-1">
        <span className="text-xl font-semibold text-indigo-900 block mb-1">
          {name}
        </span>
        <span className="text-sm text-indigo-600">{members}</span>
      </div>
      <span
        className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-colors duration-300 ${
          selected
            ? "border-indigo-500 bg-indigo-500"
            : "border-gray-300 bg-white"
        }`}
      >
        {selected && (
          <svg
            className="w-4 h-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
    </label>
  </div>
);

CommunicationOption.propTypes = {
  name: PropTypes.string.isRequired,
  members: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  selected: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default SelectPlatform;
