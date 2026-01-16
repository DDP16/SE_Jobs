import { motion } from "framer-motion";
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
            className="rounded-lg transition-colors p-4 flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="body-normal font-medium text-gray-900 mb-1">{t("setting.applications")}</div>
              <div className="text-gray-500">
                {t("setting.applications_description")}
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNotificationChange("applications")}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors flex-shrink-0 ${
                notifications.applications ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <motion.div
                initial={false}
                animate={{ x: notifications.applications ? 22 : 3 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="h-5 w-5 rounded-full bg-white"
              />
            </motion.button>
          </motion.div>

          <motion.div
            whileHover={{ backgroundColor: "rgba(37, 99, 235, 0.02)" }}
            className="rounded-lg transition-colors p-4 flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="body-normal font-medium text-gray-900 mb-1">{t("setting.jobs")}</div>
              <div className="text-gray-500">
                {t("setting.jobs_description")}
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNotificationChange("jobs")}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors flex-shrink-0 ${
                notifications.jobs ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <motion.div
                initial={false}
                animate={{ x: notifications.jobs ? 22 : 3 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="h-5 w-5 rounded-full bg-white"
              />
            </motion.button>
          </motion.div>

          <motion.div
            whileHover={{ backgroundColor: "rgba(37, 99, 235, 0.02)" }}
            className="rounded-lg transition-colors p-4 flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="body-normal font-medium text-gray-900 mb-1">{t("setting.recommendations")}</div>
              <div className="text-gray-500">
                {t("setting.recommendations_description")}
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNotificationChange("recommendations")}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors flex-shrink-0 ${
                notifications.recommendations ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <motion.div
                initial={false}
                animate={{ x: notifications.recommendations ? 22 : 3 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="h-5 w-5 rounded-full bg-white"
              />
            </motion.button>
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