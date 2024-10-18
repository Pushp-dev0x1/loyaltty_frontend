import React, { useState } from "react";
import { Copy } from "lucide-react";
import "./EmailEdit.css";

const EmailEdit = ({ formData, handleInputChange }) => {
  const [emailContent, setEmailContent] = useState({
    subject: "Special Offer Inside!",
    content:
      "Dear Valued Customer,\nWe have an exciting offer just for you!\nShop Now\nThank you for your continued support.",
  });

  const [activeLink, setActiveLink] = useState("reelo");
  const [customLink, setCustomLink] = useState("");

  const handleContentChange = (field, value) => {
    setEmailContent((prev) => ({ ...prev, [field]: value }));
  };

  const handleLinkChange = (linkType) => {
    setActiveLink(linkType);
  };

  const handleCustomLinkChange = (e) => {
    setCustomLink(e.target.value);
  };

  return (
    <div className="campaign-email-edit">
      <div className="email-fields">
        <div className="editable-fields">
          <h3>Edit Email Content</h3>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Email Subject"
            className="email-input"
          />
        </div>
      </div>
    </div>
  );
};

export default EmailEdit;
