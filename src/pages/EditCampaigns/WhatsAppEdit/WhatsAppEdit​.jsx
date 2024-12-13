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
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
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
              <h3 className="text-base font-semibold text-[#040869]">
                Edit WhatsApp Message
              </h3>
            </div>
            <div className="sms-length text-xs text-gray-500 mt-0.5">
              Character length: 139 / 1 credit
            </div>
          </div>
          <div className="flex-shrink-0">
            <BiSolidEdit
              className="text-xl text-[#040869] cursor-pointer hover:text-[#060c92] transition-colors"
              onClick={toggleModal}
            />
          </div>
        </div>

        <div>
          {content.split(/(\{\{\d+\}\})/).map((part, index) => {
            const match = part.match(/\{\{(\d+)\}\}/);
            if (match) {
              const paramIndex = match[1];
              return (
                <div
                  key={index}
                  className="flex items-center mt-1 bg-white border border-gray-300 rounded-full p-1"
                >
                  <span className="text-xs ml-2">{`{{${paramIndex}}}`}</span>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm rounded-full ml-2 border-none outline-none"
                    placeholder={parameters[paramIndex] || ""}
                    onChange={(e) => onInputChange(paramIndex, e.target.value)}
                  />
                </div>
              );
            }
          })}
        </div>
        <p className="why-link-button text-xs mt-1">Why can't I edit everything?</p>
      </div>
    </div>
  </div>
</div>

{isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
    <div
      ref={modalRef}
      className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-auto mx-auto overflow-hidden transform transition-all"
    >
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-800">WhatsApp Templates</h2>
        {selectedTemplate && (
          <button
            onClick={handleConfirm}
            className="bg-[#040869] text-white text-sm px-4 py-2 rounded-md mt-2"
          >
            Select
          </button>
        )}
      </div>
      <div className="p-4 sm:p-8 lg:p-12 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)"}}>
        <div
          className="grid gap-2 sm:gap-6 lg:gap-8"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
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
