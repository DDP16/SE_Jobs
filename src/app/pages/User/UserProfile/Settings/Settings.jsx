import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { AccountTab, NotificationsTab } from "./partials";
import { useTranslation } from "react-i18next";

export default function UserProfileSettings() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="w-full bg-white rounded-lg">
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="border-b border-gray-200 pb-4 mb-6"
        >
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("account")}
              className={`pb-3 px-1 relative transition-colors ${activeTab === "account"
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {t("setting.my_account")}
              {activeTab === "account" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`pb-3 px-1 relative transition-colors ${activeTab === "notifications"
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {t("setting.notifications")}
              {activeTab === "notifications" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "account" && (
            <motion.div
              key="account"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <AccountTab />
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <NotificationsTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};