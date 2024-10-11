import React, { useState } from "react";
import { Calendar, Wallet, MessageSquareText, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoyaltyProgram = () => {
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState([
    "12/02/2034",
    "23/02/2034",
    "10/03/2034",
    "12/03/2034",
  ]);

  return (
    <section className="flex items-center justify-center min-h-screen text-[#040869] bg-gradient-to-br from-[#F6F6F7] to-[#DCF8FF] p-4 selection:text-white selection:bg-[#040869]">
      <div className="w-full max-w-5xl bg-[#FFFFFF] rounded-2xl shadow-lg p-6 space-y-4 flex justify-between gap-4 items-start mb-6 h-full">
        <div className="w-2/3 h-full">
          <h2 className="text-3xl font-bold mb-2 text-[#040869]">Loyaltty</h2>
          <div className="w-full h-2 rounded-full mb-4">
            <div className="w-full bg-[#040869] h-2 rounded-full" />
          </div>
          <h3 className="text-2xl font-bold mb-1">Summary</h3>
          <p className="mb-4">
            And a subheading describing your pricing plans, too
          </p>

          <div className="w-full h-full space-y-10 p-5 shadow-inner rounded-xl bg-[#F6F6F7]">
            <div className="flex items-center">
              <MessageSquareText className="mr-2 size-8" />
              <div className="w-full flex items-center gap-5">
                <p className="w-52 text-lg font-semibold ">Message:</p>
                <p className="text-base">
                  Hi USER Welcome to Our DLF! We Want to present you our
                  exclusive discount of 10% Visit Us Now Gurugram
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <UserRound className="mr-2 size-8" />
              <div className="w-full flex items-center gap-5">
                <p className="w-52 text-lg font-semibold text-[#040869]">
                  Selected Users:
                </p>
                <button className="border border-[#040869] rounded-full py-1 px-4">
                  Loyalty Group
                </button>
                <button className="border border-[#040869] rounded-full py-1 px-4">
                  Royal Group
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/3 h-full space-y-10 p-5 shadow-inner rounded-xl bg-[#F6F6F7]">
          <div className="flex items-center">
            <Wallet className="mr-2" />
            <div>
              <p className="font-semibold text-[#040869]">Your Wallet</p>
              <p className="text-2xl text-[#040869]">$ 20.00</p>
            </div>
          </div>

          <div className="flex items-center">
            <Wallet className="mr-2" />
            <div>
              <p className="font-semibold text-[#040869]">Estimate Cost:</p>
              <p className="text-2xl text-[#040869]">$ 16.70</p>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <Calendar className="mr-2" />
              <p className="font-semibold text-[#040869]">Campaign Schedule:</p>
            </div>
            <div className="space-y-2 ml-6">
              {selectedDates.map((date, index) => (
                <div key={index} className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span className="text-[#040869]">{date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="border border-[#040869] rounded py-2 px-6 text-[#040869]"
              onClick={() => navigate("/SetupCampaign")}
            >
              Back
            </button>
            <button
              className="bg-[#040869] text-white rounded py-2 px-6"
              onClick={() => navigate("")}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoyaltyProgram;
