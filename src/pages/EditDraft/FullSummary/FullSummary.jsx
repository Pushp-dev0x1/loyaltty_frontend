// import React, { useState, useEffect } from "react";
// import { Calendar, Wallet, MessageSquareText, UserRound } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import MainPreviewTemplate from "../../../components/MainPreviewTemplate/MainPreviewTemplate";
// import AboutCampaign from "../AboutCampaign/AboutCampaign";

// const FullSummary = () => {
//   const navigate = useNavigate();
//   const [selectedDates, setSelectedDates] = useState([
//     "12/02/2034",
//     "23/02/2034",
//     "10/03/2034",
//     "12/03/2034",
//   ]);

//   const [formData, setFormData] = useState({
//     title: "Jai Hind! Enjoy 20% Off on this Kargil Victory Day!",
//     discount: "",
//     shopAddress: "",
//     scheduleTime: "",
//     recurringDays: "",
//   });

//   const [isChecked, setIsChecked] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleToggle = () => {
//     setIsChecked(!isChecked);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <section className="flex flex-col md:flex-row items-stretch justify-center w-full min-h-screen text-[#040869] bg-gradient-to-br from-[#F6F6F7] to-[#DCF8FF] p-4 selection:text-white selection:bg-[#040869]">
//       <div className="w-full max-w-8xl bg-[#FFFFFF] rounded-3xl shadow-xl p-4 md:p-6 flex flex-col md:flex-row justify-between gap-6 items-start h-full">
//         <div className="w-full md:w-2/5 h-full overflow-y-auto pr-0 md:pr-4 mb-6 md:mb-0">
//           <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#040869]">Loyaltty</h2>
//           <div className="w-full h-1 rounded-full mb-4">
//             <div className="w-full bg-[#040869] h-1 rounded-full" />
//           </div>
//           <h3 className="text-xl md:text-2xl font-bold mb-1">Summary</h3>
//           <p className="mb-4 text-sm md:text-base text-gray-600">
//             Customize your campaign details and pricing plans
//           </p>
//           <div className="flex-1 flex flex-col space-y-2 md:space-y-4" style={{ scrollbarWidth: "none" }}>
//             {/* Title */}
//             <div className="mb-1 md:mb-2">
//               <label
//                 htmlFor="title"
//                 className="text-sm md:text-base font-semibold text-gray-700 mb-1 block"
//               >
//                 Title
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 className="w-full px-2 md:px-3 py-1 md:py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
//                 placeholder="Enter Title"
//               />
//             </div>

//             {/* Description */}
//             <div className="mb-1 md:mb-2">
//               <label
//                 htmlFor="description"
//                 className="block text-sm md:text-base font-semibold text-gray-700 mb-1"
//               >
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 className="w-full px-2 md:px-3 py-1 md:py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
//                 placeholder="Enter campaign description"
//                 rows="3"
//               />
//             </div>

//             {/* Discount and Deal Value */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
//               <div>
//                 <label
//                   htmlFor="discountValue"
//                   className="block text-sm md:text-base font-semibold text-gray-700 mb-1"
//                 >
//                   Discount (%)
//                 </label>
//                 <input
//                   type="number"
//                   id="discountValue"
//                   name="discountValue"
//                   value={formData.discountValue}
//                   onChange={handleInputChange}
//                   className="w-full px-2 md:px-3 py-1 md:py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
//                   placeholder="Enter discount %"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="dealValue"
//                   className="block text-sm md:text-base font-semibold text-gray-700 mb-1"
//                 >
//                   Deal Value ($)
//                 </label>
//                 <input
//                   type="number"
//                   id="dealValue"
//                   name="dealValue"
//                   value={formData.dealValue}
//                   onChange={handleInputChange}
//                   className="w-full px-2 md:px-3 py-1 md:py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
//                   placeholder="Enter deal value"
//                 />
//               </div>
//             </div>

//             {/* Headline and Expiry Date */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
//               <div>
//                 <label
//                   htmlFor="headline"
//                   className="block text-sm md:text-base font-semibold text-gray-700 mb-1"
//                 >
//                   Headline (Auto created)
//                 </label>
//                 <input
//                   type="text"
//                   id="headline"
//                   name="headline"
//                   value={formData.headline}
//                   onChange={handleInputChange}
//                   className="w-full px-2 md:px-3 py-1 md:py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
//                   placeholder="Auto-generated headline"
//                   readOnly
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="expiryDate"
//                   className="block text-sm md:text-base font-semibold text-gray-700 mb-1"
//                 >
//                   Expiry Date
//                 </label>
//                 <input
//                   type="date"
//                   id="expiryDate"
//                   name="expiryDate"
//                   value={formData.expiryDate}
//                   onChange={handleInputChange}
//                   className="w-full px-2 md:px-3 py-1 md:py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="w-full md:w-1/4 h-full space-y-4 md:space-y-6 p-4 shadow-lg rounded-2xl bg-[#F6F6F7] overflow-y-auto">
//           <div className="flex items-center bg-white p-3 rounded-xl shadow-md">
//             <Wallet className="mr-3 text-[#040869]" size={20} />
//             <div>
//               <p className="font-semibold text-[#040869] text-xs md:text-sm">Your Wallet</p>
//               <p className="text-xl md:text-2xl font-bold text-[#040869]">$ 20.00</p>
//             </div>
//           </div>

//           <div className="flex items-center bg-white p-3 rounded-xl shadow-md">
//             <Wallet className="mr-3 text-[#040869]" size={20} />
//             <div>
//               <p className="font-semibold text-[#040869] text-xs md:text-sm">Estimate Cost:</p>
//               <p className="text-xl md:text-2xl font-bold text-[#040869]">$ 16.70</p>
//             </div>
//           </div>

//           <div className="bg-white p-3 rounded-xl shadow-md">
//             <div className="flex items-center mb-2">
//               <Calendar className="mr-2 text-[#040869]" size={18} />
//               <p className="font-semibold text-[#040869] text-xs md:text-sm">Campaign Schedule:</p>
//             </div>
//             <div className="space-y-2 ml-6">
//               {selectedDates.map((date, index) => (
//                 <div key={index} className="flex items-center">
//                   <Calendar size={12} className="mr-2 text-[#040869]" />
//                   <span className="text-[#040869] text-xs md:text-sm">{date}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-between mt-4">
//             <button
//               className="border-2 border-[#040869] rounded-lg py-2 px-3 md:px-4 text-[#040869] font-semibold text-sm md:text-base hover:bg-[#040869] hover:text-white transition-colors duration-300"
//               onClick={() => navigate("/setup-new-campaign")}
//             >
//               Back
//             </button>
//             <button
//               className="bg-[#040869] text-white rounded-lg py-2 px-3 md:px-4 font-semibold text-sm md:text-base hover:bg-[#0a0d36] transition-colors duration-300"
//               onClick={() => navigate("")}
//             >
//               Continue
//             </button>
//           </div>
//         </div>
//         <div className="w-full md:w-1/3 h-full mt-6 md:mt-0">
//           <MainPreviewTemplate maintitle={formData.title} />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FullSummary;


import React, { useState, useEffect } from "react";
import { Calendar, Wallet, MessageSquareText, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MainPreviewTemplate from "../../../components/MainPreviewTemplate/MainPreviewTemplate";
import AboutCampaign from "../AboutCampaign/AboutCampaign";

const FullSummary = () => {
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState([
    "12/02/2034",
    "23/02/2034",
    "10/03/2034",
    "12/03/2034",
  ]);

  const [formData, setFormData] = useState({
    title: "Jai Hind! Enjoy 20% Off on this Kargil Victory Day!",
    discount: "",
    shopAddress: "",
    scheduleTime: "",
    recurringDays: "",
  });

  const [isChecked, setIsChecked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <section className="flex flex-col md:flex-row items-stretch justify-center w-full min-h-screen text-[#040869] bg-gradient-to-br from-[#F6F6F7] to-[#DCF8FF] p-4 selection:text-white selection:bg-[#040869]">
      <div className="w-full max-w-8xl bg-[#FFFFFF] rounded-3xl shadow-xl p-4 md:p-6 flex flex-col md:flex-row justify-between gap-6 items-start h-full">
        <div className="w-full md:w-2/5 h-full overflow-y-auto pr-0 md:pr-4 mb-6 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#040869]">
            Loyaltty
          </h2>
          <div className="w-full h-1 rounded-full mb-4">
            <div className="w-full bg-[#040869] h-1 rounded-full" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-1">Summary</h3>
          <p className="mb-4 text-sm md:text-base text-gray-600">
            Customize your campaign details and pricing plans
          </p>
          <div
            className="flex-1 flex flex-col space-y-2 md:space-y-4"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Title */}
            <div className="mb-1 md:mb-2">
              <label
                htmlFor="title"
                className="text-sm md:text-base font-semibold text-gray-700 mb-1 block"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-2 md:px-3 py-1 md:py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
                placeholder="Enter Title"
              />
            </div>

            {/* Description */}
            <div className="mb-1 md:mb-2">
              <label
                htmlFor="description"
                className="block text-sm md:text-base font-semibold text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-2 md:px-3 py-1 md:py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
                placeholder="Enter campaign description"
                rows="3"
              />
            </div>

            {/* Discount and Deal Value */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
              <div>
                <label
                  htmlFor="discountValue"
                  className="block text-sm md:text-base font-semibold text-gray-700 mb-1"
                >
                  Discount (%)
                </label>
                <input
                  type="number"
                  id="discountValue"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleInputChange}
                  className="w-full px-2 md:px-3 py-1 md:py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
                  placeholder="Enter discount %"
                />
              </div>
              <div>
                <label
                  htmlFor="dealValue"
                  className="block text-sm md:text-base font-semibold text-gray-700 mb-1"
                >
                  Deal Value ($)
                </label>
                <input
                  type="number"
                  id="dealValue"
                  name="dealValue"
                  value={formData.dealValue}
                  onChange={handleInputChange}
                  className="w-full px-2 md:px-3 py-1 md:py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
                  placeholder="Enter deal value"
                />
              </div>
            </div>

            {/* Headline and Expiry Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
              <div>
                <label
                  htmlFor="headline"
                  className="block text-sm md:text-base font-semibold text-gray-700 mb-1"
                >
                  Headline (Auto created)
                </label>
                <input
                  type="text"
                  id="headline"
                  name="headline"
                  value={formData.headline}
                  onChange={handleInputChange}
                  className="w-full px-2 md:px-3 py-1 md:py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
                  placeholder="Auto-generated headline"
                  readOnly
                />
              </div>
              <div>
                <label
                  htmlFor="expiryDate"
                  className="block text-sm md:text-base font-semibold text-gray-700 mb-1"
                >
                  Expiry Date
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full px-2 md:px-3 py-1 md:py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4 h-full space-y-4 md:space-y-6 p-4 shadow-lg rounded-2xl bg-[#F6F6F7] overflow-y-auto">
          <div className="flex items-center bg-white p-3 rounded-xl shadow-md">
            <Wallet className="mr-3 text-[#040869]" size={20} />
            <div>
              <p className="font-semibold text-[#040869] text-xs md:text-sm">
                Your Wallet
              </p>
              <p className="text-xl md:text-2xl font-bold text-[#040869]">
                $ 20.00
              </p>
            </div>
          </div>

          <div className="flex items-center bg-white p-3 rounded-xl shadow-md">
            <Wallet className="mr-3 text-[#040869]" size={20} />
            <div>
              <p className="font-semibold text-[#040869] text-xs md:text-sm">
                Estimate Cost:
              </p>
              <p className="text-xl md:text-2xl font-bold text-[#040869]">
                $ 16.70
              </p>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl shadow-md">
            <div className="flex items-center mb-2">
              <Calendar className="mr-2 text-[#040869]" size={18} />
              <p className="font-semibold text-[#040869] text-xs md:text-sm">
                Campaign Schedule:
              </p>
            </div>
            <div className="space-y-2 ml-6">
              {selectedDates.map((date, index) => (
                <div key={index} className="flex items-center">
                  <Calendar size={12} className="mr-2 text-[#040869]" />
                  <span className="text-[#040869] text-xs md:text-sm">
                    {date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              className="border-2 border-[#040869] rounded-lg py-2 px-3 md:px-4 text-[#040869] font-semibold text-sm md:text-base hover:bg-[#040869] hover:text-white transition-colors duration-300"
              onClick={() => navigate("/setup-new-campaign")}
            >
              Back
            </button>
            <button
              className="bg-[#040869] text-white rounded-lg py-2 px-3 md:px-4 font-semibold text-sm md:text-base hover:bg-[#0a0d36] transition-colors duration-300"
              onClick={() => navigate("")}
            >
              Continue
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/3 h-full mt-6 md:mt-0">
          <MainPreviewTemplate maintitle={formData.title} />
        </div>
      </div>
    </section>
  );
};

export default FullSummary;
