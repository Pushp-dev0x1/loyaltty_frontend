import React from "react";

const GoalItem = ({ text }) => (
  <div className="flex items-center gap-4 mb-4 ">
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7921dbd858fd8411c81c2c67227f4af32eee59f2bcc39e392015de667c36763?apiKey=5656c26599304f2ab4d73b58ca318cfe&"
      alt=""
      className="w-6 h-6"
    />
    <span className="text-lg">{text}</span>
  </div>
);

const GoalsAchieved = () => {
  const goals = [
    "Increasing brand awareness.",
    "Extending brand reach.",
    "Distributing content in multiple formats.",
    "Generating and nurturing leads.",
    "Experimenting with new marketing ideas.",
    "Improving public relations.",
  ];

  return (
    <section className="container mx-auto px-4 py-2 ">
      <h2 className="text-3xl font-bold text-[#040869] text-center mb-2">
        Your Goals, Achieved
      </h2>
      <div className="w-32 h-1 bg-[#040869] mx-auto mb-4" />

      <div className="text-[#040869] bg-gradient-to-br from-[#F6F6F7] to-[#DCF8FF] selection:text-white selection:bg-[#040869] rounded-3xl p-8 mx-12 lg:p-16 drop-shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <p className="text-lg text-[#040869] mb-8">
              Social media marketing can serve many purposes and engage multiple
              points of the marketing and sales funnel. While predominantly used
              as a top-of-funnel channel to generate brand awareness, ricoz digs
              deeper, uncovering every possible way to leverage your brand, your
              social presence and your marketing strengths.
            </p>
            <div>
              {goals.map((goal, index) => (
                <GoalItem key={index} text={goal} />
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/77f28dd3ea8544b3214cfeb6fab09ed520f8ead42b4af5c68c6e02238e2dae6a?apiKey=5656c26599304f2ab4d73b58ca318cfe&"
              alt="Goals Achieved Illustration"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsAchieved;