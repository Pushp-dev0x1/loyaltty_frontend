import React from "react";

const Footer = () => {
  return (
    <footer className="w-full text-[#040869] bg-gradient-to-br from-[#F6F6F7] to-[#DCF8FF] selection:text-white selection:bg-[#040869]">
      <hr className="my-4" />
      <div className="mx-auto flex flex-col items-start space-y-8 px-4 md:flex-row md:space-y-0 md:space-x-8 max-w-6xl">
        <div className="w-full md:w-1/2">
          <h1 className="max-w-sm text-2xl md:text-3xl font-bold">
            Subscribe to our Newsletter
          </h1>
          <form
            action=""
            className="mt-4 inline-flex w-full items-center md:w-3/4"
          >
            <input
              className="flex h-10 w-full rounded-md border border-[#040869] bg-transparent px-3 py-2 text-sm placeholder:text-[#040869] focus:outline-none focus:ring-1 focus:ring-[#040869] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              placeholder="Email"
            />
            <button
              type="submit"
              className="ml-4 rounded-full bg-[#040869] px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#040869]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#040869]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-label="Arrow Icon"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </form>
        </div>
        <div className="grid grid-cols-2 gap-8 w-full md:w-1/2">
          {["Company", "Support"].map((sectionTitle) => (
            <div key={sectionTitle}>
              <p className="mb-4 text-lg font-semibold text-[#040869]">
                {sectionTitle}
              </p>
              <ul className="space-y-2 text-sm md:text-[14px] font-medium text-[#040869]">
                {["About us", "Company History", "Our Team", "Our Vision", "Press Release"].map((item) => (
                  <li key={item} className="relative group">
                    <a href="#" className="hover:text-[#040869]">
                      {item}
                    </a>
                    <span className="absolute left-0 bottom-0 h-0.5 w-full bg-[#040869] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-4" />
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between px-4 pb-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="text-lg font-bold">Loyaltty</span>
        </div>
        <div>
          <p className="text-sm font-medium text-[#040869] text-center sm:text-left">
            © 2024 Loyaltty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
