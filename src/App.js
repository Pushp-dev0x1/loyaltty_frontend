import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MainContent from "./pages/Home/MainContent";
import SelectTemplates from "./pages/SelectTemplates/SelectTemplates";
import Prices from "./pages/Pricing";
import SetupCampaign from "./pages/All Modules/SetupCampaign";
import Summary from "./pages/All Modules/Summary/Summary";
import FullSummary from "./pages/New Campaigns/FullSummary/FullSummary";
import EditCampaign from "./pages/EditCampaigns/EditCampaign";
import CampaignSubmit from "./pages/EditCampaigns/CampaignSubmitted";
import SchedulesDetails from "./pages/Schedules Details/SchedulesDetails";
import EditDraft from "./pages/EditDraft/EditDraft";
import PreviewPage from "./pages/PreviewPage/PreviewPage";
import NewCampaign from "./pages/New Campaigns/EditCampaign";
import MerchantLogin from "./pages/Merchant Login/MerchantLogin";
import AddUsers from "./pages/Add User/AddUsers";

const Layout = () => (
  <>
    {/* <Header /> */}
    <Outlet />
    {/* <Footer /> */}
  </>
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainContent />} />
        <Route path="select-templates" element={<SelectTemplates />} />
        <Route path="setup-campaign" element={<SetupCampaign />} />
        <Route path="summary" element={<Summary />} />
        {/* Setup New Campaign */}
        <Route path="setup-new-campaign" element={<NewCampaign />} />
        <Route path="full-summary" element={<FullSummary />} />
        <Route path="prices" element={<Prices />} />
        {/* edit campaign */}
        <Route path="editcamp/:id" element={<EditCampaign />} />
        <Route path="editDraft/:id" element={<EditDraft />} />
        <Route path="completed" element={<CampaignSubmit />} />
        {/* Schedules */}
        <Route path="schedule/:id" element={<SchedulesDetails />} />
        <Route path="lp/:id" element={<PreviewPage />} />
        {/* Add Users */}
        <Route path="merchant-login" element={<MerchantLogin />} />
        <Route path="addUsers" element={<AddUsers />} />
      </Route>
    </Routes>
  );
};

export default App;
