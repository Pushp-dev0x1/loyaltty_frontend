import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import './EmailEdit.css';

const EmailEdit = ({formData,handleInputChange}) => {
  const [emailContent, setEmailContent] = useState({
    subject: 'Special Offer Inside!',
    content: 'Dear Valued Customer,\nWe have an exciting offer just for you!\nShop Now\nThank you for your continued support.',
  });

  const [activeLink, setActiveLink] = useState('reelo');
  const [customLink, setCustomLink] = useState('');

  const handleContentChange = (field, value) => {
    setEmailContent(prev => ({ ...prev, [field]: value }));
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
            name='subject'
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Email Subject"
            className="email-input"
          />
          {/* <textarea
            value={emailContent.content}
            onChange={(e) => handleContentChange('content', e.target.value)}
            placeholder="Email Content"
            className="email-textarea"
            rows={4}
            style={{ resize: 'vertical' }}
          /> */}
        </div>
        {/* <div className="link-section">
          <h3>Campaign Link</h3>
          <div className="link-buttons">
            <button
              className={`link-btn ${activeLink === 'reelo' ? 'active-link-btn' : ''}`}
              onClick={() => handleLinkChange('reelo')}
            >
              Reelo Link
            </button>
            <button
              className={`link-btn ${activeLink === 'custom' ? 'active-link-btn' : ''}`}
              onClick={() => handleLinkChange('custom')}
            >
              Custom Link
            </button>
          </div>
          {activeLink === 'reelo' ? (
            <div className="link-display">l.reelo.io/pUcha</div>
          ) : (
            <input
              type="text"
              value={customLink}
              onChange={handleCustomLinkChange}
              placeholder="Enter your custom link"
              className="custom-link-input"
            />
          )}
          <button className="copy-btn">
            <Copy size={18} />
            <span>Copy Link</span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default EmailEdit;