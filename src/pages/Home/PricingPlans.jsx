import React from "react";

const PricingPlan = ({ title, price, features }) => (
  <div className="flex flex-col grow pb-8 pl-2 mt-1 w-full bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 max-md:mt-10 max-md:max-w-full">
    <div className="flex flex-col items-center mt-9 text-[#040869] max-md:mt-10">
      <div className="text-4xl font-bold">{title}</div>
      <div className="mt-2.5 text-2xl font-medium">PACK</div>
      <div className="mt-2.5 text-3xl font-extrabold text-black">
        ₹ {price}
      </div>
    </div>
    <button className="justify-center self-center px-7 py-3 mt-5 text-base text-white rounded-xl shadow-md bg-[#040869] hover:bg-[#040869] transition-colors duration-300 max-md:px-5">
      BUY NOW
    </button>
    <ul className="mt-8 text-base text-[#040869] list-disc pl-6">
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
  </div>
);

const PricingPlans = () => {
  const plans = [
    {
      title: "SPECIAL",
      price: "10,500",
      features: [
        "Fifteen info graphic for",
        "One key video",
        "Management of Two social pages",
        "Expanding customer base",
        "Using hashtags in the most effective way",
        "Assurance & peace of mind of social pages",
        "Get the push in social media for events and conference",
        "Expanding reach by joining up to three social media groups",
      ],
    },
    {
      title: "SPECIAL PRO",
      price: "14,800",
      features: [
        "Thirty info graphic for",
        "Two key video",
        "Management of Two social media handle",
        "Expanding customer base",
        "Increase follower on social pages",
        "Using hashtags in the most effective way",
        "Assurance & peace of mind of social pages",
        "Get the push in social media for events and conference",
      ],
    },
    {
      title: "CORPORATE",
      price: "21,000",
      features: [
        "Sixty info graphic for",
        "Three key video",
        "Management/content of Two social pages handle",
        "Increase follower on social pages",
        "Using hashtag in the most effective way",
        "Assurance peace of mind of social pages",
        "Get the push in social media for events and conference",
        "Expanding reach by joining up to Three social media groups",
      ],
    },
  ];

  return (
    <section className="py-2 px-5 text-[#040869] bg-gradient-to-br from-[#F6F6F7] to-[#DCF8FF] selection:text-white selection:bg-[#040869] min-h-screen">
      <h2 className="text-5xl text-[#040869] text-center">Our Pricing</h2>
      <div className="flex justify-center mt-4">
        <div className="h-1 w-32 bg-[#040869] rounded-full" />
      </div>
      <div className="self-stretch px-11 py-2 mt-2 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
            >
              <PricingPlan {...plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
