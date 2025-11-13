import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

export default function NotificationsTab() {
    const [notifications, setNotifications] = useState({
        applications: true,
        jobs: false,
        recommendations: false,
    });

    const handleNotificationChange = (key) => {
        setNotifications((prev) => ({
        ...prev,
        [key]: !prev[key],
        }));
    };

    return (
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
    );
}