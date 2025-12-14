import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getToken } from "@/modules/utils/encryption";
import { TOKEN } from "src/settings/localVar";

export default function AccountTab() {
  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.auth.user);
  const userEmail = currentUser?.email || "";

  // Get token from localStorage
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const decryptedToken = getToken();
      if (decryptedToken) {
        setToken(decryptedToken);
      } else {
        const rawToken = localStorage.getItem(TOKEN);
        setToken(rawToken || null);
      }
    } catch (error) {
      console.warn("Error getting token:", error);
      const rawToken = localStorage.getItem(TOKEN);
      setToken(rawToken || null);
    }
  }, []);


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
          <p className="body-normal font-semibold text-gray-900 mb-2">{t("setting.email") || "Email"}</p>
          <p className="text-gray-500">
            {t("setting.description_email") || "Email của bạn không thể thay đổi"}
          </p>
        </div>
        <div className="lg:col-span-8">
          <div className="mb-4">
            <label className="block body-normal font-semibold text-gray-700 mb-2">
              {t("setting.email") || "Email"}
            </label>
            <motion.input
              type="email"
              value={userEmail}
              disabled
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
              className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
            >
              <Check className="w-3 h-3 text-white" />
            </motion.div>
            <p className="text-gray-500 text-sm">
              {t("setting.email_verified") || "Email đã được xác thực"}
            </p>
          </div>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <p className="text-gray-400 mt-1">{t("setting.password_requirements")}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
        <div className="lg:col-span-8">
          <div className="flex items-center gap-3">
            <div className="pt-0.5">
              <div className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-3 h-3 rounded-full bg-blue-600"
                />
              </div>
            </div>
            <div>
              <div className="body-normal font-medium text-gray-900 mb-1">{t("setting.job_seeker")}</div>
              <div className="text-gray-500">{t("setting.job_seeker_description")}</div>
            </div>
          </div>
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