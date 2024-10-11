import React, { useState, useRef, useEffect } from "react";
import { Copy, ChevronDown, ChevronUp, Check } from "lucide-react";
import "./WhatsAppEdit.css";

const WhatsAppEdit = ({ content, parameters, onInputChange,main_url }) => {
  const [activeLink, setActiveLink] = useState("loyaltty");
  const [customLink, setCustomLink] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("idle");
  const contentRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleLinkChange = (linkType) => {
    setActiveLink(linkType);
  };

  const handleCustomLinkChange = (e) => {
    setCustomLink(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (isDropdownOpen && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const copyToClipboard = async () => {
    const linkToCopy = activeLink === "loyaltty" 
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

  return (
    <>
      <div className="campaign-sms-right">
        <div className="sms-fields">
          <div className="non-editable-fields">
            <div className="textarea-component">
              <div className="textarea-heading">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="#175CD3"/>
                  <path d="M7 9H9V11H7V9ZM11 9H13V11H11V9ZM15 9H17V11H15V9Z" fill="#175CD3"/>
                </svg>
                <h3 className="sb-typography sb-typography--heading-lg sb-typography--medium">Edit WhatsApp Message</h3>
              </div>
              <div className="sms-length">Character length: 139 / 1 credit </div>
              <div className="textarea">
                {
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
                }
              </div>
              <p className="why-link-button">Why can't I edit everything?</p>
            </div>
          </div>
          <div 
            onClick={toggleDropdown}
            className="md:hidden w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between items-center cursor-pointer"
          >
            <span className="text-base">{isDropdownOpen ? "Hide Details" : "View More"}</span>
            {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          <div 
            ref={contentRef}
            className={`mt-2 md:mt-4 space-y-2 md:space-y-6 ${isDropdownOpen ? 'block' : 'hidden'} md:block`}
          >
            <div className="editDivs">
              <h3>Campaign link</h3>
              <div className="primary-button-group">
                <button 
                  className={activeLink === "loyaltty" ? "active-custom-btn" : "custom-btn"}
                  onClick={() => handleLinkChange("loyaltty")}
                >
                  Loyaltty Link
                </button>
                <button 
                  className={activeLink === "custom" ? "active-custom-btn" : "custom-btn"}
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
                className={`copy-btn ${copyStatus === 'copied' ? 'bg-green-500' : copyStatus === 'error' ? 'bg-red-500' : ''}`} 
                onClick={copyToClipboard}
                disabled={copyStatus !== 'idle'}
              >
                {copyStatus === 'idle' && <Copy size={20} />}
                {copyStatus === 'copied' && <Check size={20} />}
                {copyStatus === 'error' && <Copy size={20} />}
                <span className="ml-2">
                  {copyStatus === 'idle' && 'Copy'}
                  {copyStatus === 'copied' && 'Copied!'}
                  {copyStatus === 'error' && 'Failed to copy'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatsAppEdit;
