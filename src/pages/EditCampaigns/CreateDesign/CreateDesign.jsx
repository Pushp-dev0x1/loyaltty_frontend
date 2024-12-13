import React, { useState, useRef, useEffect } from "react";
import "./CreateDesign.css";
import { Upload, Copy, ChevronDown, ChevronUp, Check } from "lucide-react";
import { useUploadImageMutation } from "../../../store/services/uploadService";

const CreateDesign = ({ formData, handleInputChange, main_url, setmain_url }) => {
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
    const linkToCopy =
      activeLink === "loyaltty"
        ? `${main_url}`
        : customLink;

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
    setmain_url(e.target.value)
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
