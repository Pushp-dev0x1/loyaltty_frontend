import React, { useState, useEffect } from "react";
import { Calendar, Wallet, X, CalendarX2 } from "lucide-react";
import { Calendar as MainCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import TimePicker from "react-time-picker";
import { FaWhatsapp } from "react-icons/fa";
import { useSendPaymentMutation } from "../../../store/services/paymentService";

const ToggleSwitch = ({
  channel,
  isChecked,
  onChange,
  data,
  checkedPlatforms,
  handlePlatformToggle,
}) => (
  <th className="pb-2 sm:pb-4 md:pb-6">
    <label className="flex flex-col sm:flex-row items-center cursor-pointer gap-2 sm:gap-4">
      <img
        src={data.icon}
        alt={`${data.name} icon`}
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
      />
      <div className="relative mt-2 sm:mt-0">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checkedPlatforms[data.name]} // Dynamically check based on platform name
          onChange={() => handlePlatformToggle(data.name)}
        />
        <div className="w-10 h-5 sm:w-12 sm:h-6 md:w-14 md:h-7 bg-gray-300 rounded-full shadow-inner transition-colors duration-300 ease-in-out peer-checked:bg-[#040869]"></div>
        <div className="dot absolute w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-white rounded-full shadow left-0.5 top-0.5 transition-transform duration-300 ease-in-out peer-checked:translate-x-5 sm:peer-checked:translate-x-6 md:peer-checked:translate-x-7 peer-checked:bg-white"></div>
      </div>
    </label>
  </th>
);

const RefillCreditsPopup = ({ isOpen, onClose }) => {
  const [doPayment, response] = useSendPaymentMutation();
  const [selectedChannels, setSelectedChannels] = useState({
    SMS: { selected: true, price: 20, credits: 100 },
    Email: { selected: true, price: 25, credits: 250 },
    Whatsapp: { selected: true, price: 50, credits: 300 }, // Adjusted credits for $50 to 300
  });

  useEffect(() => {
    if (response?.isSuccess) {
      window.location.href = response?.data?.url;
    }
  }, [response]);

  const handleToggle = (channel) => {
    setSelectedChannels((prev) => ({
      ...prev,
      [channel]: { ...prev[channel], selected: !prev[channel].selected },
    }));
  };

  const handleCustomCreditChange = (channel, value) => {
    // Adjusting credits based on price to provide more benefits for higher prices
    const adjustedCredits = value < 50 ? value * 5 : value * 6; // For $50 and above, credits are calculated at a higher rate
    setSelectedChannels((prev) => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        price: Number(value),
        credits: adjustedCredits,
      },
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    Object.values(selectedChannels).forEach((channel) => {
      if (channel.selected) {
        total += channel.price;
      }
    });
    return total;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 m-4 mt-12 mb-12 sm:p-6 w-full sm:w-[95%] md:w-[90%] lg:w-[80%] max-w-3xl animate-fadeIn relative">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
          Refill your credits to reach your customers.
        </h2>
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
          {["SMS", "Email", "Whatsapp"].map((channel) => (
            <div
              key={channel}
              className="bg-[#FFFBF2] border border-[#E6DCC2] rounded-lg p-3 sm:p-4 w-full sm:w-[30%]"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold flex items-center text-sm sm:text-base">
                  {channel}
                  {channel === "SMS" && (
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/955b66fbf0f91ff53047e485a2e2f52b4b90675a14ba86b942d0b65fdd9cda8a?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
                      alt="SMS"
                      className="ml-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    />
                  )}
                  {channel === "Email" && (
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccfdca0b8f4a8882d438a4bcfb7d0977e85429c0e35245f44a752a0cc95cad03?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
                      alt="Email"
                      className="ml-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    />
                  )}
                  {channel === "Whatsapp" && (
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/eedee36cff5fc292dceae6980b1fda5b74659ce945c0feb2cad04c718988ae92?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
                      alt="Whatsapp"
                      className="ml-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    />
                  )}
                </span>
                <div
                  className={`w-8 sm:w-10 md:w-12 h-4 sm:h-5 md:h-6 ${
                    selectedChannels[channel] ? "bg-[#040869]" : "bg-gray-300"
                  } rounded-full relative cursor-pointer`}
                  onClick={() => handleToggle(channel)}
                >
                  <div
                    className={`absolute ${
                      selectedChannels[channel] ? "right-0.5" : "left-0.5"
                    } top-0.5 w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 bg-white rounded-full transition-all duration-300`}
                  ></div>
                </div>
              </div>
              {selectedChannels[channel].selected &&
                [20, 25, 50, 100].map((price, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2 text-xs sm:text-sm"
                  >
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`${channel}-price`}
                        value={price}
                        className="mr-2 w-3 h-3 sm:w-4 sm:h-4"
                        checked={selectedChannels[channel].price === price}
                        onChange={() =>
                          setSelectedChannels((prev) => ({
                            ...prev,
                            [channel]: {
                              ...prev[channel],
                              price,
                              credits: price < 50 ? price * 5 : price * 6,
                            },
                          }))
                        }
                      />
                      <span>{price}$</span>
                    </label>
                    <span className="text-[#007E7D]">
                      {price < 50 ? price * 5 : price * 6} credits
                    </span>
                  </div>
                ))}
              {selectedChannels[channel].selected && (
                <>
                  <p className="text-xs text-gray-900">Credits</p>
                  <div className="mt-1">
                    <div className="flex items-center">
                      <input
                        type="number"
                        placeholder="Enter numbers of credit"
                        className="w-full text-xs sm:text-sm p-1.5 sm:p-2 rounded-full border border-gray-300 focus:outline-none bg-transparent"
                        onChange={(e) =>
                          handleCustomCreditChange(channel, e.target.value)
                        }
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <div>
            <p className="font-semibold text-sm sm:text-base">
              Total{" "}
              <span className="text-[#007E7D]">$ {calculateTotal()}.00</span>
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Price excludes GST
            </p>
          </div>
          <button
            onClick={() =>
              doPayment({
                amount: calculateTotal(),
                merchantId: "66b2858654354cd7467e5e7c",
              })
            }
            className="bg-[#040869] text-white py-2 px-4 rounded-full text-xs sm:text-sm md:text-base w-full sm:w-auto"
          >
            Proceed to checkout
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 bg-white text-gray-500 rounded-full p-1 sm:p-1.5 md:p-2 shadow-md"
        >
          <X size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
};

const Budget = ({
  onInputChange,
  estimatedCost,
  users,
  checkedPlatforms,
  setCheckedPlatforms,
  templatedata,
  setStep,
  currentStep,
  eachPlatformCost,
}) => {
  const [send_time, setSendTime] = useState("now");
  const [date, setDate] = useState(new Date());

  const [tempDisabledData, setTempDisabledData] = useState({});
  const [time, setTime] = useState("10:00");
  const [credits, setCredits] = useState({
    Avialable: {
      available: 1000,
      toBeUsed: 800,
      balance: 200,
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/955b66fbf0f91ff53047e485a2e2f52b4b90675a14ba86b942d0b65fdd9cda8a?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f' : 'https://cdn.builder.io/api/v1/image/assets/TEMP/955b66fbf0f91ff53047e485a2e2f52b4b90675a14ba86b942d0b65fdd9cda8a?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f",
      name: "email",
    },
    Usage: {
      available: eachPlatformCost().email,
      toBeUsed: eachPlatformCost().sms,
      balance: eachPlatformCost().whatsapp,
      name: "sms",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ccfdca0b8f4a8882d438a4bcfb7d0977e85429c0e35245f44a752a0cc95cad03?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f",
    },
    Balance: {
      available: 1000 - eachPlatformCost().email,
      toBeUsed: 800 - eachPlatformCost().sms,
      balance: 200 - eachPlatformCost().whatsapp,
      name: "whatsapp",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/eedee36cff5fc292dceae6980b1fda5b74659ce945c0feb2cad04c718988ae92?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f",
    },
  });
  const [isRefillPopupOpen, setIsRefillPopupOpen] = useState(false);
  const [isHowCreditsWorkPopupOpen, setIsHowCreditsWorkPopupOpen] =
    useState(false);

  useEffect(() => {
    if (onInputChange) {
      const formattedDateTime = formatDateTime(date, time);
      onInputChange(
        send_time === "now" ? new Date().toISOString() : formattedDateTime
      );
    }
  }, [send_time, date, time, onInputChange]);

  const handlePlatformToggle = (platformId) => {
    setCheckedPlatforms((prev) => {
      const isDisabled = !prev[platformId];

      if (isDisabled) {
        setStep(currentStep + 1);
        // Temporarily store the disabled platform's data
        setTempDisabledData((prevTemp) => ({
          ...prevTemp,
          [platformId]: templatedata.data.platformContents.find(
            (platform) => platform.platformId.type === platformId
          ),
        }));
      } else {
        setStep(currentStep - 1);
        // Re-enable the platform: restore it from `tempDisabledData`
        setTempDisabledData((prevTemp) => {
          const { [platformId]: removed, ...rest } = prevTemp;
          return rest;
        });
      }

      return {
        ...prev,
        [platformId]: isDisabled,
      };
    });
  };

  const handleContinue = () => {
    Object.keys(checkedPlatforms).forEach((platformId) => {
      if (!checkedPlatforms[platformId]) {
        // Permanently clear the data for disabled platforms
        setTempDisabledData((prevTemp) => {
          const { [platformId]: removed, ...rest } = prevTemp;
          return rest;
        });
      }
    });

    console.log("Platform data cleared for disabled platforms");
  };

  const formatDateTime = (date, time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const formattedDate = new Date(date);
    formattedDate.setHours(hours, minutes);
    return formattedDate.toISOString();
  };
  const [show_Credit, setshow_Credit] = useState(false);
  return (
    <div className="w-full space-y-6 p-4 bg-white rounded-xl">
      <div className="flex justify-between">
        <div className="flex items-center bg-[#E6F7FF] rounded-lg p-2 w-[48%] border-[0.5px] border-[#007e7d]">
          <Wallet className="mr-2 w-6 h-6 text-[#b96518]" />
          <div>
            <p className="text-base font-bold text-black">Estimate Cost</p>
            <p className="font-bold text-sm text-[#007e7d]">
              {estimatedCost()}
            </p>
          </div>
        </div>
        <div className="flex items-center bg-[#E6F7FF] rounded-lg p-2 w-[48%] border-[0.5px] border-[#007e7d]">
          <Wallet className="mr-2 w-6 h-6 text-[#b96518]" />
          <div>
            <p className="text-base font-bold text-black">Total No. Selected</p>
            <p className="font-bold text-sm text-[#007e7d]">{users?.length}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-[#040869] text-white py-2 px-4 rounded-full text-sm font-semibold"
          onClick={() => setIsRefillPopupOpen(true)}
        >
          Refill Credits
        </button>
        <div className="flex items-center">
          <button
            onClick={() => setshow_Credit(!show_Credit)}
            className="text-sm text-[#040869] font-semibold underline"
          >
            How credits work?
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#040869"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
      </div>

      {show_Credit && (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-[#FFF5E6] p-4 rounded-lg flex-1 border-[0.5px] border-[#d9b9a0]">
            <h3 className="font-bold mb-2 text-base md:text-lg">
              How credits work?
            </h3>
            <p className="text-xs md:text-sm">
              Each communication sent from each
              <br className="hidden md:inline" />
              channel uses 1 channel credit
            </p>
            <div className="flex items-center mt-2">
              <FaWhatsapp className="w-4 h-4 md:w-6 md:h-6 mr-2 text-[#040869]" />
              <p className="text-xs md:text-sm">
                1 Whatsapp = 1 Whatsapp credit
              </p>
            </div>
          </div>
          <div className="bg-[#F0F7FF] p-4 rounded-lg flex-1 border-[0.5px] border-[#8f9dc4]">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-base md:text-lg">
                Credits Pricing
              </h3>
              <span className="text-xs text-gray-500">Excludes GST</span>
            </div>
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              {/* Credit pricing cards */}
              {["SMS", "Email", "Whatsapp", "Push"].map((type) => (
                <div key={type} className="bg-white p-2 rounded">
                  <p className="text-xs md:text-sm">{type}</p>
                  <p className="font-bold text-[#040869] text-sm md:text-base">
                    $ 150.00
                  </p>
                  <p className="text-xs text-gray-500">PER CREDIT</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="p-4 border rounded-lg shadow-sm">
        {/* <h3 className="font-bold">Credits<br/>estimates</h3> */}
        {/* <div className="flex justify-between mb-4">Credits estimates</div> */}
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="pb-2 font-bold text-base text-[#040869]">
                Credits <br /> estimates
              </th>
              {Object.entries(credits).map(([channel, data]) => (
                <ToggleSwitch
                  checkedPlatforms={checkedPlatforms}
                  handlePlatformToggle={handlePlatformToggle}
                  key={channel}
                  channel={channel}
                  data={data}
                />
              ))}
              {/* <th className="pb-2">Available</th>
              <th className="pb-2">To be used</th>
              <th className="pb-2">Balance</th> */}
            </tr>
          </thead>
          <tbody>
            {Object.entries(credits).map(([channel, data]) => (
              <tr key={channel} className="border-t">
                <td className="py-2 font-medium">{channel}</td>
                <td className="py-2 text-center">{data.available}</td>
                <td className="py-2 text-center">{data.toBeUsed}</td>
                <td className="py-2 text-center">{data.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="font-bold mb-2 text-lg md:text-xl">
          Campaign Schedule:
        </h3>
        <div className="flex rounded-full bg-[#F0F7FF] p-1 border border-[#040869] max-w-md mx-auto">
          <button
            onClick={() => setSendTime("now")}
            className={`flex-1 px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 ${
              send_time === "now" ? "bg-[#040869] text-white" : "text-gray-700"
            }`}
          >
            Schedule Now
          </button>
          <button
            onClick={() => setSendTime("later")}
            className={`flex-1 px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 ${
              send_time === "later"
                ? "bg-[#040869] text-white"
                : "text-gray-700"
            }`}
          >
            Send Later
          </button>
        </div>
        {send_time === "later" && (
          <div className="mt-6 flex flex-col items-center space-y-4">
            <MainCalendar
              onChange={setDate}
              value={date}
              className="w-full max-w-md border-2 border-[#040869] rounded-lg shadow-lg bg-white"
              tileClassName={({ date, view }) =>
                view === "month" && date.getDay() === 0
                  ? "text-[#007E7D] font-semibold"
                  : null
              }
              prevLabel={
                <Calendar
                  size={20}
                  className="text-[#040869] hover:text-[#007E7D] transition-colors"
                />
              }
              nextLabel={
                <Calendar
                  size={20}
                  className="text-[#040869] hover:text-[#007E7D] transition-colors"
                />
              }
              navigationLabel={({ date }) => (
                <span className="text-[#040869] font-bold text-base sm:text-lg">
                  {date.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
              tileDisabled={({ date }) => date < new Date()}
            />
            <TimePicker
              onChange={setTime}
              value={time}
              className="w-full max-w-md p-2 sm:p-4 text-[#040869] font-medium text-sm sm:text-base"
              clockIcon={null}
              clearIcon={null}
              format="hh:mm a"
              disableClock={true}
              amPmAriaLabel="Select AM/PM"
              hourPlaceholder="hh"
              minutePlaceholder="mm"
              amPmPlaceholder="AM/PM"
            />
          </div>
        )}
      </div>
      <RefillCreditsPopup
        isOpen={isRefillPopupOpen}
        onClose={() => setIsRefillPopupOpen(false)}
      />
    </div>
  );
};

export default Budget;
