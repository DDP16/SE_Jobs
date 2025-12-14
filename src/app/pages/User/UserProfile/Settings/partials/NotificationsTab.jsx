import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function NotificationsTab() {
  const { t } = useTranslation();
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
      className="space-y-4 py-8"
    >
      <div>
        <p className="body-normal font-semibold text-gray-900 mb-2">{t("setting.basic_information")}</p>
        <p className="text-gray-500">
          {t("setting.description_notifications_tab")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-gray-200 pt-4">
        <div className="lg:col-span-4">
          <p className="body-normal font-semibold text-gray-900 mb-2">{t("setting.notifications")}</p>
          <p className="text-gray-500">
            {t("setting.description_notifications")}
          </p>
        </div>
        <div className="lg:col-span-8 space-y-6">
          <motion.div
            whileHover={{ backgroundColor: "rgba(37, 99, 235, 0.02)" }}
            className="rounded-lg cursor-pointer transition-colors"
            onClick={() => handleNotificationChange("applications")}
          >
            <div className="flex items-center gap-3">
              <div className="pt-0.5">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`w-5 h-5 rounded flex items-center justify-center transition-all ${notifications.applications
                    ? "bg-blue-600"
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
                <div className="body-normal font-medium text-gray-900 mb-1">{t("setting.applications")}</div>
                <div className="text-gray-500">
                  {t("setting.applications_description")}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ backgroundColor: "rgba(37, 99, 235, 0.02)" }}
            className="rounded-lg cursor-pointer transition-colors"
            onClick={() => handleNotificationChange("jobs")}
          >
            <div className="flex items-center gap-3">
              <div className="pt-0.5">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`w-5 h-5 rounded flex items-center justify-center transition-all ${notifications.jobs
                    ? "bg-blue-600"
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
                <div className="body-normal font-medium text-gray-900 mb-1">{t("setting.jobs")}</div>
                <div className="text-gray-500">
                  {t("setting.jobs_description")}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ backgroundColor: "rgba(37, 99, 235, 0.02)" }}
            className="rounded-lg cursor-pointer transition-colors"
            onClick={() => handleNotificationChange("recommendations")}
          >
            <div className="flex items-center gap-3">
              <div className="pt-0.5">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`w-5 h-5 rounded flex items-center justify-center transition-all ${notifications.recommendations
                    ? "bg-blue-600"
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
                <div className="body-normal font-medium text-gray-900 mb-1">{t("setting.recommendations")}</div>
                <div className="text-gray-500">
                  {t("setting.recommendations_description")}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t("save")}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}