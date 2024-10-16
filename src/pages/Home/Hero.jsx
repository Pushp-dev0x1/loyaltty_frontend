import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col justify-center items-center px-4 py-20 min-h-screen text-white overflow-hidden">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/922e795a09752e8a9e9b382110474f555cf4412ae256449a9716dada1402024e?apiKey=5656c26599304f2ab4d73b58ca318cfe&"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
          Whatsapp Marketing <br /> Services
        </h1>
        {/* <div className="backdrop-blur-sm bg-white/15 rounded-2xl"> */}
        <p className="text-xl md:text-2xl lg:text-3xl mb-12">
          Unlock the Power of Whatsapp! Connect, Engage, and Convert with Our
          Proven Whatsapp Marketing Services. Reach your audience instantly and
          drive business growth with our tailored solutions.
        </p>
        {/* </div> */}
        <button
          onClick={() => navigate("/merchant-login")}
          className="px-8 py-4 bg-black text-white text-lg font-medium rounded-lg shadow-lg hover:bg-gray-900 transition-colors duration-300"
        >
          Get Started Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
