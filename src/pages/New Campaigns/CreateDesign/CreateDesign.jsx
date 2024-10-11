import React, { useState } from "react";
import "./CreateDesign.css";
import { Upload } from "lucide-react";
import { useUploadImageMutation } from "../../../store/services/uploadService";

const CreateDesign = ({formData,handleInputChange}) => { 
  const [uploadImage, { isLoading, isSuccess, isError }] = useUploadImageMutation();

  const handleLogoUpload = (e) => {
    // Handle logo upload logic here
    console.log("Logo uploaded:", e.target.files[0]);
  };

  const handleBannerUpload = async (e) => {
    // Handle banner upload logic here
    console.log("Banner uploaded:", e.target.files[0]);
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await uploadImage(formData).unwrap();
      handleInputChange({target: {value:response.imageUrl,name:"bannerImage"}});
    } catch (error) {
      console.error('Error uploading the image:', error);
    }
  };

  return (
    <>
      <div className="campaign-theme-right p-4 md:p-0 max-w-full">
        {/* <div className="editDivs">
          <h3>Logo</h3>
          <label htmlFor="logo-upload" className="upload-btn">
            <Upload size={18} /> 
            <p>Upload your logo</p>
            <input
              type="file"
              name="logoUpload"
              id="logo-upload"
              accept="image/png,image/svg+xml,image/jpeg"
              style={{ display: "none" }}
              onChange={(e) => handleLogoUpload(e)}
            />
          </label>
          <p className="hint-text">
            Recommended size 512 x 512 px in JPG, PNG or SVG format up to max
            size of 10MB
          </p>
        </div> */}

        <div className="editDivs color-div mb-6">
          <h3 className="text-lg font-semibold mb-2">Theme color</h3>
          <div className="primary-color-picker-div flex items-center">
            <input
              name="themeColor"
              type="color"
              className="primary-color-picker w-12 h-12 mr-3"
              value={formData.themeColor}
              onChange={handleInputChange}
            />
            <span className="text-sm">{formData.themeColor}</span>
          </div>
        </div>

        <div className="editDivs color-div mb-6">
          <h3 className="text-lg font-semibold mb-2">Text color</h3>
          <div className="primary-color-picker-div flex items-center">
            <input
              name="textColor"
              type="color"
              className="primary-color-picker w-12 h-12 mr-3"
              value={formData.textColor}
              onChange={handleInputChange}
            />
            <span className="text-sm">{formData.textColor}</span>
          </div>
        </div>

        <div className="common-banner-image-card bg-gray-100 p-4 rounded-lg">
          <h3 className="title text-lg font-semibold mb-2">Banner Image</h3>
          <p className="subtitle text-sm text-gray-600 mb-4">
            Recommended size 512 x 512 px in JPG, PNG or SVG format up to max
            size of 5MB.
          </p>
          <button
            type="button"
            className="sb-button sb-button--sm sb-button--full-width sb-button--secondary bg-white border border-gray-300 rounded-md py-3 px-4 flex items-center justify-center"
            onClick={() => document.getElementById('banner-upload').click()}
          >
            <Upload size={20} className="mr-2" />
            <span className="button-text">Upload Your Own</span>
            <input
              type="file"
              name="bannerUpload"
              id="banner-upload"
              accept="image/png,image/svg+xml,image/jpeg"
              style={{ display: "none" }}
              onChange={(e) => handleBannerUpload(e)}
            />
          </button>
        </div>


        <div className="image-grid mt-4 grid grid-cols-3 gap-2">
    {['https://i.pinimg.com/564x/7e/a6/88/7ea688c3e09fdff34392e58053d5adb5.jpg','https://i.pinimg.com/564x/52/b5/91/52b591fcf7c42ccee2aa7daae9a16a2c.jpg','https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg','https://res.cloudinary.com/rainforest-cruises/images/c_fill,g_auto/f_auto,q_auto/w_1120,h_732,c_fill,g_auto/v1661887113/indian-food/indian-food-1120x732.jpg','https://marketplace.canva.com/EAFxdcos7WU/1/0/1600w/canva-dark-blue-and-brown-illustrative-fitness-gym-logo-oqe3ybeEcQQ.jpg'].map((image, index) => (
      <div key={index} className="image-container col-span-1">
        <img src={image} onClick={() => handleInputChange({target: {value:image,name:"bannerImage"}})} alt={`Uploaded ${index + 1}`} className="rounded-lg object-cover w-full h-32" />
      </div>
    ))}
  </div>
      </div>
    </>
  );
};

export default CreateDesign;
