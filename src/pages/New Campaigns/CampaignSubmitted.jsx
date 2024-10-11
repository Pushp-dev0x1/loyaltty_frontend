import { CheckCircle2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const CampaignSubmit = () => {
  const navigate = useNavigate()


  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 5000);

  }, [])


  return (
    <section className="flex items-center justify-center h-screen text-[#040869] bg-gradient-to-br from-[#040869] to-[#DCF8FF] p-4 selection:text-white selection:bg-[#040869]">
      <h3 style={{ fontSize: '34px', color: "white", fontWeight: "bold", marginRight: "20px" }}>Your Campaign Submitted Successfilly </h3>
      <CheckCircle2Icon size={'40px'} />
    </section>
  );
};


export default CampaignSubmit;
