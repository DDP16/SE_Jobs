import React, { use, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ChevronDown, Mail, Phone, Instagram, Twitter, Globe, MessageSquare, FileText, BarChart3, Calendar, X, Link } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyApplicationDetail, getUserById } from "../../../modules";
import { useParams } from "react-router-dom";
import { SOCIAL_ICONS } from "../../../lib/enums";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import ExperienceSection from "./partials/ExperienceSection";
import EducationSection from "./partials/EducationSection";
import ProjectsSection from "./partials/ProjectsSection";
import CertificatesSection from "./partials/CertificatesSection";

export default function ApplicantDetails() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("profile");
  const id = useParams().id;
  const {application, status: applicationStatus} = useSelector((state) => state.applications);
  const {user, status: userStatus} = useSelector((state) => state.user);
  const studentInfo = user?.student_info[0] ?? {};

  const formatDateOfBirth = (dateString) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    // Calculate age
    const today = new Date();
    let age = today.getFullYear() - year;
    const monthDiff = today.getMonth() - date.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
      age--;
    }
    
    return `${month} ${day}, ${year} (${age} y.o)`;
  };

  const formatDaysAgo = (dateString) => {
    if (!dateString) return "";
    
    const createdDate = new Date(dateString);
    const today = new Date();
    
    // Calculate difference in milliseconds
    const diffTime = Math.abs(today - createdDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const result = await dispatch(getCompanyApplicationDetail(id)).unwrap();
    const application = result.data;
    if (application && application.user_id) {
      dispatch(getUserById(application.user_id));
    }
  };

  const contacts = () => {
    if (studentInfo.social_links.length === 0) return [];

    return studentInfo.social_links.map((link) => {
      const socialIcon = SOCIAL_ICONS[link.platform.toLowerCase()];
      return {
        type: link.platform,
        url: link.url,
        icon: socialIcon ? socialIcon.icon : Link,
        color: socialIcon ? socialIcon.color : "text-gray-500",
      };
    });
  };

  if (applicationStatus === "loading" || userStatus === "loading" || !application || !user)
    return (
      <div className="flex items-center justify-center h-full">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    );

  if (applicationStatus === "failed" && !application)
    return (
      <div className="flex h-full items-center justify-center gap-6 text-center px-4">
        <h3 className="text-2xl font-semibold text-gray-900">{t("applicantDetails.failedToLoad")}</h3>
      </div>
    );

  if (userStatus === "failed" && !user)
    return (
      <div className="flex h-full items-center justify-center gap-6 text-center px-4">
        <h3 className="text-2xl font-semibold text-gray-900">{t("applicantDetails.failedToLoadUser")}</h3>
      </div>
    );

  return (
    <div className="bg-gray-50 p-6 flex-1 mx-auto min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-6 h-6 cursor-pointer" />
          </button>
          <div className="text-2xl font-bold text-gray-900">{t("applicantDetails.title")}</div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-gray-200 rounded-lg hover:bg-gray-50">
          <ChevronDown className="w-4 h-4" />
          <span>{t("applicantDetails.moreAction")}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm px-6 py-4 space-y-4">
            {/* Profile Section */}
            <div className="flex flex-col items-center space-y-1">
              <div className="w-20 h-20 bg-gray-800 rounded-full overflow-hidden">
                <img src="/api/placeholder/80/80" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="text-xl font-bold text-gray-900">{application.full_name}</div>
              <p className="text-gray-600">Product Designer</p>
              {/* <div className="flex items-center gap-1">
                <span className="text-yellow-400">⭐</span>
                <span className="font-semibold">4.0</span>
              </div> */}
            </div>

            {/* Applied Jobs */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t("applicantDetails.appliedJobs")}</span>
                <span className="text-sm text-gray-600">{formatDaysAgo(application.created_at)}</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900">{application.job.title}</div>
                <p className="text-sm text-gray-600">{application.job.categories[0].name} • {application.job.working_time}</p>
              </div>
            </div>

            {/* Stage Progress */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t("applicantDetails.stage")}</span>
                <span className="text-sm text-blue-600 font-medium">{t(`applicantList.table.stages.${application.status}`)}</span>
              </div>
              <div className="flex gap-1">
                <div className="flex-1 h-2 bg-blue-600 rounded"></div>
                <div className="flex-1 h-2 bg-blue-600 rounded"></div>
                <div className="flex-1 h-2 bg-blue-600 rounded"></div>
                <div className="flex-1 h-2 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Schedule Interview Button */}
            <div className="flex gap-2">
              <button className="cursor-pointer flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">{t("applicantDetails.scheduleInterview")}</button>
              <button className="p-3 border cursor-pointer border-gray-200 rounded-lg hover:bg-gray-50">
                <MessageSquare className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Contact Section */}
            <div className="border-t pt-4">
              <h4 className="font-bold text-gray-900 mb-4">{t("applicantDetails.contact")}</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t("applicantDetails.email")}</p>
                    <p className="text-sm text-gray-900">{application.email}</p>
                  </div>
                </div>
                {application.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t("applicantDetails.phone")}</p>
                      <p className="text-sm text-gray-900">{application.phone}</p>
                    </div>
                  </div>
                )}
                {contacts().map((contact) => (
                  <div key={contact.type} className="flex items-start gap-3">
                    <contact.icon className={`w-5 h-5 ${contact.color} mt-0.5`} />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t(`applicantDetails.${contact.type.toLowerCase()}`)}</p>
                      <a 
                        href={contact.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {contact.url}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

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
                <button
                  onClick={() => setActiveTab("hiring")}
                  className={`py-4 cursor-pointer font-medium transition-all ${activeTab === "hiring" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
                >
                  {t("applicantDetails.tabs.hiring")}
                </button>
                <button
                  onClick={() => setActiveTab("interview")}
                  className={`py-4 cursor-pointer font-medium transition-all ${activeTab === "interview" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
                >
                  {t("applicantDetails.tabs.interview")}
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Personal Info */}
              {activeTab === "profile" && (
                <div className="space-y-4">
                  {/* Personal Info */}
                  <div className="space-y-2">
                    <h5 className="font-bold text-gray-900">{t("applicantDetails.personalInfo.title")}</h5>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <p className="text-sm text-gray-600">{t("applicantDetails.personalInfo.fullName")}</p>
                        <p className="text-gray-900">{application.full_name ?? ""}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t("applicantDetails.personalInfo.gender")}</p>
                        <p className="text-gray-900">{studentInfo.gender ?? ""}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t("applicantDetails.personalInfo.dateOfBirth")}</p>
                        <p className="text-gray-900">{formatDateOfBirth(studentInfo.date_of_birth)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t("applicantDetails.personalInfo.address")}</p>
                        <p className="text-gray-900">
                          {studentInfo.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t("applicantDetails.personalInfo.language")}</p>
                        <p className="text-gray-900">English, Việt Nam</p>
                      </div>
                    </div>
                  </div>

                  {/* Professional Info */}
                  <div className="space-y-4">
                    <h5 className="font-bold text-gray-900">{t("applicantDetails.professionalInfo.title")}</h5>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">{t("applicantDetails.professionalInfo.aboutMe")}</p>
                      <p className="text-gray-900">
                        {studentInfo.about}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">{t("applicantDetails.professionalInfo.currentJob")}</p>
                        <p className="text-gray-900">Product Designer</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">{t("applicantDetails.professionalInfo.skillSet")}</p>
                        <div className="flex gap-2 flex-wrap">
                          {studentInfo.skills && studentInfo.skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">{skill}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <ExperienceSection experiences={studentInfo.experiences || []} />
                    <EducationSection educations={studentInfo.educations || []} />
                    <ProjectsSection projects={studentInfo.projects || []} />
                    <CertificatesSection certifications={studentInfo.certifications || []} />
                  </div>
                </div>
              )}

              {activeTab === "resume" && (
                <div className="w-full h-[800px]">
                  {studentInfo.cv && studentInfo.cv[0] ? (
                    <embed
                      src={application.resume_url}
                      type="application/pdf"
                      width="100%"
                      height="100%"
                      style={{ border: "none" }}
                    />
                  ) : (
                    <div className="py-12 text-center">
                      <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("applicantDetails.resume.title")}</h3>
                      <p className="text-gray-600">{t("applicantDetails.resume.description")}</p>
                    </div>
                  )}
                </div>
              )}
              {activeTab === "hiring" && (
                <div className="py-12 text-center">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("applicantDetails.hiringProgress.title")}</h3>
                  <p className="text-gray-600">{t("applicantDetails.hiringProgress.description")}</p>
                  <div className="mt-8 max-w-md mx-auto">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                        <span className="text-gray-900 font-medium">{t("applicantDetails.hiringProgress.applicationSubmitted")}</span>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                        <span className="text-gray-900 font-medium">{t("applicantDetails.hiringProgress.resumeReviewed")}</span>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">3</div>
                        <span className="text-gray-900 font-medium">{t("applicantDetails.hiringProgress.interviewStage")}</span>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg opacity-50">
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm">4</div>
                        <span className="text-gray-900 font-medium">{t("applicantDetails.hiringProgress.finalDecision")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Interview Schedule Tab */}
              {activeTab === "interview" && (
                <div className="py-12 text-center">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("applicantDetails.interviewSchedule.title")}</h3>
                  <p className="text-gray-600 mb-6">{t("applicantDetails.interviewSchedule.noInterviews")}</p>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t("applicantDetails.interviewSchedule.scheduleNewInterview")}</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
