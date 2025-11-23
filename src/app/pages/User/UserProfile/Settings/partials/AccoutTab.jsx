import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AccountTab() {
  const { t } = useTranslation();
  const [accountType, setAccountType] = useState("jobseeker");

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-4 py-8"
    >
      <div>
        <p className="body-large font-semibold text-gray-900 mb-2">{t("setting.basic_information")}</p>
        <p className="text-gray-500">
          {t("setting.description_account_tab")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-gray-200 pt-4">
        <div className="lg:col-span-4">
          <p className="body-normal font-semibold text-gray-900 mb-2">{t("setting.update_email")}</p>
          <p className="text-gray-500">
            {t("setting.description_update_email")}
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
            {t("setting.email_verified")}
          </p>
          <div className="mb-4">
            <label className="block body-normal font-semibold text-gray-700 mb-2">
              {t("setting.update_email")}
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="email"
              placeholder={t("setting.enter_new_email")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {t("setting.update_email")}
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-gray-200 pt-4">
        <div className="lg:col-span-4">
          <p className="body-normal font-semibold text-gray-900 mb-2">{t("setting.new_password")}</p>
          <p className="text-gray-500">
            {t("setting.description_new_password")}
          </p>
        </div>
        <div className="lg:col-span-8">
          <div className="mb-4 space-y-2">
            <label className="block body-normal font-semibold text-gray-700">
              {t("setting.old_password")}
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="password"
              placeholder={t("setting.enter_old_password")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <p className="text-gray-400 mt-1">{t("setting.password_requirements")}</p>
          </div>
          <div className="mb-4 space-y-2">
            <label className="block body-normal font-semibold text-gray-700 ">
              {t("setting.new_password")}
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="password"
              placeholder={t("setting.enter_new_password")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <p className="text-gray-400 mt-1">{t("setting.password_requirements")}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {t("setting.change_password")}
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-gray-200 pt-4">
        <div className="lg:col-span-4">
          <p className="body-normal font-semibold text-gray-900 mb-2">{t("setting.account_type")}</p>
          <p className="text-gray-500">
            {t("setting.description_account_type")}
          </p>
        </div>
        <div className="lg:col-span-8 space-y-6">
          <motion.div
            whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.02)" }}
            className="rounded-lg cursor-pointer transition-colors"
            onClick={() => setAccountType("jobseeker")}
          >
            <div className="flex items-center gap-3">
              <div className="pt-0.5">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${accountType === "jobseeker"
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
                <div className="body-normal font-medium text-gray-900 mb-1">{t("setting.job_seeker")}</div>
                <div className="text-gray-500">{t("setting.job_seeker_description")}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.02)" }}
            className="rounded-lg cursor-pointer transition-colors"
            onClick={() => setAccountType("employer")}
          >
            <div className="flex items-center gap-3">
              <div className="pt-0.5">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${accountType === "employer"
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
                <div className="body-normal font-medium text-gray-900 mb-1">{t("setting.employer")}</div>
                <div className="text-gray-500">
                  {t("setting.employer_description")}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {t("save")}
          </motion.button>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          className="flex items-center justify-center gap-2 text-red-500 hover:text-red-600 transition-colors"
        >
          {t("setting.close_account")}
          <Info className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}