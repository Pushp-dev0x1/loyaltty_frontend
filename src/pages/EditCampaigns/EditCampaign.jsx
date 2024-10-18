import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainPreviewTemplate from "../../components/MainPreviewTemplate/MainPreviewTemplate";
import SelectPlatform from "./SelectPlatform/SelectPlatform";
import AboutCampaign from "./AboutCampaign/AboutCampaign";
import TermsConditions from "./TermsConditions/TermsConditions";
import CreateDesign from "./CreateDesign/CreateDesign";
import WhatsAppEdit from "./WhatsAppEdit/WhatsAppEdit​";
import SMSEdit from "./SMSEdit/SMSEdit​";
import EmailEdit from "./EmailEdit/EmailEdit​";
import TargetCustomers from "./TargetCustomers/TargetCustomers";
import Budget from "./Budget/Budget";
import { useGetTemplateByIdQuery } from "../../store/services/templateService";
import {
  Calendar,
  Wallet,
  MessageSquareText,
  UserRound,
  Clock,
  FileText,
  SquarePen,
} from "lucide-react";
import SummaryEdit from "./SummaryEdit/SummaryEdit";
import {
  useCreateCampaignMutation,
  useFinalizeCampaignMutation,
  useUpdateCampaignMutation,
} from "../../store/services/campaignService";
import toast from "react-hot-toast";
import { setStepAndCampaignId } from "../../store/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import ProgressIndicator from "../../components/ProgressIndicator/ProgressIndicator";

const EditCampaign = () => {
  const { id } = useParams();
  const [selectedCampaignType, setSelectedCampaignType] = useState(null);
  const [main_url, setmain_url] = useState("");
  const navigate = useNavigate();
  const [campaignId, setCampaignId] = useState(null);
  const [selected_Whatsapp, setselected_Whatsapp] = useState(null);
  const [createCampaign] = useCreateCampaignMutation();
  const [updateCampaign] = useUpdateCampaignMutation();
  const [finalizeCampaign] = useFinalizeCampaignMutation();
  const [selected_whatsappindex, setselected_whatsappindex] = useState(null);
  const [selected_SMSindex, setselected_SMSindex] = useState(null);
  const { data: templatedata, isLoading: isblogsloading } =
    useGetTemplateByIdQuery(id);
  const [currentStep, setCurrentStep] = useState(0);
  const [show_summary, setshow_summary] = useState(false);
  const [checkedPlatforms, setCheckedPlatforms] = useState({
    sms: false,
    whatsapp: false,
    email: false,
  });
  const dispatch = useDispatch();
  const { step: savedstep, campaignId: savedid } = useSelector(
    (state) => state.authReducer
  );

  useEffect(() => {
    console.warn(savedstep, "and our step of", savedid);
    if (savedstep > 1 && savedid) {
      navigate(`/editDraft/${savedid}`); // Replace with your target route
    }
  }, []);

  const steps = [
    "SelectPlatform",
    "AboutCampaign",
    "TermsConditions",
    "CreateDesign",
    ...(checkedPlatforms.whatsapp ? ["WhatsAppEdit"] : []),
    ...(checkedPlatforms.sms ? ["SMSEdit"] : []),
    ...(checkedPlatforms.email ? ["EmailEdit"] : []),
    "TargetCustomers",
  ];

  const handleCheckboxChange = (platform) => {
    setCheckedPlatforms((prevState) => ({
      ...prevState,
      [platform]: !prevState[platform],
    }));
  };

  const handleBackClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/select-templates");
    }
  };

  // const handleContinueClick = () => {
  //   if (currentStep < steps.length - 1) {
  //     setCurrentStep(currentStep + 1);
  //   } else {
  //     // navigate('/full-summary');
  //     setshow_summary(true);
  //   }
  // };

  const handleContinueClick = async () => {
    const response = await updateCampaign({
      id: campaignId,
      merchantId: "66b2858654354cd7467e5e7c",
      templateId: id,
      title: formState.title,
      description: formState.description,
      platformDetails: platformDetails,
      users: formState.users,
      scheduledTime: formState.scheduledTime,
      logo: formState.logo,
      themeColor: formState.themeColor,
      textColor: formState.textColor,
      bannerImage: formState.bannerImage,
      contactno: formState.contactno,
      rewardtype: formState.rewardtype,
      step: currentStep + 1,
      url: main_url.replace("http://143.110.252.166:4040/lp/", ""),
    }).unwrap();
    console.log("main resp", response);
    setmain_url(`http://143.110.252.166:4040/lp/${response.url}`);
    setCampaignId(response.id);
    dispatch(
      setStepAndCampaignId({ step: currentStep + 1, campaignId: response.id })
    );

    if (currentStep < steps.length - 1) {
      try {
        // Update campaign on each step

        setCurrentStep(currentStep + 1);
      } catch (error) {
        toast.error("Failed to update campaign");
      }
    } else {
      setshow_summary(true);
    }
  };

  const [formState, setFormState] = useState({
    title: templatedata?.data.title,
    description: templatedata?.data.description,
    users: [],
    scheduledTime: "",
    interval: "",
    logo: templatedata?.data.logo,
    themeColor: templatedata?.data.themeColor,
    textColor: templatedata?.data.textColor,
    bannerImage: templatedata?.data.bannerImage,
    contactno: "",
    rewardtype: templatedata?.data.rewardtype,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUsersChange = (value) => {
    console.warn(value);
    setFormState((prevState) => ({
      ...prevState,
      users: value,
    }));
  };

  // whatsapp and mail inputs dynamic for submit api

  const [platformDetails, setPlatformDetails] = useState([]);

  const handleInputChange = (platformId, fieldName, value) => {
    setPlatformDetails((prevState) => {
      const platformIndex = prevState.findIndex(
        (detail) => detail.platformId === platformId
      );
      const updatedDetails = [...prevState];

      if (platformIndex === -1) {
        updatedDetails.push({
          platformId: platformId,
          content: "",
          parameters: { [fieldName]: value },
        });
      } else {
        updatedDetails[platformIndex] = {
          ...updatedDetails[platformIndex],
          parameters: {
            ...updatedDetails[platformIndex].parameters,
            [fieldName]: value,
          },
        };
      }

      return updatedDetails;
    });
  };

  const getPlatformContent = (type) => {
    return templatedata?.data.platformContents.find(
      (content) => content.platformId.type === type
    );
  };
  const whatsappContent = selected_Whatsapp
    ? selected_Whatsapp
    : getPlatformContent("whatsapp");
  const smsContent = getPlatformContent("sms");

  const emailContent = getPlatformContent("email");

  const emailPlatformDetails = emailContent
    ? platformDetails.find(
        (detail) => detail.platformId === emailContent.platformId._id
      ) || { content: "", parameters: {} }
    : { content: "", parameters: {} };
  const whatsappPlatformDetails = whatsappContent
    ? platformDetails.find(
        (detail) => detail.platformId === whatsappContent.platformId._id
      ) || { content: "", parameters: {} }
    : { content: "", parameters: {} };
  const smsPlatformDetails = smsContent
    ? platformDetails.find(
        (detail) => detail.platformId === smsContent.platformId._id
      ) || { content: "", parameters: {} }
    : { content: "", parameters: {} };

  useEffect(() => {
    if (templatedata) {
      setFormState((prevState) => ({
        ...prevState,
        title: templatedata.data.title || "New Title",
        description: templatedata.data.description || "Testing Description",
        logo: templatedata.data.logo,
        themeColor: templatedata.data.themeColor,
        textColor: templatedata.data.textColor,
        bannerImage: templatedata.data.bannerImage,
      }));

      if (checkedPlatforms.email && emailContent) {
        setPlatformDetails((prevState) => {
          const emailPlatformIndex = prevState.findIndex(
            (detail) => detail.platformId === emailContent.platformId._id
          );
          const updatedDetails = [...prevState];

          if (emailPlatformIndex === -1) {
            updatedDetails.push({
              platformId: emailContent.platformId._id,
              content: emailContent.subject || "Email Subject",
              parameters: {
                title: templatedata.data.title || "New Title",
                description:
                  templatedata.data.description || "Testing Description",
              },
            });
          } else {
            updatedDetails[emailPlatformIndex] = {
              ...updatedDetails[emailPlatformIndex],
              content: emailContent.subject || "Email Subject",
              parameters: {
                title: templatedata.data.title || "New Title",
                subject: templatedata.data.title || "New Offer",
                terms:
                  "2 offers cannot be clubbed.\nReward cannot be exchanged for cash.",
                description:
                  templatedata.data.description || "Testing Description",
              },
            };
          }

          return updatedDetails;
        });
      }

      if (checkedPlatforms.whatsapp && whatsappContent) {
        setPlatformDetails((prevState) => {
          const whatsappPlatformIndex = prevState.findIndex(
            (detail) => detail.platformId === whatsappContent.platformId._id
          );
          const updatedDetails = [...prevState];

          if (whatsappPlatformIndex === -1) {
            updatedDetails.push({
              platformId: whatsappContent.platformId._id,
              content: whatsappContent.subject || "WhatsApp Subject",
              maincontent: whatsappContent.content,
              mainparam: whatsappContent.parameters,
              parameters: {},
            });
          } else {
            updatedDetails[whatsappPlatformIndex] = {
              ...updatedDetails[whatsappPlatformIndex],
              content: whatsappContent.subject || "WhatsApp Subject",
              maincontent: whatsappContent.content,
              mainparam: whatsappContent.parameters,
              parameters: {},
            };
          }

          return updatedDetails;
        });
      }
      if (checkedPlatforms.sms && smsContent) {
        setPlatformDetails((prevState) => {
          const smsPlatformIndex = prevState.findIndex(
            (detail) => detail.platformId === smsContent.platformId._id
          );
          const updatedDetails = [...prevState];

          if (smsPlatformIndex === -1) {
            updatedDetails.push({
              platformId: smsContent.platformId._id,
              content: smsContent.subject || "SMS Subject",
              maincontent: smsContent.content,
              mainparam: smsContent.parameters,
              parameters: {},
            });
          } else {
            updatedDetails[smsPlatformIndex] = {
              ...updatedDetails[smsPlatformIndex],
              content: smsContent.subject || "SMS Subject",
              maincontent: smsContent.content,
              mainparam: smsContent.parameters,
              parameters: {},
            };
          }

          return updatedDetails;
        });
      }
    }
  }, [templatedata, checkedPlatforms, emailContent, whatsappContent]);

  // console.log(platformDetails, "main platform details");

  const renderStep = () => {
    const stepComponent = steps[currentStep];
    switch (stepComponent) {
      case "SelectPlatform":
        return (
          <SelectPlatform
            bannerImage={formState.bannerImage}
            maindata={templatedata?.data.platformContents}
            handleCheckboxChange={handleCheckboxChange}
            selectedOptions={checkedPlatforms}
          />
        );
      case "AboutCampaign":
        return (
          <AboutCampaign
            rewardtype={templatedata?.data.rewardtype}
            formData={emailPlatformDetails.parameters}
            handlecontactChange={handleChange}
            handleInputChange={(e) => {
              handleInputChange(
                emailContent.platformId._id,
                e.target.name,
                e.target.value
              );
            }}
          />
        );
      case "TermsConditions":
        return (
          <TermsConditions
            formData={formState}
            maildata={emailPlatformDetails.parameters}
            handleInputChange={(name, value) => {
              handleInputChange(emailContent.platformId._id, name, value);
            }}
          />
        );
      case "CreateDesign":
        return (
          <CreateDesign
            formData={formState}
            main_url={main_url}
            setmain_url={setmain_url}
            handleInputChange={handleChange}
          />
        );
      case "WhatsAppEdit":
        return (
          <WhatsAppEdit
            content={whatsappContent.content}
            selected_Whatsapp={selected_Whatsapp}
            setselected_Whatsapp={setselected_Whatsapp}
            main_url={main_url}
            parameters={whatsappContent.parameters}
            onInputChange={(paramIndex, value) => {
              handleInputChange(
                whatsappContent.platformId._id,
                paramIndex,
                value
              );
              setselected_whatsappindex(paramIndex);
            }}
          />
        );
      case "SMSEdit":
        return (
          <SMSEdit
            content={smsContent.content}
            parameters={smsContent.parameters}
            main_url={main_url}
            onInputChange={(paramIndex, value) => {
              handleInputChange(smsContent.platformId._id, paramIndex, value);
              setselected_SMSindex(paramIndex);
            }}
          />
        );
      case "EmailEdit":
        return (
          <EmailEdit
            formData={emailPlatformDetails.parameters}
            handleInputChange={(e) => {
              handleInputChange(
                emailContent.platformId._id,
                e.target.name,
                e.target.value
              );
            }}
          />
        );
      case "TargetCustomers":
        return (
          <TargetCustomers
            selectedUsers={formState.users}
            setSelectedUsers={handleUsersChange}
          />
        );
      default:
        return null;
    }
  };

  const rendertempleStep = () => {
    const stepComponent = steps[currentStep];
    switch (stepComponent) {
      case "SelectPlatform":
      case "AboutCampaign":
      case "TermsConditions":
      case "CreateDesign":
      case "TargetCustomers":
        return undefined; // Free to switch buttons or hide preview
      case "WhatsAppEdit":
        return 1; // Lock to "Whatsapp"
      case "SMSEdit":
        return 2; // Lock to "SMS"
      case "EmailEdit":
      default:
        return undefined;
    }
  };

  const calculateEstimatedCost = () => {
    let estimatedCost = 0;

    templatedata.data.platformContents.forEach((platform) => {
      if (checkedPlatforms[platform.platformId.type]) {
        // console.log(JSON.stringify(platform), "which is avaialable");
        const price = parseFloat(platform.price.$numberDecimal);
        estimatedCost += price * formState.users.length;
      }
    });

    return estimatedCost.toFixed(2);
  };

  const calculateEachCost = () => {
    let platformCosts = {};

    templatedata.data.platformContents.forEach((platform) => {
      if (checkedPlatforms[platform.platformId.type]) {
        const price = parseFloat(platform.price.$numberDecimal);
        const cost = price * formState.users.length;

        // Store the cost for each platform type
        platformCosts[platform.platformId.type] = cost.toFixed(2);
      }
    });

    return platformCosts;
  };

  const renderPreview = () => {
    if (currentStep >= 1 && currentStep <= steps.length - 2) {
      return (
        <MainPreviewTemplate
          selectedwhatsappIndex={selected_whatsappindex}
          selected_SMSindex={selected_SMSindex}
          checkedPlatforms={checkedPlatforms}
          defaultButton={rendertempleStep()}
          formdata={emailPlatformDetails.parameters}
          themeform={formState}
          whatsappcontent={whatsappContent?.content}
          whatsappparameters={whatsappPlatformDetails?.parameters}
          smscontent={smsContent?.content}
          smsparams={smsPlatformDetails.parameters}
          main_url={main_url}
        />
      );
    } else if (currentStep === steps.length - 1) {
      return (
        <aside className="flex-1justify-center items-center overflow-y-auto max-h-full">
          <Budget
            setStep={setCurrentStep}
            currentStep={currentStep}
            onInputChange={(e) =>
              handleChange({ target: { value: e, name: "scheduledTime" } })
            }
            users={formState.users}
            checkedPlatforms={checkedPlatforms}
            setCheckedPlatforms={setCheckedPlatforms}
            templatedata={templatedata}
            estimatedCost={calculateEstimatedCost}
            eachPlatformCost={calculateEachCost}
          />
        </aside>
      );
    } else if (currentStep == 0) {
      return !checkedPlatforms.email &&
        !checkedPlatforms.sms &&
        !checkedPlatforms.whatsapp ? (
        <>
          <img
            className="relative object-contain mt-32 aspect-[1.2] flex justify-center items-center max-w-full"
            loading="lazy"
            src={formState.bannerImage}
            alt=""
            // className="object-contain mt-64 mb-2  w-full aspect-[1.58] max-md:mt-10 max-md:max-w-full"
          />
        </>
      ) : (
        <aside
          className="flex-1  flex flex-col justify-end  max-h-full"
          style={{ scrollbarWidth: "none" }}
        >
          {/* <div className="flex justify-center space-x-4 my-10 ">
            {checkedPlatforms.sms && (
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/955b66fbf0f91ff53047e485a2e2f52b4b90675a14ba86b942d0b65fdd9cda8a?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f' : 'https://cdn.builder.io/api/v1/image/assets/TEMP/955b66fbf0f91ff53047e485a2e2f52b4b90675a14ba86b942d0b65fdd9cda8a?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
                alt="Image 2"
                className="w-16 h-16"
              />
            )}
            {checkedPlatforms.email && (
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccfdca0b8f4a8882d438a4bcfb7d0977e85429c0e35245f44a752a0cc95cad03?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
                alt="Image 1"
                className="w-16 h-16"
              />
            )}
            {checkedPlatforms.whatsapp && (
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/eedee36cff5fc292dceae6980b1fda5b74659ce945c0feb2cad04c718988ae92?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
                alt="Image 3"
                className="w-16 h-16"
              />
            )}
          </div> */}

          <div
            className="relative flex justify-center items-center max-w-full overflow-hidden"
            style={{
              backgroundImage: "url('/images/mobileframe.png')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "calc(490px)", // Aspect ratio same as your image
            }}
          >
            <div className="flex justify-center items-center space-x-4 my-10">
              {checkedPlatforms.sms && (
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/955b66fbf0f91ff53047e485a2e2f52b4b90675a14ba86b942d0b65fdd9cda8a?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f' : 'https://cdn.builder.io/api/v1/image/assets/TEMP/955b66fbf0f91ff53047e485a2e2f52b4b90675a14ba86b942d0b65fdd9cda8a?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
                  alt="SMS"
                  className="w-16 h-16"
                />
              )}
              {checkedPlatforms.email && (
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccfdca0b8f4a8882d438a4bcfb7d0977e85429c0e35245f44a752a0cc95cad03?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
                  alt="Email"
                  className="w-16 h-16"
                />
              )}
              {checkedPlatforms.whatsapp && (
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/eedee36cff5fc292dceae6980b1fda5b74659ce945c0feb2cad04c718988ae92?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
                  alt="WhatsApp"
                  className="w-16 h-16"
                />
              )}
            </div>
          </div>
        </aside>
      );
    }
  };

  const ProgressBar = ({ currentStep }) => (
    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
      <div
        className="bg-[#040869] h-2 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
      />
    </div>
  );

  const [selectedDates, setSelectedDates] = useState([
    "12/02/2034",
    "23/02/2034",
    "10/03/2034",
    "12/03/2034",
  ]);

  const handleSubmitCampaign = async () => {
    console.log();

    try {
      // const result = await createCampaign({
      //   merchantId: "66b2858654354cd7467e5e7c",
      //   templateId: id,
      //   title: formState.title,
      //   description: formState.description,
      //   platformDetails: platformDetails,
      //   users: formState.users,
      //   scheduledTime: formState.scheduledTime,
      //   logo: formState.logo,
      //   themeColor: formState.themeColor,
      //   textColor: formState.textColor,
      //   bannerImage: formState.bannerImage,
      //   contactno: formState.contactno,
      //   rewardtype: "discount",
      // }).unwrap();
      const result = await finalizeCampaign({
        id: campaignId,
      }).unwrap();
      toast.success("Campaign created successfully!");
      navigate("/completed");
      console.log(result);
    } catch (error) {
      toast.error("Failed to create campaign");
      console.error(error);
    }
  };

  return (
    // <section className="flex items-center justify-center lg:h-screen xl:h-screen min-h-screen text-[#040869] bg-gradient-to-br from-[#040869] to-[#DCF8FF] p-2 sm:p-4 selection:text-white selection:bg-[#040869]">
    //   {show_summary ? (
    //     <div className="w-full max-w-8xl bg-[#ffffff] rounded-3xl shadow-xl p-4 sm:p-6 flex flex-col md:flex-row justify-between gap-4 sm:gap-6 items-start h-full">
    //       <div className="w-full md:w-2/5 h-full overflow-y-auto pr-2 sm:pr-4">
    //         <h2 className="text-3xl font-bold mb-2 text-[#040869]">Loyaltty</h2>
    //         <div className="w-full h-1 rounded-full mb-4">
    //           <div className="w-full bg-[#040869] h-1 rounded-full" />
    //         </div>
    //         <h3 className="text-2xl font-bold mb-1">Summary</h3>
    //         <p className="mb-4 text-base text-gray-600">
    //           Customize your campaign details and pricing plans
    //         </p>
    //         <SummaryEdit
    //           formData={emailPlatformDetails.parameters}
    //           handleInputChange={(e) => {
    //             handleInputChange(
    //               emailContent.platformId._id,
    //               e.target.name,
    //               e.target.value
    //             );
    //           }}
    //         />
    //       </div>

    //       <div className="w-full md:w-1/3 h-full">
    //         <MainPreviewTemplate
    //         checkedPlatforms={checkedPlatforms}
    //           formdata={emailPlatformDetails.parameters}
    //           themeform={formState}
    //           whatsappcontent={whatsappContent?.content}
    //           whatsappparameters={whatsappPlatformDetails?.parameters}
    //           smscontent={smsContent?.content}
    //           smsparams={smsPlatformDetails.parameters}
    //           main_url={main_url}
    //         />
    //       </div>
    //       <div className="w-full md:w-1/4 h-full space-y-4 sm:space-y-6 p-2 sm:p-4 shadow-lg rounded-2xl bg-[#F6F6F7] overflow-y-auto">
    //         <div className="flex items-center bg-white p-2 sm:p-3 rounded-xl shadow-md">
    //           <Wallet className="mr-3 text-[#040869]" size={24} />
    //           <div>
    //             <p className="font-semibold text-[#040869] text-sm">
    //               Your Wallet
    //             </p>
    //             <p className="text-2xl font-bold text-[#040869]">$ 20.00</p>
    //           </div>
    //         </div>

    //         <div className="flex items-center bg-white p-2 sm:p-3 rounded-xl shadow-md">
    //           <Wallet className="mr-3 text-[#040869]" size={24} />
    //           <div>
    //             <p className="font-semibold text-[#040869] text-sm">
    //               Estimate Cost:
    //             </p>
    //             <p className="text-2xl font-bold text-[#040869]">
    //               $ {calculateEstimatedCost()}
    //             </p>
    //           </div>
    //         </div>

    //         <div className="bg-white p-2 sm:p-3 rounded-xl shadow-md">
    //           <div className="flex items-center mb-2">
    //             <Calendar className="mr-2 text-[#040869]" size={20} />
    //             <p className="font-semibold text-[#040869] text-sm">
    //               Campaign Schedule:
    //             </p>
    //           </div>
    //           <div className="space-y-2 ml-6">
    //             {/* {selectedDates.map((date, index) => ( */}
    //             <div className="flex items-center">
    //               <Calendar size={14} className="mr-2 text-[#040869]" />
    //               <span className="text-[#040869] text-sm">
    //                 {formState.scheduledTime.replace("T", " ")}
    //               </span>
    //             </div>
    //             {/* ))} */}
    //           </div>
    //         </div>

    //         <div className="flex justify-between mt-4">
    //           <button
    //             className="border-2 border-[#040869] rounded-lg py-2 px-4 text-[#040869] font-semibold hover:bg-[#040869] hover:text-white transition-colors duration-300"
    //             onClick={() => setshow_summary(false)}
    //           >
    //             Back
    //           </button>
    //           <button
    //             className="bg-[#040869] text-white rounded-lg py-2 px-4 font-semibold hover:bg-[#0a0d36] transition-colors duration-300"
    //             onClick={() => handleSubmitCampaign()}
    //           >
    //             Submit
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //       <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full max-w-7xl h-full p-4 sm:p-4 bg-[#ffffff] rounded-3xl shadow-2xl overflow-hidden">
    //       {/* Main Content */}
    //       <div className="flex-1 flex flex-col space-y-2 sm:space-y-4 overflow-y-auto max-h-full">
    //         <div className="flex justify-between items-center">
    //           <button
    //             onClick={handleBackClick}
    //             className="bg-transparent text-[#040869] text-base underline hover:text-[#060c92] transition duration-300"
    //           >
    //             Back
    //           </button>
    //           <span className="text-base">
    //             {currentStep + 1}/{steps.length}
    //           </span>
    //           <button
    //             onClick={handleContinueClick}
    //             className="bg-[#040869] text-white px-4 sm:px-6 py-1 sm:py-2 rounded-md shadow hover:bg-[#060c92] transition duration-300"
    //           // disabled={currentStep === 0 and !selectedCampaignType}
    //           >
    //             Continue
    //           </button>
    //         </div>

    //         <ProgressBar currentStep={currentStep} />
    //         {isblogsloading ?
    //           <div className="flex justify-center items-center h-screen">
    //             <iframe src="https://lottie.host/embed/2e7ca909-46f6-4b81-9b5f-38f88c80a91c/7xYyDsUrfG.json"></iframe>
    //           </div> :
    //           renderStep()
    //         }

    //       </div>
    //       {renderPreview()}
    //     </div>
    //   )}
    // </section>
    <main className="flex md:px-16  bg-zinc-100 max-md:px-5 max-md:pb-24  items-center justify-center ">
      {show_summary ? (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full max-w-7xl h-screen sm:p-4">
          <div className="flex flex-col px-4 pt-8 pb-14 mx-auto w-full bg-white  md:w-[600px]  rounded-3xl border border-solid border-neutral-300 md:px-5  mt-5 md:mt-10 max-md:max-w-full md:max-h-[80vh] md:min-h-[80vh] ">
            <MainPreviewTemplate
              checkedPlatforms={checkedPlatforms}
              formdata={emailPlatformDetails.parameters}
              themeform={formState}
              whatsappcontent={whatsappContent?.content}
              whatsappparameters={whatsappPlatformDetails?.parameters}
              smscontent={smsContent?.content}
              smsparams={smsPlatformDetails.parameters}
              main_url={main_url}
            />
          </div>
          {/* <div className="w-full md:w-1/4 h-full space-y-4 sm:space-y-6 p-2 sm:p-4 shadow-lg rounded-2xl bg-[#F6F6F7] overflow-y-auto">
            <div className="flex items-center bg-white p-2 sm:p-3 rounded-xl shadow-md">
              <Wallet className="mr-3 text-[#040869]" size={24} />
              <div>
                <p className="font-semibold text-[#040869] text-sm">
                  Your Wallet
                </p>
                <p className="text-2xl font-bold text-[#040869]">$ 20.00</p>
              </div>
            </div>

            <div className="flex items-center bg-white p-2 sm:p-3 rounded-xl shadow-md">
              <Wallet className="mr-3 text-[#040869]" size={24} />
              <div>
                <p className="font-semibold text-[#040869] text-sm">
                  Estimate Cost:
                </p>
                <p className="text-2xl font-bold text-[#040869]">
                  $ {calculateEstimatedCost()}
                </p>
              </div>
            </div>

            <div className="bg-white p-2 sm:p-3 rounded-xl shadow-md">
              <div className="flex items-center mb-2">
                <Calendar className="mr-2 text-[#040869]" size={20} />
                <p className="font-semibold text-[#040869] text-sm">
                  Campaign Schedule:
                </p>
              </div>
              <div className="space-y-2 ml-6">
                {selectedDates.map((date, index) => (
                <div className="flex items-center">
                  <Calendar size={14} className="mr-2 text-[#040869]" />
                  <span className="text-[#040869] text-sm">
                    {formState.scheduledTime.replace("T", " ")}
                  </span>
                </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="border-2 border-[#040869] rounded-lg py-2 px-4 text-[#040869] font-semibold hover:bg-[#040869] hover:text-white transition-colors duration-300"
                onClick={() => setshow_summary(false)}
              >
                Back
              </button>
              <button
                className="bg-[#040869] text-white rounded-lg py-2 px-4 font-semibold hover:bg-[#0a0d36] transition-colors duration-300"
                onClick={() => handleSubmitCampaign()}
              >
                Submit
              </button>
            </div>
          </div> */}

          <div className="flex flex-col px-4 pt-8 pb-14 mx-auto w-full bg-white  md:w-[600px]  rounded-3xl border border-solid border-neutral-300 md:px-5  mt-5 md:mt-10 max-md:max-w-full md:max-h-[80vh] md:min-h-[80vh] ">
            <div className="flex flex-col space-y-4 w-full">
              <div className="flex gap-2 w-full">
                <div className="w-1/2 flex items-center bg-[#E6F7FF] rounded-lg p-3 flex-1 border-[0.5px] border-[#007e7d]">
                  <Wallet className="mr-2 w-6 h-6 text-[#b96518]" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Estimate Cost:
                    </p>
                    <p className="text-sm font-bold text-[#007e7d]">
                      $ {calculateEstimatedCost()}
                    </p>
                  </div>
                </div>

                <div className="w-1/2 flex items-center bg-[#fff8f0] rounded-lg p-3 border-[0.5px] border-[#b96518]">
                  <FileText className="w-6 h-6 mr-2 text-[#b96518]" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Total No. Selected:
                    </p>
                    <p className="text-sm font-bold text-[#007e7d]">200</p>
                  </div>
                </div>
              </div>

              <div className="flex border-2 p-3 rounded-lg bg-gray-100">
                <div className="flex items-center flex-1 border-r-2 border-gray-200">
                  <Clock className="w-6 h-6 mr-2 text-[#b96518]" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Campaign Schedule:
                    </p>
                    <p className="text-sm font-bold text-[#007e7d]">
                      {formState.scheduledTime.replace("T", " ")}
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 ml-4 gap-2">
                  <p className="text-sm font-semibold text-gray-800 mb-2">
                    To be used
                  </p>
                  <div className="flex justify-between gap-4">
                    <div className="flex flex-col items-center">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/955b66fbf0f91ff53047e485a2e2f52b4b90675a14ba86b942d0b65fdd9cda8a?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
                        alt="SMS"
                        className="w-6 h-6 mb-1"
                      />
                      <span className="text-sm font-medium">200</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccfdca0b8f4a8882d438a4bcfb7d0977e85429c0e35245f44a752a0cc95cad03?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
                        alt="Email"
                        className="w-6 h-6 mb-1"
                      />
                      <span className="text-sm font-medium">200</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/eedee36cff5fc292dceae6980b1fda5b74659ce945c0feb2cad04c718988ae92?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f"
                        alt="WhatsApp"
                        className="w-6 h-6 mb-1"
                      />
                      <span className="text-sm font-medium">150</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 border overflow-y-scroll border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-semibold text-gray-800">Summary</p>
                  <SquarePen className="w-4 h-4 text-[#b96518] cursor-pointer" />
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  Customize your campaign details and pricing plans
                </p>

                <SummaryEdit
                  formData={emailPlatformDetails.parameters}
                  handleInputChange={(e) => {
                    handleInputChange(
                      emailContent.platformId._id,
                      e.target.name,
                      e.target.value
                    );
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="bg-white text-[#040869] rounded-full py-3 px-8 text-base font-semibold border border-[#040869] hover:bg-[#040869] hover:text-white transition-colors duration-300"
                onClick={() => setshow_summary(false)}
              >
                Back
              </button>
              <button
                className="bg-[#040869] text-white rounded-full py-3 px-8 text-base font-semibold hover:bg-[#0a0d36] transition-colors duration-300"
                onClick={() => handleSubmitCampaign()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full max-w-7xl h-screen sm:p-4  ">
          <div className="flex gap-3 max-md:flex-col ">
            <section className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full ">
              <div className="flex flex-col px-4 pt-8 pb-14 mx-auto w-full bg-white  md:w-[600px]  rounded-3xl border border-solid border-neutral-300 md:px-5  mt-5 md:mt-10 max-md:max-w-full md:max-h-[80vh] md:min-h-[80vh] ">
                <ProgressIndicator
                  onbackpress={handleBackClick}
                  currentStep={currentStep + 1}
                  totalSteps={steps.length}
                />
                {renderPreview()}
              </div>
            </section>
            <section className="flex flex-col ml-1 w-6/12 max-md:ml-0 max-md:w-full">
              {isblogsloading ? (
                <div className="flex justify-center items-center h-screen">
                  <iframe src="https://lottie.host/embed/2e7ca909-46f6-4b81-9b5f-38f88c80a91c/7xYyDsUrfG.json"></iframe>
                </div>
              ) : (
                <div className="relative flex flex-col md:px-14 py-5 md:py-12 mx-auto w-full md:w-[600px] text-base leading-10 text-gray-500 bg-white rounded-3xl border border-solid border-neutral-300 max-md:px-5 md:mt-10 max-md:max-w-full md:max-h-[80vh] md:min-h-[80vh] overflow-y-auto">
                  <div className="flex-1 overflow-y-auto">{renderStep()}</div>

                  <button
                    onClick={handleContinueClick}
                    className="flex p-2 mt-5 md:mt-0 text-3xl items-center justify-center text-white border-solid bg-[#040869] border-[2.008px] border-black border-opacity-10 min-h-[52px] rounded-[32.131px] w-full md:w-[300px] md:max-w-[564px] md:absolute md:bottom-5 md:left-1/2 md:transform md:-translate-x-1/2"
                  >
                    <span className="text-xl md:text-xl h-full flex items-center justify-center w-full">
                      Continue
                    </span>
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      )}
    </main>
  );
};

export default EditCampaign;
