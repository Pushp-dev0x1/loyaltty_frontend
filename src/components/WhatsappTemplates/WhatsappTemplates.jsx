import React from "react";

const WhatsappTemplates = ({ username, lastseen, content, time, onClick }) => {
  return (
    <div className="flex justify-evenly pb-6">
      <section>
        <div className="sticky bottom-4 right-8 font-['Josefin_Sans',_sans-serif] m-0 p-0 w-80 max-w-[calc(100%-60px)] flex flex-col items-end z-10">
          <div className="w-full bg-[#eae1da] rounded-[15px] flex transition-opacity duration-1000 flex-col h-[250px]">
            <section className="bg-[#00796a] text-white rounded-t-[15px] p-[5px] text-center flex flex-col justify-center">
              <div className="flex items-center space-x-3 p-2">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={
                      "https://cygen.com.au/cygenwebretail/uploads/company/loyaltyy.jpg"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Loyaltty</h2>
                  <p className="text-xs text-gray-300">Online</p>
                </div>
              </div>
            </section>
            <div className="flex-grow overflow-y-auto">
              <div className="bg-white m-[10px_18px_10px_30px] p-[9px_9px_25px_9px] text-left rounded-[0_10px_10px_10px] relative transition-opacity duration-1000 after:content-[''] after:absolute after:left-0 after:top-0 after:w-0 after:h-0 after:border-[15px_solid_transparent] after:border-r-white after:border-l-0 after:border-t-0 after:mt-0 after:-ml-[15px]">
                <p className="m-0 text-sm break-words">{content}</p>
                <span className="absolute bottom-[5px] right-[9px] opacity-50 text-[11px]">
                  {time}
                </span>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-auto">
              <div className="w-full p-4 bg-[#f0f0f0] rounded-b-[15px] hover:bg-[#e0e0e0] transition-colors duration-200">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">
                    Select Template
                  </span>
                  <input
                    onClick={onClick}
                    type="radio"
                    name="templateSelection"
                    className="form-radio h-5 w-5 text-[#00796a] focus:ring-[#00796a] transition duration-150 ease-in-out"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatsappTemplates;
