import React from "react";

const WhatsappPreview = ({ content, logo, parameters, main_url, activeParameterIndex }) => {
  const renderContentWithParameters = () => {
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

  console.log(activeParameterIndex, "main selected index whatsapp");

  return (
    <>
       <div className="sms-preview-card ">
       <div className="preview-sms-card">
      <div className="whatsapp-preview overflow-hidden mt-5">
        <div className="outer-div">
          <div className="visible-screen">
            <div className="sticky-header">
              <div className="logo-div">
                <img alt="logo" src={logo} />
              </div>
              <p className="wa-header">Loyaltty</p>
            </div>
            <div className="msg-container">
              <p className="msg">{renderContentWithParameters()}</p>
            </div>
            <a
              target="_blank"
              className="btn"
              rel="noreferrer"
              href={`${main_url}`}
            >
              {main_url}
            </a>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default WhatsappPreview;
