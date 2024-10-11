import React from "react";

const SectionTitle = ({ children }) => (
  <h2 className="text-3xl font-bold text-[#040869] text-center mb-4">
    {children}
  </h2>
);

const Divider = () => <div className="w-64 h-1 bg-[#040869] mx-auto mb-10" />;

const ContentBlock = ({ children, className }) => (
  <div className={`text-xl text-[#040869] space-y-6 ${className}`}>{children}</div>
);

const DigitalMarketingStrategy = () => {
  return (
    <section className="container mx-auto px-4 pb-5 mt-4">
      <SectionTitle>
        How Whatsapp Fits Into Your Digital Marketing Strategy
      </SectionTitle>
      <Divider />

      <div className="mx-12 text-[#040869] bg-gradient-to-br from-[#F6F6F7] to-[#DCF8FF] selection:text-white selection:bg-[#040869] bg-opacity-10 rounded-2xl overflow-hidden drop-shadow-2xl">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-3/5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/97f2ba6a5545f83a623eaf446633e1ed041709761767bf7db0d65262abe2d162?apiKey=5656c26599304f2ab4d73b58ca318cfe&"
              alt="Digital Marketing Strategy Illustration"
              className="w-full h-full object-cover"
            />
          </div>
          <ContentBlock className="lg:w-1/3 p-8">
            <p>
              Whatsapp is a valuable addition to our digital marketing strategy
              as a marketing company. With its massive user base of over 2
              billion people, it provides a direct personalized communication
              channel with customers.
            </p>
            <p>
              By integrating Whatsapp into our marketing strategy, we can
              enhance customer engagement, drive conversions, and foster
              long-term relationships, ultimately leading to increased brand
              loyalty and business growth.
            </p>
          </ContentBlock>
        </div>
      </div>
    </section>
  );
};

export default DigitalMarketingStrategy;