import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add subscription logic here
    console.log("Subscription email:", email);
    setEmail(""); 
    // Clear the input after submission
  };

  return (
    <footer className="text-[#040869] bg-gradient-to-br from-[#F6F6F7] to-[#DCF8FF] selection:text-white selection:bg-[#040869] min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[#040869] mb-8">
          Our page has come to an end, but our relationship with you has not.
        </h2>
        <p className="text-2xl md:text-3xl font-semibold text-center text-[#040869] mb-12">
          STAY SUSTAINABLE AND SUBSCRIBE NOW
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto"
        >
          <div className="flex-grow">
            <label htmlFor="email" className="sr-only">
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required
              className="w-full px-6 py-4 text-lg rounded-full shadow-md focus:ring-2 focus:ring-[#040869] focus:border-[#040869] outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-4 text-lg font-semibold text-white bg-[#040869] rounded-full shadow-md hover:bg-[#040869] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#040869] focus:ring-offset-2"
          >
            Get Started
          </button>
        </form>
      </div>
      <div className="mt-16 text-center text-[#040869]">
        <p>
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
        <div className="mt-4">
          <a href="#" className="text-[#040869] hover:underline mx-2">
            Privacy Policy
          </a>
          <a href="#" className="text-[#040869] hover:underline mx-2">
            Terms of Service
          </a>
          <a href="#" className="text-[#040869] hover:underline mx-2">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;