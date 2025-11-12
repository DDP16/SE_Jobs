import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";

export default function UserProfileSettings() {
  const [activeTab, setActiveTab] = useState("account");
  const [notifications, setNotifications] = useState({
    applications: true,
    jobs: false,
    recommendations: false,
  });
  const [accountType, setAccountType] = useState("jobseeker");

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="border-b border-gray-200"
        >
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("account")}
              className={`pb-3 px-1 relative transition-colors ${
                activeTab === "account"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              My Account
              {activeTab === "account" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`pb-3 px-1 relative transition-colors ${
                activeTab === "notifications"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Notifications
              {activeTab === "notifications" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          </div>
        </motion.div>

        {activeTab === "account" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="mt-8 mb-12">
              <p className="body-large font-semibold text-gray-900 mb-2">Basic Information</p>
              <p className="text-gray-500">
                This is login information that you can update anytime.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                <div className="lg:col-span-4">
                  <p className="body-normal font-semibold text-gray-900 mb-2">Update Email</p>
                  <p className="text-gray-500">
                    Update your email address to make sure it is safe
                  </p>
                </div>
                <div className="lg:col-span-8">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="body-normal font-medium text-gray-700">jakegyll@gmail.com</span>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
                      className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  </div>
                  <p className="text-gray-500 mb-4">
                    Your email address is verified.
                  </p>
                  <div className="mb-4">
                    <label className="block body-normal font-semibold text-gray-700 mb-2">
                      Update Email
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="email"
                      placeholder="Enter your new email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Update Email
                  </motion.button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                  <div className="lg:col-span-4">
                    <p className="body-normal font-semibold text-gray-900 mb-2">New Password</p>
                    <p className="text-gray-500">
                      Manage your password to make sure it is safe
                    </p>
                  </div>
                  <div className="lg:col-span-8">
                    <div className="mb-4">
                      <label className="block body-normal font-semibold text-gray-700 mb-2">
                        Old Password
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="password"
                        placeholder="Enter your old password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                      <p className="text-gray-400 mt-1">Minimum 8 characters</p>
                    </div>
                    <div className="mb-4">
                      <label className="block body-normal font-semibold text-gray-700 mb-2">
                        New Password
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="password"
                        placeholder="Enter your new password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                      <p className="text-gray-400 mt-1">Minimum 8 characters</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Change Password
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                  <div className="lg:col-span-4">
                    <p className="body-normal font-semibold text-gray-900 mb-2">Account Type</p>
                    <p className="text-gray-500">
                      You can update your account type
                    </p>
                  </div>
                  <div className="lg:col-span-8">
                    <motion.div
                      whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.02)" }}
                      className="mb-4 p-4 rounded-lg cursor-pointer transition-colors"
                      onClick={() => setAccountType("jobseeker")}
                    >
                      <div className="flex items-start gap-3">
                        <div className="pt-0.5">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              accountType === "jobseeker"
                                ? "border-indigo-600"
                                : "border-gray-300"
                            }`}
                          >
                            {accountType === "jobseeker" && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-3 h-3 rounded-full bg-indigo-600"
                              />
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="body-normal font-medium text-gray-900 mb-1">Job Seeker</div>
                          <div className="text-gray-500">Looking for a job</div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.02)" }}
                      className="mb-6 p-4 rounded-lg cursor-pointer transition-colors"
                      onClick={() => setAccountType("employer")}
                    >
                      <div className="flex items-start gap-3">
                        <div className="pt-0.5">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              accountType === "employer"
                                ? "border-indigo-600"
                                : "border-gray-300"
                            }`}
                          >
                            {accountType === "employer" && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-3 h-3 rounded-full bg-indigo-600"
                              />
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="body-normal font-medium text-gray-900 mb-1">Employer</div>
                          <div className="text-gray-500">
                            Hiring, sourcing candidates, or posting a jobs
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Save
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
                >
                  Close Account
                  <Info className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "notifications" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="mt-8 mb-12">
              <p className="body-normal font-semibold text-gray-900 mb-2">Basic Information</p>
              <p className="text-gray-500">
                This is notifications preferences that you can update anytime.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                <div className="lg:col-span-4">
                  <p className="body-normal font-semibold text-gray-900 mb-2">Notifications</p>
                  <p className="text-gray-500">
                    Customize your preferred notification settings
                  </p>
                </div>
                <div className="lg:col-span-8">
                  <motion.div
                    whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.02)" }}
                    className="mb-6 p-4 rounded-lg cursor-pointer transition-colors"
                    onClick={() => handleNotificationChange("applications")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="pt-0.5">
                        <motion.div
                          whileTap={{ scale: 0.9 }}
                          className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                            notifications.applications
                              ? "bg-indigo-600"
                              : "border-2 border-gray-300 bg-white"
                          }`}
                        >
                          {notifications.applications && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 500 }}
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                      <div>
                        <div className="body-normal font-medium text-gray-900 mb-1">Applications</div>
                        <div className="text-gray-500">
                          These are notifications for jobs that you have applied to
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.02)" }}
                    className="mb-6 p-4 rounded-lg cursor-pointer transition-colors"
                    onClick={() => handleNotificationChange("jobs")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="pt-0.5">
                        <motion.div
                          whileTap={{ scale: 0.9 }}
                          className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                            notifications.jobs
                              ? "bg-indigo-600"
                              : "border-2 border-gray-300 bg-white"
                          }`}
                        >
                          {notifications.jobs && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 500 }}
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                      <div>
                        <div className="body-normal font-medium text-gray-900 mb-1">Jobs</div>
                        <div className="text-gray-500">
                          These are notifications for job openings that suit your
                          profile
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.02)" }}
                    className="mb-6 p-4 rounded-lg cursor-pointer transition-colors"
                    onClick={() => handleNotificationChange("recommendations")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="pt-0.5">
                        <motion.div
                          whileTap={{ scale: 0.9 }}
                          className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                            notifications.recommendations
                              ? "bg-indigo-600"
                              : "border-2 border-gray-300 bg-white"
                          }`}
                        >
                          {notifications.recommendations && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 500 }}
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                      <div>
                        <div className="body-normal font-medium text-gray-900 mb-1">Recommendations</div>
                        <div className="text-gray-500">
                          These are notifications for personalized recommendations
                          from our recruiters
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Update Email
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};