import React from "react";

const ReasonItem = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
    <div className="flex items-center mb-4">
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="w-12 h-12 mr-4"
        width="48"
        height="48"
      />
      <h3 className="text-2xl font-semibold">{title}</h3>
    </div>
    <p className="text-lg">{description}</p>
  </div>
);

const WhyUs = () => {
  const reasons = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2b1d8ae87a87ce96229e3971a6e6a81fee82bf1035652a29dc53fd15c770acb3?apiKey=5656c26599304f2ab4d73b58ca318cfe&",
      title: "Creative Strategy",
      description:
        "Formulate your success strategy with the help of our professionals in a creative fashion",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e9f70dbb7c47a98f58b9f0e5af85a8460f61ed32323f5b5fd63fccd343ffe306?apiKey=5656c26599304f2ab4d73b58ca318cfe&",
      title: "Customer's Satisfaction",
      description:
        "We prioritise our customers and ensure that the service we provide caters to their needs and interests",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8f9051c3b1122a48f1098441e77224e7e3ade76d2fb1b7ecb2096fd3b9b77ee2?apiKey=5656c26599304f2ab4d73b58ca318cfe&",
      title: "Engaging Content",
      description:
        "Capture the attention of potential clients with engaging designs that keep them hooked on",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b4e98aadd7a07420c45be93851e0d04f79aebc9f1927bcd981e1fa53625f3d9c?apiKey=5656c26599304f2ab4d73b58ca318cfe&",
      title: "Experienced Team",
      description:
        "Our team from varying fields have years of experience in them and ensure that your needs are met.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6964946e2ed268cdcca3b0010cae6ae522c352999c8a482b898d2260644871c3?apiKey=5656c26599304f2ab4d73b58ca318cfe&",
      title: "Guaranteed Results",
      description:
        "Watch your profits soar as our deep analysis help your company become leaders of tomorrow",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5fcb3e93f8486112f29331ed95e301f22b8b4b020d444c97046fc99e4415be2b?apiKey=5656c26599304f2ab4d73b58ca318cfe&",
      title: "24/7 Support",
      description:
        "Facing any troubles or stuck with your solutions? Our 24/7 Support system will ensure that ur problems are solved at any time.",
    },
  ];

  return (
    <section className="text-[#040869] bg-gradient-to-br from-[#F6F6F7] to-[#DCF8FF] selection:text-white selection:bg-[#040869] min-h-screen bg-opacity-10 py-5 px-12">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-black text-center mb-12 bg-amber-300 bg-opacity-80 rounded-full py-4 px-8 inline-block">
          Why us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <ReasonItem key={index} {...reason} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;