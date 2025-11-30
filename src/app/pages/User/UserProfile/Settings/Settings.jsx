import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { AccountTab, NotificationsTab } from "./partials";
import { useTranslation } from "react-i18next";

export default function UserProfileSettings() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="mx-auto px-6 sm:px-10 lg:px-14 py-8">
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
              {t("setting.my_account")}
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
              {t("setting.notifications")}
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
          <AccountTab />
        )}

        {activeTab === "notifications" && (
          <NotificationsTab />
        )}
      </div>
    </div>
  );
};