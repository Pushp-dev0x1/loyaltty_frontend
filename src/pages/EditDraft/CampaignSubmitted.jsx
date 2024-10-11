// import { CheckCircle2Icon } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { RiCheckboxCircleFill } from "react-icons/ri";
// import { useNavigate } from "react-router-dom";

// const CampaignSubmit = () => {
//   const navigate = useNavigate()


//   useEffect(() => {
//     setTimeout(() => {
//       navigate('/')
//     }, 5000);

//   }, [])


//   return (
//     <section className="flex items-center justify-center h-screen text-[#040869] bg-gradient-to-br from-[#040869] to-[#DCF8FF] p-4 selection:text-white selection:bg-[#040869]">
//       <h3 style={{ fontSize: '34px', color: "white", fontWeight: "bold", marginRight: "20px" }}>Your Campaign Submitted Successfilly </h3>
//       <CheckCircle2Icon size={'40px'} />
//     </section>
//   );
// };


// export default CampaignSubmit;


import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2Icon } from "lucide-react";

const CampaignSubmit = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#040869] to-[#DCF8FF] p-4 text-white">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
          Campaign Submitted Successfully
        </h1>
        <div className="flex items-center justify-center">
          <CheckCircle2Icon size={48} className="text-green-400 mr-2 animate-bounce" />
        </div>
        <p className="mt-4 text-lg sm:text-xl opacity-80">
          You will be redirected to the homepage in 5 seconds.
        </p>
      </div>
    </section>
  );
};

export default CampaignSubmit;
