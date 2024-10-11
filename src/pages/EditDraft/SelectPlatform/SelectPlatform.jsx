// import React from "react";
// import { MessageSquare, Mail, MessagesSquare } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";

// const SelectPlatform = ({ maindata, handleCheckboxChange, selectedOptions }) => {
//   return (
//     <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-4 sm:p-8 w-full max-w-3xl shadow-lg">
//       <h2 className="text-base sm:text-3xl font-extrabold tracking-tight text-indigo-900 mb-2 sm:mb-4">
//         How do you want to send the Campaign?
//       </h2>
//       <p className="text-sm sm:text-lg leading-relaxed text-indigo-700 mb-4 sm:mb-8">
//         Choose your preferred communication channels
//       </p>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
//         {maindata?.map((item) => {
//           const Icon = item.platformId.type === "whatsapp" ? FaWhatsapp :
//             item.platformId.type === "email" ? Mail :
//               item.platformId.type === "sms" ? MessageSquare : MessagesSquare;

//           return (
//             <div
//               key={item.platformId.type}
//               className={`flex flex-col p-3 sm:p-6 rounded-xl transition-all duration-300 ${selectedOptions[item.platformId.type]
//                 ? "bg-indigo-100 border-2 border-indigo-500 shadow-md"
//                 : "bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-sm"
//                 }`}
//             >
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="sr-only"
//                   checked={selectedOptions[item.platformId.type]}
//                   onChange={() => handleCheckboxChange(item.platformId.type)}
//                 />
//                 <span
//                   className={`flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full text-lg sm:text-2xl ${selectedOptions[item.platformId.type] ? "bg-indigo-500 text-white" : "bg-indigo-100 text-indigo-500"
//                     }`}
//                 >
//                   <Icon size={16} className="sm:w-5 sm:h-5" />
//                 </span>
//                 <div className="flex-1">
//                   <span className="text-base sm:text-xl font-semibold text-indigo-900 block mb-0 sm:mb-1">
//                     {item.platformId.name}
//                   </span>
//                   <span className="text-xs sm:text-sm text-indigo-600">{item.members}</span>
//                 </div>
//                 <span
//                   className={`w-4 h-4 sm:w-6 sm:h-6 border-2 rounded-full flex items-center justify-center transition-colors duration-300 ${selectedOptions[item.platformId.type]
//                     ? "border-indigo-500 bg-indigo-500"
//                     : "border-gray-300 bg-white"
//                     }`}
//                 >
//                   {selectedOptions[item.platformId.type] && (
//                     <svg className="w-2 h-2 sm:w-4 sm:h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                   )}
//                 </span>
//               </label>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default SelectPlatform;


import React from "react";
import { MessageSquare, Mail, MessagesSquare } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const SelectPlatform = ({
  maindata,
  handleCheckboxChange,
  selectedOptions,
}) => {
  return (
    <>
      <div className="flex flex-col  mx-auto w-full text-3xl font-semibold leading-none text-gray-900 bg-white rounded-3xl  max-md:max-w-full">
        <h2 className="text-base sm:text-2xl font-semibold text-gray-800 max-md:mr-2.5 max-md:max-w-full mr-9">
          How do you want to send the Campaign?
        </h2>

        <p className="self-start text-xs md:text-base text-gray-500">
          Choose your preferred communication channels
        </p>

        {maindata.map((item, index) => {
          const Icon =
            item.platformId.type === "whatsapp"
              ? "https://cdn.builder.io/api/v1/image/assets/TEMP/eedee36cff5fc292dceae6980b1fda5b74659ce945c0feb2cad04c718988ae92?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
              : item.platformId.type === "email"
              ? "https://cdn.builder.io/api/v1/image/assets/TEMP/ccfdca0b8f4a8882d438a4bcfb7d0977e85429c0e35245f44a752a0cc95cad03?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
              : item.platformId.type === "sms"
              ? "https://cdn.builder.io/api/v1/image/assets/TEMP/955b66fbf0f91ff53047e485a2e2f52b4b90675a14ba86b942d0b65fdd9cda8a?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
              : "https://cdn.builder.io/api/v1/image/assets/TEMP/955b66fbf0f91ff53047e485a2e2f52b4b90675a14ba86b942d0b65fdd9cda8a?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f";
          return (
            <div
              onClick={() => handleCheckboxChange(item.platformId.type)}
              className="flex flex-wrap gap-2 md:gap-5 justify-between px-2 py-2 md:px-9 md:py-4 mt-7 w-full whitespace-nowrap border border-solid border-blue-950 rounded-[100px] max-md:px-5 max-md:max-w-full"
            >
              <div className="flex  gap-5  md:gap-9 my-auto items-center">
                {selectedOptions[item.platformId.type] ? (
                  <img
                    loading="lazy"
                    src={
                      "https://cdn.builder.io/api/v1/image/assets/TEMP/e3eeb287db08fcbff99ed0ff48250aa0ecbd18b4132c15fb194bfb45fbe97092?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
                    }
                    alt={` icon`}
                    className="object-contain shrink-0 rounded-md aspect-[0.97] w-[39px]"
                  />
                ) : (
                  <div
                    className="flex shrink-0 h-10 rounded-md border border-solid w-[39px]"
                    role="presentation"
                  />
                )}

                <div className="text-xl sm:text-2xl">
                  {item.platformId.name}
                </div>
              </div>

              <img
                loading="lazy"
                src={Icon}
                alt={`active icon`}
                className="object-contain shrink-0 aspect-square w-[47px]"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SelectPlatform;
