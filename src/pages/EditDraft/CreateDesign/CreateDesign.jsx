import React, { useState, useRef, useEffect } from "react";
import "./CreateDesign.css";
import { Upload, Copy, ChevronDown, ChevronUp, Check } from "lucide-react";
import { useUploadImageMutation } from "../../../store/services/uploadService";

const CreateDesign = ({
  formData,
  handleInputChange,
  main_url,
  setmain_url,
}) => {
  const [uploadImage] = useUploadImageMutation();
  const contentRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("loyaltty");
  const [customLink, setCustomLink] = useState("");
  const [copyStatus, setCopyStatus] = useState("idle");
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isDropdownOpen && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isDropdownOpen]);

  const handleLinkChange = (linkType) => {
    setActiveLink(linkType);
  };

  const copyToClipboard = async () => {
    const linkToCopy = activeLink === "loyaltty" ? `${main_url}` : customLink;

    try {
      await navigator.clipboard.writeText(linkToCopy);
      setCopyStatus("copied");
      timeoutRef.current = setTimeout(() => setCopyStatus("idle"), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setCopyStatus("error");
      timeoutRef.current = setTimeout(() => setCopyStatus("idle"), 2000);
    }
  };

  const handleCustomLinkChange = (e) => {
    setmain_url(e.target.value);
    setCustomLink(e.target.value);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleImageUpload = async (e, inputName) => {
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await uploadImage(formData).unwrap();
      handleInputChange({
        target: { value: response.imageUrl, name: inputName },
      });
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };

  const handleLogoUpload = (e) => {
    handleImageUpload(e, "logo");
  };

  const handleBannerUpload = (e) => {
    handleImageUpload(e, "bannerImage");
  };

  return (
//     <>
//       <div className="p-2 md:p-0 max-w-full">
//         {/* Color selection section */}
//         <div className="flex flex-col sm:flex-row mb-6 space-y-4 sm:space-y-0 sm:space-x-2">
//           <div className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg flex items-center justify-between">
//             <h3 className="text-sm font-semibold">Theme color</h3>
//             <div className="primary-color-picker-div flex items-center">
//               <input
//                 name="themeColor"
//                 type="color"
//                 className="primary-color-picker w-8 h-8 sm:w-12 sm:h-12 mr-2 sm:mr-3"
//                 value={formData.themeColor || "#FF5733"}
//                 onChange={handleInputChange}
//               />
//               <span className="text-xs sm:text-sm">
//                 {formData.themeColor || "#FF5733"}
//               </span>
//             </div>
//           </div>
//           <div className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg flex items-center justify-between">
//             <h3 className="text-sm font-semibold">Text color</h3>
//             <div className="primary-color-picker-div flex items-center">
//               <input
//                 name="textColor"
//                 type="color"
//                 className="primary-color-picker w-8 h-8 sm:w-12 sm:h-12 mr-2 sm:mr-3"
//                 value={formData.textColor || "#FFFFFF"}
//                 onChange={handleInputChange}
//               />
//               <span className="text-xs sm:text-sm">
//                 {formData.textColor || "#FFFFFF"}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Logo upload section */}
//         <div className="mb-2">
//         <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1">
//   Logo Image
// </h3>
// <div
//   className="border border-gray-300 rounded-full p-1 sm:p-2 text-center w-full flex items-center justify-center cursor-pointer"
//   onClick={() => document.getElementById("logo").click()}
// >
//   <Upload size={12} className="mr-1 sm:mr-2" />
//   <span className="text-xs sm:text-sm">Drag & Drop</span>
//   <span className="text-xs sm:text-sm text-gray-500 mx-1">&</span>
//   <span className="text-xs sm:text-sm text-[#040869]">
//     Browse files
//   </span>
//   <input
//     type="file"
//     name="logo"
//     id="logo"
//     accept="image/png,image/svg+xml,image/jpeg"
//     className="hidden"
//     onChange={handleLogoUpload}
//   />
// </div>

//         </div>

//         {/* Banner upload section */}
//         <div className="mb-6">
//           <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
//             Banner Image
//           </h3>
//           <p className="text-xs text-gray-600 mb-2">
//             Recommended size 512 x 512 px in JPG, PNG or SVG format up to max
//             size of 5MB.
//           </p>
//           <div
//             className="border border-gray-300 rounded-full p-2 sm:p-3 text-center w-full flex items-center justify-center cursor-pointer"
//             onClick={() => document.getElementById("bannerImage").click()}
//           >
//             <Upload size={16} className="mr-2 sm:mr-2" />
//             <span className="text-xs sm:text-sm">Drag & Drop Files Here</span>
//             <span className="text-xs sm:text-sm text-gray-500 mx-1">&</span>
//             <span className="text-xs sm:text-sm text-[#040869]">
//               Browse files
//             </span>
//             <input
//               type="file"
//               name="bannerImage"
//               id="bannerImage"
//               accept="image/png,image/svg+xml,image/jpeg"
//               className="hidden"
//               onChange={handleBannerUpload}
//             />
//           </div>
//         </div>

//         <div className="image-grid mt-4 grid grid-cols-5 gap-2 mb-2">
//           {[
//             "https://www.shutterstock.com/image-vector/happy-halloween-day-poster-banner-260nw-2495070203.jpg",
//             "https://www.tatacapital.com/blog/wp-content/uploads/2023/11/when-is-thanksgiving-day-2023-in-india.jpg",
//             "https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg",
//             "https://img.etimg.com/thumb/width-1200,height-900,imgsize-83916,resizemode-75,msid-105131675/news/international/us/veterans-day-2023-here-is-how-to-avoid-scams-while-making-donations.jpg",
//             "https://marketplace.canva.com/EAFxdcos7WU/1/0/1600w/canva-dark-blue-and-brown-illustrative-fitness-gym-logo-oqe3ybeEcQQ.jpg",
//           ].map((image, index) => (
//             <div key={index} className="image-container col-span-1">
//               <img
//                 src={image}
//                 onClick={() =>
//                   handleInputChange({
//                     target: { value: image, name: "bannerImage" },
//                   })
//                 }
//                 alt={`Uploaded ${index + 1}`}
//                 className="rounded-lg object-cover w-full h-20"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Campaign link section */}
//         <div
//           ref={contentRef}
//           className={`mt-4 md:mt-4 space-y-2 md:space-y-6  md:block`}
//         >
//           <div className="mt-2">
//             <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800">
//               Campaign link
//             </h3>
//             <div className="primary-button-group flex rounded-full bg-gray-100 p-1 border border-[#040869]">
//               <button
//                 className={`flex-1 py-1 sm:py-2 px-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-colors ${
//                   activeLink === "loyaltty"
//                     ? "bg-[#040869] text-white shadow"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//                 onClick={() => handleLinkChange("loyaltty")}
//               >
//                 Loyaltty Link
//               </button>
//               <button
//                 className={`flex-1 py-1 sm:py-2 px-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-colors ${
//                   activeLink === "custom"
//                     ? "bg-[#040869] text-white shadow"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//                 onClick={() => handleLinkChange("custom")}
//               >
//                 Custom Link
//               </button>
//             </div>
//             <div className="mt-4 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
//               {activeLink === "loyaltty" ? (
//                 <div className="w-full sm:flex-grow pl-4 bg-gray-100 rounded-full py-1 sm:py-2">
//                   <span className="text-xs sm:text-sm font-medium">
//                     {main_url}
//                   </span>
//                 </div>
//               ) : (
//                 <input
//                   type="text"
//                   value={customLink}
//                   onChange={handleCustomLinkChange}
//                   placeholder="Enter your custom link"
//                   className="w-full sm:flex-grow p-2 pl-4 border border-gray-300 rounded-full text-xs sm:text-sm"
//                 />
//               )}
//               <button
//                 className={`w-full sm:w-auto mt-2 sm:mt-0 copy-btn p-2 rounded-full flex items-center justify-center transition-colors ${
//                   copyStatus === "copied"
//                     ? "bg-green-500 text-white"
//                     : copyStatus === "error"
//                     ? "bg-red-500 text-white"
//                     : "bg-[#040869] text-white hover:bg-[#030657]"
//                 }`}
//                 onClick={copyToClipboard}
//                 disabled={copyStatus !== "idle"}
//               >
//                 {copyStatus === "idle" && <Copy size={14} className="mr-2" />}
//                 {copyStatus === "copied" && (
//                   <Check size={14} className="mr-2" />
//                 )}
//                 {copyStatus === "error" && <Copy size={14} className="mr-2" />}
//                 <span className="text-xs sm:text-sm font-medium">
//                   {copyStatus === "idle" && "Copy"}
//                   {copyStatus === "copied" && "Copied!"}
//                   {copyStatus === "error" && "Failed"}
//                 </span>
//               </button>
//             </div>
//             <p className="mt-2 text-xs sm:text-sm text-gray-600">
//               This link will take your customer to the campaign page.
//             </p>
//           </div>
//         </div>
//       </div>
//     </>

<>
<div className="p-2 max-w-full overflow-hidden">
  {/* Color selection section */}
  <div className="flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
    {[
      { name: "themeColor", label: "Theme color", defaultValue: "#FF5733" },
      { name: "textColor", label: "Text color", defaultValue: "#FFFFFF" },
    ].map((color, index) => (
      <div
        key={index}
        className="w-full sm:w-1/2 p-1 border border-gray-300 rounded-md flex items-center justify-between"
      >
        <h3 className="text-xs font-semibold">{color.label}</h3>
        <div className="flex items-center">
          <input
            name={color.name}
            type="color"
            className="w-6 h-6 sm:w-8 sm:h-8 mr-1"
            value={formData[color.name] || color.defaultValue}
            onChange={handleInputChange}
          />
          <span className="text-xs">{formData[color.name] || color.defaultValue}</span>
        </div>
      </div>
    ))}
  </div>

  {/* Logo upload section */}
  <div className="mb-4">
    <h3 className="text-sm font-bold text-gray-800 mb-1">Logo Image</h3>
    <div
      className="border border-gray-300 rounded-md p-2 text-center flex items-center justify-center cursor-pointer"
      onClick={() => document.getElementById("logo").click()}
    >
      <Upload size={12} className="mr-1" />
      <span className="text-xs">Drag & Drop or Browse</span>
      <input
        type="file"
        name="logo"
        id="logo"
        accept="image/png,image/svg+xml,image/jpeg"
        className="hidden"
        onChange={handleLogoUpload}
      />
    </div>
  </div>

  {/* Banner upload section */}
  <div className="mb-4">
    <h3 className="text-sm font-bold text-gray-800 mb-1">Banner Image</h3>
    <p className="text-xs text-gray-600 mb-1">
      Recommended: 512x512 px (JPG, PNG, SVG, max 5MB)
    </p>
    <div
      className="border border-gray-300 rounded-md p-2 text-center flex items-center justify-center cursor-pointer"
      onClick={() => document.getElementById("bannerImage").click()}
    >
      <Upload size={12} className="mr-1" />
      <span className="text-xs">Drag & Drop or Browse</span>
      <input
        type="file"
        name="bannerImage"
        id="bannerImage"
        accept="image/png,image/svg+xml,image/jpeg"
        className="hidden"
        onChange={handleBannerUpload}
      />
    </div>
  </div>

  {/* Image grid */}
  <div className="grid grid-cols-5 gap-1 mb-2">
    {[
      "https://www.shutterstock.com/image-vector/happy-halloween-day-poster-banner-260nw-2495070203.jpg",
      "https://www.tatacapital.com/blog/wp-content/uploads/2023/11/when-is-thanksgiving-day-2023-in-india.jpg",
      "https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg",
      "https://img.etimg.com/thumb/width-1200,height-900,imgsize-83916,resizemode-75,msid-105131675/news/international/us/veterans-day-2023-here-is-how-to-avoid-scams-while-making-donations.jpg",
      "https://marketplace.canva.com/EAFxdcos7WU/1/0/1600w/canva-dark-blue-and-brown-illustrative-fitness-gym-logo-oqe3ybeEcQQ.jpg",
    ].map((image, index) => (
      <div key={index} className="col-span-1">
        <img
          src={image}
          onClick={() =>
            handleInputChange({
              target: { value: image, name: "bannerImage" },
            })
          }
          alt={`Uploaded ${index + 1}`}
          className="rounded-md object-cover w-full h-16"
        />
      </div>
    ))}
  </div>

  {/* Campaign link section */}
  <div className="mt-4">
    <h3 className="text-sm font-bold mb-1">Campaign Link</h3>
    <div className="flex rounded-md bg-gray-100 p-1 border border-[#040869]">
      {["Loyaltty", "Custom"].map((link, index) => (
        <button
          key={index}
          className={`flex-1 py-1 text-xs rounded-md font-medium ${
            activeLink === link.toLowerCase()
              ? "bg-[#040869] text-white shadow"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => handleLinkChange(link.toLowerCase())}
        >
          {link} Link
        </button>
      ))}
    </div>
    <div className="mt-2 flex items-center space-x-2">
      {activeLink === "loyaltty" ? (
        <div className="flex-grow pl-2 bg-gray-100 rounded-md py-1">
          <span className="text-xs font-medium">{main_url}</span>
        </div>
      ) : (
        <input
          type="text"
          value={customLink}
          onChange={handleCustomLinkChange}
          placeholder="Enter custom link"
          className="flex-grow p-1 border border-gray-300 rounded-md text-xs"
        />
      )}
      <button
        className={`p-1 rounded-md flex items-center justify-center text-xs ${
          copyStatus === "copied"
            ? "bg-green-500 text-white"
            : copyStatus === "error"
            ? "bg-red-500 text-white"
            : "bg-[#040869] text-white"
        }`}
        onClick={copyToClipboard}
        disabled={copyStatus !== "idle"}
      >
        {copyStatus === "idle" && <Copy size={12} className="mr-1" />}
        {copyStatus === "copied" && <Check size={12} className="mr-1" />}
        {copyStatus === "error" && <Copy size={12} className="mr-1" />}
        <span>{copyStatus === "idle" ? "Copy" : copyStatus === "copied" ? "Copied!" : "Failed"}</span>
      </button>
    </div>
    <p className="mt-1 text-xs text-gray-600">
      This link takes your customer to the campaign page.
    </p>
  </div>
</div>
</>

  );
};

export default CreateDesign;
