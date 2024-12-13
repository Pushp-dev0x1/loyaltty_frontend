import React from "react";

const EmailCard = ({ content, parameters, main_url,activeParameterIndex }) => {
  const mergeContentWithParameters = () => {
    if (!content || !parameters) return content;

    const parts = content.split(/(\{\{\d+\}\})/g); // Split the content at placeholders
    return parts.map((part, index) => {
      const match = part.match(/\{\{(\d+)\}\}/); // Check if part is a parameter placeholder
      if (match) {
        const paramIndex = parseInt(match[1], 10);
        const paramValue = parameters[paramIndex];
        if (paramValue !== undefined) {
          console.log(paramIndex,"main param inde x we have")
          const highlightClass = paramIndex == activeParameterIndex ? "highlightwhatsapptxt" : "boldtextwhtsapp";
          return (
            <span key={index} className={highlightClass}>
              {paramValue}
            </span>
          );
        }
      }
      return part; // Return the text part if it's not a parameter
    });
  };

  return (
    <div className="sms-preview-card">
      <div className="preview-sms-card">
        <div className="header">
          <div className="logo">
            {/* <img src="../../../public/images/logo34.png"/> */}
          </div>
         
        </div>
        <div className="sms">
          <div className="text">
            {mergeContentWithParameters()} Click{" "}
            <a
              href={`${main_url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {main_url}
            </a>{" "}
            via Loyaltty
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailCard;
