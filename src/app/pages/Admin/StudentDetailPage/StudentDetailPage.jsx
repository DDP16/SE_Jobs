import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../modules";
import { useLocation, useParams } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Sidebar from "./partials/Sidebar";
import { ProfileTab, ResumeTab } from "../../../components/manage/studentInfo";

export default function StudentDetailPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");
  const id = useParams().id;
  const userId = location.state?.userId;
  const { user, status: userStatus } = useSelector((state) => state.user);
  let studentInfo = user?.student_info[0] ?? {};
  studentInfo = {
    ...studentInfo,
    email: user?.email,
    phone_number: user?.phone_number,
    full_name: user ? `${user.first_name} ${user.last_name}` : "N/A"
  };

  useEffect(() => {
    fetchData();
  }, [id, userId]);

  const fetchData = async () => {
    dispatch(getUserById(userId));
  };

  if (userStatus === "loading")
    return (
      <div className="flex items-center justify-center h-full">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    );

  if (userStatus === "failed" && !user)
    return (
      <div className="flex h-full items-center justify-center gap-6 text-center px-4">
        <h3 className="text-2xl font-semibold text-gray-900">{t("applicantDetails.failedToLoadUser")}</h3>
      </div>
    );

  return (
    <div className="bg-gray-50 flex-1 mx-auto min-h-screen space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          className="p-2 hover:bg-gray-100 rounded-lg"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-6 h-6 cursor-pointer" />
        </button>
        <div className="text-2xl font-bold text-gray-900">Back to Students</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Sidebar studentInfo={studentInfo} />

        {/* Right Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm">
            {/* Tabs */}
            <div className="border-b">
              <div className="flex gap-8 px-6">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`py-4 cursor-pointer font-medium transition-all ${activeTab === "profile" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
                >
                  {t("applicantDetails.tabs.profile")}
                </button>
                <button
                  onClick={() => setActiveTab("resume")}
                  className={`py-4 cursor-pointer font-medium transition-all ${activeTab === "resume" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
                >
                  {t("applicantDetails.tabs.resume")}
                </button>
              </div>
            </div>

            <div className="p-6">
              {activeTab === "profile" && (
                <ProfileTab studentInfo={studentInfo} />
              )}

              {activeTab === "resume" && (
                <ResumeTab studentInfo={studentInfo} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}