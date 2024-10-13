import React, { useState, useRef, useEffect } from "react";
import { Copy, ChevronDown, ChevronUp, Check } from "lucide-react";
import "./SMSEdit.css";

import { BiSolidEdit } from "react-icons/bi";
import WhatsappTemplates from "../../../components/WhatsappTemplates/WhatsappTemplates";
import { useGetAllSMSTemplatesQuery } from "../../../store/services/templateService";


const SMSEdit = ({ content, parameters, onInputChange, main_url,
  selected_SMS,
  setselected_SMS,

 }) => {
  const [activeLink, setActiveLink] = useState("loyaltty");
  const { data: templatedata, isLoading: isblogsloading } =
  useGetAllSMSTemplatesQuery();
  const whatsappTemplatesData = templatedata?.data
  
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
        ? `64.227.154.213:4040/lp/${main_url}`
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
      setselected_SMS(selectedTemplate); // Update the selected template
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
                Click{" "}
                {activeLink === "loyaltty"
                  ? `${main_url}`
                  : customLink}{" "}
                via loyaltty
              </div>
              <p className="why-link-button">Why can't I edit everything?</p>
            </div>
          </div>
          <div
            onClick={toggleDropdown}
            className="md:hidden w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between items-center cursor-pointer text-base"
          >
            <span>{isDropdownOpen ? "Hide Details" : "View More"}</span>
            {isDropdownOpen ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div>
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
                <div className="link">64.227.154.213:4040/lp/{main_url}</div>
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
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 sm:p-0">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-2xl w-4/5 max-w-6xl h-auto mx-auto overflow-hidden transform transition-all"
          >
            <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
              <h2 className="text-3xl font-semibold text-gray-800">
                SMS Templates
              </h2>
              {selectedTemplate && (
                <button
                  onClick={handleConfirm}
                  className="flex p-1 mt-5 md:mt-0 text-xl items-center justify-center text-white border-solid bg-[#040869] border-[2.008px] border-black border-opacity-10 min-h-[52px] rounded-[32.131px] w-full md:w-[200px] md:max-w-[364px] md:absolute md:bottom-5 md:left-1/2 md:transform md:-translate-x-1/2"
                >
                  Select
                </button>
              )}
            </div>
            <div className="p-8 overflow-y-auto" style={{ maxHeight: "80vh" }}>
              <div
                className="grid auto-cols-fr auto-rows-fr"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                }}
              >
                {whatsappTemplatesData.map((template, index) => (
                  <WhatsappTemplates key={index}  onClick={() => handleTemplateSelect(template)} {...template} />
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
