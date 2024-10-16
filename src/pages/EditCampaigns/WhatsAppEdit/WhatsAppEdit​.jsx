import React, { useState, useRef, useEffect } from "react";
import { Copy, ChevronDown, ChevronUp, Check } from "lucide-react";
import "./WhatsAppEdit.css";

import { BiSolidEdit } from "react-icons/bi";
import WhatsappTemplates from "../../../components/WhatsappTemplates/WhatsappTemplates";

const whatsappTemplatesData = [
  {
    platformId: {
      _id: "66b288d749d9ceff515cc7a9",
      name: "WhatsApp",
      type: "whatsapp",
      status: true,
      createdAt: "2024-08-06T20:34:31.444Z",
      updatedAt: "2024-08-06T20:34:31.444Z",
      __v: 0,
    },
    content:
      "Reminder: You RSVP’ed to {{1}} by {{2}}.  The event starts on {{3}} at {{4}} at {{5}}.",
    parameters: [
      "event_name",
      "inviter",
      "event_date",
      "event_place",
      "event_main_area",
    ],
    price: {
      $numberDecimal: "0.07",
    },
    _id: "66b2890b49d9ceff515cc7b0",
    subject: "event_invite",
  },

  {
    platformId: {
      _id: "66b288d749d9ceff515cc7a9",
      name: "WhatsApp",
      type: "whatsapp",
      status: true,
      createdAt: "2024-08-06T20:34:31.444Z",
      updatedAt: "2024-08-06T20:34:31.444Z",
      __v: 0,
    },
    content:
      "Hey {{1}}, 😃👋 {{2}} wishes you a very {{3}}. ✨🎉 We are glad to have you with us. On the special occasion of {{4}}, we have an exclusive offer for you. Avail {{5}} discount on {{6}} purchase. Hurry, offer valid only till {{7}} ⏳Apply Code: {{8}} Click Here: {{9}}",
    parameters: [
      "user_name",
      "shop_name",
      "ocassion",
      "ocassion_name",
      "discount",
      "product",
      "discount_time",
      "code",
      "link",
    ],
    price: {
      $numberDecimal: "0.12",
    },
    _id: "66b2890b49d9ceff515cc7b0",
    subject: "ocassion_discount",
  },
  {
    platformId: {
      _id: "66b288d749d9ceff515cc7a9",
      name: "WhatsApp",
      type: "whatsapp",
      status: true,
      createdAt: "2024-08-06T20:34:31.444Z",
      updatedAt: "2024-08-06T20:34:31.444Z",
      __v: 0,
    },
    content:
      "Hi {{1}},   Thank you for your recent {{2}} with us.    We value your feedback and would appreciate you sharing more about your experience with us at the link below.   This should only take 5 minutes. We appreciate your time.",
    parameters: ["name", "purpose"],
    price: {
      $numberDecimal: "0.07",
    },
    _id: "66b2890b49d9ceff515cc7b0",
    subject: "feedback",
  },
];

const WhatsAppEdit = ({
  content,
  parameters,
  onInputChange,
  main_url,
  selected_Whatsapp,
  setselected_Whatsapp,
}) => {
  const [activeLink, setActiveLink] = useState("loyaltty");
  const [customLink, setCustomLink] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("idle");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const contentRef = useRef(null);
  const timeoutRef = useRef(null);
  const modalRef = useRef(null);

  const handleLinkChange = (linkType) => {
    setActiveLink(linkType);
  };

  const handleCustomLinkChange = (e) => {
    setCustomLink(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (isDropdownOpen && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Function to handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  // Function to handle confirm action
  const handleConfirm = () => {
    if (selectedTemplate) {
      setselected_Whatsapp(selectedTemplate); // Update the selected template
      toggleModal(); // Close the modal
      setSelectedTemplate(null);
    }
  };

  return (
    <>
      <div className="campaign-sms-right">
        <div className="sms-fields">
          <div className="non-editable-fields">
            <div className="textarea-component">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="textarea-heading flex items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2"
                    >
                      <path
                        d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"
                        fill="#040869"
                      />
                      <path
                        d="M7 9H9V11H7V9ZM11 9H13V11H11V9ZM15 9H17V11H15V9Z"
                        fill="#040869"
                      />
                    </svg>
                    <h3 className="text-2xl font-semibold text-[#040869]">
                      Edit WhatsApp Message
                    </h3>
                  </div>
                  <div className="sms-length text-sm text-gray-600 mt-1">
                    Character length: 139 / 1 credit
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <BiSolidEdit
                    className="text-3xl text-[#040869] cursor-pointer hover:text-[#060c92] transition-colors"
                    onClick={toggleModal}
                  />
                </div>
              </div>

              <div>
                {/* {
                  content.split(/(\{\{\d+\}\})/).map((part, index) => {
                    const match = part.match(/\{\{(\d+)\}\}/);
                    if (match) {
                      const paramIndex = match[1];
                      return (
                        <span
                          key={index}
                          contentEditable
                          suppressContentEditableWarning
                          onInput={(e) => onInputChange(paramIndex, e.target.innerText)}
                        >
                          {parameters[paramIndex]}
                        </span>
                      );
                    }
                    return part;
                  })
                } */}

                {content.split(/(\{\{\d+\}\})/).map((part, index) => {
                  const match = part.match(/\{\{(\d+)\}\}/);
                  if (match) {
                    const paramIndex = match[1];
                    return (
                      <span
                        key={index}
                        className="flex flex-row mt-2 items-center bg-white border border-gray-300 rounded-full shadow-sm"
                      >
                        {/* Display the number inside the curly braces */}
                        <div className="ml-5">{`{{${paramIndex}}}`}</div>
                        <input
                          type="text"
                          className="w-full px-3 py-2  rounded-full  ml-5"
                          placeholder={parameters[paramIndex] || ""}
                          onChange={(e) =>
                            onInputChange(paramIndex, e.target.value)
                          }
                          // style={{ border: '1px solid #ccc', padding: '4px', margin: '0 4px' }}
                        />
                      </span>
                    );
                  }
                  // return <span key={index}>{part}</span>;
                })}
              </div>
              <p className="why-link-button">Why can't I edit everything?</p>
            </div>
          </div>
          {/* <div
            onClick={toggleDropdown}
            className="md:hidden w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between items-center cursor-pointer"
          >
            <span className="text-base">
              {isDropdownOpen ? "Hide Details" : "View More"}
            </span>
            {isDropdownOpen ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div> */}
          {/* <div
            ref={contentRef}
            className={`mt-2 md:mt-4 space-y-2 md:space-y-6 ${
              isDropdownOpen ? "block" : "hidden"
            } md:block`}
          >
            <div className="editDivs">
              <h3>Campaign link</h3>
              <div className="primary-button-group">
                <button
                  className={
                    activeLink === "loyaltty"
                      ? "active-custom-btn"
                      : "custom-btn"
                  }
                  onClick={() => handleLinkChange("loyaltty")}
                >
                  Loyaltty Link
                </button>
                <button
                  className={
                    activeLink === "custom" ? "active-custom-btn" : "custom-btn"
                  }
                  onClick={() => handleLinkChange("custom")}
                >
                  Custom Link
                </button>
              </div>
              {activeLink === "loyaltty" ? (
                <div className="link">143.110.252.166:4040/lp/{main_url}</div>
              ) : (
                <div className="custom-link-wrapper">
                  <input
                    type="text"
                    value={customLink}
                    onChange={handleCustomLinkChange}
                    placeholder="Enter your custom link"
                    className="custom-link-input textarea"
                  />
                </div>
              )}
              <h5>This link will take your customer to the campaign page.</h5>
              <button
                className={`copy-btn ${
                  copyStatus === "copied"
                    ? "bg-green-500"
                    : copyStatus === "error"
                    ? "bg-red-500"
                    : ""
                }`}
                onClick={copyToClipboard}
                disabled={copyStatus !== "idle"}
              >
                {copyStatus === "idle" && <Copy size={20} />}
                {copyStatus === "copied" && <Check size={20} />}
                {copyStatus === "error" && <Copy size={20} />}
                <span className="ml-2">
                  {copyStatus === "idle" && "Copy"}
                  {copyStatus === "copied" && "Copied!"}
                  {copyStatus === "error" && "Failed to copy"}
                </span>
              </button>
            </div>
          </div> */}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-auto mx-auto overflow-hidden transform transition-all"
          >
            <div className="bg-gray-50 px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-200 text-center relative">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                WhatsApp Templates
              </h2>
              {selectedTemplate && (
                <button
                  onClick={handleConfirm}
                  className="flex p-1 mt-4 text-lg sm:text-xl items-center justify-center text-white border-solid bg-[#040869] border-[2px] border-black border-opacity-10 min-h-[40px] sm:min-h-[52px] rounded-full w-full sm:w-auto sm:px-8 mx-auto lg:absolute lg:bottom-5 lg:right-8"
                >
                  Select
                </button>
              )}
            </div>
            <div className="p-4 sm:p-8 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
              <div
                className="grid gap-4 sm:gap-6 lg:gap-8"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                }}
              >
                {whatsappTemplatesData.map((template, index) => (
                  <div key={index} className="flex justify-center">
                    <WhatsappTemplates
                      {...template}
                      onClick={() => handleTemplateSelect(template)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppEdit;
