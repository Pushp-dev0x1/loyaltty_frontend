import React, { useState, useRef, useEffect } from "react";
import { Copy, ChevronDown, ChevronUp, Check } from "lucide-react";
// import "./SMSEdit.css";

import { BiSolidEdit } from "react-icons/bi";
import WhatsappTemplates from "../../../components/WhatsappTemplates/WhatsappTemplates";

const whatsappTemplatesData = [
  {
    username: "John Doe",
    lastseen: "Today at 10:30 AM",
    message: "Hello! Welcome to our service. How can I assist you today?",
    time: "11:45 AM",
    profilepic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    username: "Jane Smith",
    lastseen: "Yesterday at 8:45 PM",
    message:
      "We appreciate your business. Here's a special offer just for you!",
    time: "9:00 AM",
    profilepic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    username: "Alex Johnson",
    lastseen: "Online",
    message: "Don't miss out on our upcoming sale! Save the date: [sale_date]",
    time: "3:20 PM",
    profilepic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    username: "Emily Brown",
    lastseen: "Today at 2:15 PM",
    message: "Thank you for your recent purchase! How was your experience?",
    time: "4:30 PM",
    profilepic: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    username: "Michael Lee",
    lastseen: "Yesterday at 11:20 AM",
    message:
      "Exciting news! We've just launched our new product line. Check it out!",
    time: "10:00 AM",
    profilepic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    username: "Sarah Wilson",
    lastseen: "Online",
    message:
      "Your loyalty points are about to expire. Use them before [expiry_date]!",
    time: "2:45 PM",
    profilepic: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    username: "David Taylor",
    lastseen: "Today at 9:00 AM",
    message: "We've missed you! Here's a special comeback offer just for you.",
    time: "1:15 PM",
    profilepic: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];

const SMSEdit = ({ content, parameters, onInputChange, main_url }) => {
  const [activeLink, setActiveLink] = useState("loyaltty");
  const [customLink, setCustomLink] = useState("");
  const [messageContent, setMessageContent] = useState({
    storeName: "Pizza Mania",
    greeting: "Happy Kargil Vijay Diwas",
    message1: "Let's raise a toast",
    message2: "all our heroes",
    message3: "remember them on this day",
  });
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

  const handleContentChange = (field, value) => {
    setMessageContent((prev) => ({ ...prev, [field]: value }));
  };

  const calculateCharacterLength = () => {
    const fullMessage = `${messageContent.storeName}: ${
      messageContent.greeting
    }! ${messageContent.message1} to ${messageContent.message2} & ${
      messageContent.message3
    }. Click ${
      activeLink === "loyaltty" ? `${main_url}` : customLink
    } via loyaltty`;
    return fullMessage.length;
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
        ? `143.110.252.166:4040/lp/${main_url}`
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
                    <h3 className="sb-typography sb-typography--heading-lg sb-typography--medium ml-2">
                      Edit SMS Message
                    </h3>
                  </div>
                  <div className="sms-length mt-2">
                    Character length: {calculateCharacterLength()} / 1 credit{" "}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <BiSolidEdit
                    className="text-3xl text-[#040869] cursor-pointer"
                    onClick={toggleModal}
                  />
                </div>
              </div>
              <div >
                {/* <input
                  placeholder="Select Store Name"
                  value={messageContent.storeName}
                  onChange={(e) => handleContentChange("storeName", e.target.value)}
                  style={{ width: "11ch" }}
                />
                : <span contentEditable={true} onBlur={(e) => handleContentChange("greeting", e.target.textContent)}>{messageContent.greeting}</span>!{" "}
                <span contentEditable={true} onBlur={(e) => handleContentChange("message1", e.target.textContent)}>{messageContent.message1}</span> to{" "}
                <span contentEditable={true} onBlur={(e) => handleContentChange("message2", e.target.textContent)}>{messageContent.message2}</span> &amp;{" "}
                <span contentEditable={true} onBlur={(e) => handleContentChange("message3", e.target.textContent)}>{messageContent.message3}</span>.{" "} */}
                {/* {content.split(/(\{\{\d+\}\})/).map((part, index) => {
                  const match = part.match(/\{\{(\d+)\}\}/);
                  if (match) {
                    const paramIndex = match[1];
                    return (
                      <span
                        key={index}
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) =>
                          onInputChange(paramIndex, e.target.innerText)
                        }
                      >
                        {parameters[paramIndex]}
                      </span>
                    );
                  }
                  return part;
                })} */}
                {content.split(/(\{\{\d+\}\})/).map((part, index) => {
                  const match = part.match(/\{\{(\d+)\}\}/);
                  if (match) {
                    const paramIndex = match[1];
                    return (
                      <span
                        key={index}
                        className="flex items-center mt-1 bg-white border border-gray-300 rounded-full p-1"
                      >
                        {/* Display the number inside the curly braces */}
                        <div className="ml-2">{`{{${paramIndex}}}`}</div>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-sm rounded-full ml-2 border-none outline-none"
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
            className="md:hidden w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between items-center cursor-pointer text-base"
          >
            <span>{isDropdownOpen ? "Hide Details" : "View More"}</span>
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
            <div className="bg-gray-50 px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-200">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">
                SMS Templates
              </h2>
            </div>
            <div className="p-4 sm:p-8 lg:p-12 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
              <div
                className="grid gap-4 sm:gap-6 lg:gap-8"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                }}
              >
                {whatsappTemplatesData.map((template, index) => (
                  <div key={index} className="flex justify-center">
                    <WhatsappTemplates {...template} />
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

export default SMSEdit;
