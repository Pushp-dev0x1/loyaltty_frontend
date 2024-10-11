import React from "react";

const ServiceOffering = ({ icon, text }) => (
  <div className="flex items-center gap-4 mb-2 p-4 mr-6 rounded-lg bg-white shadow-lg transition-transform transform hover:scale-105">
    <img
      loading="lazy"
      src={icon}
      alt=""
      className="w-16 h-16 object-contain"
    />
    <span className="text-lg font-semibold text-[#040869]">{text}</span>
  </div>
);

const ServiceOfferings = () => {
  const offerings = [
    { text: "Account Set-up" },
    { text: "Broadcast Messaging" },
    { text: "Campaign Management" },
    { text: "Customized Packages" },
    { text: "Group Management" },
  ];

  return (
    <>
      <div className="mt-4">
        <h2 className="text-4xl font-bold text-[#040869] text-center mb-6">
          Whatsapp Management and Service Offerings
        </h2>
        <div className="w-32 h-1 bg-[#040869] mx-auto mb-8 rounded-full" />
      </div>
      <section className="flex items-center justify-center py-8 mx-16 rounded-2xl shadow-xl text-[#040869] bg-gradient-to-br from-[#F6F6F7] to-[#DCF8FF] selection:text-white selection:bg-[#040869] drop-shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-10 py-0">
          <div className="lg:w-2/3">
            <p className="text-xl mb-6 text-gray-700">
              At Ricoz, our social media marketing services are available as part
              of a flexible monthly subscription. Your dedicated social media
              strategist collaborates closely with your brand, channel partners,
              and vendors to meticulously plan your Whatsapp campaigns from start
              to finish, while maintaining the agility to optimize and adjust
              tactics as needed.
            </p>
            <p className="text-xl text-gray-700">
              Whether you prefer a hands-off approach or wish to be more involved,
              Brafton can manage the entire scope of your social media
              management as required.
            </p>
          </div>
          <div className="lg:w-1/3">
            {offerings.map((offering, index) => (
              <ServiceOffering
                key={index}
                icon="https://cdn.builder.io/api/v1/image/assets/TEMP/b6c49de144385312c26e85c78e11cd649f96ffd945a6ba0e21c516fc7c90b561?apiKey=5656c26599304f2ab4d73b58ca318cfe&"
                {...offering}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceOfferings;