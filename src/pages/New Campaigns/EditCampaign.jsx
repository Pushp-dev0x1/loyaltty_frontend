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
import { Calendar, Wallet, MessageSquareText, UserRound } from "lucide-react";
import SummaryEdit from "./SummaryEdit/SummaryEdit";
import { useCreateCampaignMutation, useFinalizeCampaignMutation, useUpdateCampaignMutation } from "../../store/services/campaignService";
import toast from "react-hot-toast";
import { setStepAndCampaignId } from "../../store/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import SelectCampaign from "./SelectCampaign/SelectCampaign";
import ProgressIndicator from "../../components/ProgressIndicator/ProgressIndicator";
import CampaignOption from "./CampaignOptions";


const NewCampaign = () => {
  const { id } = useParams();
  const [selectedCampaignType, setSelectedCampaignType] = useState("amount");
  const [main_url, setmain_url] = useState('')
  const navigate = useNavigate();
  const [campaignId, setCampaignId] = useState(null);

  const [createCampaign] = useCreateCampaignMutation();
  const [updateCampaign] = useUpdateCampaignMutation();
  const [finalizeCampaign] = useFinalizeCampaignMutation();

  const { data: templatedata, isLoading: isblogsloading } =
    useGetTemplateByIdQuery(id);
  const [currentStep, setCurrentStep] = useState(0);
  const [show_summary, setshow_summary] = useState(false);
  const [checkedPlatforms, setCheckedPlatforms] = useState({
    sms: false,
    whatsapp: false,
    email: true,
  });
  const dispatch = useDispatch();
  const { step: savedstep, campaignId: savedid } = useSelector(state => state.authReducer);



  useEffect(() => {
    console.warn(savedstep, "and our step of", savedid)
    if (savedstep > 1 && savedid) {
      navigate(`/editDraft/${savedid}`); // Replace with your target route
    }
  }, []);

  const steps = [
    "SelectCampaign",
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

    const response = await updateCampaign(
      {
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
        url: main_url
      }

    ).unwrap();
    console.log("main resp", response)
    setmain_url(response.url)
    setCampaignId(response.id);
    dispatch(setStepAndCampaignId({ step: currentStep + 1, campaignId: response.id }));

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

  const handleUsersChange = (userId) => {
    setFormState((prevState) => {
      const { users } = prevState;
      if (users.includes(userId)) {
        return {
          ...prevState,
          users: users.filter((id) => id !== userId),
        };
      } else {
        return {
          ...prevState,
          users: [...users, userId],
        };
      }
    });
    console.log(formState);
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
  const whatsappContent = getPlatformContent("whatsapp");
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

  console.log(platformDetails, "main platform details");

  const renderStep = () => {
    const stepComponent = steps[currentStep];
    switch (stepComponent) {
      case "SelectCampaign":
        return (
          <SelectCampaign
            selectedCampaignType={selectedCampaignType}
            maindata={templatedata?.data.platformContents}
            handleCheckboxChange={handleCheckboxChange}
            selectedOptions={checkedPlatforms}
          />
        );
      case "SelectPlatform":
        return (
          <SelectPlatform
            maindata={templatedata?.data.platformContents}
            handleCheckboxChange={handleCheckboxChange}
            selectedOptions={checkedPlatforms}
          />
        );
      case "AboutCampaign":
        return (
          <AboutCampaign
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
      case "TermsConditions":
        return (
          <TermsConditions
            formData={formState}
            handlecontactChange={handleChange}
            maildata={emailPlatformDetails.parameters}
            handleInputChange={(name, value) => {
              handleInputChange(emailContent.platformId._id, name, value);
            }}
          />
        );
      case "CreateDesign":
        return (
          <CreateDesign formData={formState} handleInputChange={handleChange} />
        );
      case "WhatsAppEdit":
        return (
          <WhatsAppEdit
            content={whatsappContent.content}
            main_url={main_url}
            parameters={whatsappContent.parameters}
            onInputChange={(paramIndex, value) =>
              handleInputChange(
                whatsappContent.platformId._id,
                paramIndex,
                value
              )
            }
          />
        );
      case "SMSEdit":
        return <SMSEdit
          content={smsContent.content}
          parameters={smsContent.parameters}
          main_url={main_url}
          onInputChange={(paramIndex, value) =>
            handleInputChange(
              smsContent.platformId._id,
              paramIndex,
              value
            )
          }
        />;
      case "EmailEdit":
        return (
          <EmailEdit
          content={emailContent.content}
          parameters={emailContent.parameters}
          main_url={main_url}
          onInputChange={(paramIndex, value) =>
            handleInputChange(
              emailContent.platformId._id,
              paramIndex,
              value
            )
          }
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
      case "SelectCampaign":
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
        return 3; // Lock to "Email"
      default:
        return undefined;
    }
  };

  const calculateEstimatedCost = () => {
    let estimatedCost = 0;

    templatedata.data.platformContents.forEach((platform) => {
      if (checkedPlatforms[platform.platformId.type]) {
        console.log(JSON.stringify(platform), "which is avaialable");
        const price = parseFloat(platform.price.$numberDecimal);
        estimatedCost += price * formState.users.length;
      }
    });

    return estimatedCost.toFixed(2);
  };



  const campaignOptions = [
    {
      id: "amount",
      text: "Get $5 off when you spend $30",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca09ce37dc0486a7b31a02c92564037af74d5964342b27d39358eecc348cb95b?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f",
      selected: false
    },
    {
      id: "percent",
      text: "Get 10% off when you spend $50",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a206f2cc2aa59b85eae8f92a9ab64dfb3e4c323608185272c79844b781871655?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f",
      selected: false
    },
    {
      id: "freeItem",
      text: "Get coffee free on spend $30",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a767d5d2492479a9c3de504a874b905f51eba2288c9af3df0cee4ffde178184?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f",
      selected: true
    },
    {
      id: "buyOneGetOne",
      text: "Buy a beer and get a beer free",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/549cccd2a4b5c9b5b957296aca1bc7fba10dc1663823d4c15ab8e4bc9c5197a2?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f",
      selected: false
    },
    {
      id: "nodiscount",
      text: "Continue with no discount",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/b5f75282d9953dae649bd32bcbf00d79045f86d2117123051f537fdb27116851?placeholderIfAbsent=true&apiKey=d0018788f321472fb76f0852605a7e1f",
      selected: false
    }
  ];

  const renderPreview = () => {
    if (currentStep >= 1 && currentStep <= steps.length - 2) {
      return (
        <MainPreviewTemplate
          defaultButton={rendertempleStep()}
          formdata={emailPlatformDetails.parameters}
          themeform={formState}
          whatsappcontent={whatsappContent?.content}
          whatsappparameters={whatsappPlatformDetails?.parameters}
          smscontent={smsContent?.content}
          smsparams={smsPlatformDetails.parameters}
          emailcontent={emailContent?.maincontent}
          emailparams={emailPlatformDetails.parameters}
          main_url={main_url}
        />
      );
    } else if (currentStep === steps.length - 1) {
      return (
        <aside className="flex-1 bg-blue-50 rounded-2xl p-6 shadow-lg flex flex-col justify-center items-center overflow-y-auto max-h-full">
          <Budget
            onInputChange={(e) =>
              handleChange({ target: { value: e, name: "scheduledTime" } })
            }
            estimatedCost={calculateEstimatedCost}
          />
        </aside>
      );
    } else {
      return (  <aside className="flex-1  max-md:p-1 max-lg:p-2 flex flex-col justify-center items-center overflow-hidden max-h-full">
        <div className="campaign-type-selector bg-transparent rounded-xl p-0 w-full max-w-xl">
          <h1 className="text-sm sm:text-xl font-semibold leading-loose text-center text-gray-900 max-md:max-w-full">
         What type of campaign do you want to run?
          </h1>
          {campaignOptions.map((option, index) => (
              <CampaignOption
              onChange={() => setSelectedCampaignType(option.id)}
                    
                key={index}
                text={option.text}
                imageSrc={option.imageSrc}
                selected={selectedCampaignType === option.id}
              />
            ))}
            
        </div>
        
      </aside>)
    }
  };

  const ProgressBar = ({ currentStep }) => (
    <div className="w-full bg-gray-200 rounded-full h-0 mt-0">
      <div
        className="bg-[#040869] h-1 rounded-full transition-all duration-500 ease-in-out"
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
    //     <div className="w-full max-w-8xl bg-[#FFFFFF] rounded-3xl shadow-xl p-4 sm:p-6 flex flex-col md:flex-row justify-between gap-4 sm:gap-6 items-start h-full">
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
    //     <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full max-w-7xl h-full p-4 sm:p-4 bg-white rounded-3xl shadow-2xl overflow-hidden">
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


  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full max-w-7xl h-screen sm:p-4  ">
    <div className="flex gap-3 max-md:flex-col ">
      <section className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full ">
        <div className="flex flex-col max-md:px-1 max-lg:px-2 pt-4 pb-10 mx-auto w-full bg-white  md:w-[600px]  rounded-3xl border border-solid border-neutral-300 md:px-5  mt-5 md:mt-10 max-md:max-w-full md:max-h-[80vh] md:min-h-[80vh] ">

          <ProgressIndicator onbackpress={handleBackClick} currentStep={currentStep + 1} totalSteps={steps.length} />
          {renderPreview()}
         
        </div>
      </section>
      <section className="flex flex-col ml-1 w-6/12 max-md:ml-0 max-md:w-full">

        {isblogsloading ?
          <div className="flex justify-center items-center h-screen">
            <iframe src="https://lottie.host/embed/2e7ca909-46f6-4b81-9b5f-38f88c80a91c/7xYyDsUrfG.json"></iframe>
          </div> :
          <div className="relative flex flex-col  mx-auto w-full md:w-[600px] text-base text-gray-500 bg-white rounded-3xl border border-solid border-neutral-300 max-md:px-5 md:mt-10 max-md:max-w-full md:max-h-[80vh] md:min-h-[80vh] overflow-y-auto">
            <div className="flex-1 overflow-y-auto">
              {renderStep()}
            </div>

          
          </div>

        }

      </section>
    </div>
  </div>
</main>
  );
};

export default NewCampaign;
