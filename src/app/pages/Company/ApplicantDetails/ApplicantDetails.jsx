import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ChevronDown, Mail, Phone, Instagram, Twitter, Globe, MessageSquare, FileText, BarChart3, Calendar, X } from "lucide-react";

export default function ApplicantDetails() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("profile");
  return (
    <div className="bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 mt-12">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
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
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Profile Section */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 bg-gray-800 rounded-full mb-3 overflow-hidden">
                  <img src="/api/placeholder/80/80" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="text-xl font-bold text-gray-900">Jerome Bell</div>
                <p className="text-gray-600 mb-2">Product Designer</p>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">⭐</span>
                  <span className="font-semibold">4.0</span>
                </div>
              </div>

              {/* Applied Jobs */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">{t("applicantDetails.appliedJobs")}</span>
                  <span className="text-sm text-gray-600">2 days ago</span>
                </div>
                <div className="mb-2">
                  <div className="font-semibold text-gray-900">Product Development</div>
                  <p className="text-sm text-gray-600">Marketing • Full-Time</p>
                </div>
              </div>

              {/* Stage Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">{t("applicantDetails.stage")}</span>
                  <span className="text-sm text-blue-600 font-medium">{t("applicantList.table.stages.interview")}</span>
                </div>
                <div className="flex gap-1">
                  <div className="flex-1 h-2 bg-blue-600 rounded"></div>
                  <div className="flex-1 h-2 bg-blue-600 rounded"></div>
                  <div className="flex-1 h-2 bg-blue-600 rounded"></div>
                  <div className="flex-1 h-2 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Schedule Interview Button */}
              <div className="flex gap-2 mb-6">
                <button className="cursor-pointer flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">{t("applicantDetails.scheduleInterview")}</button>
                <button className="p-3 border cursor-pointer border-gray-200 rounded-lg hover:bg-gray-50">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Contact Section */}
              <div className="border-t pt-6">
                <h3 className="font-bold text-gray-900 mb-4">{t("applicantDetails.contact")}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t("applicantDetails.email")}</p>
                      <p className="text-sm text-gray-900">jeromeBell45@email.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t("applicantDetails.phone")}</p>
                      <p className="text-sm text-gray-900">+44 1245 572 135</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Instagram className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t("applicantDetails.instagram")}</p>
                      <a href="#" className="text-sm text-blue-600 hover:underline">
                        instagram.com/jeromebell
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t("applicantDetails.twitter")}</p>
                      <a href="#" className="text-sm text-blue-600 hover:underline">
                        twitter.com/jeromebell
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t("applicantDetails.website")}</p>
                      <a href="#" className="text-sm text-blue-600 hover:underline">
                        www.jeromebell.com
                      </a>
                    </div>
                  </div>
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
                    className={`py-4 cursor-pointer font-medium ${activeTab === "profile" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    {t("applicantDetails.tabs.profile")}
                  </button>
                  <button
                    onClick={() => setActiveTab("resume")}
                    className={`py-4 cursor-pointer font-medium ${activeTab === "resume" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    {t("applicantDetails.tabs.resume")}
                  </button>
                  <button
                    onClick={() => setActiveTab("hiring")}
                    className={`py-4 cursor-pointer font-medium ${activeTab === "hiring" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    {t("applicantDetails.tabs.hiring")}
                  </button>
                  <button
                    onClick={() => setActiveTab("interview")}
                    className={`py-4 cursor-pointer font-medium ${activeTab === "interview" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    {t("applicantDetails.tabs.interview")}
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Personal Info */}
                {activeTab === "profile" && (
                  <>
                    {/* Personal Info */}
                    <div className="mb-8">
                      <div className="text-lg font-bold text-gray-900 mb-4">{t("applicantDetails.personalInfo.title")}</div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{t("applicantDetails.personalInfo.fullName")}</p>
                          <p className="text-gray-900">Jerome Bell</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{t("applicantDetails.personalInfo.gender")}</p>
                          <p className="text-gray-900">Male</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{t("applicantDetails.personalInfo.dateOfBirth")}</p>
                          <p className="text-gray-900">March 23, 1995 (26 y.o)</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{t("applicantDetails.personalInfo.language")}</p>
                          <p className="text-gray-900">English, French, Bahasa</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-600 mb-1">{t("applicantDetails.personalInfo.address")}</p>
                          <p className="text-gray-900">
                            4517 Washington Ave.
                            <br />
                            Manchester, Kentucky 39495
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Professional Info */}
                    <div>
                      <div className="text-lg font-bold text-gray-900 mb-4">{t("applicantDetails.professionalInfo.title")}</div>

                      <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-2">{t("applicantDetails.professionalInfo.aboutMe")}</p>
                        <p className="text-gray-900 mb-3">
                          I'm a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital
                          products that have a positive impact on the world.
                        </p>
                        <p className="text-gray-900">
                          For 10 years, I've specialised in interface, experience & interaction design as well as working in user research and product strategy for product
                          agencies, big tech companies & start-ups.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{t("applicantDetails.professionalInfo.currentJob")}</p>
                          <p className="text-gray-900">Product Designer</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{t("applicantDetails.professionalInfo.experienceInYears")}</p>
                          <p className="text-gray-900">4 Years</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{t("applicantDetails.professionalInfo.highestQualification")}</p>
                          <p className="text-gray-900">Bachelors in Engineering</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{t("applicantDetails.professionalInfo.skillSet")}</p>
                          <div className="flex gap-2 flex-wrap">
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">Project Management</span>
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">Copywriting</span>
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">English</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "resume" && (
                  <div className="py-12 text-center">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("applicantDetails.resume.title")}</h3>
                    <p className="text-gray-600 mb-6">{t("applicantDetails.resume.description")}</p>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t("applicantDetails.resume.downloadResume")}</button>
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
    </div>
  );
}
