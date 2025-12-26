import { motion } from "framer-motion";
import { Phone, MessageSquare } from "lucide-react";
import { ContactCard, ContactHeader, IconWrapper } from "./partials";
import { srcAsset } from "../../lib";
import { notification } from "antd";
import { useTranslation } from "react-i18next";

export default function ContactUs() {
  const { t } = useTranslation();
  const phones = ["+8435 9021 926", "+8438 3353 061"];
  const email = "22521243@gm.uit.edu.vn";
  const [api, contextHolder] = notification.useNotification({
    stack: { threshold: 3, },
  });

  function openNotification(title, description, type = 'info') {
    api[type]({
      title: title,
      description: description,
      showProgress: true,
      pauseOnHover: true,
    });
  };

  const handleContactSupport = () => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(email)
        .then(() => {
          openNotification(t("contactUsPage.emailCopied"), t("contactUsPage.emailCopiedDesc"), "success");
        })
        .catch((err) => {
          openNotification(t("contactUsPage.emailCopyFailed"), t("contactUsPage.emailCopyFailedDesc"), "error");
        });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        openNotification(t("contactUsPage.emailCopied"), t("contactUsPage.emailCopiedDesc"), "success");
      } catch (err) {
        openNotification(t("contactUsPage.emailCopyFailed"), t("contactUsPage.emailCopyFailedDesc"), "error");
      }
      document.body.removeChild(textarea);
    }
  };

  const handleClickPhone = (phone) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(phone)
        .then(() => {
          openNotification(t("contactUsPage.phoneCopied"), t("contactUsPage.phoneCopiedDesc"), "success");
        })
        .catch((err) => {
          openNotification(t("contactUsPage.phoneCopyFailed"), t("contactUsPage.phoneCopyFailedDesc"), "error");
        });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = phone;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        openNotification(t("contactUsPage.phoneCopied"), t("contactUsPage.phoneCopiedDesc"), "success");
      } catch (err) {
        openNotification(t("contactUsPage.phoneCopyFailed"), t("contactUsPage.phoneCopyFailedDesc"), "error");
      }
      document.body.removeChild(textarea);
    }
  };

  const handleClickZalo = () => {
    const zaloPhone = phones[0]?.replace(/[^0-9]/g, '');
    if (zaloPhone) {
      const zaloAppUrl = `zalo://chat?phone=${zaloPhone}`;
      const zaloWebUrl = `https://zalo.me/${zaloPhone}`;

      const link = document.createElement('a');
      link.href = zaloAppUrl;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        window.open(zaloWebUrl, '_blank');
      }, 500);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="w-full bg-gray-50">
        {/* Header Section */}
        <ContactHeader
          title={t("contactUsPage.title")}
          subtitle={t("contactUsPage.subtitle")}
          illustration={srcAsset.contactUsImage}
        />

        {/* Contact Cards Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Talk to Sales Card */}
            <ContactCard
              icon={<IconWrapper icon={Phone} size={40} color="#1f2937" />}
              title={t("contactUsPage.talkToSupport")}
              description={t("contactUsPage.talkToSupportDesc")}
              phoneText={phones}
              phoneOnClick={handleClickPhone}
              zaloText={t("contactUsPage.zaloText")}
              zaloOnClick={handleClickZalo}
              delay={0.1}
            />

            {/* Contact Customer Support Card */}
            <ContactCard
              icon={<IconWrapper icon={MessageSquare} size={40} color="#1f2937" />}
              title={t("contactUsPage.mailSupport")}
              description={t("contactUsPage.mailSupportDesc")}
              actionLabel={t("contactUsPage.contactSupport")}
              actionOnClick={handleContactSupport}
              delay={0.3}
            />
          </div>

          {/* Phone Number Display */}
          {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCallSales}
            className="text-gray-900 underline hover:text-gray-700 transition-colors inline-block"
          >
            +45 6 955 6000
          </motion.button>
        </motion.div> */}
        </div>
      </div>
    </>
  );
};
