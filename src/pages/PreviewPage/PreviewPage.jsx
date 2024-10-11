import React from "react";
import CampaignCard from "../../components/TemplateCard/TemplateCard";
import { useGetCampaignByUrlQuery } from "../../store/services/campaignHistoryService";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";


const PreviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: templatedata, isLoading: isblogsloading } = useGetCampaignByUrlQuery(id);

  const getPlatformContent = (type) => {
    return templatedata?.data.platformDetails.find(
      (content) => content.platformId.type === type
    );
  };
  const emailContent = getPlatformContent("email");

  return (
    <div className="flex justify-center items-center h-screen flex-col relative w-full">
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center text-[#070C4E] hover:text-[#070C4E]/80"
      >
        <ArrowLeftCircle size={24} className="mr-2" />
        Back
      </button>
      <CampaignCard
        title={emailContent?.parameters.title} themeColor={templatedata?.data.themeColor} textColor={templatedata?.data.textColor} bannerImage={templatedata?.data.bannerImage} description={emailContent?.parameters?.description} contactno={templatedata?.data.contactno} terms={emailContent?.parameters?.terms} expiry={templatedata?.data.expiry} main_url={templatedata?.data?.url}
      />
      <h6 className="mt-5">Powered By</h6>
      <img src={'https://cygen.com.au/cygenwebretail/uploads/company/loyaltyy.jpg'} />
      <h6 className="mt-5">Send <a href="http://64.227.154.213:4040/" target="_blank" style={{ color: templatedata?.data.themeColor }}>campaigns</a> for your Business</h6>
    </div>
  );
};

export default PreviewPage;
