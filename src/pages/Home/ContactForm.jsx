import React, { useState } from "react";

const InputField = ({ label, type, id, value, onChange, required }) => (
  <div className="mb-6">
    <label
      htmlFor={id}
      className="block text-lg font-medium text-[#040869] mb-2"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 border border-text-[#040869] rounded-md focus:ring-2 focus:ring-text-[#040869] focus:border-text-[#040869]"
    />
  </div>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <section className="text-[#040869] bg-gradient-to-br from-[#F6F6F7] to-[#DCF8FF] selection:text-white selection:bg-[#040869] py-8 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-8">
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            <div className="mb-4">
              <h2 className="text-5xl text-[#040869] text-center">Contact Form</h2>
              <div className="flex justify-center mt-4">
                <div className="h-1 w-32 bg-[#040869] rounded-full" />
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-[#040869] mb-6">
                Get in Touch
              </h2>
              <InputField
                label="Name"
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <div className="flex flex-wrap -mx-2 text-[#040869]">
                <div className="w-full md:w-1/2 px-2 text-[#040869]">
                  <InputField
                    label="Email"
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 px-2">
                  <InputField
                    label="Phone number"
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-lg font-medium text-[#040869] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#040869] focus:border-[#040869]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#040869] text-white font-bold py-3 px-6 rounded-md hover:bg-[#040869] transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="w-full lg:w-1/3 px-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c0a03c878f59f828bee56a6ae2f962a8ee6890993e0d68fa1c3569166a90b9a3?apiKey=5656c26599304f2ab4d73b58ca318cfe&"
              alt="Contact illustration"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;