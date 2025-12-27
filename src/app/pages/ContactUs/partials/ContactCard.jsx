import React from "react";
import { motion } from "framer-motion";

const ContactCard = ({ icon, title, description, actionLabel, actionOnClick, phoneText, phoneOnClick, zaloText, zaloOnClick, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
      className="bg-white rounded-2xl p-8 shadow-lg transition-all"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.2, type: "spring", stiffness: 200 }}
        className="flex justify-center mb-6"
      >
        {icon}
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.3 }}
        className="text-center mb-4 text-gray-900"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.4 }}
        className="text-center text-gray-600 mb-6 leading-relaxed"
      >
        {description}
      </motion.p>

      {actionLabel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: delay + 0.5 }}
          className="flex justify-center mb-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={actionOnClick}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-500 transition-colors cursor-pointer"
          >
            {actionLabel}
          </motion.button>
        </motion.div>
      )}

      {phoneText && (
        <motion.div className="flex flex-wrap justify-center items-center gap-3 px-4">
          {phoneText.map((phone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: delay + 0.5 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => phoneOnClick(phone)}
                className="text-gray-900 underline hover:text-gray-700 transition-colors cursor-pointer"
              >
                {phone}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {zaloText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: delay + 0.6 }}
          className="mt-4 text-center"
        >
          <motion.p
            className="text-sm text-gray-600 mb-2"
          >
            {zaloText}
          </motion.p>
          {zaloOnClick && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={zaloOnClick}
              className="text-blue-600 underline hover:text-blue-700 transition-colors cursor-pointer text-sm font-medium"
            >
              Zalo
            </motion.button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ContactCard;
