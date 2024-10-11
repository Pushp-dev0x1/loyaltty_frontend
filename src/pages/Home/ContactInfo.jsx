import React from "react";

const ContactItem = ({ icon, alt, href, text, type }) => (
  <div className="flex items-center space-x-4">
    <img
      src={icon}
      alt={alt}
      className="w-10 h-10 object-contain"
      width="40"
      height="40"
      loading="lazy"
    />
    <a
      href={href}
      className="text-lg md:text-xl lg:text-2xl text-gray-800 hover:text-blue-600 transition duration-300"
      {...(type === "tel" && { "aria-label": "Call us" })}
      {...(type === "email" && { "aria-label": "Email us" })}
      {...(type === "website" && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
    >
      {text}
    </a>
  </div>
);

const ContactInfo = () => {
  const contactItems = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/643a34c8c80dba2619ff54b271942016996b6693ca2398d20d1a6a0c4c56b751?apiKey=5656c26599304f2ab4d73b58ca318cfe&",
      alt: "Phone icon",
      href: "tel:+917011112666",
      text: "+91-7011112666",
      type: "tel",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/70fa8147712576b4ff5f07f5d438d59ea36334c7b78e98b8554246a4a4d3992e?apiKey=5656c26599304f2ab4d73b58ca318cfe&",
      alt: "Email icon",
      href: "mailto:info@ricoz.in",
      text: "info@ricoz.in",
      type: "email",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/768feb1dd151cf1ea3068171e46490886a20b84f7993485b203a3753d5ee8891?apiKey=5656c26599304f2ab4d73b58ca318cfe&",
      alt: "Website icon",
      href: "https://ricoz.in",
      text: "ricoz.in",
      type: "website",
    },
  ];

  return (
    <section className="bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="sr-only">Contact Information</h2>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-4">
          {contactItems.map((item, index) => (
            <ContactItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
