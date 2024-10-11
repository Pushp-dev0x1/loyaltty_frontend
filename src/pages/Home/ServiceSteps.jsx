import React from "react";

const ServiceStep = ({ icon, title, description }) => (
  <div className="flex flex-col grow justify-center p-6 w-full text-white rounded-3xl bg-slate-600">
    <div className="flex items-center gap-4 mb-6">
      <img
        loading="lazy"
        src={icon}
        alt={`${title} icon`}
        className="w-16 h-16 object-contain"
      />
      <h3 className="text-2xl font-semibold">{title}</h3>
    </div>
    <p className="text-lg font-light">{description}</p>
  </div>
);

const ServiceSteps = () => {
  const steps = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6dc2752aa4bd7b8185e9d9995d37569be8b86e3329a1382590b08915fe83995?apiKey=5656c26599304f2ab4d73b58ca318cfe&",
      title: "Strategy Development",
      description:
        "We begin by understanding your business goals, target audience, and messaging objectives. Based on this information, we develop a comprehensive Whatsapp marketing strategy tailored to your specific needs.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/19c76a5655b908a34ebc9fb0a6377b538d39e4b1e387d70ad8e54a3180fc9671?apiKey=5656c26599304f2ab4d73b58ca318cfe&",
      title: "Message Creation",
      description:
        "Our team of experienced content creators develops compelling and engaging messages that align with your brand's voice and objectives. We focus on crafting concise, attention-grabbing content that encourages recipients to take action.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e5da797fc8adb63516dd8cc56846c758ad4f1fa36be7f44460fb601c92007a7a?apiKey=5656c26599304f2ab4d73b58ca318cfe&",
      title: "Compliance and Privacy",
      description:
        "We ensure compliance with relevant data protection regulations, including obtaining proper consent and managing opt-outs. We prioritize privacy and security to maintain the trust of your customers.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12 ">
      <h2 className="text-3xl text-[#040869] text-center mb-4">
        How Our Whatsapp Marketing Service Works
      </h2>
      <div className="w-32 h-1 bg-[#040869] mx-auto mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-12">
        {steps.map((step, index) => (
          <ServiceStep key={index} {...step} />
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-12">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full ${
              index < 3 ? "bg-slate-600" : "bg-slate-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceSteps;