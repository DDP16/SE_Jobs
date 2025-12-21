import { motion } from "framer-motion";
import { Phone, MessageSquare } from "lucide-react";
import { ContactCard, ContactHeader, IconWrapper } from "./partials";
import { srcAsset } from "../../lib";
import { notification } from "antd";

export default function ContactUs() {
  const phones = ["+012 345 6789", "+098 765 4321"];
  const email = "support@example.com";
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
          openNotification("Email address copied", "The email address has been copied to your clipboard.", "success");
        })
        .catch((err) => {
          openNotification("Failed to copy email address", "An error occurred while copying the email address to your clipboard.", "error");
        });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        openNotification("Email address copied", "The email address has been copied to your clipboard.", "success");
      } catch (err) {
        openNotification("Failed to copy email address", "An error occurred while copying the email address to your clipboard.", "error");
      }
      document.body.removeChild(textarea);
    }
  };

  const handleClickPhone = (phone) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(phone)
        .then(() => {
          openNotification("Phone number copied", "The phone number has been copied to your clipboard.", "success");
        })
        .catch((err) => {
          openNotification("Failed to copy phone number", "An error occurred while copying the phone number to your clipboard.", "error");
        });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = phone;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        openNotification("Phone number copied", "The phone number has been copied to your clipboard.", "success");
      } catch (err) {
        openNotification("Failed to copy phone number", "An error occurred while copying the phone number to your clipboard.", "error");
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="w-full bg-gray-50">
        {/* Header Section */}
        <ContactHeader
          title="Get in touch"
          subtitle="Want to get in touch? We'd love to hear from you. Here's how you can reach us."
          illustration={srcAsset.contactUsImage}
        />

        {/* Contact Cards Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Talk to Sales Card */}
            <ContactCard
              icon={<IconWrapper icon={Phone} size={40} color="#1f2937" />}
              title="Talk to Support"
              description="Just pick up the phone to chat with a member of our support team."
              phoneText={phones}
              phoneOnClick={handleClickPhone}
              delay={0.1}
            />

            {/* Contact Customer Support Card */}
            <ContactCard
              icon={<IconWrapper icon={MessageSquare} size={40} color="#1f2937" />}
              title="Mail Support"
              description="Sometimes you need a little help from your friends. Or a SE-Jobs support rep. Don't worry… we're here for you."
              actionLabel="Contact Support"
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
