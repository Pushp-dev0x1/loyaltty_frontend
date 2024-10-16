import React, { useState, useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Eye,
  Info,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Calendar,
  Users,
  Zap,
  CheckCircle,
  Send,
} from "lucide-react";
import { useGetCampaignByIdQuery } from "../../store/services/campaignHistoryService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SchedulesDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isImpactExpanded, setIsImpactExpanded] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {
    data,
    error: historyerror,
    isLoading: historyloading,
  } = useGetCampaignByIdQuery(id);

  const campaignData = data?.data;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chartData = {
    labels: ["Sent", "Delivered", "Read"],
    datasets: [
      {
        data: [
          campaignData?.deliveredUsers || 0,
          campaignData?.deliveredUsers || 0,
          campaignData?.readUsers || 10,
        ],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
        barThickness: windowWidth < 768 ? 20 : 40,
        borderRadius: 100,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        display: false,
      },
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F3F4F6",
        bodyColor: "#F3F4F6",
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} users`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  if (!campaignData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-4 sm:p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            No campaign data available
          </h2>
          <button
            onClick={() => navigate("/select-templates")}
            className="px-4 py-2 bg-[#040869] text-white rounded hover:bg-[#040869]/80 transition duration-300"
          >
            Return to Schedules
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen p-2 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto border rounded-xl bg-[#EFF2FB]">
        <div className="p-3 sm:p-6 md:p-8">
          <div className="mb-4 sm:mb-6">
            <button
              onClick={() => navigate("/select-templates")}
              className="flex items-center text-[#6F7782] hover:text-[#111827] transition duration-300"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              <span className="text-base sm:text-lg md:text-[22px] font-medium">Back to Schedules</span>
            </button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-0">
              {campaignData.title}
            </h1>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span
                className={`text-xs sm:text-sm py-1 px-2 sm:px-3 rounded-full text-white ${
                  campaignData.status === "Active"
                    ? "bg-green-500"
                    : campaignData.status === "Completed"
                    ? "bg-blue-500"
                    : "bg-yellow-500"
                }`}
              >
                {campaignData.status}
              </span>
              <button
                onClick={() => navigate(`/lp/${campaignData.url}`)}
                className="flex items-center text-[#6F7782] hover:text-[#111827] transition duration-300"
              >
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                <span className="text-base sm:text-lg md:text-[22px] font-medium">Preview</span>
              </button>
            </div>
          </div>
          <div className="border border-[#040869] rounded-full p-1 sm:p-2 w-fit mb-4 sm:mb-6">
            <nav className="flex space-x-1 sm:space-x-2">
              <button className="bg-[#040869] text-white px-4 sm:px-8 md:px-12 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 hover:bg-white hover:text-[#040869] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#040869] focus:ring-opacity-50">
                Report
              </button>
              <button className="bg-white text-[#040869] px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 hover:bg-[#040869] hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#040869] focus:ring-opacity-50">
                Customer List
              </button>
            </nav>
          </div>
          <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
            Overall Impact
          </h4>
          <div className="bg-white rounded-lg p-3 sm:p-6 mb-6 sm:mb-8 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
              <InsightItem
                icon={<Zap className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />}
                title="Revenue"
                value="0.45"
                prefix="$"
              />
              <InsightItem
                icon={<Users className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />}
                title="Visits"
                value="1"
              />
              <InsightItem
                icon={<Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />}
                title="Redemptions"
                value="0"
              />
              <InsightItem
                icon={<Info className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />}
                title="Total Clicks"
                value="6"
              />
            </div>
          </div>
          <h4 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">Funnel</h4>
          <div className="mb-8 sm:mb-12 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-3 sm:p-6">
                <div className="h-full">
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>
              <div className="lg:w-1/2 p-3 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8">
                  <FunnelItem
                    label="Sent"
                    value={campaignData.deliveredUsers}
                    percentage="100%"
                    color="bg-blue-100"
                    borderColor="border-[#3B82F6]"
                    icon={<Send className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />}
                  />
                  <FunnelItem
                    label="Delivered"
                    value={campaignData.deliveredUsers}
                    percentage="100.0%"
                    color="bg-green-100"
                    borderColor="border-[#10B981]"
                    icon={<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />}
                  />
                  <FunnelItem
                    label="Visited"
                    value={campaignData.readUsers}
                    percentage={`${(
                      (campaignData.readUsers / campaignData.deliveredUsers) *
                      100
                    ).toFixed(1)}% visit rate`}
                    color="bg-yellow-100"
                    borderColor="border-[#F59E0B]"
                    icon={<Eye className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />}
                  />
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <ChannelBreakdown
                    title="Sent by Channel"
                    data={campaignData.platformDetails}
                    value={campaignData.deliveredUsers}
                    icon={<Send className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />}
                  />
                  <ChannelBreakdown
                    title="Visited by Channel"
                    data={campaignData.platformDetails}
                    value={campaignData.readUsers}
                    icon={<Eye className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
            <DetailItem
              icon={<Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />}
              label="Sent on"
              value={campaignData.scheduledTime.split("T")[0]}
            />
            <DetailItem
              icon={<Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />}
              label="Expires on"
              value={campaignData.scheduledTime.split("T")[0]}
            />
            <DetailItem
              icon={<Zap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />}
              label="Campaign type"
              value="Discount"
            />
            <DetailItem
              icon={<Info className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />}
              label="Redeemable"
              value="Only once"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2 sm:gap-4">
            <h4 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-gray-800">
              Audience Details
            </h4>
            <div className="inline-block bg-gray-200 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-gray-700">
              All Customers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InsightItem = ({ icon, title, value, tooltip }) => (
  <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md border flex flex-col sm:flex-row items-start sm:items-center">
    <div className="mb-2 sm:mb-0 sm:mr-3 md:mr-4">{icon}</div>
    <div className="w-full sm:w-auto">
      <div className="flex items-center">
        <h6 className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-0">{title}</h6>
        {tooltip && (
          <ReactTooltip id={`tooltip-${title}`} place="top" content={tooltip} />
        )}
      </div>
      <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const FunnelItem = ({ label, value, percentage, color, icon, borderColor }) => (
  <div
    className={`${color} p-3 sm:p-6 rounded-lg transition-all duration-300 hover:shadow-md border ${borderColor}`}
  >
    <div className="flex justify-between items-center mb-2 sm:mb-3">
      <p className="font-semibold text-gray-700 text-xs sm:text-sm">{label}</p>
      {icon}
    </div>
    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">{value}</p>
    <p className="text-xs sm:text-sm text-gray-600">{percentage}</p>
  </div>
);

const ChannelBreakdown = ({ title, data, value }) => (
  <div className="bg-white p-3 sm:p-6 rounded-lg shadow-sm border">
    <h5 className="font-semibold mb-2 sm:mb-4 text-gray-700 text-sm sm:text-base">{title}</h5>
    {data.map((channel) => (
      <div
        key={channel.content}
        className="flex justify-between items-center mb-1 sm:mb-2"
      >
        <p className="text-gray-600 text-xs sm:text-sm">{channel.content}</p>
        <p className="font-semibold text-gray-800 text-xs sm:text-sm">{value}</p>
      </div>
    ))}
  </div>
);

const DetailItem = ({ icon, label, value }) => (
  <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md border-2 flex flex-col sm:flex-row items-start sm:items-center">
    <div className="mb-2 sm:mb-0 sm:mr-3 md:mr-4">{icon}</div>
    <div className="w-full sm:w-auto">
      <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-0">{label}</p>
      <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default SchedulesDetails;
